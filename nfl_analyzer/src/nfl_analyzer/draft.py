"""Ideal-team draft construction from ranked fantasy boards."""

from __future__ import annotations

from collections import Counter
from dataclasses import dataclass
from typing import Final

import pandas as pd

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
    # top is down-trending: prefer a close up/sideways alternative
    floor = top.fantasy_points_latest * (1.0 - TREND_FP_BAND)
    for alt in ranked[1:]:
        if alt.fantasy_points_latest < floor:
            break
        if alt.trend in UP_SIDEWAYS:
            return alt
    # take down-trending top only if next option is not >5% better
    # (with FP sort next is lower; keep top)
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
) -> list[BoardPlayer]:
    drafted_ids = {p.player_id for p in roster}
    counts = _counts(roster)
    pool: list[BoardPlayer] = []
    for player in board:
        if player.player_id in drafted_ids:
            continue
        if player.position not in positions:
            continue
        if not _quota_open(counts, player.position):
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
    if _quota_open(counts, "QB") and (counts["QB"] == 0 or skill_ready_for_backup_qb):
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


def build_ideal_team(
    board: list[BoardPlayer],
    *,
    preferred_qb_name: str = PREFERRED_QB_NAME,
) -> pd.DataFrame:
    """Greedy draft filling TARGETS; lock Josh Allen first when possible."""
    roster: list[BoardPlayer] = []
    picks: list[dict[str, object]] = []

    # Pick 1: preferred QB if eligible, else best QB
    qb_pool = _filter_pool(board, roster, {"QB"})
    preferred = next((p for p in qb_pool if p.name == preferred_qb_name), None)
    first = preferred or select_best_candidate(qb_pool)
    if first is None:
        return pd.DataFrame(
            columns=[
                "pick",
                "player_display_name",
                "position",
                "team",
                "bye_week",
                "fantasy_points_latest",
                "yoy_pct",
                "trend",
            ]
        )
    roster.append(first)
    picks.append({"pick": 1, "player": first})

    while not _targets_met(_counts(roster)):
        counts = _counts(roster)
        allowed = _allowed_positions(counts)
        if not allowed:
            break

        pool = _filter_pool(board, roster, allowed)
        if not pool:
            # Try remaining open quotas without phase locks
            fallback_positions = {
                pos for pos, need in TARGETS.items() if counts[pos] < need
            }
            pool = _filter_pool(board, roster, fallback_positions)
            if not pool:
                break

        # Opening phase nuance: until QB>=1, compare best skill vs best QB
        if counts["QB"] == 0 and "QB" in allowed:
            skill_pool = [p for p in pool if p.position in SKILL_POSITIONS]
            qb_only = [p for p in pool if p.position == "QB"]
            best_skill = select_best_candidate(skill_pool)
            best_qb = select_best_candidate(qb_only)
            if (
                best_skill is not None
                and best_qb is not None
                and best_skill.fantasy_points_latest > best_qb.fantasy_points_latest
            ):
                choice = best_skill
            else:
                choice = best_qb or best_skill
        # Backup QB: prefer QB unless a needed skill is higher
        elif (
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
                choice = best_qb
            else:
                choice = best_skill or best_qb
        else:
            choice = select_best_candidate(pool)

        if choice is None:
            break
        roster.append(choice)
        picks.append({"pick": len(roster), "player": choice})

    rows = [
        {
            "pick": item["pick"],
            "player_display_name": item["player"].name,
            "position": item["player"].position,
            "team": item["player"].team,
            "bye_week": item["player"].bye_week,
            "fantasy_points_latest": item["player"].fantasy_points_latest,
            "yoy_pct": item["player"].yoy_pct,
            "trend": item["player"].trend,
        }
        for item in picks
    ]
    return pd.DataFrame(rows)
