# Awesome Esports APIs [![Awesome](https://awesome.re/badge.svg)](https://awesome.re)

> Curated APIs, data sources, SDKs and guides for esports and competitive game data, for developers building stats sites, bots and game apps.

Covers esports APIs and game stats APIs for League of Legends, Dota 2, Smite, Mobile Legends, VALORANT, Counter-Strike 2, Overwatch, Apex Legends, PUBG, Rocket League, fighting games and more: the Riot Games API, Steam Web API, Battle.net API, PandaScore, Liquipedia, OpenDota, STRATZ and Start.gg, plus Python, JavaScript, Go, Rust and C# SDKs, Discord and Twitch bot libraries, and open datasets.

Every entry states its auth type and free or paid tier only where the provider's own documentation says so. When it does not, the entry says nothing rather than guess. Entries are ordered MOBA first (League of Legends, Dota 2, Smite, Mobile Legends), then FPS, fighting games and everything else. Last checked: 2026-11-26. Link verification rules are in the contribution guidelines below.

## Contents

- [Official Publisher APIs](#official-publisher-apis)
- [Esports Data Providers](#esports-data-providers)
- [Community and Open Data](#community-and-open-data)
- [Language SDKs and Wrappers](#language-sdks-and-wrappers)
- [Bots and Integrations](#bots-and-integrations)
- [Datasets](#datasets)
- [Rate-Limit and Auth Guides](#rate-limit-and-auth-guides)
- [Tutorials](#tutorials)

## Official Publisher APIs

### MOBA

- [Riot Developer Portal](https://developer.riotgames.com/) - Hub for the League of Legends, Legends of Runeterra, Teamfight Tactics, VALORANT, Riftbound and 2XKO APIs. Free. Auth: Riot API key; development keys deactivate every 24 hours, personal keys are limited to 20 requests per second and 100 per 2 minutes (per region), and a production key requires registering a product.
- [League of Legends API Docs](https://developer.riotgames.com/docs/lol) - Official reference for summoner, match, ranked and champion mastery endpoints. Auth: Riot API key.
- [Data Dragon](https://developer.riotgames.com/docs/lol#data-dragon) - Riot's static League of Legends data (champions, items, runes, images), versioned per patch. The version list at `ddragon.leagueoflegends.com/api/versions.json` is served without a key.
- [Steam Web API](https://steamcommunity.com/dev) - Valve's Web API, used by Dota 2 tools for match and account data. Auth: Steam Web API key; the API terms limit you to 100,000 calls per day.
- [Smite API Developer Guide](https://webcdn.hirezstudios.com/hirez-studios/legal/smite-api-developer-guide.pdf) - Hi-Rez's official PDF guide to the Smite API (also the basis of the Paladins and Realm Royale APIs). Credentials are requested from Hi-Rez per community wrapper docs; current availability was not re-verified.

### FPS

- [VALORANT API Docs](https://developer.riotgames.com/docs/valorant) - Riot's official VALORANT documentation, including the tournament and community competition policies. Auth: Riot API key.
- [Counter-Strike Game State Integration](https://developer.valvesoftware.com/wiki/Counter-Strike:_Global_Offensive_Game_State_Integration) - Valve's mechanism for the game client to push live game state to a local HTTP endpoint. The wiki sits behind bot protection, so it was not content-checked.
- [PUBG Developer API](https://documentation.pubg.com/en/introduction.html) - Official PUBG match, player and telemetry API. Auth: API key; the default key limit is 10 requests per minute for testing and development.

### Other Games

- [Battle.net APIs](https://develop.battle.net/) - Blizzard's APIs for games including World of Warcraft, Diablo III, Hearthstone and StarCraft II. Auth: OAuth 2.0 client ID and secret.
- [Steamworks Web API Overview](https://partner.steamgames.com/doc/webapi_overview) - Valve's partner documentation for the Steam Web API family across all Steam games.
- [Clash Royale API](https://developer.clashroyale.com/) - Supercell's official API for Clash Royale players, clans and tournaments.
- [Brawl Stars API](https://developer.brawlstars.com/) - Supercell's official API for Brawl Stars players, clubs and rankings.

## Esports Data Providers

- [PandaScore](https://developers.pandascore.co/) - Esports fixtures, results, teams, players and live data across many games. Auth: API token. Free plan: 1,000 requests per hour, no credit card; historical and post-match data starts at 400 EUR per game per month (non-betting use).
- [Abios](https://abiosgaming.com/) - Commercial esports data and odds provider; [API docs](https://docs.abiosgaming.com/). Access is arranged through sales.
- [GRID](https://grid.gg/) - Official esports data provider. Professional League of Legends and VALORANT teams can [apply for free access](https://grid.gg/open-access/) to official Riot Games esports data; other use is commercial.
- [Sportradar eSports API](https://developer.sportradar.com/esports/reference/esports-overview) - Commercial eSports schedules, results and stats from Sportradar's developer portal.
- [Liquipedia API](https://api.liquipedia.net/) - LiquipediaDB access to structured tournament, team and player data across esports wikis. Auth: API key from the LiquipediaDB dashboard; attribution to Liquipedia is required and automated scraping of HTML pages is not permitted ([terms](https://liquipedia.net/api-terms-of-use)).
- [FACEIT for Developers](https://docs.faceit.com/) - FACEIT's Data API, SDK and Game Studio documentation for CS2 and other FACEIT-supported games.
- [Overwolf Game Events Provider](https://dev.overwolf.com/) - Real-time in-game events for overlay and companion apps built on the Overwolf platform.
- [Esports Earnings API](https://www.esportsearnings.com/apidocs) - Prize-money and tournament earnings data by player, team and game. Auth: API key from the Development Area after agreeing to its terms.
- [Start.gg API](https://developer.start.gg/docs/intro) - GraphQL API for tournaments, entrants and sets, widely used for fighting-game events. Auth: personal token from Developer Settings; limited to 80 requests per 60 seconds and 1,000 objects per request.
- [Challonge API](https://api.challonge.com/v2) - Bracket and tournament management API (v2.1) with OAuth 2 authorization.
- [Leaguepedia API](https://lol.fandom.com/wiki/Help:Leaguepedia_API) - League of Legends esports wiki data (rosters, match history, pick and ban records) served through MediaWiki Cargo. The site sits behind bot protection, so it was not content-checked.

## Community and Open Data

### MOBA

- [OpenDota API](https://docs.opendota.com/) - Free Dota 2 match, player and hero data with replay-parsed detail. Auth: none required; registering a key raises limits and usage. The 2018 [announcement](https://blog.opendota.com/2018/04/17/changes-to-the-api) set a free tier of 50,000 calls per month, so check the [API keys page](https://www.opendota.com/api-keys) for current numbers.
- [OpenDota Core](https://github.com/odota/core) - The open-source (MIT) backend and replay parser behind OpenDota.
- [STRATZ API](https://stratz.com/api) - GraphQL API for Dota 2 matches, players and heroes. Auth: API token generated on the STRATZ API page. Its site blocks automated link checks.
- [CommunityDragon](https://www.communitydragon.org/) - Unpacked League of Legends game files and assets that go beyond Data Dragon.
- [Unofficial Lolesports API Docs](https://vickz84259.github.io/lolesports-api-docs/) - Community documentation of the lolesports.com endpoints for leagues, schedules, standings and live games. Unofficial, so endpoints may change without notice.
- [Rone Arena API](https://github.com/ridwaanhall/rone-arena-api) - Unofficial community REST API for Mobile Legends: Bang Bang with hero, academy and esports service groups and OpenAPI docs. User endpoints use a JWT sign-in flow.
- [Heroes Profile API](https://api.heroesprofile.com/) - Heroes of the Storm data parsed from replays. Per its notice, accounts, keys and plans have moved to heroesprofile.com/Api.
- [Deadlock API](https://deadlock-api.com/) - Free open REST API for Valve's Deadlock: matches, players, heroes and analytics.

### FPS

- [Unofficial VALORANT API](https://github.com/Henrik-3/unofficial-valorant-api) - Community API (HenrikDev) for VALORANT player, match and store data. Auth: API key; a Basic key comes from the project's Discord bot and an Advanced key goes through approval. Limits are per key, and each background Riot request counts against them.
- [vlrggapi](https://github.com/axsddlr/vlrggapi) - Unofficial MIT-licensed REST API for vlr.gg VALORANT pro match results and news.
- [OverFast API](https://overfast-api.tekrop.fr/) - Unofficial Overwatch API for heroes, game modes, maps and player careers, built by scraping Blizzard pages. The live instance applies a per-second rate limit and the code can be self-hosted ([source](https://github.com/TeKrop/overfast-api)).
- [Apex Legends Status API](https://apexlegendsapi.com/) - Unofficial Apex Legends API for player statistics, match history and map rotation. Auth: API key registered on its developer portal.
- [Fortnite-API](https://fortnite-api.com/) - Free REST API for Fortnite cosmetics, the item shop, player stats and news; most endpoints need no key.
- [Valorant Internal API Docs](https://github.com/techchrism/valorant-api-docs) - Auto-generated documentation of the endpoints the VALORANT client itself uses. Unofficial.
- [Rift Explorer](https://github.com/Pupix/rift-explorer) - Auto-generated documentation and explorer for the League client (LCU) API. Unofficial.

### Other Games

- [Ballchasing API](https://ballchasing.com/doc/api) - Rocket League replay hosting and analysis with a REST API and an OpenAPI document. Auth: API key from your ballchasing.com account.
- [AoE4 World API](https://aoe4world.com/api) - Free Age of Empires IV leaderboards, player profiles, games and civilization stats; an `api_key` parameter is optional and only for private games.
- [Dustloop Wiki](https://www.dustloop.com/) - Community frame data and move reference for Arc System Works fighting games. The site sits behind bot protection, so it was not content-checked.

## Language SDKs and Wrappers

### Python

- [Cassiopeia](https://github.com/meraki-analytics/cassiopeia) - Framework for the Riot League of Legends API that lazy-loads and caches data. MIT.
- [Riot-Watcher](https://github.com/pseudonym117/Riot-Watcher) - Simple wrapper for the Riot Games API for League of Legends. MIT.
- [liquipediapy](https://github.com/c00kie17/liquipediapy) - Python client for Liquipedia data.
- [python-ballchasing](https://github.com/Rolv-Arild/python-ballchasing) - Python wrapper for the ballchasing.com API, generated from its OpenAPI document. MIT.
- [Pyrez](https://github.com/luissilva1044894/Pyrez) - Sync and async wrapper for the Hi-Rez APIs (Smite, Paladins, Realm Royale). Marked as being rewritten; last push 2024-09.

### JavaScript and TypeScript

- [Twisted](https://github.com/justadev-afk/twisted) - TypeScript client for Riot Games API data (moved from Sansossio/twisted). MIT.
- [Blizzard.js](https://github.com/benweier/blizzard.js) - Promise-based Node.js client for the Blizzard Battle.net APIs, using a client ID and secret. MIT.
- [HLTV](https://github.com/gigobyte/HLTV) - Unofficial HLTV Node.js API for Counter-Strike matches, teams and rankings. MIT.
- [valorant.js](https://github.com/liamcottle/valorant.js) - Unofficial Node.js library for the VALORANT in-game API.

### Go

- [Golio](https://github.com/KnutZuidema/golio) - API client for League of Legends, Legends of Runeterra and VALORANT. MIT.

### Rust

- [Riven](https://github.com/MingweiSamuel/Riven) - Riot API library for Rust. MIT.

### C# and .NET

- [Camille](https://github.com/MingweiSamuel/Camille) - Thread-safe Riot API library with automatic retries and nightly releases.
- [RiotSharp](https://github.com/BenFradet/RiotSharp) - C# wrapper for the Riot Games API. MIT.

### Java

- [Orianna](https://github.com/meraki-analytics/orianna) - Java framework for the Riot League of Legends API. MIT.

## Bots and Integrations

### Discord

- [Discord Developer Platform](https://discord.com/developers/docs/intro) - Official documentation for building Discord bots and apps.
- [discord.js](https://github.com/discordjs/discord.js) - Node.js library for the Discord API. Apache-2.0.
- [discord.py](https://github.com/Rapptz/discord.py) - Async Python API wrapper for Discord. MIT.
- [JDA](https://github.com/discord-jda/JDA) - Java wrapper for the Discord API. Apache-2.0.

### Twitch

- [Twitch API](https://dev.twitch.tv/docs/api/) - Official REST API for streams, channels, clips and more. Auth: OAuth, using app access tokens or user access tokens depending on the endpoint.
- [Twurple](https://twurple.js.org/) - TypeScript libraries for the Twitch API, chat and EventSub. MIT.
- [tmi.js](https://github.com/tmijs/tmi.js) - JavaScript library for Twitch chat bots. MIT.
- [TwitchIO](https://github.com/TwitchIO/TwitchIO) - Async Python library for the Twitch API and EventSub. MIT.
- [TwitchLib](https://github.com/TwitchLib/TwitchLib) - C# library for Twitch chat, whispers, API and events. MIT.

## Datasets

- [Oracle's Elixir Downloads](https://oracleselixir.com/tools/downloads) - Professional League of Legends match data in CSV, with player and team stats by year. The site sits behind bot protection, so it was not content-checked.
- [LoL Diamond Ranked Games (Kaggle)](https://www.kaggle.com/datasets/bobbyscience/league-of-legends-diamond-ranked-games-10-min) - Ranked League of Legends games with first-10-minute stats. A Kaggle account is needed to download.
- [OpenDota Data Dump](https://blog.opendota.com/2017/03/24/datadump2/) - OpenDota's announcement of public Dota 2 match data dumps (2017; check current availability).
- [Smogon Usage Stats](https://www.smogon.com/stats/) - Monthly Pokémon Showdown usage statistics files for competitive formats.

## Rate-Limit and Auth Guides

- [Riot API Keys and Rate Limits](https://developer.riotgames.com/docs/portal) - Development, personal and production keys, plus the per-region rate limits.
- [Riot Developer Policies](https://developer.riotgames.com/policies/general) - Rules every Riot API product must follow, including what data you may show.
- [Steam Web API Terms of Use](https://steamcommunity.com/dev/apiterms) - Terms including the 100,000-calls-per-day limit.
- [Blizzard OAuth Guide](https://develop.battle.net/documentation/guides/getting-access-tokens) - How to obtain Battle.net API access tokens.
- [Twitch Authentication](https://dev.twitch.tv/docs/authentication/) - User access tokens versus app access tokens.
- [Start.gg Authentication](https://developer.start.gg/docs/authentication) - How to generate a token from Developer Settings.
- [Start.gg Rate Limits](https://developer.start.gg/docs/rate-limits) - 80 requests per 60 seconds and 1,000 objects per request.
- [PUBG Rate Limits](https://documentation.pubg.com/en/rate-limits.html) - Per-key, per-minute limits and how to request more.
- [PandaScore Documentation](https://developers.pandascore.co/docs/introduction) - Authentication and pagination for the PandaScore API.
- [HenrikDev Rate Limiting](https://docs.henrikdev.xyz/general/rate-limiting) - How per-key limits and background Riot requests are counted, with the headers to watch.
- [Liquipedia API Terms of Use](https://liquipedia.net/api-terms-of-use) - Key handling, rate limits and attribution rules for the Liquipedia API.
- [MDN: 429 Too Many Requests](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/429) - What the status means and how clients should back off.
- [MDN: Retry-After Header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Retry-After) - Reading the header that tells a client when to retry.

## Tutorials

- [VALORANT API Launch](https://www.riotgames.com/en/DevRel/valorant-api-launch) - Riot's announcement of the VALORANT API and how to get access.
- [Pyrez Getting Started](https://pyrez.readthedocs.io/en/latest/getting_started.html) - Setting up Hi-Rez API credentials and your first Smite call in Python.
- [Cassiopeia Documentation](https://cassiopeia.readthedocs.io/en/latest/) - Setup, caching and data-pipeline guides for the Python League of Legends framework.
- [Riot-Watcher Documentation](https://riot-watcher.readthedocs.io/en/latest/) - Installation and usage for the Python Riot API wrapper.
- [Start.gg Sending Requests](https://developer.start.gg/docs/sending-requests) - How to send your first authenticated GraphQL query to Start.gg.
- [Twitch Chatbot Guide](https://dev.twitch.tv/docs/chat/chatbot-guide/) - Building a Twitch chat bot from authentication to sending messages.
- [discord.js Guide](https://discordjs.guide/) - Step-by-step guide to building a Discord bot with discord.js.

## Related Lists

- [awesome-esports](https://github.com/Strift/awesome-esports) - Curated open-source esports projects; overlaps with the SDK sections here.
- [game-datasets](https://github.com/leomaurodesenv/game-datasets) - Datasets and tools for AI and data mining in digital games.

## Contributing

Contributions are welcome. Please read the [contribution guidelines](CONTRIBUTING.md) first.
