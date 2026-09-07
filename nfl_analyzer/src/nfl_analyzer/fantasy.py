"""Fantasy point calculation and year-over-year trends."""

from __future__ import annotations

import numpy as np
import pandas as pd

from nfl_analyzer.scoring import (
    DEFENSE,
    KICKING,
    MISCELLANEOUS,
    PASSING,
    RECEIVING,
    RUSHING,
)

YOY_THRESHOLD: float = 0.02


def _col(df: pd.DataFrame, name: str) -> pd.Series:
    if name in df.columns:
        return pd.to_numeric(df[name], errors="coerce").fillna(0.0)
    return pd.Series(0.0, index=df.index)


def weekly_fantasy_points(df: pd.DataFrame) -> pd.Series:
    """Score each row as one game using league offense + kicking rules."""
    pass_yds = _col(df, "passing_yards")
    rush_yds = _col(df, "rushing_yards")
    rec_yds = _col(df, "receiving_yards")

    fg_made_0_39 = (
        _col(df, "fg_made_0_19") + _col(df, "fg_made_20_29") + _col(df, "fg_made_30_39")
    )
    fg_missed_0_39 = (
        _col(df, "fg_missed_0_19")
        + _col(df, "fg_missed_20_29")
        + _col(df, "fg_missed_30_39")
    )

    points = (
        np.floor(pass_yds / 25.0) * PASSING["PY25"]
        + _col(df, "passing_tds") * PASSING["PTD"]
        + _col(df, "passing_interceptions") * PASSING["INT"]
        + np.where(
            (pass_yds >= 300) & (pass_yds < 400),
            PASSING["P300"],
            0.0,
        )
        + np.where(pass_yds >= 400, PASSING["P400"], 0.0)
        + np.floor(rush_yds / 10.0) * RUSHING["RY10"]
        + _col(df, "rushing_tds") * RUSHING["RTD"]
        + np.where(
            (rush_yds >= 100) & (rush_yds < 200),
            RUSHING["RY100"],
            0.0,
        )
        + np.where(rush_yds >= 200, RUSHING["RY200"], 0.0)
        + np.floor(rec_yds / 10.0) * RECEIVING["REY10"]
        + _col(df, "receptions") * RECEIVING["REC"]
        + _col(df, "receiving_tds") * RECEIVING["RETD"]
        + np.where(
            (rec_yds >= 100) & (rec_yds < 200),
            RECEIVING["REY100"],
            0.0,
        )
        + np.where(rec_yds >= 200, RECEIVING["REY200"], 0.0)
        + (
            _col(df, "sack_fumbles_lost")
            + _col(df, "rushing_fumbles_lost")
            + _col(df, "receiving_fumbles_lost")
        )
        * MISCELLANEOUS["FUML"]
        + _col(df, "fumble_recovery_tds") * MISCELLANEOUS["FTD"]
        + _col(df, "pat_made") * KICKING["PAT"]
        + _col(df, "pat_missed") * KICKING["PATM"]
        + fg_made_0_39 * KICKING["FG0"]
        + _col(df, "fg_made_40_49") * KICKING["FG40"]
        + fg_missed_0_39 * KICKING["FGM0"]
        + _col(df, "fg_missed_40_49") * KICKING["FGM40"]
    )
    return pd.Series(points, index=df.index, name="fantasy_points")


def season_fantasy_points(df: pd.DataFrame) -> pd.DataFrame:
    """Sum weekly fantasy points by player and season (REG only)."""
    if df.empty:
        return pd.DataFrame(columns=["player_id", "season", "fantasy_points"])

    reg = df
    if "season_type" in df.columns:
        reg = df.loc[df["season_type"] == "REG"].copy()

    scored = reg.copy()
    scored["fantasy_points"] = weekly_fantasy_points(scored)
    return (
        scored.groupby(["player_id", "season"], as_index=False)["fantasy_points"]
        .sum()
        .sort_values(["player_id", "season"])
        .reset_index(drop=True)
    )


def weekly_dst_fantasy_points(df: pd.DataFrame) -> pd.Series:
    """Score each team-week using league D/ST defensive scoring rules."""
    blocks = (
        _col(df, "def_fg_blocks")
        + _col(df, "def_pat_blocks")
        + _col(df, "def_punt_blocks")
    )
    points = (
        _col(df, "def_sacks") * DEFENSE["SK"]
        + blocks * DEFENSE["BLKK"]
        + _col(df, "def_interceptions") * DEFENSE["INT"]
        + _col(df, "fumble_recovery_opp") * DEFENSE["FR"]
        + _col(df, "def_safeties") * DEFENSE["SF"]
    )
    return pd.Series(points, index=df.index, name="fantasy_points")


def season_dst_fantasy_points(df: pd.DataFrame) -> pd.DataFrame:
    """Sum weekly D/ST fantasy points by team and season (REG only)."""
    if df.empty:
        return pd.DataFrame(columns=["team", "season", "fantasy_points"])

    reg = df
    if "season_type" in df.columns:
        reg = df.loc[df["season_type"] == "REG"].copy()

    scored = reg.copy()
    scored["fantasy_points"] = weekly_dst_fantasy_points(scored)
    return (
        scored.groupby(["team", "season"], as_index=False)["fantasy_points"]
        .sum()
        .sort_values(["team", "season"])
        .reset_index(drop=True)
    )


def yoy_trend_table(
    season_fp: pd.DataFrame,
    *,
    id_col: str = "player_id",
    threshold: float = YOY_THRESHOLD,
    seasons_window: int = 3,
) -> pd.DataFrame:
    """Trend from the oldest to newest season in a recent window (default 3).

    Uses the ``seasons_window`` most recent seasons with fantasy points. The
    percent change is (latest - oldest) / |oldest| over that window.
    """
    empty = pd.DataFrame(
        columns=[
            id_col,
            "trend",
            "fantasy_points_latest",
            "fantasy_points_prev",
            "yoy_pct",
        ]
    )
    if season_fp.empty:
        return empty

    rows: list[dict[str, object]] = []
    for entity_id, group in season_fp.groupby(id_col, sort=False):
        ordered = group.sort_values("season")
        if len(ordered) < seasons_window:
            latest = ordered.iloc[-1]
            rows.append(
                {
                    id_col: entity_id,
                    "trend": "—",
                    "fantasy_points_latest": float(latest["fantasy_points"]),
                    "fantasy_points_prev": float("nan"),
                    "yoy_pct": float("nan"),
                }
            )
            continue

        window = ordered.iloc[-seasons_window:]
        oldest = window.iloc[0]
        latest = window.iloc[-1]
        pts_old = float(oldest["fantasy_points"])
        pts_new = float(latest["fantasy_points"])

        if pts_old == 0:
            trend = "↑" if pts_new > 0 else "→"
            yoy_pct = float("nan")
        else:
            yoy_pct = (pts_new - pts_old) / abs(pts_old)
            if yoy_pct > threshold:
                trend = "↑"
            elif yoy_pct < -threshold:
                trend = "↓"
            else:
                trend = "→"

        rows.append(
            {
                id_col: entity_id,
                "trend": trend,
                "fantasy_points_latest": pts_new,
                "fantasy_points_prev": pts_old,
                "yoy_pct": yoy_pct,
            }
        )

    return pd.DataFrame(rows)
