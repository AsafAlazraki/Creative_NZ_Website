# 18 — Empty States, Error Pages, and Edge Cases

Places where content is absent, loading, broken, or edge-case. Easy to forget; easy to embarrass yourself on.

## 25.1 404 page

```
[Header]
 
         [koru-coral illustration, 360×360, decorative]
 
         This page doesn’t exist
 
         The page you were looking for isn’t here — it might have moved, or the
         link might be out of date. Try one of these:
 
         [ Funding and support ]   [ News and blog ]   [ Contact us ]
 
         Or search for what you’re looking for:
 
         [ search input                                             [ Search ] ]
 
[Footer]
```
- **HTTP status:** 404.
- **Page title:** "Page not found — Creative New Zealand".
- **Log to analytics** with the attempted path, for the redirect team to review weekly.

## 25.2 500 / server error

```
[Header if possible; minimal if rendering without it]
 
         Something went wrong on our end
 
         Sorry — we hit an error. Please try again in a moment.
 
         If the problem continues, email info@creativenz.govt.nz or
         phone +64 4 473 0880.
 
         [ Try again ]   [ Return home ]
 
[Footer if possible]
```
- **HTTP status:** 500.
- **Sentry event:** auto-captured with full stack + user context.

## 25.3 Offline / network error

- Rare given static hosting, but for API routes: show an inline error "We can’t reach that service right now. Please try again."
- Newsletter signup fallback: if Mailchimp is unreachable, queue the submission to a retry table and tell the user "Thanks — we’ll add you to the list shortly."

## 25.4 Maintenance mode

- Env var `MAINTENANCE_MODE=true` → middleware serves a static maintenance page for all routes except `/api/healthz`.
- **HTTP status:** 503 with Retry-After header.
- Page template: simple paper-on-ink, logo centered, "We’re doing some maintenance. Back shortly."

## 25.5 Content not translated

A user lands at `/mi/funding-and-support/arts-grants` but no mi translation exists:

- The mi version of the parent section IS translated; the specific page is not.
- **Behaviour:** serve the English page but show a dismissable banner at top in te reo: "Kāore tēnei whārangi i te reo Māori. Ka whakaaturia te whārangi reo Pākehā ki a koe." (This page isn’t available in te reo Māori — the English version is shown.)
- **Lang attribute:** `<html lang="en">` since the content is English. The banner itself is `lang="mi"`.

## 25.6 Fund with no open round

- Item detail page still renders; status pill shows "Closed" or "Next round: [date]".
- Primary CTA becomes "See past results" (if a fundingResult exists) or "Get notified when this opens" (newsletter preselect).
- Past recipients section renders normally.

## 25.7 Listing with zero items

- **News, empty category:** "No news in this category yet." + link to all news.
- **Funding calendar, no open rounds:** see 25.6-ish messaging above. Rare system-wide.
- **Past recipients, none yet:** "Recipients will appear here after the round closes."

## 25.8 Search with zero results

- "No results for ‘[query]’."
- Suggestions: check spelling (list 2-3 common corrections if any), try broader terms, browse by section.
- "Still stuck? Talk with an adviser."

## 25.9 Broken / missing images

- Server-rendered: check image exists before rendering; if missing, render a koru watermark placeholder with alt="".
- Client-side: `onError` handler swaps to placeholder.
- Never show the browser’s broken-image icon.

## 25.10 Loading states

- **Avoid them above the fold.** Server-render everything the user might see first.
- **Below the fold:** skeletons (static — not shimmering — when prefers-reduced-motion).
- **Form submit:** button becomes "Sending..." + disabled + spinner.
- **Filter change on listing:** aria-live polite announces "Updating results..."; actual UI uses a subtle 200ms fade.
