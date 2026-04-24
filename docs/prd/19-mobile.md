# 19 — Mobile Specification

~55% of traffic is mobile on comparable gov/arts sites. Designed mobile-first in practice. This section enumerates the mobile behaviour across every template.

## 26.1 Breakpoint strategy

| **Breakpoint** | **Tailwind** | **Behaviour** |
| --- | --- | --- |
| < 640px | default | Single column; drawer nav; stacked cards; card-view tables |
| 640-767 | sm | Slightly larger type; 2-col grids for small cards |
| 768-1023 | md | Tablet; 2-col major grids; drawer nav still (no desktop nav) |
| 1024-1279 | lg | Desktop nav appears; 3-col grids; sidebars show |
| 1280+ | xl | Max container width |

**Key:** desktop nav appears at `lg`. Up to 1023px you get the mobile drawer — tablets included deliberately since the desktop nav is dense.

## 26.2 Touch targets

- Minimum 44×44 CSS pixels on every interactive element. Enforced via padding where visual size is smaller.
- Minimum 8px spacing between adjacent targets.
- Accordion headers: 56px tall on mobile.

## 26.3 Mobile-specific patterns

- **Drawer nav** (Radix Sheet) slides in from the left, full-height. Focus trap. Esc closes. Route change closes.
- **Sticky header** collapses to 56px when scrolled > 80px. Logo stays; nav trigger and search/sign-in remain.
- **Sticky primary CTA** on fund detail pages only: the "Apply on the CNZ portal" button stays pinned to the bottom of the viewport within the article scope. Fades out when close to footer.
- **Accordion-first long content.** On mobile, body copy sections default to collapsed on content pages; users tap to open. On desktop they’re expanded.
- **Cards full-width, stacked.** No 2-column card grids below `sm`.
- **Tables → stacked cards.** Below `md`, data tables render as stacked cards with row labels as headings. The `<table>` semantics are preserved via CSS (display: block + role reassignment in CSS, not ARIA).
- **Filter bars become a single "Filter" button** that opens a bottom sheet with all filters. Applied filters shown as removable chips above results.

## 26.4 Mobile-specific performance

- Images: next/image serves smaller variants + AVIF/WebP automatically.
- Fonts: same stack — Inter and Source Serif 4. Macrons must render.
- LCP budget: ≤ 2.0s on Slow 4G emulated throttling (Lighthouse mobile preset).
- Scroll performance: 60fps on iPhone 12 / mid-tier Android of current year.

## 26.5 Gestures

- **No custom gestures.** Native scroll, tap, and back swipe only.
- **Calendar view (funding calendar):** horizontal scroll for the 12-month strip is the only place scroll direction differs.
- **Pull to refresh:** browser-native. No custom implementation.

## 26.6 Mobile testing matrix

| **Device class** | **Test device** |
| --- | --- |
| iOS — latest | iPhone 15 Pro, Safari |
| iOS — two back | iPhone 13, Safari |
| Android — latest flagship | Pixel 8, Chrome |
| Android — mid-tier | Samsung A-series, Chrome |
| Tablet iOS | iPad, Safari |
| Tablet Android | Galaxy Tab, Chrome |
| Small phone | iPhone SE (375×667) |
| Screen reader iOS | VoiceOver + Safari |
| Screen reader Android | TalkBack + Chrome |
