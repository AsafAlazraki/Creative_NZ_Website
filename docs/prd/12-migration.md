# 12 — Migration Plan (Sitecore → new CMS)

## 15.1 Scope

Migrate all live content from the existing Sitecore instance into Sanity (or chosen CMS), preserve URLs where sensible, redirect where not, and cut over with zero downtime visible to end users.

## 15.2 Approach: scripted export + transform + import

### Option A — Export from Sitecore directly (preferred)

Ask CNZ IT for a content export. Sitecore supports exporting items as XML/JSON via the Content Admin API or a packaged dump. This gets us all page content with structured fields, media library references, item hierarchy.

**Required:** a read-only API user on Sitecore + the content item schema.

### Option B — Scrape the public site (fallback)

If export access isn’t available, write a crawler that:

1. Starts from the sitemap (`/site-map`).
1. Fetches each URL.
1. Extracts title, breadcrumb, main content HTML, lastModified.
1. Downloads all referenced images to local filesystem.
1. Writes a JSON intermediate file per page.
**Tools:** Node script using `undici` (fetcher) + `linkedom` (HTML parser). Run against a locally mirrored copy to avoid hammering production.

## 15.3 Transform step

A Node script reads the intermediate JSON and produces Sanity-ready NDJSON:

- Map URL segments → `slug` + `parentSection` references.
- Parse main content HTML → Portable Text via `@sanity/block-tools`.
- Identify and extract: funding opportunities → `fund`; news articles → `newsArticle`; people → `person`; downloadable PDFs → `document`.
- Wrap known te reo Māori words in `lang="mi"` spans (dictionary-based pass — see below).
- Flag any embedded iframes, forms, or custom HTML for manual review.

### Te reo Māori auto-tagging

Build a term list of known te reo Māori words on the site:

```
Aotearoa, Toi Aotearoa, Ngā Toi Māori, Māori, ngā toi Māori, iwi, hapū, marae,
kaumātua, kaupapa, whakapapa, mana, tikanga, Te Rōpū Mana Toi,
Toi Tōtara Haemata, Toi Uru Kahikatea, Te Waka Toi, Manatū Taonga,
Te Whanganui-a-Tara, Tāmaki Makaurau, Ōtepoti, ringatoi,
Ko Aotearoa me ōna Toi, Nui te Kōrero, whenua, taonga, tangata whenua, ...
```
The transform wraps exact matches with `<span lang="mi">...</span>`. Editorial review required before publish — the script gets it 90% right; humans resolve edge cases.

## 15.4 Import step

Use Sanity’s import API (`sanity dataset import file.ndjson prod`) or equivalent for Payload.

1. Import reference data first (artforms, applicantTypes, sections).
1. Import documents in dependency order: sections → pages → funds → news → people.
1. Validate no broken references post-import.
1. Spot-check 10 random pages for fidelity against the original.

## 15.5 Redirects

### URL preservation rules

- **Keep exactly:** all `/funding-and-support/...`, `/advocating-for-the-arts/...`, `/development-and-resources/...`, `/about-creative-nz/...` URLs.
- **Shorten:** `/news-and-blog/2026/04/14/02/51/22/slug` → `/news/2026/slug`. Add 301 from old to new.
- **Deduplicate:** current site has `sustainable-careers` under both `/funding-and-support/` and `/development-and-resources/`. Pick canonical location (recommend under `/development-and-resources/`); 301 the other.
- **Strip trailing slashes:** Next.js default is no trailing slash; add a 301 rule for the opposite.

### Redirect implementation

- `middleware.ts` reads a redirect table from the CMS (or a static JSON file built at deploy time for simplicity).
- All redirects are 301 unless marked temporary.
- Test: post-cutover smoke test hits every known URL from the old site and asserts 200 or 301 to a 200.

### Redirect table template

```
[
  {
    "from": "/news-and-blog/2026/04/14/02/51/22/equity-in-the-arts...",
    "to": "/news/2026/equity-in-the-arts-why-we-need-your-voice-in-the-policy",
    "type": 301
  },
  {
    "from": "/funding-and-support/sustainable-careers",
    "to": "/development-and-resources/sustainable-careers",
    "type": 301
  }
]
```

## 15.6 Media / asset migration

- Download every `/-/media/...` asset referenced in the export.
- Upload to Sanity’s asset pipeline once — deduplicate by content hash.
- Rewrite content references to new asset URLs during the transform step.
- **Alt text:** in Sitecore these may or may not exist. If missing, the CMS import sets `alt = ""` and a `needsAltReview = true` flag — editors must fill these in before cutover.

## 15.7 Downloadable documents (PDFs)

- Inventory every `.pdf` linked from the site.
- Check each against the accessibility statement: many may have plain-text alternates that we need to carry over.
- If a PDF lacks an accessible alternate, flag it for remediation or conversion to HTML before launch — per WCAG 2.2 AA, a linked PDF must itself be accessible.

## 15.8 Cutover plan

1. **T-4 weeks:** Staging site complete at staging.creativenz.govt.nz, password-protected. CNZ team reviews content fidelity page by page.
1. **T-2 weeks:** Accessibility audit (external, per procurement). Fix all findings.
1. **T-1 week:** Content freeze on the old Sitecore site. Any last-minute content is added to the new CMS.
1. **T-0 (cutover night):** Final content sync from Sitecore. DNS cutover: CNAME of creativenz.govt.nz to new hosting. Smoke tests from multiple regions. Announce on social.
1. **T+1 day:** Monitor error rates, search analytics, and external uptime. Address any 404s surfaced in logs.
1. **T+2 weeks:** Decommission Sitecore (after confirming no missed content or hooks).

## 15.9 Rollback plan

- Keep the old Sitecore site live but un-DNS-mapped for 30 days post-cutover.
- Rollback = DNS swap back. Target RTO: 1 hour.
- Document which content changed on the new CMS post-cutover so we can export/reapply if rollback is needed.

## 15.10 Success criteria

- 100% of pages listed in the old sitemap resolve on the new site (200 or 301→200).
- No 404s reported via Google Search Console in the first 14 days (beyond pre-existing ones).
- Old-URL traffic → new-URL traffic delta < 5% (redirects are working).
- No drop in organic search traffic > 20% vs 4-week prior baseline after 30 days.

---

## Redirect Map

Committed to the repo as `content/redirects.json`. Claude Code creates this file verbatim. Additions by editors flow through the CMS at a future point; v1 ships this static list.

## 36.1 Full redirect JSON (structural changes)

```
[
  {
    "from": "/funding-and-support/sustainable-careers",
    "to": "/development-and-resources/sustainable-careers-resources",
    "type": 301,
    "note": "Resolve duplicate — canonicalise under Development"
  },
  {
    "from": "/funding-and-support/sustainable-careers/make-connections",
    "to": "/development-and-resources/sustainable-careers-resources/make-connections",
    "type": 301
  },
  {
    "from": "/funding-and-support/sustainable-careers/navigate-the-law",
    "to": "/development-and-resources/sustainable-careers-resources/navigate-the-law",
    "type": 301
  },
  {
    "from": "/funding-and-support/sustainable-careers/navigate-your-finances",
    "to": "/development-and-resources/sustainable-careers-resources/navigate-your-finances",
    "type": 301
  },
  {
    "from": "/news-and-blog/",
    "to": "/news-and-blog",
    "type": 301,
    "note": "Trailing slash normalisation"
  }
]
```

## 36.2 News article URL rewrite rule

Existing news article URLs follow the pattern `/news-and-blog/{YYYY}/{MM}/{DD}/{hh}/{mm}/{ss}/{slug}`. We shorten to `/news/{YYYY}/{slug}`. A build-time script generates one redirect per article from the Sanity/migration export:

```
// scripts/generate-news-redirects.ts
import fs from 'fs';
import { sanityClient } from '../lib/sanity';
 
async function main() {
  const articles = await sanityClient.fetch(`
    *[_type == "newsArticle"]{
      "slug": slug.current,
      "legacyPath": legacyPath,
      publishedAt
    }
  `);
 
  const redirects = articles
    .filter((a: any) => a.legacyPath)
    .map((a: any) => ({
      from: a.legacyPath,
      to: `/news/${new Date(a.publishedAt).getFullYear()}/${a.slug}`,
      type: 301,
    }));
 
  const existing = JSON.parse(fs.readFileSync('content/redirects.json', 'utf8'));
  const merged = [...existing, ...redirects];
  fs.writeFileSync('content/redirects.json', JSON.stringify(merged, null, 2));
  console.log(`Added ${redirects.length} news redirects`);
}
 
main();
```
Run this once after content migration completes. Legacy paths are preserved in a `legacyPath` field on each `newsArticle` document during import (see section 15.3 — transform step).

## 36.3 General rewrite rules (built into middleware.ts)

- Trailing slash → no trailing slash (301) — handled in middleware, no entry needed.
- Uppercase → lowercase in path — handled in middleware. Skip for `/_pagefind/` assets.
- Any `index.html` suffix stripped → 301 to the base path.

## 36.4 Smoke test post-cutover

```
# scripts/smoke-test-redirects.sh
#!/usr/bin/env bash
set -e
 
BASE="${BASE:-https://creativenz.govt.nz}"
FAILED=0
 
# Load all known paths from old sitemap
while IFS= read -r path; do
  status=$(curl -o /dev/null -s -w "%{http_code}" "$BASE$path")
  if [[ "$status" != "200" && "$status" != "301" && "$status" != "302" ]]; then
    echo "FAIL $status $path"
    FAILED=$((FAILED + 1))
  fi
done < scripts/legacy-paths.txt
 
if [[ $FAILED -gt 0 ]]; then
  echo "Total failures: $FAILED"
  exit 1
else
  echo "All legacy paths resolve (200 or 30x). OK."
fi
```

---

## Te Reo Māori Dictionary for Migration

Drop into `content/te-reo-dictionary.ts`. Used by the migration transform to wrap known te reo Māori terms in `<span lang="mi">` during content import. Case-insensitive match; preserves original casing in output.

```
// content/te-reo-dictionary.ts
// Terms to wrap with <span lang="mi"> when found in English-language content.
// Longer phrases first (so "te reo Māori" matches before "Māori" alone).
// Reviewed and extended per section 12.3 of the PRD.
 
export const teReoTerms: string[] = [
  // Full phrases / organisational names
  'te reo Māori',
  'te reo',
  'Ngā Toi Māori',
  'ngā toi Māori',
  'Toi Aotearoa',
  'Toi Tōtara Haemata',
  'Toi Uru Kahikatea',
  'Te Waka Toi',
  'Te Waka Toi Awards',
  'Te Rōpū Mana Toi',
  'Ko Aotearoa me ōna Toi',
  'Nui te Kōrero',
  'Manatū Taonga',
  'Arts Council of New Zealand Toi Aotearoa',
 
  // Place names
  'Aotearoa',
  'Te Whanganui-a-Tara',
  'Tāmaki Makaurau',
  'Ōtepoti',
  'Te Waipounamu',
  'Te Ika-a-Māui',
 
  // Māori cultural terms
  'whakapapa',
  'kaupapa',
  'tikanga',
  'mana',
  'rangatiratanga',
  'manaakitanga',
  'whakawhanaungatanga',
  'kaitiakitanga',
  'whānau',
  'hapū',
  'iwi',
  'marae',
  'ringatoi',
  'kaumātua',
  'tangata whenua',
  'te Tiriti o Waitangi',
  'te Tiriti',
  'te ao Māori',
  'taonga',
  'whenua',
  'tauiwi',
  'rangatahi',
  'tohunga',
  'koru',
  'karakia',
  'waiata',
 
  // The bare word last so longer phrases take precedence
  'Māori',
];
 
// Simple transform function:
export function markTeReo(html: string): string {
  // Sort by length desc so longer phrases match first
  const sorted = [...teReoTerms].sort((a, b) => b.length - a.length);
 
  for (const term of sorted) {
    // Match term as whole word (allowing macrons), case-insensitive
    // Skip if already inside a lang="mi" tag
    const pattern = new RegExp(
      `(?<!<span[^>]*lang="mi"[^>]*>[^<]*)\\b(${escapeRegex(term)})\\b(?!<\\/span>)`,
      'gi'
    );
    html = html.replace(pattern, '<span lang="mi">$1</span>');
  }
 
  return html;
}
 
function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
```

## 37.1 Rules for editors

- Auto-tagging is a 90%-correct starting point — humans review the transformed content before publish.
- Don’t add English words to this list (some appear borrowed in specific phrases — handle those case-by-case).
- Extend the list when you encounter a new term in CNZ content; commit via PR with a brief rationale.
- Māori Dictionary (Te Aka) is the authoritative reference for meaning and macrons: maoridictionary.co.nz.
