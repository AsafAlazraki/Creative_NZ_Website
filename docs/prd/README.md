# Creative New Zealand Website Rebuild — PRD

This folder is the full specification for rebuilding `creativenz.govt.nz`, intended for execution by Claude Code.

## How to use this

Read files in order (01 → 27). They build on each other. For the initial build pass, section 27 (`27-handoff-checklist.md`) is the ordered execution plan — follow it.

The `code/` subfolder contains drop-in files for the repo — `package.json`, configs, Sanity schemas, API routes, CI workflow, etc. Copy these to the repo root (not kept here) as part of the build.

The `assets/` subfolder contains brand assets sourced from the live site. These are starting points — request higher-resolution vector versions from CNZ per section 22.

## Ground rules (non-negotiable)

1. **WCAG 2.2 AA** compliance. NZ Government Web Accessibility Standard 1.2 requires it. No shortcuts.
2. **Bilingual first-class.** Every te reo Māori word marked with `lang="mi"`. Macrons required.
3. **Don't invent CNZ-specific facts.** Fund amounts, adviser names, Council members, exact legal terms. Every unknown is marked `[CONFIRM]` in the copy drafts — flag to product owner, do not guess.
4. **The portal is out of scope.** `portal.creativenz.govt.nz` is a separate Dynamics 365 product. Link to it, don't rebuild it.
5. **Preserve URLs where possible.** Deep SEO equity. Any URL change needs a 301.

## File index

| # | File | What it covers |
|---|------|----------------|
| 01 | overview.md | Executive summary, product brief, current-site audit, full sitemap |
| 02 | brand-and-design.md | Brand positioning, logo rules, koru motif, voice, design tokens |
| 03 | tech-stack.md | Next.js 15 + Tailwind v4 + Sanity + Vercel. Folder layout. Perf budgets |
| 04 | components.md | 38-component inventory. State matrices for every interactive component |
| 05 | page-templates.md | 7 templates with ASCII wireframes |
| 06 | cms-schemas.md | Sanity content model in prose. Drop-in code in `code/schemas/` |
| 07 | search.md | Pagefind for site search. Client-side filtering for funding calendar |
| 08 | integrations.md | Mailchimp, Resend, Plausible, Sentry, portal link scheme |
| 09 | bilingual-and-voice.md | Te reo handling, voice rules, copy patterns |
| 10 | accessibility.md | WCAG 2.2 AA checklist mapped to implementation |
| 11 | content-inventory.md | Every page to migrate, by priority |
| 12 | migration.md | Sitecore → new CMS. Transform pipeline. Redirects. Te reo dictionary |
| 13 | roadmap.md | 8-phase, 14-18 week delivery plan |
| 14 | fund-finder.md | Stepper UX, scoring algorithm, analytics |
| 15 | copy-framework.md | Page-archetype templates. UI copy library |
| 16 | home-deep-spec.md | Home page zone-by-zone |
| 17 | forms.md | Every form, field by field, with validation |
| 18 | empty-states.md | 404, 500, offline, zero-results, missing translation |
| 19 | mobile.md | Breakpoint strategy, mobile-specific patterns |
| 20 | analytics.md | Event taxonomy, dashboards, privacy |
| 21 | editor-docs.md | CMS authoring handbook for CNZ staff |
| 22 | brand-assets.md | What to request from CNZ's brand guardian |
| 23 | testing.md | Unit, integration, E2E, UAT scripts, launch sign-off |
| 24 | launch-governance.md | Comms plan, training, post-launch roles |
| 25 | open-questions.md | Everything needing CNZ decision. Single consolidated list |
| 26 | body-copy-drafts.md | Draft copy for every significant page. Biggest file |
| 27 | handoff-checklist.md | Ordered execution plan. Start here |

## Known unknowns — flag these; don't guess

- Exact brand typography (assumption: Source Serif 4 + Inter) — confirm against CNZ brand book.
- Exact brand hex values — sampled from the live site; confirm against guidelines.
- Body copy for every page — migrate 1:1 from existing pages unless the editor signals otherwise.
- CMS choice — Sanity recommended; confirm data residency.
- Photography library — not public; the site is intentionally image-light; any new imagery needs product-owner sign-off.

## Document version

1.2 — April 2026. Derived from direct audit of `creativenz.govt.nz`, NZ Government Web Accessibility Standard 1.2, WCAG 2.2 AA.
