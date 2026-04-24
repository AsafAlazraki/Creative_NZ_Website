# 13 — Inspiration and References

Curated references. Aspire to the discipline of these sites, not their novelty. We are building a public-information site for a Crown entity — clarity, dignity, and accessibility beat cleverness.

## 16.1 Arts-funding and cultural institutions (direct peers)

- **Arts Council England** — `artscouncil.org.uk` — strong typographic hierarchy, clear audience-group routing ("I want to…"), deadlines prominent, no stock photo clutter. Very similar mission; study their fund-detail page structure.
- **Canada Council for the Arts** — `canadacouncil.ca` — bilingual (French/English). Study their lang markup, language toggle, and handling of content that isn’t translated yet.
- **Creative Australia** (formerly Australia Council) — `creative.gov.au` — recent rebuild. Editorial, image-forward approach. The type pairing is instructive.

## 16.2 NZ public-sector / bicultural design done well

- **Te Papa Tongarewa** — `tepapa.govt.nz` — te reo first-class, handles macrons and bilingual labels well. Strong editorial voice.
- **Auckland Art Gallery Toi o Tāmaki** — `aucklandartgallery.com` — type-driven, image-respectful (images of art, not of people). Sharp grid.
- **Ngā Taonga Sound & Vision** — `ngataonga.org.nz` — archive / institutional feel. Good hierarchy for dense content.
- **Digital.govt.nz** — the standard we’re measured against. Plain, accessible, fast. Not visually exciting but excellent baseline.

## 16.3 Editorial / typographic web design (aesthetic references)

- **Pentagram** — `pentagram.com` — big restrained serif headlines, lots of whitespace, quiet palette.
- **The Serpentine** — `serpentinegalleries.org` — large-scale editorial, respects the art.
- **Are.na** — `are.na` — extreme restraint; proves text-forward can be beautiful.
- **Read magazine sites** — `nplusonemag.com`, `thenewyorker.com`, `mitpress.mit.edu` — model for article template.
**Browse before you build:** Awwwards categories Editorial, Typography, Government, Nonprofit. CSS Design Awards likewise. The point is not to copy a visual style but to internalise the pace of good information design.

## 16.4 Components to study on 21st.dev

Browse the registry at `21st.dev` for current top-rated versions. Categories to look at:

- **Hero** — specifically editorial / typographic heroes, not SaaS-style gradient heroes.
- **Navigation** — mega-menu patterns; mobile sheet patterns.
- **Cards** — feature cards with image + eyebrow + title + meta (we need this for news and fund cards).
- **Forms** — multi-step / stepper (for FundFinder).
- **Bento grids** — for the home page editorial layout.
- **Command menu** (⌘K) — optional v2 power-user feature.

## 16.5 Motion references

Subtle, not flashy.

- **Linear** (`linear.app`) — scroll-linked parallax, text reveals at ≤ 20px magnitude. Never distracts from reading.
- **Stripe** (`stripe.com`) — background gradient shifts; restrained.
Our koru can gently parallax — no more than 30px total movement, always respecting `prefers-reduced-motion`. No spinning, no morphing, no scroll-scrubbed video. The koru carries cultural weight — it is not decoration to be played with.

## 16.6 Anti-patterns — what we are NOT doing

1. **No hero video/animation loops** — bandwidth hostile, distracting, rarely accessible.
1. **No 3D/WebGL.** (Webby-award-bait that nobody thanks you for.)
1. **No infinite scroll** on news — Pagination or Load More, both of which respect keyboard and screen reader.
1. **No stock photography** of "creative people looking thoughtful at laptops".
1. **No auto-playing carousels.**
1. **No cookie consent that blocks the page** — use a non-modal dismissible banner.
1. **No "Click here" links** — link text describes the destination.
1. **No dark hero with tiny white text** — contrast is mandatory.
1. **No drop shadows and glassmorphism** as primary aesthetic — this is a public institution, not a SaaS landing page.
1. **No AI-generated imagery.** CNZ’s own AI guidance flags this. Use it to think with; don’t ship it.

---

## Build Roadmap

Pragmatic delivery plan. Assumes a team of 2–3 devs + 1 designer + 1 editor/comms + PM + occasional external a11y auditor.

## 17.1 Phase 0 — Foundations (2 weeks)

Goal: set up the repo, CMS, design system, and CI so everything after is cheap to iterate on.

- Repo scaffolded: Next.js 15, TypeScript strict, Tailwind v4, ESLint, Prettier, Vitest, Playwright.
- CI green: typecheck, lint, unit tests, build, Lighthouse CI, axe a11y suite all running on every PR.
- CMS instance provisioned. Schemas implemented.
- Design tokens implemented as CSS variables + Tailwind theme.
- Fonts configured with the four weights of Inter and Source Serif 4.
- Core layout primitives built: SiteHeader, SiteFooter, Container, Prose, SkipLink, Breadcrumb.
- Deploy pipeline: main → prod, staging → staging, PR → preview.
- Sentry, Plausible, uptime probe configured in staging.
**Exit criteria:** a "Hello world" page at `/` with correct fonts, colours, skip link, and a passing Lighthouse score across all four categories.

## 17.2 Phase 1 — The information backbone (3 weeks)

Goal: every content page template exists and can be authored end-to-end.

- Content Page template live, reading from CMS.
- Section Landing + Sub-section Landing templates live.
- Breadcrumb + section nav working from real data.
- All content blocks implemented: RichText, CalloutBox, PullQuote, StatList, AccordionList, TabGroup, ImageWithCaption, VideoEmbed, DocumentList, RelatedLinks, CTASection.
- Rich text (Portable Text) renderer with te reo `lang="mi"` support and inline block types.
- Dynamic sitemap + robots.
- OG image generation via @vercel/og.
- 404 + 500 pages.
**Exit criteria:** CNZ editor can create a new content page in the CMS, publish it, and have it appear at the correct URL with navigation, breadcrumbs, and SEO metadata — within 15 minutes and no developer involvement.

## 17.3 Phase 2 — Funding experience (3 weeks)

Goal: the single most important surface on the site — funding discovery and detail — is excellent.

- `fund + fundRound + fundingResult` schemas stable in CMS.
- Item Detail template for a fund, including: hero, key-facts strip, status pill, SideMeta, ApplicationTimeline, EligibilityChecklist, FAQs, related funds, PortalCTA.
- Listing template for `/funding-and-support/all-opportunities` with real filter UI.
- **Funding calendar** (list view) at `/funding-and-support/all-opportunities/funding-calendar`.
- Three audience-group landing pages (Early career / Artists / Organisations) with real koru panels and routing logic.
- Results pages (funding rounds, award winners, fellowships).
**Exit criteria:** A logged-out user can land on the home, find "Artists and practitioners", scroll to a relevant fund, read its eligibility, and be one click from the portal — all under 30 seconds.

## 17.4 Phase 3 — News, search, editorial (2 weeks)

Goal: living, current-feeling site.

- `newsArticle` template + listing.
- RSS/Atom feed at `/news.xml`.
- Pagefind integrated; search UI built at `/search`.
- Header search input + modal.
- Zero-results state with suggested actions.
- Filter bar component productionised (reused across funding + news).
**Exit criteria:** search returns relevant results for: a fund name, an artist name, a concept word, a te reo Māori word with macrons. Pagefind index is rebuilt on every deploy.

## 17.5 Phase 4 — Bilingual + accessibility hardening (2 weeks)

Goal: get to WCAG 2.2 AA sign-off.

- `LangToggle` component with `aria-live` announcement in target language.
- `/mi/` routing; fallback behaviour when translation missing.
- Home and top-20 pages translated (content commission from CNZ — runs in parallel with dev).
- Full accessibility audit (external).
- Remediate all findings.
- Accessibility statement updated to reflect conformance.
**Exit criteria:** external auditor issues conformance statement. Lighthouse Accessibility = 100 on every template. NVDA + VoiceOver manual tests complete and signed off.

## 17.6 Phase 5 — Content migration (3 weeks, parallelised with Phase 2–4)

Goal: every existing page is in the new CMS.

- Migration script operational (export → transform → import).
- All reference data seeded.
- Top-100 pages manually QA’d post-import.
- Redirect table populated and deployed to middleware.
- All PDFs inventoried and flagged (accessible / needs-alt-format).
- Image assets imported with alt-text review queue.
**Exit criteria:** staging site has feature parity with the current live site. Every old URL resolves. Spot check passes: 10 random pages match visual/information parity.

## 17.7 Phase 6 — Pre-launch polish (1 week)

- Motion polish (koru parallax, scroll reveals within 30px limit, reduced-motion verified).
- Performance tuning: LCP ≤ 2s on mobile 4G for home + content page + listing.
- OG images reviewed for every section.
- All forms tested end-to-end.
- Newsletter signup verified end-to-end.
- Analytics events firing correctly.
- Legal review of privacy + accessibility + copyright pages.
- Cross-browser: Chrome, Safari, Firefox, Edge latest, plus one version back. Safari on iOS, Chrome on Android.
- Stress test search index with top 100 likely queries.

## 17.8 Phase 7 — Cutover (1 week including buffer)

See section 15.8 for details.

- Content freeze on Sitecore.
- Final sync.
- Launch window chosen (low-traffic weekday morning NZT).
- DNS cutover.
- Smoke tests.
- Social announcement.
- Monitor for 48 hours.

## 17.9 Phase 8 — Post-launch (4 weeks watch period)

- Daily check on Sentry, uptime, Search Console.
- Weekly zero-result query review with comms team.
- Bi-weekly accessibility spot-check.
- 2 weeks in: formal review against success criteria (section 2).
- 4 weeks in: decommission Sitecore.

## 17.10 Total elapsed time

Some phases overlap (Phase 5 migration runs in parallel with 2–4). A realistic elapsed-time estimate is 14–18 weeks depending on CNZ’s content authoring availability and how quickly external a11y findings are remediated.

## 17.11 Biggest risks (and how to blunt them)

| **Risk** | **Blunt** |
| --- | --- |
| Content migration fidelity gap (copy looks off) | Involve CNZ editors from Phase 1; don’t wait until Phase 5 |
| Te reo translation budget/timing | Start the translation commission at the start of Phase 1 (runs in parallel with whole build) |
| Accessibility audit surfaces surprise findings | Don’t wait for Phase 4 audit — run axe in CI from Phase 0 and do internal a11y reviews every sprint |
| Portal deep-linking breaks | Talk to portal team in Phase 0; document the URL scheme |
| Sitecore export access blocked | Plan both Option A and Option B from section 15 |
| Sanity/Payload data residency veto by CNZ procurement | Decide CMS in Phase 0; have Payload-on-Azure-NZ as fallback ready |
| Launch date pressure tempting a "we’ll fix a11y after launch" compromise | It is explicitly not acceptable under NZ Web Accessibility Standard 1.2 — a11y is a ship-blocker |
