# 16 — Home Page — Deep Specification

The home page is the single highest-traffic surface. It deserves more detail than any other template. This section supplements section 8.1 and 19.1 with exact copy options, editorial logic, performance targets, and authoring rules.

## 23.1 Purpose

Three simultaneous jobs:

1. **Orient.** A first-time visitor knows within 5 seconds what Creative New Zealand does.
1. **Route.** Regular visitors (funding-seekers) reach their audience group in one click; calendar-seekers reach the calendar in one.
1. **Signal life.** Current deadlines, recent news — the site is alive and attended to.

## 23.2 Zones

| **Zone** | **Purpose** | **Height (desktop)** |
| --- | --- | --- |
| Announcement banner | Urgent contextual info. Conditional. | ~48px |
| Header | Nav. Global. | 80px (64px scrolled) |
| Hero | Orient. | ~560px |
| Three-door grid | Route. | ~420px |
| Deadlines strip | Signal life + route. | ~360px |
| Featured stories | Signal life. | ~480px |
| Advocate band | Surface secondary mission. | ~320px |
| Newsletter | Capture lead. | ~240px |
| Footer | Utility. Global. | ~480px |

## 23.3 Hero copy — three options to test

The hero headline is the single most reviewed line on the site. Three candidates to run past CNZ:

| **Option** | **Headline** | **Tone** |
| --- | --- | --- |
| A — Institutional | Supporting the arts of Aotearoa | Clear, factual, safe. The current-site feel. |
| B — Invitational | Helping you make the art that matters to you | Second-person, warmer, more emotional. |
| C — Purpose | A flourishing arts sector for Aotearoa | Outcomes-focused, slightly more policy. |

**Recommendation:** A as the default. B if CNZ leadership wants the site to feel warmer. C if positioning for government audiences more than public.

**Subhead:** one sentence, max 20 words. Example: "We fund artists, practitioners, and organisations making the art that defines this place."

## 23.4 Three-door grid — routing rules

The three doors handle ~60% of intentional traffic. They must always be visible above the fold on desktop and within 1.5 viewports on mobile.

- **Door 1 — Early career artists:** destination is `/funding-and-support/early-career-artists`.
- **Door 2 — Artists and practitioners:** destination is `/funding-and-support/artists-and-practitioners`.
- **Door 3 — Organisations and groups:** destination is `/funding-and-support/arts-organisations-and-groups`.
- **Order:** by career progression, left to right. Not by funding size.
- **Don’t add a fourth door.** If CNZ adds a new audience (e.g. Pacific arts lander), redesign this section; don’t squeeze.

## 23.5 Deadlines strip — editorial logic

- **Source:** `fund.rounds` where `closeDate > now() AND closeDate < now() + 45 days`.
- **Sort:** ascending by closeDate (most urgent first).
- **Max 3 items.** If more, the third item can be "See all" linking to calendar with status=closing-soon.
- **Minimum 1 item.** If fewer than 1 exist within 45 days, widen to 90 days. If still zero, hide the whole strip — don’t fake it.
- **Priority override:** globalSettings has an optional pinnedDeadlines array — CNZ can hand-pick items here that appear at top.
- **Copy in the pill:** "Closes in N days" for ≤14 days; "Closes 12 June" for 15-45 days.

## 23.6 Featured stories — editorial logic

- **Primary source:** `globalSettings.featuredStories` (3 references, curated).
- **Fallback:** latest 3 `newsArticle` by `publishedAt` desc.
- **Layout:** first card large (2/3 width), two cards stacked in the remaining 1/3.
- **Required fields on card:** eyebrow (category), title, featured image with alt, published date. No read-time for articles under 2 min.
- **Image aspect:** 2:1 for the featured card; 1:1 for the two small cards.
- **Fallback image:** if article has no featured image, render the koru watermark in a random accent colour. Never show a broken image placeholder.

## 23.7 Advocate band

- Full-bleed navy background. Paper text.
- **Copy:** single h2 + supporting sentence + one CTA. Example: "Advocate for the arts in Aotearoa. Use our tools and research to make the case for arts funding in your community. [Get the advocate toolkit]"
- CTA destination: `/advocating-for-the-arts`.
- **Koru colour:** Coral. Decorative, 50% cut off the right edge.
- **Do not replace with a ticker or carousel.** It’s a fixed band. The second mission on the site (after funding) — it’s allowed to be prominent and simple.

## 23.8 Performance targets — home specifically

| **Metric** | **Target** | **Notes** |
| --- | --- | --- |
| LCP | ≤ 1.8s (mobile 4G) | Hero headline must be the LCP element |
| CLS | 0 | Fixed dimensions on hero, koru, and image cards |
| INP | ≤ 150ms |  |
| JS bundle (page-specific) | ≤ 40KB gzipped | Above-fold content is all RSC — no client JS |
| CSS critical | ≤ 20KB | Inlined |
| Total page weight | ≤ 400KB | Including images (AVIF, sized) |
| Lighthouse Performance | ≥ 98 |  |
| Lighthouse Accessibility | 100 |  |

## 23.9 Authoring — what CNZ edits on home

Everything below is a `globalSettings.home` singleton in the CMS:

- Hero headline + subhead (both bilingual).
- Hero CTAs (label + href, up to 2).
- Announcement banner (enabled, message, link, type).
- Three-door supporting copy (one sentence per door).
- Pinned deadlines (optional; array of fund references).
- Featured stories (array of 3 newsArticle references).
- Advocate band headline + subhead + CTA.
- Newsletter intro copy.

## 23.10 What CNZ does NOT edit

- Layout / order of zones.
- Three-door destinations (these are structural).
- Koru motif choice or colour.
- Footer structure.

## 23.11 A/B test candidates (post-launch)

- Hero copy A vs B (institutional vs invitational).
- Deadline strip above or below three doors.
- Advocate band presence vs absence.
**Tool:** server-side experimentation via Vercel Edge Config or similar. No client-side flicker.
