# Creative New Zealand — creativenz.govt.nz

Next.js 15 + Tailwind v4 + Sanity rebuild of `creativenz.govt.nz`. See `docs/prd/` for the full spec.

## Getting started

```bash
pnpm install
cp .env.example .env.local   # fill in Sanity, Mailchimp, Resend keys
pnpm dev
```

## Scripts

| Script | Purpose |
|---|---|
| `pnpm dev` | Dev server with Turbopack |
| `pnpm build` | Production build (includes Pagefind index) |
| `pnpm start` | Run production build |
| `pnpm lint` | ESLint |
| `pnpm typecheck` | `tsc --noEmit` |
| `pnpm test:unit` | Vitest unit tests |
| `pnpm test:e2e` | Playwright end-to-end |
| `pnpm test:a11y` | axe accessibility suite |
| `pnpm sanity:dev` | Sanity Studio locally |

## Stack

Next.js 15 App Router · Tailwind v4 · Sanity CMS · Pagefind search · Resend (contact) · Mailchimp (newsletter, list `817361bc26`) · Plausible analytics · Sentry.

## Accessibility

WCAG 2.2 AA is non-negotiable. Lighthouse Accessibility 100 is a merge gate. Every te reo Māori term is wrapped in `<span lang="mi">` with macrons preserved.

## Repository layout

```
app/                Next.js App Router
  (site)/           Public marketing routes
  api/              Serverless handlers
components/         UI components
content/            Sanity schema + te reo dictionary + redirects
lib/                Sanity client, helpers
public/             Static assets, logos, koru SVGs
docs/prd/           Full product spec
```

## Rules

- **Do not** invent CNZ-specific facts (fund amounts, names, legal terms). Unknowns live as `[CONFIRM]` in copy drafts.
- **Do not** touch the portal (`portal.creativenz.govt.nz`). Link only.
- **Preserve** URLs. Any change requires a 301 in `content/redirects.json`.

## Deploy

`main` → production. `staging` → password-protected staging. See `docs/prd/24-launch-governance.md`.
