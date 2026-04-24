# 08 — Integrations

Third-party systems we talk to. Keep this list short and guarded.

## 11.1 Grants portal

- **What:** Existing Dynamics 365 / Power Platform application at `portal.creativenz.govt.nz` for grant applications, reporting, and assessor workflow.
- **Our responsibility:** Link to it; do not embed it.
- **Entry points:** Header "Register / Sign in"; PortalCTA on every fund detail page, deep-linked to the specific fund form when possible; `/funding-and-support/advice-and-support/cnz-portal-help/*` pages are our user-facing guidance.
- **No SSO** from the marketing site. Users log in on the portal.
- **Do not** scrape or iframe the portal. Separate product with its own governance.

## 11.2 Mailchimp — newsletter

- **Existing list IDs** (from current site): Account `8b885a8ef81783c75c1d9cc8f`, List `817361bc26`.
- **Implementation:** `NewsletterSignup` posts to `/api/newsletter`. Server handler hits Mailchimp Members API. Returns success | already_subscribed | error. Don’t expose whether an email is already subscribed (avoid enumeration).
- **Rate-limit** by IP (edge middleware): 5/minute.
- **Double opt-in** must be enabled — confirm before launch.
- **Compliance:** Short privacy notice next to email field with link to /privacy.
- **Accessibility:** Success/error rendered in `aria-live="polite"`, not a toast.

## 11.3 Resend — transactional email

- Used by contact form, OIA request form, complaint form.
- Create CNZ-owned Resend account; add DKIM/SPF for creativenz.govt.nz.
- Alternative: CNZ’s existing Microsoft Exchange via SMTP relay if IT prefers.
- **Spam protection:** Cloudflare Turnstile (invisible, privacy-friendly) instead of Google reCAPTCHA.

## 11.4 Analytics

- **Plausible** (preferred) or **Fathom**. Both cookie-less and compliant with GDPR / NZ Privacy Act 2020 without a consent prompt.
- **Track:** page views, outbound clicks to the portal, newsletter signups, search queries (custom events), filter usage on funding calendar.
- **Do not** install Google Tag Manager or Meta Pixel. Public-interest site.

## 11.5 Error monitoring — Sentry

- Front-end SDK + Next.js edge runtime integration.
- Sample at 25% for performance, 100% for errors.
- Redact PII in breadcrumbs and user context. Do not send query strings from forms.

## 11.6 Uptime

- Probe `https://creativenz.govt.nz/api/healthz` every 60s from at least 3 regions (Sydney, Singapore, San Francisco).
- `/api/healthz` returns 200 with `{ ok: true, version, buildTime }`.
- Page the on-call team on 3 consecutive failures.

## 11.7 CMS webhooks

- Sanity fires a webhook on publish to `/api/revalidate` with an HMAC signature.
- Handler revalidates tags: the document’s slug, its parent section, and relevant index pages (/news-and-blog, funding calendar if a fund changed).

## 11.8 Social

- **Facebook, LinkedIn, Instagram, YouTube** — linked from footer. No embedded feeds (perf + privacy).
- Open Graph + Twitter Card metadata rendered on every page. Card images generated via @vercel/og.
- Exception: news articles may embed Instagram/YouTube using a lite facade pattern — no third-party JS until user interaction.

## 11.9 Accessibility tooling

- axe-core in CI (blocking).
- NVDA + VoiceOver manual testing before each major release.
- No Recite / AudioEye overlay. Overlays make sites less accessible; do the work properly instead.

## 11.10 Translation / te reo Māori

> **Note:** **Do NOT use Google Translate for te reo content**
> Per NZ Government guidance, automated translation of te reo is inaccurate and culturally risky. All te reo Māori content is authored by humans (CNZ staff or commissioned translators via Te Taura Whiri i te Reo Māori — the Māori Language Commission — translator register). The CMS surfaces a "Translation needed" flag in the dashboard for documents with English content but no mi sibling.

## 11.11 Redirects, sitemap, robots

- CMS-driven redirect table maintained by editors: from → to, 301 by default. Loaded via middleware.ts with an in-memory cache (refreshed every 5 min).
- Dynamic `sitemap.ts` from Sanity content + reserved utility pages.
- `robots.ts` allows all crawlers; disallows `/api/`.
- Submit sitemap to Google Search Console post-launch.

## 11.12 Secrets management

- Vercel environment variables (Production / Preview / Development scopes).
- Mirror to a password-manager vault for CNZ’s records.
- No secrets in the repo. No `.env` committed. `.env.example` documents the keys but never the values.
