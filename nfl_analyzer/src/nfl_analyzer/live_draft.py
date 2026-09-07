"""Interactive live snake-draft tracker and Excel export."""

from __future__ import annotations

from pathlib import Path

import pandas as pd

from nfl_analyzer.draft import (
    PREFERRED_QB_NAME,
    BoardPlayer,
    next_pick,
    select_best_candidate,
)
from nfl_analyzer.league import NUM_TEAMS, PICK_SLOT, ROSTER_SIZE

SHEET_COLUMNS: tuple[str, ...] = (
    "overall_pick",
    "round",
    "player_display_name",
    "position",
    "nfl_team",
    "bye_week",
    "fantasy_points_latest",
    "yoy_pct",
    "trend",
)


def snake_draft_team(overall_pick: int, num_teams: int = NUM_TEAMS) -> int:
    """1-based overall pick -> fantasy team number under snake order."""
    round_idx = (overall_pick - 1) // num_teams
    pos_in_round = (overall_pick - 1) % num_teams
    if round_idx % 2 == 0:
        return pos_in_round + 1
    return num_teams - pos_in_round


def resolve_player(
    query: str,
    available: list[BoardPlayer],
) -> BoardPlayer | None:
    """Match a typed name against remaining board players.

    Exact (case-insensitive) first, then unique substring. Prints candidates
    when ambiguous or missing; returns None so the caller can re-prompt.
    """
    q = query.strip()
    if not q:
        return None
    q_lower = q.casefold()

    exact = [p for p in available if p.name.casefold() == q_lower]
    if len(exact) == 1:
        return exact[0]
    if len(exact) > 1:
        _print_candidates(exact, f"Multiple exact matches for {q!r}:")
        return None

    partial = [p for p in available if q_lower in p.name.casefold()]
    if len(partial) == 1:
        return partial[0]
    if len(partial) > 1:
        _print_candidates(partial[:10], f"Ambiguous match for {q!r}:")
        return None

    print(f"No remaining player matched {q!r}.")
    return None


def suggest_top_players(
    board: list[BoardPlayer],
    taken_ids: set[str],
    *,
    for_roster: list[BoardPlayer],
    draft_team: int,
    pick_slot: int = PICK_SLOT,
    roster_size: int = ROSTER_SIZE,
    preferred_qb_name: str = PREFERRED_QB_NAME,
    n: int = 5,
) -> list[BoardPlayer]:
    """Top-N suggestions: board value for others, next_pick criteria for you."""
    suggestions: list[BoardPlayer] = []
    exclude = set(taken_ids)

    if draft_team == pick_slot:
        while len(suggestions) < n:
            choice = next_pick(
                board,
                for_roster,
                taken_ids=exclude,
                preferred_qb_name=preferred_qb_name,
                roster_size=roster_size,
            )
            if choice is None:
                break
            suggestions.append(choice)
            exclude.add(choice.player_id)
        return suggestions

    remaining = [p for p in board if p.player_id not in exclude]
    while len(suggestions) < n:
        choice = select_best_candidate(remaining)
        if choice is None:
            break
        suggestions.append(choice)
        remaining = [p for p in remaining if p.player_id != choice.player_id]
    return suggestions


def run_live_draft(
    board: list[BoardPlayer],
    *,
    num_teams: int = NUM_TEAMS,
    roster_size: int = ROSTER_SIZE,
    pick_slot: int = PICK_SLOT,
    preferred_qb_name: str = PREFERRED_QB_NAME,
) -> pd.DataFrame:
    """Interactive loop: type picks in overall order until full or ``done``."""
    rosters: dict[int, list[BoardPlayer]] = {i: [] for i in range(1, num_teams + 1)}
    taken: set[str] = set()
    log_rows: list[dict[str, object]] = []
    total_picks = num_teams * roster_size

    print(
        "Live snake draft. Type a player name each pick.\n"
        "Commands: undo (last pick), done (finish early).\n"
        f"Your seat: Team {pick_slot}. Total picks: {total_picks}."
    )

    while len(log_rows) < total_picks:
        overall = len(log_rows) + 1
        round_num = (overall - 1) // num_teams + 1
        draft_team = snake_draft_team(overall, num_teams)
        available = [p for p in board if p.player_id not in taken]

        suggestions = suggest_top_players(
            board,
            taken,
            for_roster=rosters[draft_team],
            draft_team=draft_team,
            pick_slot=pick_slot,
            roster_size=roster_size,
            preferred_qb_name=preferred_qb_name,
            n=5,
        )
        mine = " (YOU)" if draft_team == pick_slot else ""
        print(
            f"\n--- Pick {overall}/{total_picks} | "
            f"Round {round_num} | Team {draft_team}{mine} ---"
        )
        if suggestions:
            print("Top suggestions:")
            for i, player in enumerate(suggestions, start=1):
                print(
                    f"  {i}. {player.name} ({player.position}, {player.team}) "
                    f"FP={player.fantasy_points_latest:.1f} {player.trend}"
                )
        else:
            print("No suggestions available.")

        raw = input(
            f"Pick {overall}/{total_picks} R{round_num} "
            f"Team {draft_team}{mine} (or undo/done): "
        ).strip()
        cmd = raw.casefold()
        if cmd == "done":
            break
        if cmd == "undo":
            if not log_rows:
                print("Nothing to undo.")
                continue
            last = log_rows.pop()
            last_team = int(last["draft_team"])
            removed = rosters[last_team].pop()
            taken.discard(removed.player_id)
            print(f"Undid {removed.name} from Team {last_team}.")
            continue

        choice = resolve_player(raw, available)
        if choice is None:
            continue

        rosters[draft_team].append(choice)
        taken.add(choice.player_id)
        log_rows.append(
            {
                "overall_pick": overall,
                "round": round_num,
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
        print(f"Recorded: {choice.name} -> Team {draft_team}")

    return pd.DataFrame(log_rows)


def export_draft_to_excel(
    draft_log: pd.DataFrame,
    path: str | Path,
    *,
    num_teams: int = NUM_TEAMS,
) -> Path:
    """Write one sheet per fantasy team; returns the output path."""
    out = Path(path)
    out.parent.mkdir(parents=True, exist_ok=True)
    empty = pd.DataFrame(columns=list(SHEET_COLUMNS))

    with pd.ExcelWriter(out, engine="openpyxl") as writer:
        for team in range(1, num_teams + 1):
            if draft_log.empty or "draft_team" not in draft_log.columns:
                sheet = empty
            else:
                sheet = (
                    draft_log.loc[draft_log["draft_team"] == team, list(SHEET_COLUMNS)]
                    .sort_values("overall_pick")
                    .reset_index(drop=True)
                )
            sheet.to_excel(writer, sheet_name=f"Team {team}", index=False)
    return out.resolve()


def _print_candidates(players: list[BoardPlayer], header: str) -> None:
    print(header)
    for player in players:
        print(
            f"  - {player.name} ({player.position}, {player.team}) "
            f"FP={player.fantasy_points_latest:.1f} {player.trend}"
        )
