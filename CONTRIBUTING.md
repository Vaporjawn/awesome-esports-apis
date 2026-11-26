# Contributing

Thanks for helping keep this list accurate. Please follow these rules.

## Adding an entry

1. One entry per pull request, or a small group of related entries.
2. Format: `- [Name](https://link) - Description starting with a capital letter and ending with a period.`
3. Put it in the best-fitting section and subsection. Order: MOBA first, then FPS, fighting games, other games.
4. Alphabetical order is not required; keep related entries together.
5. No duplicate links, no affiliate or tracking parameters, no paid placements.

## Auth and pricing claims

State auth type and free or paid tier **only** when the provider's own documentation says so, and link nothing you did not read. If you cannot verify it, leave the claim out. Unofficial APIs must be labelled unofficial.

## Link verification

Run `python3 scripts/check_links.py` before opening a pull request. It checks every URL in the README and exits non-zero on dead links.

Some sites answer automated requests with 403 or a bot challenge even though they are live (for example Oracle's Elixir, Leaguepedia, Dustloop, STRATZ, AoE4 World). The checker reports these as warnings. The README says when an entry's page could not be content-checked.

## Lint

```sh
npm install
npm run lint
```

`npm run lint` runs `awesome-lint` and `markdownlint` on the README and this file.
