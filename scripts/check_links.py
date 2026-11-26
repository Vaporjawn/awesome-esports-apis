#!/usr/bin/env python3
"""Check every external URL in README.md.

Exit status is 1 when any link is dead (connection error, 404, 410, 5xx).
HTTP 401, 403 and 429 are reported as warnings because live sites often
return them to automated clients.
"""
import re
import sys
import urllib.error
import urllib.request
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

WARN_CODES = {401, 403, 429}
SELF_SITE = "https://vaporjawn.dev/awesome-esports-apis/"
USER_AGENT = "Mozilla/5.0 (awesome-esports-apis link checker)"


def extract_urls(text):
    """Return the sorted unique http(s) URLs found in markdown link targets."""
    return sorted(set(re.findall(r"\]\((https?://[^)\s]+)\)", text)))


def check(url):
    """Return (url, status, kind) where kind is ok, warn or dead."""
    request = urllib.request.Request(url.split("#")[0], headers={"User-Agent": USER_AGENT})
    try:
        with urllib.request.urlopen(request, timeout=25) as response:
            return url, response.status, "ok"
    except urllib.error.HTTPError as error:
        own_site = url.startswith(SELF_SITE)  # new deploys may lag the README that links them
        kind = "warn" if error.code in WARN_CODES or own_site else "dead"
        return url, error.code, kind
    except Exception as error:  # noqa: BLE001 - report any network failure
        return url, type(error).__name__, "dead"


def main():
    """Check README.md and print a summary."""
    readme = Path(__file__).resolve().parent.parent / "README.md"
    urls = extract_urls(readme.read_text(encoding="utf-8"))
    with ThreadPoolExecutor(max_workers=10) as pool:
        results = list(pool.map(check, urls))
    for url, status, kind in results:
        if kind != "ok":
            print(f"{kind.upper():5} {status} {url}")
    dead = [r for r in results if r[2] == "dead"]
    warn = [r for r in results if r[2] == "warn"]
    print(f"{len(results)} links: {len(results) - len(dead) - len(warn)} ok, {len(warn)} warnings, {len(dead)} dead")
    return 1 if dead else 0


if __name__ == "__main__":
    sys.exit(main())
