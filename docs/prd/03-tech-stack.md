# 03 — Tech Stack and Architecture

## 6.1 Stack at a glance

| **Layer** | **Choice** | **Why** |
| --- | --- | --- |
| Framework | Next.js 15 (App Router) | Mature SSR/ISR, React Server Components, strong i18n |
| Language | TypeScript (strict) | Non-negotiable on a multi-year government site |
| Styling | Tailwind CSS v4 + CSS variables | Matches design token model in section 5 |
| Component primitives | shadcn/ui (Radix under the hood) | Accessible by construction; source lives in our repo |
| Supplementary components | 21st.dev | Permissively licensed; installable via shadcn CLI |
| Forms | react-hook-form + zod | Schema-level validation, accessible error association |
| Icons | lucide-react | Tree-shakeable, matches Inter’s visual weight |
| Motion | framer-motion (Motion) | Respects prefers-reduced-motion out of the box |
| CMS | Sanity (recommended) | Structured content, GROQ, typed client. Alt: Payload, Contentful |
| Search | Pagefind (static) + custom facet filter | See section 6.3 |
| Forms backend | Resend + serverless handler | Low-volume; simple |
| Analytics | Plausible (or Fathom) | Privacy-respecting; no cookie banner needed |
| Error monitoring | Sentry | Standard; self-hostable for data sovereignty |
| Hosting | Vercel (primary) or Azure Static Web Apps | Confirm with CNZ data-residency |
| CDN | Platform-native |  |
| Package manager | pnpm | Fast, disk-efficient |
| Node | v22 LTS |  |

## 6.2 CMS decision — Sanity recommended

| **Option** | **Pros** | **Cons** | **Fit** |
| --- | --- | --- | --- |
| Sanity | Structured model (GROQ), realtime, portable text, typed client, hosted editor | Hosted — check data residency | ★★★★★ |
| Payload CMS | Open-source, TS-native, self-host → full data sovereignty | Younger ecosystem; more ops burden | ★★★★ |
| Contentful | Enterprise polish, procurement-friendly | Heavy UI, pricier, less flexible schema | ★★★ |
| Stay on Sitecore | Zero migration | Legacy, slow authoring, expensive licensing | ★ |
| Headless WordPress | Cheap, familiar | Poor authoring UX for structured content | ★★ |

> **Note:** **Recommendation**
> Sanity, unless CNZ’s procurement/data-residency requires NZ/Australia hosting — in which case Payload self-hosted on Azure NZ. If you go Sanity, configure the hosted dataset in the Australia region. If Payload, deploy to Azure NZ North (Auckland).

## 6.3 Architecture overview

```
                           ┌───────────────────────────┐
                           │  Authors (CNZ staff)      │
                           │  → Sanity Studio          │
                           └──────────┬────────────────┘
                                      │ publishes
                                      ▼
 ┌──────────────────────┐   ┌──────────────────────┐
 │ Sanity (dataset)     │   │ Mailchimp            │
 │ - Content documents  │   │ - Newsletter list    │
 │ - Assets (images)    │   └──────────────────────┘
 └──────────┬───────────┘            ▲
            │ GROQ / CDN             │ signup POST
            ▼                        │
 ┌──────────────────────────────────┴───────────────┐
 │ Next.js 15 (Vercel)                              │
 │ - App Router, RSC                                │
 │ - ISR on all content pages (revalidate 60s)      │
 │ - /api/newsletter → Mailchimp                    │
 │ - /api/contact → Resend / email relay            │
 │ - i18n routing (en / mi)                         │
 │ - Pagefind static index built at build-time      │
 └──────────────────────────────────────────────────┘
            ▲
            │ visits
            ▼
 ┌──────────────────────┐   ┌──────────────────────┐
 │ Users                │   │ portal.creativenz... │
 │                      │ → │ Dynamics 365 portal  │
 └──────────────────────┘   └──────────────────────┘
```

## 6.4 Rendering strategy

- **Content pages (most of the site):** Static at build time, revalidated on demand (webhook) and every 60s as a safety net — ISR.
- **Listing pages with filters** (news, funding calendar): Server-rendered. Filters as URL query params so crawlers index the primary view; client-side filtering for fast subsequent interactions.
- **Home:** Static, revalidated on demand.
- **Search /search:** Static shell + Pagefind client search.
- **Error and 404:** Static.
- **Forms:** Client-side submit → API route → provider.

## 6.5 Folder layout

```
creativenz/
├── app/                           ← Next.js app router
│   ├── (site)/                    ← public marketing routes
│   ├── api/                       ← serverless handlers
│   ├── sitemap.ts
│   ├── robots.ts
│   └── layout.tsx
├── components/                    ← see section 7
├── content/                       ← Sanity schema + GROQ queries
│   ├── schemas/
│   ├── queries/
│   └── sanity.config.ts
├── lib/
│   ├── sanity.ts
│   ├── i18n.ts
│   ├── analytics.ts
│   └── seo.ts
├── public/                        ← static assets incl. logo, koru SVGs
├── styles/
│   └── globals.css                ← @theme tokens, reset
├── tests/
│   ├── a11y/                      ← axe + playwright
│   ├── e2e/                       ← playwright end-to-end
│   └── unit/                      ← vitest
├── .github/workflows/             ← CI
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

## 6.6 Performance budgets (enforce in CI via Lighthouse CI)

| **Metric** | **Target** |
| --- | --- |
| LCP (mobile 4G) | ≤ 2.0s |
| CLS | ≤ 0.02 |
| INP | ≤ 200ms |
| Total JS on content page | ≤ 200KB gzipped |
| Total CSS critical | ≤ 150KB |
| Lighthouse Performance | ≥ 95 |
| Lighthouse Accessibility | 100 (no excuses) |
| Lighthouse Best Practices | 100 |
| Lighthouse SEO | 100 |

Measured on home, a content page, a listing page. Commits that regress >5 points on Performance or >0 points on Accessibility block merge.

## 6.7 Image pipeline

- Sanity’s image CDN → pass through next/image loader.
- Served as AVIF with WebP + JPEG fallbacks.
- All content images have alt text authored in the CMS (required field; empty string requires explicit "decorative" toggle).
- Photographer and artist credit stored as structured fields; rendered as a figure caption.

## 6.8 Fonts

- Self-host or use `next/font/google` for Inter and Source Serif 4.
- Only load weights we use: Inter 400/500/600/700; Source Serif 4 400/500/600/700 italic.
- Subset to Latin + Latin Extended (covers macrons and common European characters).
- `font-display: swap`; use `next/font` to eliminate CLS.

## 6.9 SEO

- Dynamic `<title>` and `<meta description>` per page from CMS.
- OG and Twitter card images generated via `@vercel/og` from title and eyebrow.
- JSON-LD for Organization, BreadcrumbList, NewsArticle, Event (funding deadlines), GovernmentOrganization.
- Canonical URL on every page.
- XML sitemap generated from CMS content.
- `robots.txt` allows everything; disallows `/api/`.

## 6.10 Security / headers

Strict CSP (with nonce for any inline scripts — minimise these), HSTS preload, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` denying everything not needed.

## 6.11 Environments

- `main` → production (creativenz.govt.nz)
- `staging` branch → staging (staging.creativenz.govt.nz) — password-protected
- PR previews via Vercel deploy previews — password-protected, robots-blocked.

## 6.12 CI (GitHub Actions)

On every PR:

1. `pnpm install` (with cache)
1. `pnpm typecheck`
1. `pnpm lint` (eslint + stylelint)
1. `pnpm test:unit`
1. Build
1. Lighthouse CI against PR preview (home + 1 content page + 1 listing)
1. Playwright + axe accessibility suite against PR preview
Merge blocked unless all pass.

## 6.13 What NOT to add

- Redux / Zustand / MobX — server components + URL state + react-hook-form cover all our needs.
- A component library beyond shadcn (no MUI, no Chakra, no Ant). These conflict with our design tokens.
- GraphQL on top of Sanity. GROQ is enough.
- Server-rendered React on its own — always use Next’s renderer.
