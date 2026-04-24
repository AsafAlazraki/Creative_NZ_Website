# 23 — Testing Plan (Beyond Accessibility)

Full QA framework. Accessibility testing lives in section 13; this section covers functional, performance, visual, and UAT testing.

## 30.1 Unit tests

- **Tool:** Vitest.
- **Scope:** pure functions (scoring algorithms, formatters, validators, redirect resolution).
- **Coverage target:** 80% on `lib/` directory. Not enforced site-wide — components are better integration-tested.
- **Run:** every PR; fast (<10s).

## 30.2 Integration / component tests

- **Tool:** Playwright Component Testing.
- **Scope:** components with interaction — FundFinder, FilterBar, Forms, MobileNav.
- **Assertions:** render correctly; respond to user input; ARIA state correct; keyboard works.

## 30.3 End-to-end tests

- **Tool:** Playwright.
- **Key flows:** see matrix below.

| **Flow** | **Steps** |
| --- | --- |
| Find funding as a new artist | Home → three-door grid → Artists & practitioners → fund listing → fund detail → portal CTA |
| Use Fund Finder | Start finder → complete 4 steps → see results → click a result → land on fund detail |
| Filter funding calendar | Calendar page → apply 2 filters → assert result count updates → reset filters |
| Subscribe to newsletter (happy path) | Footer → enter email → submit → see success → inbox receives confirmation |
| Subscribe to newsletter (invalid email) | Enter "foo" → submit → see inline error → no network call |
| Submit contact form | Contact page → fill required → submit → land on thanks page → reference in URL |
| Switch language | Any page → toggle to Mi → URL updates → content updates → aria-live announces |
| Search site | Header search → query → results page → click result → land on target page |
| Read an article | Home → featured story → article page → scroll to 90% → event fires |
| 404 then recover | Visit bad URL → see 404 → click "Funding" → land on funding section |

- **Run:** on every PR preview URL; again against staging; again post-deploy smoke (critical-path subset).

## 30.4 Performance testing

- **Lighthouse CI:** on every PR. Budgets enforced (section 6.6).
- **Web Vitals monitoring:** Plausible + Vercel Analytics.
- **Load testing:** before launch, simulate 500 concurrent users with `k6`. Static site should handle this trivially; test to confirm.

## 30.5 Visual regression testing

- **Tool:** Playwright screenshots + a diff engine (e.g. pixelmatch).
- **Scope:** each top template at mobile and desktop breakpoints.
- **Acceptance:** pixel diff < 0.1%. Reviewer approves intentional changes.

## 30.6 Browser compatibility

| **Browser** | **Versions supported** |
| --- | --- |
| Chrome | Latest + 2 back |
| Firefox | Latest + 2 back |
| Safari | Latest + 1 back (macOS and iOS) |
| Edge | Latest + 2 back |
| IE 11 | NOT supported — 2020+ modern baselines only |
| Legacy Android browsers | Chromium-based only |

## 30.7 User acceptance testing (UAT)

Script-based testing with real CNZ users before launch. Target participants:

- 3 early-career artists.
- 3 mid-career practitioners.
- 2 arts organisation administrators.
- 1 CNZ arts adviser (internal).
- 1 user of assistive technology.
Tasks:

1. "You’ve just graduated and are looking for your first grant. Find one that might fit you."
1. "You want to apply for funding for a new music project. Find the fund and figure out how to apply."
1. "Your arts organisation has a funding deadline next month. Find it on the site and check eligibility."
1. "Find out who to contact about a theatre project idea."
1. "Switch the site to te reo Māori. What changes?"
1. "Subscribe to the newsletter."
Success criteria: task completion ≥ 80% for each task. Time-on-task within 1.5× expected baseline.

## 30.8 Launch sign-off checklist

1. All unit tests passing.
1. All integration + E2E tests passing on staging.
1. Lighthouse budgets met on home, content page, listing.
1. axe-core: zero violations on every template.
1. External accessibility audit complete; all findings remediated.
1. UAT completed; critical issues resolved.
1. 301 redirect map deployed; smoke test passes.
1. Analytics events firing; dashboards verified.
1. Sentry DSN set; test error captured.
1. Uptime probe hitting /api/healthz.
1. Newsletter signup E2E test passes against production Mailchimp list.
1. Search index rebuilt and functional on staging.
1. OG images tested via opengraph.xyz for top 10 URLs.
1. Sitemap + robots deployed.
1. Legal sign-off on privacy / accessibility / copyright.
1. CNZ comms team trained on CMS.
1. Rollback plan documented and tested.
