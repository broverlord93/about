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


_SKILL_DEPTH_POSITIONS: Final[frozenset[str]] = frozenset({"RB", "FB", "WR", "TE"})


def _latest_depth_snapshot(depth_charts: pd.DataFrame) -> pd.DataFrame:
    """Return rows from the most recent depth-chart timestamp."""
    if depth_charts.empty:
        return depth_charts.copy()
    snapshot = depth_charts.copy()
    snapshot["dt"] = pd.to_datetime(snapshot["dt"])
    latest = snapshot["dt"].max()
    return snapshot.loc[snapshot["dt"] == latest].copy()


def starting_qb_ids(depth_charts: pd.DataFrame) -> set[str]:
    """GSIS IDs for QB depth-chart starters (pos_rank == 1) on latest snapshot."""
    snap = _latest_depth_snapshot(depth_charts)
    starters = snap[
        (snap["pos_abb"] == "QB") & (snap["pos_rank"] == 1) & snap["gsis_id"].notna()
    ]
    return set(starters["gsis_id"].astype(str))


def skill_depth_ids(
    depth_charts: pd.DataFrame,
    *,
    max_rank: int = 2,
) -> set[str]:
    """GSIS IDs for RB/FB/WR/TE with depth rank <= ``max_rank`` on latest snapshot."""
    snap = _latest_depth_snapshot(depth_charts)
    eligible = snap[
        snap["pos_abb"].isin(_SKILL_DEPTH_POSITIONS)
        & (snap["pos_rank"] <= max_rank)
        & snap["gsis_id"].notna()
    ]
    return set(eligible["gsis_id"].astype(str))
