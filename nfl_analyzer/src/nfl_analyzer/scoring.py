"""ESPN fantasy scoring rules for this league (constants only)."""

from typing import Final

# Passing
PASSING: Final[dict[str, float]] = {
    "PY25": 1.0,  # every 25 passing yards
    "PTD": 6.0,  # TD pass
    "INT": -2.0,  # interceptions thrown
    "P300": 3.0,  # 300-399 yard passing game
    "P400": 4.0,  # 400+ yard passing game
}

# Rushing
RUSHING: Final[dict[str, float]] = {
    "RY10": 1.0,  # every 10 rushing yards
    "RTD": 6.0,  # TD rush
    "RY100": 3.0,  # 100-199 yard rushing game
    "RY200": 5.0,  # 200+ yard rushing game
}

# Receiving
RECEIVING: Final[dict[str, float]] = {
    "REY10": 1.0,  # every 10 receiving yards
    "REC": 0.5,  # each reception (half-PPR)
    "RETD": 6.0,  # TD reception
    "REY100": 3.0,  # 100-199 yard receiving game
    "REY200": 5.0,  # 200+ yard receiving game
}

# Kicking
KICKING: Final[dict[str, float]] = {
    "PAT": 0.5,  # each PAT made
    "PATM": -0.5,  # each PAT missed
    "FG0": 1.5,  # FG made 0-39 yards
    "FG40": 2.0,  # FG made 40-49 yards
    "FGM0": -0.5,  # FG missed 0-39 yards
    "FGM40": -0.5,  # FG missed 40-49 yards
}

# Miscellaneous
MISCELLANEOUS: Final[dict[str, float]] = {
    "FTD": 6.0,  # fumble recovered for TD
    "FUML": -2.0,  # total fumbles lost
}

# Defensive players / D-ST events as listed in league settings
DEFENSE: Final[dict[str, float]] = {
    "SK": 1.0,  # each sack
    "BLKK": 2.0,  # blocked punt, PAT, or FG
    "INT": 2.0,  # each interception
    "FR": 2.0,  # each fumble recovered
    "SF": 2.0,  # each safety
}

SCORING_BY_CATEGORY: Final[dict[str, dict[str, float]]] = {
    "passing": PASSING,
    "rushing": RUSHING,
    "receiving": RECEIVING,
    "kicking": KICKING,
    "miscellaneous": MISCELLANEOUS,
    "defense": DEFENSE,
}
