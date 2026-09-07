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

BENCH_SLOTS: Final[int] = 7
ROSTER_SIZE: Final[int] = sum(STARTER_SLOTS.values()) + BENCH_SLOTS
