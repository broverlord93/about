"""Ideal-team draft construction and multi-team snake simulation."""

from __future__ import annotations

from collections import Counter
from dataclasses import dataclass
from typing import Final

import pandas as pd

from nfl_analyzer.league import NUM_TEAMS, PICK_SLOT, ROSTER_SIZE

TARGETS: Final[dict[str, int]] = {
    "QB": 2,
    "RB": 3,
    "WR": 3,
    "TE": 3,
    "K": 2,
    "D/ST": 1,
}

SKILL_POSITIONS: Final[frozenset[str]] = frozenset({"RB", "WR", "TE"})
MAX_PER_TEAM: Final[int] = 2
MAX_SKILL_PER_BYE: Final[int] = 2
DOWN_TREND_FLOOR: Final[float] = -0.05
TREND_FP_BAND: Final[float] = 0.05
PREFERRED_QB_NAME: Final[str] = "Josh Allen"
UP_SIDEWAYS: Final[frozenset[str]] = frozenset({"↑", "→"})


@dataclass(frozen=True)
class BoardPlayer:
    player_id: str
    name: str
    team: str
    position: str  # QB, RB, WR, TE, K, D/ST
    bye_week: int | None
    fantasy_points_latest: float
    yoy_pct: float
    trend: str


def team_bye_weeks(schedules: pd.DataFrame) -> dict[str, int]:
    """Map team abbr -> bye week from REG schedule (weeks 1-18)."""
    reg = schedules
    if "game_type" in schedules.columns:
        reg = schedules.loc[schedules["game_type"] == "REG"]
    elif "season_type" in schedules.columns:
        reg = schedules.loc[schedules["season_type"] == "REG"]

    teams = set(reg["home_team"]).union(set(reg["away_team"]))
    byes: dict[str, int] = {}
    for team in teams:
        played = set(
            reg.loc[
                (reg["home_team"] == team) | (reg["away_team"] == team),
                "week",
            ].astype(int)
        )
        missing = sorted(set(range(1, 19)) - played)
        if missing:
            byes[team] = int(missing[0])
    return byes


def _normalize_position(position: str) -> str:
    if position == "FB":
        return "RB"
    return position


def build_board(
    qb_rankings: pd.DataFrame,
    skill_rankings: pd.DataFrame,
    kicker_rankings: pd.DataFrame,
    dst_rankings: pd.DataFrame,
    bye_by_team: dict[str, int],
) -> list[BoardPlayer]:
    """Unify ranking tables into a draft board."""
    board: list[BoardPlayer] = []

    for _, row in qb_rankings.iterrows():
        board.append(
            BoardPlayer(
                player_id=str(row["player_id"]),
                name=str(row["player_display_name"]),
                team=str(row["team"]),
                position="QB",
                bye_week=bye_by_team.get(str(row["team"])),
                fantasy_points_latest=float(row["fantasy_points_latest"]),
                yoy_pct=float(row["yoy_pct"]),
                trend=str(row["trend"]),
            )
        )

    for _, row in skill_rankings.iterrows():
        board.append(
            BoardPlayer(
                player_id=str(row["player_id"]),
                name=str(row["player_display_name"]),
                team=str(row["team"]),
                position=_normalize_position(str(row["position"])),
                bye_week=bye_by_team.get(str(row["team"])),
                fantasy_points_latest=float(row["fantasy_points_latest"]),
                yoy_pct=float(row["yoy_pct"]),
                trend=str(row["trend"]),
            )
        )

    for _, row in kicker_rankings.iterrows():
        board.append(
            BoardPlayer(
                player_id=str(row["player_id"]),
                name=str(row["player_display_name"]),
                team=str(row["team"]),
                position="K",
                bye_week=bye_by_team.get(str(row["team"])),
                fantasy_points_latest=float(row["fantasy_points_latest"]),
                yoy_pct=float(row["yoy_pct"]),
                trend=str(row["trend"]),
            )
        )

    for _, row in dst_rankings.iterrows():
        team = str(row["team"])
        board.append(
            BoardPlayer(
                player_id=f"DST-{team}",
                name=f"{team} D/ST",
                team=team,
                position="D/ST",
                bye_week=bye_by_team.get(team),
                fantasy_points_latest=float(row["fantasy_points_latest"]),
                yoy_pct=float(row["yoy_pct"]),
                trend=str(row["trend"]),
            )
        )

    return board


def board_stubs_from_players(
    players: pd.DataFrame,
    existing_ids: set[str],
    bye_by_team: dict[str, int],
    *,
    latest_season: int,
) -> list[BoardPlayer]:
    """Stub BoardPlayers for non-RET fantasy-eligible players missing from a board.

    Includes incoming rookies (``draft_year > latest_season``) and other
    draftable-position players with no stats row yet.
    """
    from nfl_analyzer.filters import DRAFTABLE_POSITIONS

    frame = players.copy()
    if "status" in frame.columns:
        frame = frame.loc[frame["status"] != "RET"]
    if "gsis_id" not in frame.columns:
        return []

    if "draft_year" in frame.columns:
        draft_year = frame["draft_year"].fillna(0).astype(int)
    else:
        draft_year = pd.Series(0, index=frame.index)
    if "last_season" in frame.columns:
        last_season = frame["last_season"].fillna(0).astype(int)
    else:
        last_season = pd.Series(0, index=frame.index)
    eligible = (last_season >= latest_season) | (draft_year > latest_season)
    frame = frame.loc[eligible]

    pos_col = "position" if "position" in frame.columns else None
    if pos_col is None:
        return []
    frame = frame.loc[frame[pos_col].isin(DRAFTABLE_POSITIONS)]

    name_col = (
        "display_name"
        if "display_name" in frame.columns
        else "player_name"
        if "player_name" in frame.columns
        else None
    )
    team_col = (
        "team_abbr"
        if "team_abbr" in frame.columns
        else "latest_team"
        if "latest_team" in frame.columns
        else None
    )
    if name_col is None:
        return []

    stubs: list[BoardPlayer] = []
    for _, row in frame.iterrows():
        pid = str(row["gsis_id"])
        if not pid or pid == "nan" or pid in existing_ids:
            continue
        if team_col is not None and pd.notna(row[team_col]):
            team = str(row[team_col])
        else:
            team = "—"
        stubs.append(
            BoardPlayer(
                player_id=pid,
                name=str(row[name_col]),
                team=team,
                position=_normalize_position(str(row[pos_col])),
                bye_week=bye_by_team.get(team),
                fantasy_points_latest=0.0,
                yoy_pct=float("nan"),
                trend="→",
            )
        )
        existing_ids.add(pid)
    return stubs


def is_trend_eligible(player: BoardPlayer) -> bool:
    if pd.isna(player.yoy_pct):
        return False
    if player.trend in UP_SIDEWAYS:
        return True
    return player.trend == "↓" and player.yoy_pct >= DOWN_TREND_FLOOR


def select_best_candidate(candidates: list[BoardPlayer]) -> BoardPlayer | None:
    """Highest FP; prefer up/sideways within 5% of a down-trending top."""
    eligible = [c for c in candidates if is_trend_eligible(c)]
    if not eligible:
        return None
    ranked = sorted(
        eligible,
        key=lambda p: p.fantasy_points_latest,
        reverse=True,
    )
    top = ranked[0]
    if top.trend in UP_SIDEWAYS:
        return top
    floor = top.fantasy_points_latest * (1.0 - TREND_FP_BAND)
    for alt in ranked[1:]:
        if alt.fantasy_points_latest < floor:
            break
        if alt.trend in UP_SIDEWAYS:
            return alt
    if len(ranked) > 1:
        nxt = ranked[1]
        ceiling = top.fantasy_points_latest * (1.0 + TREND_FP_BAND)
        if nxt.fantasy_points_latest > ceiling:
            return nxt
    return top


def _counts(roster: list[BoardPlayer]) -> Counter[str]:
    return Counter(p.position for p in roster)


def _team_ok(roster: list[BoardPlayer], candidate: BoardPlayer) -> bool:
    return sum(1 for p in roster if p.team == candidate.team) < MAX_PER_TEAM


def _bye_ok(roster: list[BoardPlayer], candidate: BoardPlayer) -> bool:
    if candidate.position not in SKILL_POSITIONS:
        return True
    if candidate.bye_week is None:
        return True
    same_bye = sum(
        1
        for p in roster
        if p.position in SKILL_POSITIONS and p.bye_week == candidate.bye_week
    )
    return same_bye < MAX_SKILL_PER_BYE


def _quota_open(counts: Counter[str], position: str) -> bool:
    return counts[position] < TARGETS[position]


def _targets_met(counts: Counter[str]) -> bool:
    return all(counts[pos] >= need for pos, need in TARGETS.items())


def _filter_pool(
    board: list[BoardPlayer],
    roster: list[BoardPlayer],
    positions: set[str],
    *,
    taken_ids: set[str] | None = None,
    enforce_targets: bool = True,
) -> list[BoardPlayer]:
    unavailable = set(taken_ids or ()) | {p.player_id for p in roster}
    counts = _counts(roster)
    pool: list[BoardPlayer] = []
    for player in board:
        if player.player_id in unavailable:
            continue
        if player.position not in positions:
            continue
        if enforce_targets and not _quota_open(counts, player.position):
            continue
        if not _team_ok(roster, player):
            continue
        if not _bye_ok(roster, player):
            continue
        pool.append(player)
    return pool


def _allowed_positions(counts: Counter[str]) -> set[str]:
    """Which positions may be drafted on this pick given roster state."""
    allowed: set[str] = set()

    for pos in SKILL_POSITIONS:
        if _quota_open(counts, pos):
            allowed.add(pos)

    skill_ready_for_backup_qb = (
        counts["RB"] >= 2 and counts["WR"] >= 2 and counts["TE"] >= 2
    )
    if _quota_open(counts, "QB") and (
        counts["QB"] == 0 or skill_ready_for_backup_qb
    ):
        allowed.add("QB")

    k_dst_unlocked = (
        counts["QB"] >= 1
        and counts["RB"] >= 2
        and counts["WR"] >= 2
        and counts["TE"] >= 1
    )
    if k_dst_unlocked:
        if _quota_open(counts, "K"):
            allowed.add("K")
        if _quota_open(counts, "D/ST"):
            allowed.add("D/ST")

    return allowed


def _roster_to_frame(roster: list[BoardPlayer]) -> pd.DataFrame:
    return pd.DataFrame(
        [
            {
                "pick": i,
                "player_display_name": player.name,
                "position": player.position,
                "team": player.team,
                "bye_week": player.bye_week,
                "fantasy_points_latest": player.fantasy_points_latest,
                "yoy_pct": player.yoy_pct,
                "trend": player.trend,
            }
            for i, player in enumerate(roster, start=1)
        ]
    )


def next_pick(
    board: list[BoardPlayer],
    roster: list[BoardPlayer],
    *,
    taken_ids: set[str] | None = None,
    preferred_qb_name: str | None = None,
    roster_size: int | None = None,
) -> BoardPlayer | None:
    """Choose the next player for ``roster`` from ``board``."""
    taken = set(taken_ids or ())
    target_size = roster_size if roster_size is not None else sum(TARGETS.values())

    if not roster and preferred_qb_name:
        qb_pool = _filter_pool(board, roster, {"QB"}, taken_ids=taken)
        preferred = next((p for p in qb_pool if p.name == preferred_qb_name), None)
        if preferred is not None:
            return preferred

    if len(roster) >= target_size:
        return None

    counts = _counts(roster)
    if not _targets_met(counts):
        allowed = _allowed_positions(counts)
        if not allowed:
            fallback_positions = {
                pos for pos, need in TARGETS.items() if counts[pos] < need
            }
            pool = _filter_pool(board, roster, fallback_positions, taken_ids=taken)
            return select_best_candidate(pool)

        pool = _filter_pool(board, roster, allowed, taken_ids=taken)
        if not pool:
            fallback_positions = {
                pos for pos, need in TARGETS.items() if counts[pos] < need
            }
            pool = _filter_pool(board, roster, fallback_positions, taken_ids=taken)
            return select_best_candidate(pool)

        if counts["QB"] == 0 and "QB" in allowed:
            skill_pool = [p for p in pool if p.position in SKILL_POSITIONS]
            qb_only = [p for p in pool if p.position == "QB"]
            best_skill = select_best_candidate(skill_pool)
            best_qb = select_best_candidate(qb_only)
            if preferred_qb_name and counts["QB"] == 0:
                raw_qb = _filter_pool(board, roster, {"QB"}, taken_ids=taken)
                named = next((p for p in raw_qb if p.name == preferred_qb_name), None)
                if named is not None:
                    best_qb = named
            if (
                best_skill is not None
                and best_qb is not None
                and best_skill.fantasy_points_latest > best_qb.fantasy_points_latest
            ):
                return best_skill
            return best_qb or best_skill

        if (
            counts["QB"] == 1
            and "QB" in allowed
            and counts["RB"] >= 2
            and counts["WR"] >= 2
            and counts["TE"] >= 2
        ):
            skill_needed = [p for p in pool if p.position in SKILL_POSITIONS]
            qb_only = [p for p in pool if p.position == "QB"]
            best_skill = select_best_candidate(skill_needed)
            best_qb = select_best_candidate(qb_only)
            if best_qb is not None and (
                best_skill is None
                or best_qb.fantasy_points_latest >= best_skill.fantasy_points_latest
            ):
                return best_qb
            return best_skill or best_qb

        return select_best_candidate(pool)

    pool = _filter_pool(
        board,
        roster,
        set(TARGETS.keys()),
        taken_ids=taken,
        enforce_targets=False,
    )
    return select_best_candidate(pool)


def build_ideal_team(
    board: list[BoardPlayer],
    *,
    preferred_qb_name: str = PREFERRED_QB_NAME,
    roster_size: int | None = None,
) -> pd.DataFrame:
    """Greedy draft filling TARGETS; lock preferred QB first when possible."""
    size = roster_size if roster_size is not None else sum(TARGETS.values())
    roster: list[BoardPlayer] = []
    while len(roster) < size:
        choice = next_pick(
            board,
            roster,
            preferred_qb_name=preferred_qb_name,
            roster_size=size,
        )
        if choice is None:
            break
        roster.append(choice)
    return _roster_to_frame(roster)


def simulate_snake_draft(
    board: list[BoardPlayer],
    *,
    num_teams: int = NUM_TEAMS,
    pick_slot: int = PICK_SLOT,
    roster_size: int = ROSTER_SIZE,
    preferred_qb_name: str = PREFERRED_QB_NAME,
) -> tuple[pd.DataFrame, pd.DataFrame]:
    """Run a full snake draft; return (draft_log, my_team for pick_slot)."""
    rosters: dict[int, list[BoardPlayer]] = {i: [] for i in range(1, num_teams + 1)}
    taken: set[str] = set()
    log_rows: list[dict[str, object]] = []

    total_picks = num_teams * roster_size
    for overall in range(1, total_picks + 1):
        round_idx = (overall - 1) // num_teams
        pos_in_round = (overall - 1) % num_teams
        if round_idx % 2 == 0:
            draft_team = pos_in_round + 1
        else:
            draft_team = num_teams - pos_in_round

        roster = rosters[draft_team]
        prefer = preferred_qb_name if draft_team == pick_slot else None
        choice = next_pick(
            board,
            roster,
            taken_ids=taken,
            preferred_qb_name=prefer,
            roster_size=roster_size,
        )
        if choice is None:
            break

        roster.append(choice)
        taken.add(choice.player_id)
        log_rows.append(
            {
                "overall_pick": overall,
                "round": round_idx + 1,
                "draft_team": draft_team,
                "player_display_name": choice.name,
                "position": choice.position,
                "nfl_team": choice.team,
                "bye_week": choice.bye_week,
                "fantasy_points_latest": choice.fantasy_points_latest,
                "yoy_pct": choice.yoy_pct,
                "trend": choice.trend,
            }
        )

    draft_log = pd.DataFrame(log_rows)
    my_team = _roster_to_frame(rosters[pick_slot])
    return draft_log, my_team
