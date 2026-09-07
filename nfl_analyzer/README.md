# nfl-analyzer

Analyze open-source NFL player and team statistics to prepare for fantasy football drafts.

This package is a uv workspace member of the repository root. From the repo root:

```bash
uv sync --all-packages
uv run --package nfl-analyzer python -c "import nfl_analyzer"
```

### Ideal Team

| Pick | Player | Position | Team | Bye | Fantasy Pts (Latest) | YoY % | Trend |
| ---: | --- | --- | --- | ---: | ---: | ---: | --- |
| 1 | Josh Allen | QB | BUF | 7 | 406.0 | -8.4% | ↓ |
| 2 | Christian McCaffrey | RB | SF | 14 | 363.0 | -0.1% | → |
| 3 | Jonathan Taylor | RB | IND | 11 | 341.0 | 144.4% | ↑ |
| 4 | Bijan Robinson | RB | ATL | 5 | 337.5 | 57.7% | ↑ |
| 5 | Puka Nacua | WR | LA | 8 | 320.5 | 25.0% | ↑ |
| 6 | Jaxon Smith-Njigba | WR | SEA | 8 | 318.5 | 183.1% | ↑ |
| 7 | Ja'Marr Chase | WR | CIN | 10 | 265.5 | 20.1% | ↑ |
| 8 | Kyle Pitts | TE | ATL | 5 | 160.0 | 56.1% | ↑ |
| 9 | Hunter Henry | TE | NE | 14 | 142.0 | 52.7% | ↑ |
| 10 | Matthew Stafford | QB | LA | 8 | 442.0 | 53.5% | ↑ |
| 11 | Jake Ferguson | TE | DAL | 10 | 137.0 | 2.6% | ↑ |
| 12 | HOU D/ST | D/ST | HOU | 6 | 111.0 | 18.1% | ↑ |
| 13 | Jason Myers | K | SEA | 8 | 76.5 | 13.3% | ↑ |
| 14 | Ka'imi Fairbairn | K | HOU | 6 | 74.5 | 69.3% | ↑ |
