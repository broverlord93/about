"""League draft and roster configuration constants."""

from typing import Final

NUM_TEAMS: Final[int] = 12
DRAFT_ORDER: Final[str] = "snake"
PICK_SLOT: Final[int] = 8

STARTER_SLOTS: Final[dict[str, int]] = {
    "QB": 1,
    "RB": 2,
    "WR": 2,
    "TE": 1,
    "FLEX": 1,
    "D/ST": 1,
    "K": 1,
}

FLEX_ELIGIBLE: Final[tuple[str, ...]] = ("RB", "WR", "TE")

# ESPN position roster maximums (None means no limit / N/A for that slot type).
POSITION_MAXIMUMS: Final[dict[str, int | None]] = {
    "QB": 4,
    "RB": 8,
    "WR": 8,
    "TE": 3,
    "FLEX": None,
    "D/ST": 3,
    "K": 3,
}

BENCH_SLOTS: Final[int] = 6
ROSTER_SIZE: Final[int] = sum(STARTER_SLOTS.values()) + BENCH_SLOTS
