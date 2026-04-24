# 01 — Overview

## Executive summary

**Rebuild creativenz.govt.nz** — the public-facing marketing and information site of the Arts Council of New Zealand Toi Aotearoa — as a modern, accessible, bilingual (English and te reo Māori) site on Next.js 15 with TypeScript and Tailwind, backed by a headless CMS, while preserving the existing information architecture and the brand's koru-based visual identity.

### Ground rules

1. **This is a NZ Government site.** It must meet WCAG 2.2 AA (mandatory under the NZ Web Accessibility Standard 1.2, effective 17 March 2025). No shortcuts.
2. **Bilingual is a first-class requirement, not a bolt-on.** Te reo Māori content must be correctly marked up with `lang="mi"` and macrons preserved.
3. **Brand discipline.** The site uses minimal imagery by design — CNZ's brand must support, not compete with, the artists it funds. Don't reach for stock photos. The koru spiral is the primary visual motif.
4. **Preserve URLs where possible.** The current site has deep SEO equity. Any URL change needs a 301.
5. **The portal is out of scope.** `portal.creativenz.govt.nz` is a separate Dynamics 365 application for grant applications. We link to it; we don't rebuild it.
6. **Don't invent content.** Where copy is unknown, leave a clear `[CONFIRM]` placeholder. Don't hallucinate funding programme details, council member names, etc.

### Definition of done

- All IA preserved per the sitemap below.
- WCAG 2.2 AA passing on every template (tested with axe, manual keyboard, and screen reader).
- Lighthouse ≥ 95 Performance, 100 Accessibility, 100 Best Practices, 100 SEO on home, a content page, and a listing page.
- Page-weight budget met: ≤ 150KB critical CSS, ≤ 200KB JS on a content page.
- CMS authoring works end-to-end for every content type.
- 301 redirect map deployed for any changed URLs.
- Te reo Māori toggle works and is screen-reader announced.

## Product brief

### What Creative New Zealand does

Creative New Zealand (CNZ) is the Arts Council of New Zealand Toi Aotearoa — the national arts development agency. It's an autonomous Crown entity established in 1994, replacing the Queen Elizabeth II Arts Council. It funds individual artists, practitioners, groups, and arts organisations; builds capability across the arts sector; runs an international programme (residencies, exchanges, market development); and advocates for the arts with government, councils, and the public.

CNZ has approximately 85 staff across Wellington (HQ), Auckland, and Dunedin. Income comes from Crown funding plus Lotto grants. It funds across theatre, dance, music, literature, visual arts, craft/object, ngā toi Māori, Pacific arts, media arts, and inter- and multi-disciplinary work.

### Why the site is being rebuilt

The current site was built by Chrometoaster on Sitecore. It works but shows its age: dated typography, a quirky left-hand navigation that doesn't scale well, an image-light aesthetic that reads as austere rather than refined, and a tech stack that makes editorial iteration slow. Specific pain points to address:

- **Findability** — funding opportunities are the most important content; surfacing the right one for the right audience is currently too many clicks.
- **Mobile-first experience** — current mobile nav reuses the desktop pattern and feels bolted on.
- **Editorial velocity** — news and blog posts are the primary signal of life; authoring needs to be fast for a comms team.
- **Accessibility** — current site has known WCAG gaps (e.g. focus management in the accordion nav).
- **Bilingual readiness** — CNZ's strategic direction includes more te reo Māori on the site; the current IA doesn't model bilingual content well.

### Primary audiences (in order of traffic importance)

1. **Artists and practitioners applying for funding.** Biggest group. They land via search, find the right fund, read eligibility, and go to the portal to apply.
2. **Arts organisations.** Toi Tōtara Haemata and Toi Uru Kahikatea investment programmes. Smaller group, higher-value transactions, need detailed guidelines and reporting docs.
3. **Early career artists.** Distinct nurturing journey, often first-time applicants.
4. **The sector and advocates.** Use the site for research, advocacy tools, and to cite CNZ positions.
5. **Media and the general public.** Read news/blog; look up council members, contact info, annual reports.
6. **Government and councils.** Look up submissions, corporate documents, strategic direction.

### Primary jobs-to-be-done (ranked by volume)

1. "Is there a fund I can apply to?" → funnel into one of the three audience-group landing pages, or the funding calendar.
2. "Am I eligible?" → applicant-types page and specific fund pages.
3. "When does it close?" → funding calendar, prominent deadlines on fund pages.
4. "How do I apply?" → portal hand-off with clear pre-application guidance.
5. "Did I get funded? Who got funded?" → results pages.
6. "What's CNZ's position on X?" → corporate documents, news, submissions.
7. "How do I contact the right person?" → contact page with artform-specific advisers.

### Business goals

- Reduce time-to-find for "which fund applies to me" by ≥ 40% (measured via funnel analytics).
- Reduce support emails answering FAQ-level questions by ≥ 25%.
- Lift mobile conversion to portal by ≥ 50%.
- Achieve and maintain WCAG 2.2 AA compliance per NZ Government Web Accessibility Standard 1.2.
- Support a bilingual roadmap: English-first today, expandable to full te reo Māori parity without a re-platform.
- Cut editorial turnaround on a news post from current (~hours) to under 15 minutes.

### Out of scope

- **The grants portal** at `portal.creativenz.govt.nz` (Dynamics 365 / Power Platform) — we link to it, we don't touch it.
- **The internal staff intranet** (if any).
- **Sponsor sites** (Lotto, Manatū Taonga / Ministry for Culture and Heritage) — we only need their logos in the footer.
- **Sister entity sites** — NZ Film Commission, NZSO, Te Matatini, etc. all have their own sites and aren't CNZ's responsibility.

## Current site audit

### Platform observations

- **CMS:** Sitecore (evident from `/-/media/` asset URLs and content item ID structure).
- **Hosting:** Likely IIS-based; no obvious CDN signature on asset URLs.
- **Design agency of record (historical):** Chrometoaster (Auckland).

### What works and must be preserved

- **Audience-first funding entry** — the three big tiles on `/funding-and-support` (Early career / Artists and practitioners / Organisations and groups) are a strong mental model and conversion.
- **Clear section landers.** Each L1 page lists L2s with a sentence of context — good for an information-dense site.
- **Prominent "Speak with an adviser" path.** Good for equity — not all applicants are equally confident with online forms.
- **Single footer logo row** for government ancestry: Lotto Grants, Manatū Taonga, NZ Government. Correct and mandatory.

### What hurts and should change

- Dominant left-hand drawer nav that covers most of the viewport when open — disorienting, heavy, and mobile behaviour mirrors desktop poorly.
- No persistent header/footer CTA to the portal for return applicants.
- News index is bare — no featured items or filters resolve at load; placeholder-heavy.
- Breadcrumbs exist but are visually weak.
- Card imagery is inconsistent — some sections use the koru panels, others don't.
- Accordion disclosure is the default interaction pattern everywhere on mobile; hides too much.
- Search is present but results quality is unclear; no scoped/faceted search over funds.

## Full sitemap

Preserve every URL. If renaming, add a 301.

```
/                                    Home
/funding-and-support                 [L1] Funding and support
/advocating-for-the-arts             [L1] Advocating for the arts
/development-and-resources           [L1] Development and resources
/about-creative-nz                   [L1] About Creative NZ
/news-and-blog                       [L1] News and blog
/search                              Site search
/site-map                            Site map
/privacy                             Privacy
/accessibility                       Accessibility statement
/copyright                           Copyright statement

portal.creativenz.govt.nz            Grants portal (OUT OF SCOPE)
```

### Funding and support — full tree

```
/funding-and-support
├── /early-career-artists
├── /artists-and-practitioners
├── /arts-organisations-and-groups
├── /all-opportunities
│   ├── /funding-calendar
│   └── /other-sources-of-funding-and-support
├── /advice-and-support
│   ├── /before-you-apply
│   │   ├── /applicant-types
│   │   └── /terms-and-conditions-of-funding
│   ├── /making-an-application
│   │   └── /use-of-artificial-intelligence
│   ├── /if-you-receive-funding
│   │   ├── /add-an-activity-record-to-your-report
│   │   ├── /activity-details-and-statistics
│   │   ├── /how-to-count-activity-statistics
│   │   └── /creative-new-zealand-logos
│   ├── /talk-with-an-adviser
│   │   ├── /webinars-and-q-and-a
│   │   └── /supported-application-service
│   ├── /cnz-portal-help
│   │   ├── /manage-my-cnz-account
│   │   ├── /apply
│   │   ├── /report
│   │   └── /assess
│   └── /investment-programme-guidelines
│       ├── /submit-your-programme-and-budget
│       ├── /6-month-reports
│       ├── /development-goals
│       ├── /financial-year-end-reports
│       └── /assessment-criteria
├── /sustainable-careers
│   ├── /make-connections
│   ├── /navigate-the-law
│   └── /navigate-your-finances
├── /results
│   ├── /funding-rounds
│   ├── /investment-programmes-toi-totara-haemata-and-toi-uru-kahikatea
│   ├── /award-winners
│   │   ├── /arts-pasifika-awards
│   │   ├── /prime-ministers-awards-for-literary-achievement
│   │   └── /te-waka-toi-awards
│   └── /bursaries-fellowships-scholarships-and-residencies
│       ├── /banff-centre-indigenous-arts-residencies
│       ├── /berlin-visual-arts-residency
│       ├── /berlin-writers-residency
│       ├── /blumhardt-curatorial-internship
│       ├── /butland-music-scholarship
│       ├── /creative-new-zealand-choreographic-fellowship
│       ├── /creative-new-zealand-craft-object-fellowship
│       ├── /creative-new-zealand-michael-king-writers-fellowship
│       ├── /creative-new-zealand-samoa-artist-in-residence
│       ├── /edwin-carr-foundation-scholarship
│       ├── /fulbright-pacific-writers-residency
│       ├── /jack-mcgill-music-scholarship
│       ├── /katherine-mansfield-menton-fellowship
│       ├── /louis-johnson-new-writers-bursary
│       ├── /new-york-visual-arts-residency-iscp
│       ├── /new-zealand-aotearoa-music-scholarships
│       ├── /todd-new-writers-bursary
│       ├── /toi-sgwigwialtxw-residency-north-america
│       └── /tup-lang-choreographic-award
└── /our-change-journey
```

### Advocating for the arts — full tree

```
/advocating-for-the-arts
├── /advocacy-tools-and-research
│   ├── /a-guide-for-arts-advocates
│   ├── /arts-funding-101
│   ├── /fact-finder
│   ├── /how-you-can-advocate
│   ├── /how-to-make-a-submission-on-local-council-plans
│   └── /creative-new-zealand-submissions-to-councils
├── /our-advocacy-work
└── /our-advisory-group                 (Te Rōpū Mana Toi)
```

### Development and resources — full tree

```
/development-and-resources
├── /new-zealanders-and-the-arts----ko-aotearoa-me-ona-toi
│   └── /past-reports
├── /sustainable-careers-resources
│   ├── /make-connections
│   ├── /navigate-the-law
│   └── /navigate-your-finances
├── /nui-te-korero
│   ├── /speakers
│   ├── /accessibility-guide
│   ├── /key-information-and-faqs
│   └── /accommodation
├── /toolkits
│   ├── /community-arts-toolkit
│   │   ├── /projects-to-inspire
│   │   ├── /what-makes-a-strong-community-arts-project
│   │   ├── /resources-to-develop-your-project
│   │   ├── /funding-your-project
│   │   └── /support-and-networks
│   ├── /risk-management-toolkit
│   ├── /volunteer-management-toolkit
│   └── /donations-toolkit
│       ├── /find-the-right-donor
│       ├── /how-to-talk-to-possible-donors
│       ├── /keeping-your-donors-happy
│       ├── /tax-incentives-for-individuals
│       ├── /tax-incentives-for-company-donors
│       ├── /checklist-for-accepting-donations
│       ├── /links-to-more-advice
│       └── /understand-tax-language
└── /research-and-reports
```

### About Creative NZ — full tree

```
/about-creative-nz
├── /what-we-do
├── /our-change-journey
├── /our-vision-and-values
├── /our-council
├── /the-team
├── /corporate-documents
├── /requesting-information
├── /making-a-complaint
├── /work-for-us
└── /contact-us
```

### News and blog

```
/news-and-blog
└── /{year}/{month}/{day}/{hh}/{mm}/{ss}/{slug}       Article detail (CURRENT)
```

**Recommendation:** switch to `/news/{year}/{slug}` going forward; redirect old URLs. Confirm with stakeholders.

## IA changes recommended (discuss before implementing)

1. **Promote Funding calendar to primary nav.** It's the single highest-value utility for repeat users.
2. **Resolve Sustainable careers duplication.** Currently exists under both `/funding-and-support/sustainable-careers/` and `/development-and-resources/sustainable-careers-resources/`. Pick one; 301 the other.
3. **Add a dedicated Ngā Toi Māori landing page** as a first-class destination (currently ngā toi Māori threads through many pages but has no home).
4. **Add a dedicated Pacific Arts landing page** for parity.

## Next.js app router structure

```
app/
├── (site)/
│   ├── page.tsx                              /
│   ├── funding-and-support/
│   │   ├── page.tsx                          /funding-and-support
│   │   ├── [audienceGroup]/page.tsx          early-career-artists, artists..., organisations...
│   │   ├── all-opportunities/
│   │   │   ├── page.tsx
│   │   │   ├── funding-calendar/page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── advice-and-support/
│   │   │   └── ...
│   │   └── results/
│   │       ├── page.tsx
│   │       ├── funding-rounds/page.tsx
│   │       ├── award-winners/[slug]/page.tsx
│   │       └── bursaries-fellowships.../[slug]/page.tsx
│   ├── advocating-for-the-arts/...
│   ├── development-and-resources/...
│   ├── about-creative-nz/...
│   └── news-and-blog/
│       ├── page.tsx                          listing + filters
│       └── [...slug]/page.tsx                article detail
├── search/page.tsx
├── site-map/page.tsx
├── sitemap.ts                                dynamic XML sitemap
├── robots.ts
└── layout.tsx
```
