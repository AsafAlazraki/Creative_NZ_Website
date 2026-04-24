# 07 — Search

Two distinct features that people often conflate. Build both; don’t use one for the other.

## 10.1 Site-wide content search (/search)

**User need:** "I heard about X programme, let me find the page."

**Implementation:** [Pagefind](https://pagefind.app).

Why Pagefind:

- Static index built at build-time; no server to run.
- ~70KB WASM; lazy-loaded on /search.
- Multilingual support built in; handles macrons correctly.
- Faceted filtering supported if we want.
- Free and open source.

### Build integration

```
// scripts/build-search-index.ts
// Run after `next build`:
//   1. serve the build output statically
//   2. run `npx pagefind --site out --output-path public/_pagefind`
```
CI step runs Pagefind against the built output and copies `_pagefind/` into `public/`. Deploys together.

### UI

- **Header search** — small input, expands to modal on focus; submits to `/search?q=...`.
- **/search page** — input at top, faceted results below. Facets: section, content type (page, fund, news, person, event), locale.
- **Result card** shows: eyebrow (section + type), title, snippet with `<mark>` highlights, URL breadcrumb.
- **Zero results** state: suggest nearby queries, link to "Speak with an adviser".

### Indexing rules

- Use `data-pagefind-body` on the main content region so nav/footer don’t pollute results.
- Use `data-pagefind-meta="section"`, `type`, `date` for facets.
- Use `data-pagefind-weight="10"` on h1, 5 on h2, 2 on strong links.
- Skip draft content (`data-pagefind-ignore`).

## 10.2 Funding calendar + facet filter

**Route:** `/funding-and-support/all-opportunities/funding-calendar`

**User need:** "Show me all funds open to individual artists in visual arts with a deadline before June."

**Implementation:** Server-rendered with client-side filtering. The set is small enough (≤ 100 funds at any time) that we don’t need Algolia/Meilisearch.

### Data flow

1. Server component fetches all active funds from Sanity with their next round.
1. Renders the full list as HTML (SEO-indexable, default view).
1. Client component hydrates a filter UI (URL-synced) and re-renders only the matching cards.
1. No loading state beyond initial page load; filtering is instant.

### Filters

- Artform (multi-select)
- Applicant type (multi-select)
- Category (Grant / Fellowship / etc.)
- Status (Open / Closing soon / Opening soon / Closed)
- Deadline before (date picker)
- Amount (bucketed: <$10k / $10-50k / $50k+)

### Filter UI rules

- Chip style, not dropdowns — mobile friendly.
- Filter state reflected in URL `?artforms=visual,music&audience=individual`.
- "Showing X of Y" count always visible.
- Keyboard accessible; filters announce changes via `aria-live="polite"`.
- "Reset all" clears to default.

### Two views

- **List view** (default) — cards, sorted by next close date.
- **Calendar view** (toggle) — timeline/calendar grid where each fund appears as a bar across its open window. Optional for v1; punt to v2 if time is tight.

## 10.3 News filtering

Same pattern as funding calendar but filtering by category, artform, year. Fewer filters, same mechanics.

## 10.4 Shared filter component

Build `<FilterBar filters={...} />` once and reuse across funding calendar, results, and news. It owns URL state and calls back on change.

## 10.5 Search analytics

- Log every query on /search (query string, results count, selected result).
- Weekly report: top zero-result queries → content gaps for the comms team.
- Privacy: don’t log IP; aggregate only.
