"""Filters for draft-relevant player_stats rows."""

from __future__ import annotations

from typing import Final

import pandas as pd

# Fantasy-relevant skill/kicker positions (FB maps to RB eligibility).
DRAFTABLE_POSITIONS: Final[frozenset[str]] = frozenset(
    {"QB", "RB", "FB", "WR", "TE", "K"}
)

# More than 2 missed games => at least 3 REG Out weeks.
DEFAULT_MIN_OUT_WEEKS: Final[int] = 3


def player_ids_with_significant_injury_outs(
    injuries: pd.DataFrame,
    season: int,
    *,
    min_out_weeks: int = DEFAULT_MIN_OUT_WEEKS,
) -> set[str]:
    """Return player IDs with enough REG injury-report Out weeks in ``season``."""
    if injuries.empty:
        return set()

    out_weeks = injuries[
        (injuries["season"] == season)
        & (injuries["season_type"] == "REG")
        & (injuries["report_status"] == "Out")
        & injuries["gsis_id"].notna()
    ]
    counts = out_weeks.groupby("gsis_id")["week"].nunique()
    return set(counts[counts >= min_out_weeks].index.astype(str))


def exclude_incoming_rookies(
    player_stats: pd.DataFrame,
    players: pd.DataFrame,
    latest_season: int,
) -> pd.DataFrame:
    """Drop players drafted after ``latest_season`` (incoming rookie class)."""
    rookies = players.loc[
        players["draft_year"].fillna(0).astype(int) > latest_season,
        "gsis_id",
    ].dropna()
    rookie_ids = set(rookies.astype(str))
    return player_stats[~player_stats["player_id"].astype(str).isin(rookie_ids)].copy()


def exclude_significant_injury(
    player_stats: pd.DataFrame,
    injuries: pd.DataFrame,
    latest_season: int,
    *,
    min_out_weeks: int = DEFAULT_MIN_OUT_WEEKS,
) -> pd.DataFrame:
    """Drop players with significant REG Out weeks in ``latest_season``."""
    injured_ids = player_ids_with_significant_injury_outs(
        injuries,
        latest_season,
        min_out_weeks=min_out_weeks,
    )
    return player_stats[~player_stats["player_id"].astype(str).isin(injured_ids)].copy()


def filter_draftable_positions(player_stats: pd.DataFrame) -> pd.DataFrame:
    """Keep only QB/RB/FB/WR/TE/K rows."""
    return player_stats[player_stats["position"].isin(DRAFTABLE_POSITIONS)].copy()


_IDENTITY_FIRST: Final[tuple[str, ...]] = (
    "player_name",
    "player_display_name",
    "position",
    "position_group",
    "headshot_url",
)

_SKIP_FROM_SUM: Final[frozenset[str]] = frozenset(
    {
        "season",
        "week",
        "game_id",
        "opponent_team",
        "season_type",
        "team",
        "fg_made_list",
        "fg_missed_list",
        "fg_blocked_list",
        *_IDENTITY_FIRST,
        "player_id",
    }
)


def aggregate_by_player_id(player_stats: pd.DataFrame) -> pd.DataFrame:
    """Collapse weekly rows to one row per ``player_id``.

    Numeric stats are summed over the loaded window.
    """
    if player_stats.empty:
        return player_stats.copy()

    ordered = player_stats.sort_values(
        [c for c in ("player_id", "season", "week") if c in player_stats.columns]
    )

    identity_agg = {
        col: "last" for col in (*_IDENTITY_FIRST, "team") if col in ordered.columns
    }
    identity_part = ordered.groupby("player_id", as_index=False).agg(identity_agg)

    games = (
        ordered.groupby("player_id", as_index=False)
        .size()
        .rename(columns={"size": "games"})
    )

    season_part = None
    if "season" in ordered.columns:
        season_part = ordered.groupby("player_id", as_index=False)["season"].agg(
            season_min="min",
            season_max="max",
        )

    numeric_cols = [
        c
        for c in ordered.select_dtypes(include="number").columns
        if c not in _SKIP_FROM_SUM
    ]
    sums = ordered.groupby("player_id", as_index=False)[numeric_cols].sum(min_count=1)

    out = identity_part.merge(games, on="player_id")
    if season_part is not None:
        out = out.merge(season_part, on="player_id")
    return out.merge(sums, on="player_id")
