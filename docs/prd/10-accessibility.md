# 10 — Accessibility and Compliance

## 13.1 Legal baseline

- **NZ Government Web Accessibility Standard 1.2** (effective 17 March 2025) mandates conformance to **WCAG 2.2 Level AA** for all public service and non-public service departments in the Executive branch. Creative New Zealand is an autonomous Crown entity; it is expected to follow the Standard.
- **NZ Human Rights Act 1993** — prohibits disability discrimination; inaccessible digital services create exposure regardless of whether the Web Standard strictly applies.
- **NZ Privacy Act 2020** — governs collection and use of personal info via forms, analytics, etc.

> **Note:** **Target**
> WCAG 2.2 AA across 100% of pages, on every template. Non-negotiable and treated as a ship-blocker.

## 13.2 How we achieve it

1. **Design-level decisions** already encode accessibility (see section 5): body text contrast ~15:1; gold explicitly flagged as decorative-only for text; minimum 44×44px tap targets; focus ring visible on every interactive element; spacing and line-height that support text scaling.
1. **Component-level enforcement.** Every component has semantic HTML (`<nav>`, `<main>`, `<article>`, `<aside>`, `<button>` not `<div onClick>`); aria-* only where semantic HTML falls short; keyboard behaviour tested; screen reader behaviour tested per sprint.
1. **Automated testing.** axe-core runs in CI (Playwright + @axe-core/playwright) against every page template. Zero violations allowed to merge.
1. **Manual testing.** Before every release: keyboard-only walkthrough; NVDA + Firefox on Windows; VoiceOver + Safari on macOS; 400% zoom without horizontal scroll; dark-mode OS + high-contrast mode sanity check.
1. **External audit** before launch and annually. Commission from an accredited NZ accessibility consultancy (Access Advisors, Accessible Digital, etc.).

## 13.3 WCAG 2.2 AA — success criteria checklist

Calling out criteria where we have specific implementation requirements beyond "write semantic HTML".

### Perceivable

- **1.1.1 Non-text content.** Every image has alt. Decorative images use alt="". Koru illustrations that carry meaning (category indicators) have alt text describing the category, not the koru itself.
- **1.2.2 Captions.** All video has captions. YouTube embeds use videos with captions — don’t embed uncaptioned.
- **1.2.5 Audio description (AA).** For videos with meaningful visual information not described in the main audio track.
- **1.3.1 Info and relationships.** Heading hierarchy strict: one h1 per page; h2 for sections; never skip levels for visual effect.
- **1.3.2 Meaningful sequence.** DOM order matches reading order even when flexbox/grid reorders visually.
- **1.4.3 Contrast (minimum).** 4.5:1 for body, 3:1 for large text (18pt / 14pt bold). Design tokens enforce this.
- **1.4.4 Resize text.** Page usable at 200% zoom; no clipped content.
- **1.4.10 Reflow.** Page usable at 320px wide without two-dimensional scrolling.
- **1.4.11 Non-text contrast.** Form input borders, focus rings, icons that convey meaning — all ≥ 3:1.
- **1.4.12 Text spacing.** Layout survives user overrides: line-height 1.5, paragraph-spacing 2x, letter-spacing 0.12em, word-spacing 0.16em.
- **1.4.13 Content on hover or focus.** Tooltips dismissible (Esc), hoverable, persistent until dismissed.

### Operable

- **2.1.1 Keyboard.** Every function reachable by keyboard.
- **2.1.2 No keyboard trap.** Off-canvas mobile menu explicitly traps focus while open; Esc closes.
- **2.1.4 Character key shortcuts.** No single-key shortcuts.
- **2.4.1 Bypass blocks.** Skip link to #main as first focusable element.
- **2.4.2 Page titled.** Every page has a unique, descriptive <title>.
- **2.4.3 Focus order.** Tab order matches visual/reading order.
- **2.4.4 Link purpose (in context).** Link text describes destination; no bare "Read more".
- **2.4.5 Multiple ways.** Sitemap + search + navigation all provide ways to reach pages.
- **2.4.6 Headings and labels.** Headings and form labels describe topic or purpose.
- **2.4.7 Focus visible.** 2px outline, 2px offset, visible against any background.
- **2.4.11 Focus not obscured (min)** — new in 2.2. Sticky headers must not obscure focused element. Implement with `scroll-margin-top` on scroll targets equal to header height.
- **2.5.7 Dragging movements** — new in 2.2. Any drag interaction has a non-drag equivalent.
- **2.5.8 Target size (minimum)** — new in 2.2. 24×24 CSS pixels minimum; we exceed at 44×44.

### Understandable

- **3.1.1 Language of page.** `<html lang="en">` or `lang="mi">`.
- **3.1.2 Language of parts.** Every te reo Māori phrase in English content has `lang="mi"`. The most-violated criterion on NZ government sites — get it right.
- **3.2.1 On focus.** Focus doesn’t trigger navigation or context change.
- **3.2.2 On input.** Changing a form field doesn’t auto-submit.
- **3.2.6 Consistent help** — new in 2.2. "Speak with an adviser" link appears in the same location across pages.
- **3.3.1 Error identification.** Form errors clearly identify the field and the problem.
- **3.3.2 Labels or instructions.** Every form field has a visible label — no placeholder-as-label.
- **3.3.3 Error suggestion.** Where possible, suggest a fix ("This email doesn’t look right — check for a typo").
- **3.3.7 Redundant entry** — new in 2.2. Don’t make users re-enter info within the same process.

### Robust

- **4.1.2 Name, role, value.** All custom components report correct role, name, state to assistive tech (shadcn/Radix handles this if we don’t break it).
- **4.1.3 Status messages.** `aria-live` regions for form success, filter result counts, language toggle confirmations.

## 13.4 Specific requirements for this site

### The language toggle

Probably the single highest-impact feature for cultural accessibility.

```
<button
  type="button"
  onClick={switchLocale}
  aria-label={
    locale === 'en'
      ? 'Switch site language to te reo Māori'
      : 'Switch site language to English'
  }
>
  <span aria-hidden="true">{locale === 'en' ? 'Māori' : 'English'}</span>
</button>
 
<div role="status" aria-live="polite" className="sr-only">
  {justSwitched
    ? (locale === 'mi'
        ? 'Kua huri te reo o te pae tukutuku ki te reo Māori'
        : 'Site language is now English')
    : ''}
</div>
```
- The button’s accessible name includes the target language.
- Post-switch `aria-live` announces confirmation in the newly selected language.
- The toggle is a <button>, not a link, unless it navigates to a different URL.

### Skip link

First focusable element on every page:

```
<a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-paper focus:px-4 focus:py-2 focus:rounded-md focus:outline focus:outline-2 focus:outline-focus">
  Skip to main content
</a>
 
<main id="main" tabindex="-1">...
```

### Off-canvas mobile nav — focus trap

Use Radix Sheet which handles this; verify:

- Opening the sheet moves focus to the sheet’s close button.
- Tab cycles within the sheet only.
- Esc closes and returns focus to the trigger.
- Route change closes the sheet.

### Forms

- Labels always visible (not just placeholders).
- Required fields marked with a visible asterisk AND `required` AND `aria-required="true"`.
- Errors associated via `aria-describedby`.
- Error summary at top of form on submit failure; summary links focus users to the first erroring field.
- Success state is a real page or clearly announced via `aria-live`.
- Inline validation is debounced; no yelling at users mid-typing.

### Cookie consent

- **Non-modal.** A footer bar that doesn’t block page content.
- **Three actions:** Accept, Reject (equal visual weight — dark patterns are a compliance risk), More info.
- **Keyboard accessible.** First-page-load focus should not be stolen by the banner.
- **Only strictly-necessary cookies without consent.** Since we’re using Plausible (cookie-less), the banner may not be needed at all — verify with legal.

### Motion

All transitions include a prefers-reduced-motion override:

```
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```
- No auto-playing video or animated GIFs above the fold.
- No parallax above the "good taste" threshold; max 30px of scroll-linked movement.

### PDFs

- Every PDF linked on the site must itself meet WCAG 2.2 AA (it’s part of the site).
- The CMS `document` type supports an `alternativeFormats` field — when a PDF isn’t fully accessible, upload a plain text or DOCX alternative alongside it.
- Document list components render both the PDF and the alt-format link.

### Data tables

- Real <table> for tabular data, not grids of divs.
- <caption> describes the table.
- `<th scope="col">` and `<th scope="row">`.
- On mobile, stacks tables into card layouts rather than horizontal-scrolling where possible.

### Video

- All video has captions.
- Use `lite-youtube` / facade pattern to avoid YouTube’s own JS and privacy impact until user plays.
- If we host video directly, transcript authored in the CMS appears below the player and is search-indexable.

## 13.5 Accessibility statement

Template for /accessibility:

> **Note:** **Accessibility statement (template)**
> Creative New Zealand is committed to ensuring our website is accessible to all New Zealanders, including disabled people. This website is designed to meet WCAG 2.2 Level AA, as required by the NZ Government Web Accessibility Standard 1.2.
> Conformance status: We believe this site fully conforms to WCAG 2.2 at Level AA. The site was last audited by [auditor] on [date]. A summary of findings is available on request.
> Known issues: [list any remaining gaps, e.g. older PDF archives awaiting remediation]
> Feedback: If you find something hard to use, please contact info@creativenz.govt.nz or phone +64 4 473 0880. We respond to accessibility feedback within 5 working days and aim to resolve issues within 20 working days.
> Alternative formats: We can provide content in plain-text, large-print, easy-read, or NZSL video formats on request.

## 13.6 CI checks

```
# .github/workflows/a11y.yml
- run: pnpm build
- run: pnpm start &
- run: npx wait-on http://localhost:3000
- run: pnpm test:a11y   # playwright + @axe-core/playwright against every template
- run: npx lhci autorun # Lighthouse CI, enforces Accessibility = 100
```
Block merge on any axe violation or Lighthouse Accessibility score below 100.

## 13.7 Testing matrix before release

| **Test** | **Who** | **Frequency** |
| --- | --- | --- |
| axe-core automated | CI | Every PR |
| Lighthouse CI | CI | Every PR |
| Keyboard-only walkthrough | Dev | Every release |
| NVDA + Firefox | QA / a11y specialist | Every release |
| VoiceOver + Safari | QA / a11y specialist | Every release |
| 400% zoom | Dev | Every release |
| Mobile screen reader (TalkBack / VoiceOver iOS) | QA | Quarterly |
| Full external audit | External consultancy | Pre-launch + annual |
