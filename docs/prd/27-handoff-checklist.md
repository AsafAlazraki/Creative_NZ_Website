# 27 — Claude Code Handoff Checklist

Everything Claude Code should do to turn this PRD into a running staging site. In order.

## 38.1 Repository setup

1. Create Next.js 15 project: `pnpm create next-app@latest creativenz --ts --app --tailwind --no-src-dir`.
1. Copy in the configs from section 34 (package.json, tsconfig, next.config, tailwind.config, globals.css).
1. Add .env.example from section 34.17.
1. Create .github/workflows/ci.yml and lighthouserc.json from 34.18-19.
1. Create the folder structure in section 6.5.
1. `pnpm install`.
1. `pnpm dev` — confirm Next boots.

## 38.2 Design system and layout

1. Confirm globals.css design tokens render (paper background, ink text, fonts loaded).
1. Build layout primitives: Container, Prose, SiteHeader, SiteFooter, SkipLink, Breadcrumb.
1. Test skip link works via keyboard (Tab on fresh page).

## 38.3 CMS

1. Set up Sanity project; note the projectId.
1. Implement all schema files from section 34.12.
1. Seed reference data: artforms, applicantTypes, newsCategories, sections (per section 14.7).
1. Create globalSettings singleton with placeholder values (section 14.8).
1. Deploy Studio to sanity.studio with a CNZ-scoped URL.
1. Set up the Sanity webhook → /api/revalidate with the shared secret.

## 38.4 Page templates and routes

1. Implement `app/(site)/page.tsx` (Home) with static content for first pass.
1. Implement `app/(site)/[...slug]/page.tsx` as a catch-all content page template reading from Sanity via `getPage`.
1. Implement `app/(site)/funding-and-support/[slug]/page.tsx` for fund detail.
1. Implement `app/(site)/funding-and-support/all-opportunities/funding-calendar/page.tsx`.
1. Implement `app/(site)/news/[year]/[slug]/page.tsx` for articles.
1. Implement `app/(site)/news-and-blog/page.tsx` for news listing.
1. Implement `app/(site)/search/page.tsx` with Pagefind.

## 38.5 Components

1. Install shadcn/ui: `npx shadcn@latest init`.
1. Add base shadcn components: button, input, label, textarea, select, checkbox, radio-group, accordion, tabs, dialog, sheet, sonner, tooltip.
1. Build CNZ-specific components per section 7 inventory (all 38). State matrices per section 20.
1. Build FundFinder per section 21.
1. Build FundingCalendar per section 19.5.

## 38.6 Bilingual

1. Implement `app/(site)/mi/` parallel route group.
1. Implement LangToggle component with `aria-live` announcement.
1. Implement translation fallback banner per section 25.5.
1. Install Portable Text renderer with te reo mark support.

## 38.7 Forms and integrations

1. Implement all API routes from sections 34.13-16.
1. Build form components (react-hook-form + zod) for contact, newsletter, OIA, complaint, enquiry.
1. Wire `/api/newsletter` to Mailchimp list `817361bc26`.
1. Wire `/api/contact` to Resend.
1. Add Plausible script in layout.
1. Wire Sentry with @sentry/nextjs.
1. Ensure `/api/healthz` returns 200.

## 38.8 Migration

1. Request Sitecore export from CNZ IT (Option A in section 15.2).
1. If denied: run the scrape script (Option B) against the live site.
1. Run transform script with te reo dictionary (section 37) and generate Sanity `.ndjson`.
1. `sanity dataset import content-import.ndjson production`.
1. Run news-redirect generator (section 36.2).
1. Commit final `content/redirects.json`.
1. Spot-check 10 random pages against live site for fidelity.

## 38.9 Accessibility + performance

1. Add axe test suite against every template (section 13.6).
1. Confirm Lighthouse budgets pass on home, content page, listing.
1. Manual keyboard walkthrough.
1. NVDA + VoiceOver test on home + fund detail + news article.
1. 400% zoom test.

## 38.10 Pre-launch

1. Deploy to staging.creativenz.govt.nz (password-protected).
1. CNZ review content.
1. External accessibility audit.
1. Resolve audit findings.
1. UAT per section 30.7.
1. Run launch checklist (section 30.8).

## 38.11 Launch

1. Content freeze on Sitecore.
1. Final content sync.
1. DNS cutover.
1. Smoke test from multiple regions.
1. Monitor Sentry, uptime, Search Console for 48 hours.

## 38.12 Things Claude Code specifically should NOT do

- **Invent CNZ-specific facts.** Fund amounts, adviser names, Council member names, exact strategy statements, legal terms, contact details beyond the known +64 4 473 0880 / info@creativenz.govt.nz — ALL need CNZ input. Every such placeholder is marked CONFIRM in section 35.
- **Publish te reo Māori translations unreviewed.** Human translator sign-off before anything hits production.
- **Modify the Terms and Conditions text.** That’s legal content — migrate verbatim, don’t rewrite.
- **Delete old content.** The existing Sitecore site stays live (unmapped) for 30 days post-cutover per section 15.9.
- **Touch the portal.** `portal.creativenz.govt.nz` is entirely out of scope. Only link to it.
- **Ship without the accessibility audit.** It’s legally required under NZ Government Web Accessibility Standard 1.2. No exceptions for deadline pressure.
**End of Claude Code handoff.**
