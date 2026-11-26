// Builds the GitHub Pages site (dist/) from README.md. Usage: node scripts/build-site.mjs [baseUrl]
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { Marked } from "marked";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const baseUrl = (process.argv[2] || "https://vaporjawn.dev/awesome-esports-apis/").replace(/\/?$/, "/");
const repoUrl = "https://github.com/Vaporjawn/awesome-esports-apis";

/**
 * Turns heading text into a stable URL fragment.
 * @param {string} text Heading text.
 * @returns {string} Lowercase hyphenated slug.
 */
const slugify = (text) =>
  text.toLowerCase().replace(/<[^>]+>/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

/**
 * Escapes text for use inside an HTML attribute or element.
 * @param {string} text Raw text.
 * @returns {string} HTML-safe text.
 */
const escapeHtml = (text) =>
  text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const readme = readFileSync(join(root, "README.md"), "utf8");
const description = escapeHtml(
  readme.match(/^> (.+)$/m)?.[1] ?? "Curated esports and game stats APIs.",
);

const marked = new Marked({
  renderer: {
    heading({ tokens, depth }) {
      const text = this.parser.parseInline(tokens);
      return `<h${depth} id="${slugify(text)}">${text}</h${depth}>\n`;
    },
    link({ href, tokens }) {
      const text = this.parser.parseInline(tokens);
      const external = /^https?:/.test(href);
      const attrs = external ? ' rel="noopener" target="_blank"' : "";
      return `<a href="${escapeHtml(href)}"${attrs}>${text}</a>`;
    },
  },
});

// Drop the H1 and badge line (the page header replaces them) and the repo-only Contents list.
const body = readme
  .replace(/^# .+\n/, "")
  .replace(/^> .+\n/m, "")
  .replace(/## Contents\n\n(?:- .+\n)+\n/, "");

const sections = [...body.matchAll(/^## (.+)$/gm)].map((m) => ({ title: m[1], id: slugify(m[1]) }));
const nav = sections
  .filter((s) => s.title !== "Contributing")
  .map((s) => `<a href="#${s.id}">${escapeHtml(s.title)}</a>`)
  .join("");
const content = marked.parse(body.replace("](CONTRIBUTING.md)", `](${repoUrl}/blob/main/CONTRIBUTING.md)`));
const entryCount = (content.match(/<li><a /g) ?? []).length;

const jsonLd = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Awesome Esports APIs",
  url: baseUrl,
  description: description.replace(/&[a-z]+;/g, ""),
  license: "https://creativecommons.org/publicdomain/zero/1.0/",
  author: { "@type": "Person", name: "Victor Williams", url: "https://github.com/Vaporjawn" },
});

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Awesome Esports APIs: esports and game stats APIs, SDKs and datasets</title>
<meta name="description" content="${description}">
<link rel="canonical" href="${baseUrl}">
<meta property="og:type" content="website">
<meta property="og:title" content="Awesome Esports APIs">
<meta property="og:description" content="${description}">
<meta property="og:url" content="${baseUrl}">
<meta name="twitter:card" content="summary">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='7' fill='%234f46e5'/%3E%3Cpath d='M9 22V10h6a4 4 0 010 8h-3' fill='none' stroke='white' stroke-width='3' stroke-linecap='round'/%3E%3C/svg%3E">
<script type="application/ld+json">${jsonLd}</script>
<style>
:root{--bg:#fafafa;--fg:#16161d;--muted:#5b5b6b;--card:#fff;--line:#e4e4ec;--accent:#4f46e5;--accent-fg:#fff;--mark:#fde68a}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){--bg:#0f0f14;--fg:#ececf3;--muted:#9a9ab0;--card:#17171f;--line:#2a2a36;--accent:#8b85ff;--accent-fg:#0f0f14;--mark:#5b4b00}}
:root[data-theme="dark"]{--bg:#0f0f14;--fg:#ececf3;--muted:#9a9ab0;--card:#17171f;--line:#2a2a36;--accent:#8b85ff;--accent-fg:#0f0f14;--mark:#5b4b00}
*{box-sizing:border-box}
html{scroll-behavior:smooth;scroll-padding-top:5.5rem}
body{margin:0;background:var(--bg);color:var(--fg);font:16px/1.6 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif}
a{color:var(--accent)}
header{padding:2.5rem 1rem 1.5rem;max-width:62rem;margin:0 auto}
h1{font-size:clamp(1.8rem,5vw,2.6rem);line-height:1.15;margin:0 0 .5rem}
.lead{color:var(--muted);max-width:46rem;margin:0 0 1rem}
.bar{position:sticky;top:0;z-index:5;background:color-mix(in srgb,var(--bg) 92%,transparent);backdrop-filter:blur(8px);border-bottom:1px solid var(--line)}
.bar-inner{max-width:62rem;margin:0 auto;padding:.7rem 1rem;display:flex;gap:.6rem;align-items:center;flex-wrap:wrap}
#q{flex:1 1 16rem;min-width:0;padding:.65rem .9rem;border:1px solid var(--line);border-radius:.6rem;background:var(--card);color:var(--fg);font:inherit}
#q:focus-visible,button:focus-visible,nav a:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
button,.gh{border:1px solid var(--line);background:var(--card);color:var(--fg);border-radius:.6rem;padding:.6rem .85rem;font:inherit;cursor:pointer;text-decoration:none}
nav{max-width:62rem;margin:0 auto;padding:.5rem 1rem 0;display:flex;gap:.4rem;flex-wrap:wrap}
nav a{font-size:.88rem;padding:.25rem .65rem;border:1px solid var(--line);border-radius:99rem;text-decoration:none;color:var(--fg);background:var(--card)}
nav a:hover{border-color:var(--accent)}
main{max-width:62rem;margin:0 auto;padding:0 1rem 4rem}
h2{margin:2.4rem 0 .6rem;padding-bottom:.4rem;border-bottom:1px solid var(--line);font-size:1.5rem}
h3{margin:1.6rem 0 .5rem;font-size:1.1rem;color:var(--muted);text-transform:uppercase;letter-spacing:.05em}
ul{list-style:none;padding:0;margin:0;display:grid;gap:.55rem}
li{background:var(--card);border:1px solid var(--line);border-radius:.7rem;padding:.7rem .95rem}
li{overflow-wrap:anywhere}
li>a:first-child{font-weight:600}
code{overflow-wrap:anywhere;background:var(--line);padding:.05rem .3rem;border-radius:.3rem;font-size:.9em}
mark{background:var(--mark);color:inherit;border-radius:.2rem}
[hidden]{display:none!important}
#empty{color:var(--muted);padding:2rem 0}
footer{max-width:62rem;margin:0 auto;padding:1rem;color:var(--muted);font-size:.9rem;border-top:1px solid var(--line)}
@media (max-width:600px){.bar{position:static}#q{flex-basis:100%}nav{overflow-x:auto;flex-wrap:nowrap;padding-bottom:.4rem}nav a{white-space:nowrap}}
@media (prefers-reduced-motion:reduce){html{scroll-behavior:auto}}
</style>
</head>
<body>
<header>
<h1>Awesome Esports APIs</h1>
<p class="lead">${description}</p>
</header>
<div class="bar"><div class="bar-inner">
<input id="q" type="search" placeholder="Search ${entryCount} entries: riot, dota, python, twitch, free..." aria-label="Search entries" autocomplete="off">
<button id="theme" type="button" aria-label="Toggle dark mode">Theme</button>
<a class="gh" href="${repoUrl}">GitHub</a>
</div></div>
<nav aria-label="Sections">${nav}</nav>
<main id="list">
${content}
<p id="empty" hidden>No entries match your search.</p>
</main>
<footer>CC0 1.0. Built from the <a href="${repoUrl}/blob/main/README.md">README</a>. Entry details are checked against each provider's own docs.</footer>
<script>
(function(){
  var q=document.getElementById('q'),main=document.getElementById('list'),empty=document.getElementById('empty');
  var items=[].slice.call(main.querySelectorAll('li'));
  /** Filters list entries and hides headings with no visible entries. */
  function filter(){
    var term=q.value.trim().toLowerCase(),shown=0;
    items.forEach(function(li){
      var hit=!term||li.textContent.toLowerCase().indexOf(term)>-1;
      li.hidden=!hit; if(hit)shown++;
    });
    [].slice.call(main.querySelectorAll('h2,h3')).forEach(function(h){
      var el=h.nextElementSibling,any=false;
      while(el&&!/^H[23]$/.test(el.tagName)){ if(el.tagName==='UL'&&el.querySelector('li:not([hidden])'))any=true; if(el.tagName==='P'&&!term)any=true; el=el.nextElementSibling; }
      h.hidden=!!term&&!any;
    });
    empty.hidden=shown>0||!term;
  }
  q.addEventListener('input',filter);
  document.addEventListener('keydown',function(e){ if(e.key==='/'&&document.activeElement!==q){e.preventDefault();q.focus();} });
  var root=document.documentElement,btn=document.getElementById('theme');
  try{var saved=localStorage.getItem('theme'); if(saved)root.dataset.theme=saved;}catch(e){}
  btn.addEventListener('click',function(){
    var dark=root.dataset.theme?root.dataset.theme==='dark':matchMedia('(prefers-color-scheme: dark)').matches;
    root.dataset.theme=dark?'light':'dark';
    try{localStorage.setItem('theme',root.dataset.theme);}catch(e){}
  });
})();
</script>
</body>
</html>
`;

mkdirSync(join(root, "dist"), { recursive: true });
writeFileSync(join(root, "dist", "index.html"), html);
writeFileSync(join(root, "dist", "robots.txt"), `User-agent: *\nAllow: /\nSitemap: ${baseUrl}sitemap.xml\n`);
writeFileSync(
  join(root, "dist", "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${baseUrl}</loc></url></urlset>\n`,
);
writeFileSync(join(root, "dist", ".nojekyll"), "");
console.log(`Built dist/ with ${entryCount} entries, canonical ${baseUrl}`);
