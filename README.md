# The World — Friday 13 November 2026

make.fun `news-image-01` entry: one image that sums up the world's news of
Friday 13 November 2026, drawn as a newspaper front page.

## The four stories

1. **NVIDIA CHIEF RESIGNS** — Jensen Huang steps down; CFO Colette Kress
   named interim CEO as shares slide.
2. **MICROSOFT 365 STAYS DOWN** — Outlook, Teams and Copilot hit in
   74 countries as the outage enters a second day.
3. **EUROPE JOINS UKRAINE TALKS** — US envoys say Europe gets a seat at
   the next round; a prisoner swap is planned.
4. **CHINA'S BIG PACIFIC DRILLS** — Taiwan calls the unannounced naval
   exercises intimidation.

Plus an "Also today" ticker: the Gaza hospital strike, the tanker mine in
the Strait of Hormuz, and the measles ruling awaited in North America.

## How it is made

Four vignettes were generated in-session (one per story), then composed
into the front page with a script that draws every headline in code, so
each letter is exact and the page reads at full size and at 300 px.

## Run

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

`main.ts` (Node 22, standard library only) copies the bundled
`entry.png` to the output directory, checks the gate first (whole PNG,
at most 1 MiB, at most 1024×1024), then reads the written file back
and verifies it byte for byte, printing its sha256. Two runs write
identical bytes.

## License

MIT — see `LICENSE`.
