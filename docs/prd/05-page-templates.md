# 05 — Page Templates

Seven templates cover the whole site:

1. Home — bespoke
1. Section Landing (L1) — Funding & support, About, etc.
1. Sub-section Landing (L2) — Advice and support, Results, Toolkits
1. Content Page — long-form guidance, terms, policy
1. Item Detail — one Fund, one Award, one Fellowship, one Toolkit entry
1. Listing / Index — News, Funding calendar, Results filterable lists
1. Article — News & blog detail

## 8.1 Home

**Route:** `/`

Editorial, typography-first. No video hero. No slideshow.

```
[SiteHeader]
 
[HomeHero]
  ┌──────────────────────────────────────────────────────────┐
  │  eyebrow:  TOI AOTEAROA                                  │
  │  headline: Supporting the arts of Aotearoa               │
  │  subhead:  One sentence about CNZ's kaupapa.             │
  │  CTAs:     [Find funding] [Read our strategy]            │
  │                                                          │
  │                          [koru watermark bottom-right]   │
  └──────────────────────────────────────────────────────────┘
 
[FundingQuickAccess] — three tiles, preserving current site's strongest pattern
  ┌──────────────┬──────────────┬──────────────┐
  │ Early career │  Artists &   │ Organisations│
  │   artists    │ practitioners│  & groups    │
  │ [orange koru]│ [lime koru]  │ [cyan koru]  │
  └──────────────┴──────────────┴──────────────┘
 
[DeadlinesStrip] — 3 upcoming deadlines with countdown pills
 
[FeaturedStories] — 3 latest news items in magazine grid
 
[CalloutBand — Advocate for the arts]
 
[NewsletterSignup]
 
[SiteFooter]
```
- **Above the fold:** hero + quick access tiles. Everything else below.
- **Performance:** hero must be server-rendered; no client JS above the fold beyond navigation.
- **No carousel.**

## 8.2 Section Landing (L1)

**Routes:** `/funding-and-support`, `/advocating-for-the-arts`, `/development-and-resources`, `/about-creative-nz`, `/news-and-blog`

```
[SiteHeader]
[Breadcrumb]
 
[SectionHero]
  title (page name)
  intro (1–2 sentences)
  optional koru colour panel
 
[OnThisPage] — anchor links to sub-sections, right rail on desktop, accordion on mobile
 
[Main content, one or more of:]
  - Tiled sub-section cards (e.g. the 3 funding audience tiles)
  - Rich text intro
  - "All X" grid listing child pages
  - Featured callouts
 
[Watermark decoration — bottom right on desktop]
 
[SiteFooter]
```
For `/funding-and-support` specifically, reuse the three-tile pattern (Early career / Artists / Organisations) exactly as today; it works.

## 8.3 Sub-section Landing (L2)

```
[SiteHeader]
[Breadcrumb]
 
[TwoColumnLayout]
  ┌────────────┬─────────────────────────────────┐
  │ SectionNav │ [PageHero — title, intro]       │
  │ sticky     │                                 │
  │ on desktop │ [RichText or CardGrid of kids]  │
  │            │                                 │
  │            │ [RelatedLinks]                  │
  └────────────┴─────────────────────────────────┘
 
[SiteFooter]
```
- SectionNav shows sibling pages with the current one highlighted.
- Mobile: SectionNav collapses into a <select> above the content that jumps on change.

## 8.4 Content Page

Most pages.

```
[SiteHeader]
[Breadcrumb]
 
[TwoColumnLayout]
  ┌────────────┬─────────────────────────────────┐
  │ SectionNav │ [PageHero — title, intro]       │
  │            │                                 │
  │            │ [OnThisPage — if >3 h2s]        │
  │            │                                 │
  │            │ [Blocks, any mix of:]           │
  │            │   - RichText (Prose)            │
  │            │   - CalloutBox                  │
  │            │   - AccordionList (FAQs)        │
  │            │   - ImageWithCaption            │
  │            │   - VideoEmbed                  │
  │            │   - StatList                    │
  │            │   - TabGroup                    │
  │            │   - DocumentList                │
  │            │                                 │
  │            │ [RelatedLinks]                  │
  │            │ [CTASection — contextual]       │
  └────────────┴─────────────────────────────────┘
 
[SiteFooter]
```
- Cap prose at `max-w-content` (680px).
- OnThisPage auto-populated from h2s on the server; hydrates for scroll-spy.

## 8.5 Item Detail (Fund, Award, Fellowship, Toolkit entry)

```
[SiteHeader]
[Breadcrumb]
 
[ItemHero]
  eyebrow: category (e.g. "Fellowship")
  title
  status pill: Open | Closing in 14 days | Closed
  key facts strip:
    • Amount  • Who it's for  • Close date  • Artform
 
[PrimaryCTA]
  [Apply on the CNZ portal] — prominent, only if open
  or  [Read the 2024 results] — if round closed
 
[TwoColumnLayout]
  ┌────────────┬─────────────────────────────────┐
  │ SideMeta   │ [Blocks]                        │
  │            │   - Overview                    │
  │ · Amount   │   - Who can apply (eligibility) │
  │ · Deadline │   - What we fund / don't fund   │
  │ · Who for  │   - How to apply                │
  │ · Artform  │   - ApplicationTimeline         │
  │ · Contact  │   - Assessment criteria         │
  │            │   - Past recipients             │
  │ [PortalCTA]│   - FAQs (AccordionList)        │
  └────────────┴─────────────────────────────────┘
 
[RelatedFunds]
[SiteFooter]
```
- Status pill colour: green (Open), amber (Closing soon ≤14 days), grey (Closed).
- Past recipients list lazy-loaded to keep page weight manageable.

## 8.6 Listing / Index (filterable)

```
[SiteHeader]
[Breadcrumb]
 
[PageHero]
  title + intro
 
[FilterBar]
  filters as chips (keyboard-accessible)
  count indicator: "Showing 24 of 87"
  [Reset filters]
  [View toggle: List | Calendar] — calendar only where applicable
 
[Results]
  grid of FundCard / NewsCard / AwardCard
  [Pagination or Load more]
 
[EmptyState if no results]
 
[SiteFooter]
```
- Filter state goes in the URL query string (shareable views, back-button works).
- Default sort: upcoming deadlines (funding) / most recent (news).

## 8.7 Article (News & blog detail)

```
[SiteHeader]
[Breadcrumb — back to News and blog]
 
[ArticleHeader]
  eyebrow: category / artform
  h1: article title
  dek: standfirst paragraph
  meta: author · date · read time
 
[FeaturedImage with caption]
 
[ArticleBody — Prose, cap at max-w-content]
  Full rich-text blocks: RichText, PullQuote, ImageWithCaption, VideoEmbed, RelatedLinks inline
 
[ArticleFooter]
  [ShareBar]
  [AuthorCard — if byline]
  [RelatedArticles — 3 cards]
  [NewsletterSignup]
 
[SiteFooter]
```

## 8.8 Error pages

- `/404` — friendly copy, koru illustration, search box, top 5 links.
- `/500` — calm apology, "try again / contact us".

## 8.9 Print styles

- Hide nav, footer, share, CTAs.
- Hide koru decoration.
- Serif body, black on white, 11pt.
- Show URLs for links inline: `a::after { content: " (" attr(href) ")"; }`.

## 8.10 Mobile behaviour

- SectionNav → `<select>` at top of content.
- Sidebar meta (item detail) moves above main content or collapses to an accordion.
- Primary nav → off-canvas drawer with focus trap.
- Tables → stacked card view below md.
- Tap targets ≥ 44×44px.

---

## Detailed Wireframes — Top Templates

ASCII wireframes at higher fidelity than section 8, annotated with dimensions, states, and interaction notes. One section per top-trafficked template.

## 19.1 Home — desktop (≥1024px)

```
┌──────────────────────────────────────────────────────────────────────────┐
│ [SkipLink — sr-only until focused]                                        │
├──────────────────────────────────────────────────────────────────────────┤
│ [Announcement banner — conditional, dismissible]                          │
├──────────────────────────────────────────────────────────────────────────┤
│ ┌──────────┐                                           ┌──────────────┐  │  ← Header, 80px
│ │ [LOGO]   │  Funding  Advocating  Development  About  │ [Search] [Mi]│  │    sticky on scroll,
│ │ 200×64   │  & support for arts   & resources         │ [Sign in]    │  │    background.95 + blur
│ └──────────┘                                           └──────────────┘  │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│                                                                          │  ← ~80px top padding
│   eyebrow: TOI AOTEAROA                                                  │
│                                                                          │
│   ┌────────────────────────────────────────────────────────┐             │
│   │  Supporting the arts                                   │             │
│   │  of Aotearoa                                           │  ← display-1
│   │                                                        │    max-width 14ch
│   └────────────────────────────────────────────────────────┘             │
│                                                                          │
│   We fund artists, practitioners, and organisations making the art        │  ← body-lg
│   that defines this place.                                  max-w-2xl     │
│                                                                          │
│   [ Find funding → ]   [ Read our strategy ]                             │  ← primary + secondary
│                                                                          │       CTAs, 48px tall
│                                              ┌────────────┐              │
│                                              │ koru       │              │  ← absolute positioned
│                                              │ watermark  │              │    bottom-right
│                                              │ ~420×420   │              │    opacity 0.9
│                                              └────────────┘              │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │  ← ~120px section gap
│   eyebrow: FIND FUNDING                                                  │
│   Three doors in                                                         │  ← h2
│                                                                          │
│   ┌──────────────┐  ┌──────────────┐  ┌──────────────┐                   │
│   │ [koru-orange]│  │ [koru-lime]  │  │ [koru-cyan]  │                   │  ← 3-col grid,
│   │              │  │              │  │              │                   │    1:1 aspect
│   │ Early career │  │  Artists &   │  │ Organisations│                   │    gap: 24px
│   │   artists    │  │ practitioners│  │   & groups   │                   │
│   │              │  │              │  │              │                   │
│   │  New to      │  │  Working     │  │  Arts orgs,  │                   │  ← supporting copy
│   │  funding?    │  │  artists     │  │  collectives │                   │
│   │              │  │              │  │              │                   │
│   │  Start here→ │  │  See funds → │  │  See funds → │                   │  ← card-level CTA
│   └──────────────┘  └──────────────┘  └──────────────┘                   │
│                                                                          │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│   eyebrow: CLOSING SOON                                                  │
│   ┌────────────────────────────────────────────────────────┐             │
│   │ [pill: Closes in 7 days] Quick Response Grants         │             │  ← DeadlineStrip
│   │ $3,500 max • Individual artists                [Apply] │             │    3 items
│   ├────────────────────────────────────────────────────────┤             │
│   │ [pill: Closes in 14 days] Toi Uru Kahikatea            │             │
│   │ Investment programme • Arts organisations      [Apply] │             │
│   ├────────────────────────────────────────────────────────┤             │
│   │ [pill: Closes in 21 days] Arts Grants                  │             │
│   │ $7,500 max • Individual artists                [Apply] │             │
│   └────────────────────────────────────────────────────────┘             │
│                                                                          │
│   [ See all funding opportunities → ]                                    │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│   eyebrow: LATEST FROM CREATIVE NZ                                       │
│   Featured stories                                                       │
│                                                                          │
│   ┌─────────────────────────┐  ┌──────────────┐  ┌──────────────┐        │
│   │  [featured image 2:1]   │  │ [image 1:1]  │  │ [image 1:1]  │        │  ← bento layout
│   │  CATEGORY • 12 Apr      │  │ CAT • date   │  │ CAT • date   │        │    1 large + 2 small
│   │                         │  │              │  │              │        │
│   │  How community arts     │  │ Toi Tōtara   │  │ 2026 Creative│        │  ← h3 titles
│   │  projects rebuild...    │  │ Haemata...   │  │ NZ Arts...   │        │
│   │                         │  │              │  │              │        │
│   │  3 min read →           │  │ 2 min →      │  │ 4 min →      │        │
│   └─────────────────────────┘  └──────────────┘  └──────────────┘        │
│                                                                          │
│   [ All news and blog → ]                                                │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ┌─────────────────────────────────────────────────────────────────────┐ │
│  │                [full-bleed navy band, 320px tall]                   │ │  ← Advocate CTA band
│  │                                                                     │ │    full-width
│  │              Advocate for the arts in Aotearoa                     │ │    white on navy
│  │                                                                     │ │    serif display-2
│  │       Use our tools and research to make the case for the arts      │ │
│  │                                                                     │ │
│  │                   [ Get the advocate toolkit → ]                    │ │
│  │                                                                     │ │
│  │       [koru-coral offset to right, 50% cut off, decorative]         │ │
│  └─────────────────────────────────────────────────────────────────────┘ │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│   Stay in the loop                                                      │  ← h2
│   Get arts news and funding deadlines in your inbox monthly.            │
│                                                                          │
│   ┌──────────────────────────┐ ┌──────────┐                             │  ← NewsletterSignup
│   │ your@email.com           │ │ Subscribe│                             │    inline layout
│   └──────────────────────────┘ └──────────┘                             │
│   By subscribing you agree to our [privacy policy].                     │  ← body-sm
│                                                                          │
├──────────────────────────────────────────────────────────────────────────┤
│ [SiteFooter — see 19.6]                                                  │
└──────────────────────────────────────────────────────────────────────────┘
```

### 19.1.1 Home — annotations

- **Hero typography:** display-1 headline in Source Serif 4 600 weight. Max-width ~14ch forces the line break where we want it.
- **Koru watermark:** absolute-positioned, `bottom: -60px; right: -40px`. Partially off-canvas. Opacity 0.9. z-index below hero text. `pointer-events: none`. Scroll-linked parallax max 30px; respects prefers-reduced-motion.
- **Three-door grid:** preserves current site’s strongest pattern. Each card is a full link (`<a>` wrapping the content). Entire card hoverable. Image is decorative; the card title carries the link name.
- **Deadline strip:** rendered server-side from Sanity `fund.rounds` where `closeDate > now() AND closeDate < now() + 30 days`. Sorted ascending. Max 3. Hide entire block if zero.
- **Featured stories:** editor curates in globalSettings (3 references). Fallback: latest 3 from `newsArticle` by publishedAt desc.
- **Advocate band:** full-bleed navy background; content still within 1280px container. One of six reserved koru colours peeks from the right edge.

## 19.2 Home — mobile (<640px)

```
┌─────────────────────────────┐
│ [≡]  [LOGO]      [Q] [Sign] │  ← Header, 56px, sticky
├─────────────────────────────┤
│ [Announcement, if active]   │
├─────────────────────────────┤
│                             │
│  eyebrow: TOI AOTEAROA      │
│                             │
│  Supporting the             │  ← display-1 scales
│  arts of Aotearoa           │    clamp(2.25rem, 8vw, 3rem)
│                             │
│  We fund artists,           │
│  practitioners, and         │
│  organisations...           │
│                             │
│  [ Find funding → ]         │  ← full-width on mobile
│                             │    min-height 48px
│  [ Read our strategy ]      │
│                             │
│       [koru watermark]      │  ← inline, centered,
│        240×240              │    below CTAs on mobile
├─────────────────────────────┤
│                             │
│  eyebrow: FIND FUNDING      │
│  Three doors in             │
│                             │
│  ┌─────────────────────────┐│
│  │ [koru-orange]           ││  ← stacked vertically
│  │ Early career artists    ││    full-width cards
│  │ New to funding?         ││    min-height 200px
│  │ Start here →            ││
│  └─────────────────────────┘│
│  ┌─────────────────────────┐│
│  │ [koru-lime]             ││
│  │ Artists & practitioners ││
│  │ ...                     ││
│  └─────────────────────────┘│
│  ┌─────────────────────────┐│
│  │ [koru-cyan]             ││
│  │ Organisations & groups  ││
│  │ ...                     ││
│  └─────────────────────────┘│
├─────────────────────────────┤
│  eyebrow: CLOSING SOON      │
│  ┌─────────────────────────┐│
│  │ [pill] Closes in 7 days ││  ← deadline cards
│  │ Quick Response Grants   ││    stack vertically
│  │ $3,500 max              ││
│  │ Individual artists      ││
│  │ [ Apply → ]             ││
│  └─────────────────────────┘│
│   ...                       │
├─────────────────────────────┤
│  [Featured stories stack]   │  ← 3 cards vertical
├─────────────────────────────┤
│  [Advocate band]            │
├─────────────────────────────┤
│  [Newsletter]               │
│  email input full-width     │
│  [ Subscribe ] full-width   │
├─────────────────────────────┤
│ [SiteFooter — see 19.6]     │
└─────────────────────────────┘
```

## 19.3 Section Landing: /funding-and-support

```
┌──────────────────────────────────────────────────────────────────────┐
│ [Header]                                                              │
│ [Breadcrumb: Home › Funding and support]                              │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│   eyebrow: FUNDING AND SUPPORT                                       │
│   ┌─────────────────────────────────────────────┐                    │
│   │  Find the right fund for you                │   [koru watermark] │
│   │                                             │   top-right        │
│   └─────────────────────────────────────────────┘   opacity 0.7      │
│                                                                      │
│   We offer grants, fellowships, and investment programmes for        │
│   individual artists, practitioners, and arts organisations across   │
│   Aotearoa.                                            (max-w-3xl)   │
│                                                                      │
│   [ View funding calendar ]  [ Talk with an adviser ]                │  ← secondary CTAs
│                                                                      │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│   eyebrow: I AM…                                                     │
│                                                                      │
│   ┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐    │
│   │ [koru-orange     │ │ [koru-lime       │ │ [koru-cyan       │    │
│   │  200×200]        │ │  200×200]        │ │  200×200]        │    │
│   │                  │ │                  │ │                  │    │
│   │ Early career     │ │ An artist or     │ │ An arts          │    │
│   │ artist           │ │ practitioner     │ │ organisation     │    │
│   │                  │ │                  │ │                  │    │
│   │ You're starting  │ │ You're developing│ │ You're a         │    │
│   │ your arts        │ │ your arts        │ │ collective,      │    │
│   │ practice...      │ │ practice...      │ │ company, or      │    │
│   │                  │ │                  │ │ charity...       │    │
│   │                  │ │                  │ │                  │    │
│   │ See what's for   │ │ See what's for   │ │ See what's for   │    │
│   │ you →            │ │ you →            │ │ you →            │    │
│   └──────────────────┘ └──────────────────┘ └──────────────────┘    │
│                                                                      │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│   ┌──────────────────────────────────────────────────────────────┐   │
│   │  Not sure where to start?                                    │   │  ← Callout — info
│   │  Our Fund Finder asks five quick questions and points you    │   │    variant
│   │  to the right programmes.                                    │   │
│   │  [ Start the Fund Finder → ]                                 │   │
│   └──────────────────────────────────────────────────────────────┘   │
│                                                                      │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│   eyebrow: SUPPORT                                                   │
│   More ways we can help                                              │
│                                                                      │
│   ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐ │
│   │ 📖 Advice & │  │ 📅 Funding  │  │ 💬 Talk with│  │ 📊 Results  │ │  ← 4-col grid,
│   │    support  │  │    calendar │  │    an       │  │             │ │    icon cards
│   │             │  │             │  │    adviser  │  │             │ │    aspect 1:1
│   │ Guidance    │  │ Every round │  │ Get in touch│  │ See who was │ │
│   │ before,     │  │ we run      │  │ with an arts│  │ funded and  │ │
│   │ during, and │  │ across the  │  │ adviser     │  │ read recent │ │
│   │ after...    │  │ year        │  │             │  │ results     │ │
│   └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘ │
│                                                                      │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│   [Watermark — multi-colour cluster, decorative, 480px, centered]    │
│                                                                      │
├──────────────────────────────────────────────────────────────────────┤
│ [Footer]                                                             │
└──────────────────────────────────────────────────────────────────────┘
```

### 19.3.1 Section landing annotations

- **"I am…" framing:** second-person framing outperforms third-person on funding sites. Existing CNZ uses "I am..." effectively; preserve it.
- **Card link pattern:** entire card is a link. The visible "See what’s for you →" is a visual affordance; the accessible name is the card title plus supporting copy.
- **Fund Finder callout:** renders only if fundFinder is enabled in globalSettings. Feature flag lets us ship v1 without it.

## 19.4 Item Detail: a fund

```
┌───────────────────────────────────────────────────────────────────────┐
│ [Header]                                                               │
│ [Breadcrumb: Home › Funding › Artists & practitioners › Arts Grants]   │
├───────────────────────────────────────────────────────────────────────┤
│                                                                       │
│   eyebrow: GRANT                                                      │
│   Arts Grants                                                         │  ← display-2
│                                                                       │
│   ┌─────────────────────────────────────────────────────────┐         │
│   │ [pill-green] OPEN  •  Closes 5pm, 12 June 2026 (NZT)    │         │  ← status banner
│   └─────────────────────────────────────────────────────────┘         │    24px tall
│                                                                       │
│   Key facts                                                           │  ← key-facts strip
│   ┌───────────────┬───────────────┬───────────────┬──────────────┐    │    4-col grid
│   │ AMOUNT        │ CLOSE DATE    │ WHO IT'S FOR  │ ARTFORM      │    │
│   │ Up to $7,500  │ 12 June 2026  │ Individual    │ All artforms │    │
│   │               │ 5pm NZT       │ artists       │              │    │
│   └───────────────┴───────────────┴───────────────┴──────────────┘    │
│                                                                       │
│   ┌───────────────────────────────────────────────────────────┐       │
│   │ PRIMARY CTA                                               │       │  ← full-width
│   │ [ Apply on the CNZ portal → ]                             │       │    primary button
│   └───────────────────────────────────────────────────────────┘       │    56px tall, navy
│                                                                       │
├───────────────────────────────────────────────────────────────────────┤
│                                                                       │
│ ┌─────────────────┐  ┌──────────────────────────────────────────────┐ │
│ │ [SideMeta]      │  │ Overview                                     │ │  ← 2-col layout
│ │ sticky top: 96  │  │                                              │ │    sidebar 280px
│ │                 │  │ Arts Grants support individual artists to    │ │    main flex-1
│ │ On this page    │  │ create new work, develop skills, or present  │ │    gap: 48px
│ │ ─ Overview      │  │ work to audiences.                           │ │
│ │ ─ Who can apply │  │                                              │ │
│ │ ─ What we fund  │  │ Who can apply                                │ │
│ │ ─ How to apply  │  │                                              │ │
│ │ ─ Timeline      │  │ [EligibilityChecklist]                       │ │
│ │ ─ Assessment    │  │ ☐ You are a New Zealand citizen or resident. │ │
│ │ ─ Past recips.  │  │ ☐ You have been working as an artist for     │ │  ← 44×44 tap targets
│ │ ─ FAQs          │  │   at least two years.                        │ │
│ │                 │  │ ☐ You have not received an Arts Grant        │ │
│ │ ─────────────   │  │   in the past 12 months.                     │ │
│ │                 │  │ ─────────────────────────────                │ │
│ │ Contact         │  │ [Likely eligible] / [Not sure]               │ │  ← dynamic state
│ │ Anaïs Whiu      │  │                                              │ │    reveals on check
│ │ Arts Adviser    │  │ What we fund                                 │ │
│ │ anais@cnz...    │  │ [rich text bullets]                          │ │
│ │                 │  │                                              │ │
│ │ ─────────────   │  │ What we don't fund                           │ │
│ │                 │  │ [rich text bullets]                          │ │
│ │ Share           │  │                                              │ │
│ │ ✉ Email         │  │ How to apply                                 │ │
│ │ 🔗 Copy link    │  │ [ApplicationTimeline]                        │ │
│ │                 │  │                                              │ │
│ │                 │  │   ① Read the guidelines                      │ │
│ │                 │  │     10 minutes                               │ │  ← steps with time
│ │                 │  │      │                                       │ │    estimates
│ │                 │  │   ② Draft your application                   │ │
│ │                 │  │     1-2 hours                                │ │
│ │                 │  │      │                                       │ │
│ │                 │  │   ③ Submit on the portal                     │ │
│ │                 │  │     15 minutes                               │ │
│ │                 │  │      │                                       │ │
│ │                 │  │   ④ We assess                                │ │
│ │                 │  │     Up to 8 weeks                            │ │
│ │                 │  │      │                                       │ │
│ │                 │  │   ⑤ Decision                                 │ │
│ │                 │  │      │                                       │ │
│ │                 │  │   ⑥ Report on your activity                  │ │
│ │                 │  │                                              │ │
│ │                 │  │ Assessment criteria                          │ │
│ │                 │  │ [AccordionList]                              │ │
│ │                 │  │ › Quality of the proposal                    │ │
│ │                 │  │ › Experience and track record                │ │
│ │                 │  │ › Audience and reach                         │ │
│ │                 │  │                                              │ │
│ │                 │  │ Past recipients                              │ │
│ │                 │  │ [3 recent recipient cards]                   │ │
│ │                 │  │ [ See all past recipients → ]                │ │
│ │                 │  │                                              │ │
│ │                 │  │ Frequently asked                             │ │
│ │                 │  │ [AccordionList — 5-8 FAQs]                   │ │
│ └─────────────────┘  └──────────────────────────────────────────────┘ │
├───────────────────────────────────────────────────────────────────────┤
│                                                                       │
│   eyebrow: SIMILAR FUNDS                                              │
│   You might also consider                                             │
│                                                                       │
│   ┌──────────────┐  ┌──────────────┐  ┌──────────────┐                │  ← 3 related funds
│   │ Quick        │  │ Toi Tō       │  │ International│                │
│   │ Response     │  │ Fund         │  │ Presentation │                │
│   │ [pill OPEN]  │  │ [pill OPEN]  │  │ [pill SOON]  │                │
│   └──────────────┘  └──────────────┘  └──────────────┘                │
│                                                                       │
├───────────────────────────────────────────────────────────────────────┤
│                                                                       │
│   ┌───────────────────────────────────────────────────────────┐       │
│   │  Ready to apply?                                          │       │  ← closing CTA band
│   │  [ Apply on the CNZ portal → ]                            │       │    paper-alt bg
│   │  or [ talk with an adviser ] first                        │       │
│   └───────────────────────────────────────────────────────────┘       │
│                                                                       │
├───────────────────────────────────────────────────────────────────────┤
│ [Footer]                                                              │
└───────────────────────────────────────────────────────────────────────┘
```

### 19.4.1 Fund detail annotations

- **Status pill colour:** green `--color-success` (Open), amber `--color-warning` (Closing ≤14 days), grey `--color-muted` (Closed/Upcoming).
- **Primary CTA logic:** renders only if `nextRound.status === "open"`. If closed: replaces with "See past results" linking to fundingResult. If upcoming: "Get notified" linking to newsletter with preselected topic.
- **EligibilityChecklist:** checkboxes are purely client-side — no data sent. After all are checked, reveals an "You’re likely eligible" state with the portal CTA. If any "not sure" is selected, reveals a "Talk with an adviser" panel.
- **ApplicationTimeline:** vertical stepper with time estimates. Each step is `role="listitem"`. Connector lines are `aria-hidden`.
- **Past recipients:** lazy-loaded (intersection-observer). Fallback is server-rendered for crawlers.

## 19.5 Funding calendar

```
┌──────────────────────────────────────────────────────────────────────────┐
│ [Header + Breadcrumb]                                                     │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│   eyebrow: ALL OPPORTUNITIES                                             │
│   Funding calendar                                                       │
│                                                                          │
│   All current and upcoming rounds in one place. Filter by artform,       │
│   applicant type, or deadline to find what applies to you.               │
│                                                                          │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│   ┌─────────────────────────────────────────────────────────────────┐    │
│   │ FILTERS                                              [Reset]    │    │
│   │                                                                 │    │
│   │ Status:    [○ All] [○ Open] [○ Closing soon] [○ Upcoming]       │    │  ← radio group
│   │                                                                 │    │
│   │ Artform:   [chip: Theatre ✕] [chip: Music ✕] [+ More ▾]         │    │  ← multi-select
│   │                                                                 │    │    as removable chips
│   │ Who for:   [chip: Individual artist ✕] [+ More ▾]               │    │
│   │                                                                 │    │
│   │ Amount:    [○ Any] [○ <$10k] [○ $10-50k] [○ $50k+]              │    │
│   │                                                                 │    │
│   │ Close by:  [date picker: __ / __ / ____]                        │    │
│   └─────────────────────────────────────────────────────────────────┘    │
│                                                                          │
│   Showing 12 of 47 funding rounds          [List] [Calendar]  Sort ▾    │  ← count + view +
│   aria-live region: "Filters applied. 12 rounds match."                  │    sort
│                                                                          │
├──────────────────────────────────────────────────────────────────────────┤
│  LIST VIEW                                                               │
│   ┌────────────────────────────────────────────────────────────────┐    │
│   │ [pill] CLOSING IN 7 DAYS                          [GRANT]      │    │  ← fund row card
│   │ Quick Response Grants — Round 3                                │    │
│   │ Up to $3,500  •  Individual artists  •  All artforms           │    │
│   │ Closes 5pm NZT, 12 June 2026                                   │    │
│   │                                           [ See details → ]    │    │
│   └────────────────────────────────────────────────────────────────┘    │
│   ┌────────────────────────────────────────────────────────────────┐    │
│   │ [pill] OPEN                                  [INVESTMENT]      │    │
│   │ Toi Uru Kahikatea — Annual application                         │    │
│   │ Multi-year investment  •  Arts organisations                   │    │
│   │ Closes 5pm NZT, 30 June 2026                                   │    │
│   │                                           [ See details → ]    │    │
│   └────────────────────────────────────────────────────────────────┘    │
│   ┌────────────────────────────────────────────────────────────────┐    │
│   │ [pill] UPCOMING                                [FELLOWSHIP]    │    │
│   │ Katherine Mansfield Menton Fellowship                          │    │
│   │ $85,000  •  Literature writers                                 │    │
│   │ Opens 1 August 2026                                            │    │
│   │                                           [ See details → ]    │    │
│   └────────────────────────────────────────────────────────────────┘    │
│                                                                          │
│   [ Load more (35 remaining) ]                                           │
│                                                                          │
│ ─── OR — CALENDAR VIEW ──                                                │
│                                                                          │
│          J──F──M──A──M──J──J──A──S──O──N──D                              │  ← 12-month strip
│   Arts  ░░░░░░███████████████░░░░░░░░░░░░                                │    each row = one
│   Grants  opens     closes                                               │    fund with its
│                                                                          │    open window
│   Toi    ░░░░░░░░░░░░░░██░░░░░░░░░░░░░░░░                                │    rendered as bar
│   Uru                                                                    │
│   Kah.                                                                   │
│                                                                          │
│   (Click a bar to see fund detail)                                       │
│                                                                          │
├──────────────────────────────────────────────────────────────────────────┤
│ [Footer]                                                                 │
└──────────────────────────────────────────────────────────────────────────┘
```

### 19.5.1 Empty states

```
NO RESULTS (filters too narrow):
┌────────────────────────────────────────────────────────────────┐
│  No funding rounds match your filters.                         │
│                                                                │
│  Try removing an artform, switching status to "All", or        │
│  checking the calendar view for upcoming rounds.               │
│                                                                │
│  [ Reset all filters ]                                         │
└────────────────────────────────────────────────────────────────┘
 
ZERO OPEN ROUNDS (system-wide, rare):
┌────────────────────────────────────────────────────────────────┐
│  There are no open funding rounds right now.                   │
│                                                                │
│  Our next round opens [date] — sign up to be notified.         │
│  [ Subscribe for updates ]    [ See past results ]             │
└────────────────────────────────────────────────────────────────┘
```

## 19.6 Site footer (referenced by all templates)

```
┌──────────────────────────────────────────────────────────────────────────┐
│ [full-bleed ink band, ~480px tall desktop, ~680px mobile stacked]         │
│                                                                          │
│   ┌─────────────────────┬─────────────────┬─────────────────┐            │
│   │ [LOGO white on ink] │ FUNDING         │ DEVELOPMENT     │            │  ← 4-col desktop
│   │                     │ ─────────       │ ─────────       │            │    1-col mobile
│   │ Arts Council of     │ Early career    │ Nui te Kōrero   │            │
│   │ New Zealand         │ Artists         │ Toolkits        │            │
│   │ Toi Aotearoa        │ Organisations   │ Research        │            │
│   │                     │ Funding         │ Ko Aotearoa     │            │
│   │ Level 5, 131        │ calendar        │ me ōna Toi      │            │
│   │ Cuba Street         │ Advice          │                 │            │
│   │ Te Whanganui-       │ Results         │                 │            │
│   │ a-Tara Wellington   │                 │                 │            │
│   │                     ├─────────────────┼─────────────────┤            │
│   │ +64 4 473 0880      │ ADVOCATING      │ ABOUT CNZ       │            │
│   │ info@creativenz...  │ ─────────       │ ─────────       │            │
│   │                     │ Advocacy tools  │ What we do      │            │
│   │ ↗ Facebook          │ Our work        │ Our Council     │            │
│   │ ↗ LinkedIn          │ Te Rōpū Mana    │ The team        │            │
│   │ ↗ Instagram         │ Toi             │ Corporate docs  │            │
│   │ ↗ YouTube           │                 │ Contact us      │            │
│   │                     │                 │ Work for us     │            │
│   └─────────────────────┴─────────────────┴─────────────────┘            │
│                                                                          │
│   ┌──────────────────────────────────────────────────────────────────┐   │
│   │  Sign up for our newsletter                                      │   │
│   │  [email input]  [ Subscribe ]                                    │   │
│   │  Our privacy policy explains how we use your email.              │   │
│   └──────────────────────────────────────────────────────────────────┘   │
│                                                                          │
│ ─────────────────────────────────────────────────────────────────────    │
│                                                                          │
│  [LOTTO        ]    [MANATŪ      ]    [NZ GOVT    ]                      │  ← sponsor row
│  [GRANTS LOGO  ]    [TAONGA LOGO ]    [LOGO       ]                      │    white-on-ink
│                                                                          │
│ ─────────────────────────────────────────────────────────────────────    │
│                                                                          │
│  © 2026 Creative New Zealand Toi Aotearoa                                │  ← utility row
│  Privacy · Accessibility · Copyright · Site map   ·  EN | Māori          │    flex between
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘
```

### 19.6.1 Footer rules

- Sponsor logos are white-on-ink variants — request them from CNZ if the supplied assets are coloured.
- Utility row must include, in this order: Privacy · Accessibility · Copyright · Site map · Language toggle.
- **Address formatting:** te reo place name first when bilingual ("Te Whanganui-a-Tara Wellington").
- Social links open in same tab (matching gov.uk patterns). Use rel="noopener" only for external links that could be used for window-opener attacks — these are safe destinations.
- Newsletter signup here reuses the NewsletterSignup component. Background on ink panel inverts to paper text-on-ink input.

## 19.7 Header / primary navigation (all templates)

### Desktop states

```
DEFAULT (at top of page):
┌─────────────────────────────────────────────────────────────────────┐
│ [LOGO]   Funding ▾   Advocating ▾   Development ▾   About ▾   News  │  [🔍]  [Mi]  [Sign in]
└─────────────────────────────────────────────────────────────────────┘
  Height: 80px, padding 24px, transparent background.
 
SCROLLED (any scroll > 80px):
┌─────────────────────────────────────────────────────────────────────┐
│ [LOGO]   Funding ▾   Advocating ▾   Development ▾   About ▾   News  │  [🔍]  [Mi]  [Sign in]
└─────────────────────────────────────────────────────────────────────┘
  Height: 64px, padding 16px, paper/95 + backdrop-blur, subtle shadow.
 
HOVER on "Funding ▾":
┌─────────────────────────────────────────────────────────────────────┐
│ [LOGO]   Funding ▼   Advocating ▾ ...                               │
└─────────────────────────────────────────────────────────────────────┘
┌───────────────────────────────────────────────────────────────────────┐
│  MEGA-MENU                                                            │  ← below header
│  ┌───────────────────────┬───────────────────────┬────────────────┐   │    full-bleed
│  │ I AM                  │ OPPORTUNITIES         │ SUPPORT        │   │    max-h 80vh
│  │                       │                       │                │   │    paper/98 + shadow
│  │ Early career artist   │ Funding calendar      │ Advice & help  │   │
│  │ Artist or practit.    │ All opportunities     │ Talk w adviser │   │
│  │ Arts organisation     │ Other sources         │ Portal help    │   │
│  │                       │                       │                │   │
│  │                       │                       │ Investment     │   │
│  │                       │                       │ programme      │   │
│  │                       │                       │ guidelines     │   │
│  ├───────────────────────┴───────────────────────┴────────────────┤   │
│  │ FEATURED  [card w/ koru]  Closing this week →                  │   │
│  │                                                                 │   │
│  └─────────────────────────────────────────────────────────────────┘   │
└───────────────────────────────────────────────────────────────────────┘
```

### Mobile (<1024px) states

```
CLOSED:
┌───────────────────────────────────────┐
│ [≡]  [LOGO]            [🔍]  [Sign ▸] │
└───────────────────────────────────────┘
 
OPEN — off-canvas slide-in from left:
┌───────────────────────────────────────┐
│ [LOGO]                            [✕] │
├───────────────────────────────────────┤
│                                       │
│  [🔍 Search...                      ] │  ← search input top
│                                       │
│  [ Mi | En ]                          │  ← language toggle
│                                       │
│ ─────────────────────────────────     │
│                                       │
│  FUNDING AND SUPPORT ▾                │  ← collapsible L1
│    Early career artists               │     tap to expand
│    Artists & practitioners            │     L2 indented
│    Arts organisations                 │
│    All opportunities  ▸               │  ← tap to go deeper
│    Advice & support  ▸                │
│    Results  ▸                         │
│                                       │
│  ADVOCATING FOR THE ARTS ▸            │
│                                       │
│  DEVELOPMENT AND RESOURCES ▸          │
│                                       │
│  ABOUT CREATIVE NZ ▸                  │
│                                       │
│  NEWS AND BLOG                        │
│                                       │
│ ─────────────────────────────────     │
│                                       │
│  [ Sign in to the portal → ]          │
│                                       │
│ ─────────────────────────────────     │
│                                       │
│  Contact us                           │
│  Privacy  ·  Accessibility            │
│                                       │
└───────────────────────────────────────┘
```

### 19.7.1 Header/nav rules

- **Radix NavigationMenu** for desktop. Arrow keys move between L1 items; Enter opens mega-menu; Esc closes.
- **Radix Sheet** for mobile. Focus trap inside sheet; Esc closes and returns focus to the menu trigger; route change closes automatically.
- **Search icon button** opens a full-width search modal (not an inline input) — more room for autocomplete.
- **Sign in** is a link to the portal, not a local auth flow. On mobile it is moved to the drawer for balance.
- **Announcement banner** sits above the header, dismissible, `role="status"` for screen readers.
