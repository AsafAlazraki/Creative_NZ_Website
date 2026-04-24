# 04 — Component Inventory

Maps the UI surface to concrete components. Every component below should be built once and reused. Use **shadcn/ui** primitives as the base where available (Radix under the hood → accessibility primitives for free), then style with the tokens from section 5. For specialised components, **21st.dev** is the first place to look before building from scratch — licences are permissive and the code is yours after install.

Install pattern: `npx shadcn@latest add <component>` (shadcn) or `npx shadcn@latest add "https://21st.dev/r/<author>/<component>"` (21st.dev).

## 7.1 Layout primitives

| **Component** | **Purpose** | **Based on** |
| --- | --- | --- |
| SiteHeader | Logo, primary nav, search, account link, language toggle | Custom on Radix NavigationMenu |
| SiteFooter | Newsletter signup, social links, sponsor logos, utility links | Custom |
| Container | Max-width wrapper | Tailwind composition |
| Prose | Styled body content wrapper for CMS rich text | @tailwindcss/typography |
| Breadcrumb | Section hierarchy marker | shadcn breadcrumb |
| SkipLink | "Skip to main content" for keyboard users | Custom, mandatory |

## 7.2 Navigation

| **Component** | **Purpose** | **Notes** |
| --- | --- | --- |
| PrimaryNav | Desktop horizontal nav with mega-menu panels | Radix NavigationMenu. Each L1 opens a mega-menu. Arrow-key nav. |
| MobileNav | Off-canvas slide-in on mobile | Radix Sheet. L1→L2→L3 expand/collapse. Trap focus. Close on escape or route change. |
| SectionNav | Left-rail nav inside a section (L2 context) | Sticky on desktop; collapses to a <select> on mobile. |
| InPageNav / OnThisPage | Anchored TOC on long pages | Auto-generated from h2/h3. Scroll-spy highlighting. |
| LangToggle | EN ↔ MI switch | See section 9. Announces switch via aria-live in target language. |
| AccountMenu | "Register / Sign in" → portal | Simple link pair for v1. No local auth on the marketing site. |

## 7.3 Hero and section components

| **Component** | **Purpose** | **Notes** |
| --- | --- | --- |
| HomeHero | Editorial, typography-first. Big headline, short subhead, koru decoration, 1–3 featured links | Home only |
| SectionHero | L1 landing pages. Title + intro paragraph + optional koru motif | Variants: plain, with koru, with photo |
| PageHero | Content pages. Title + eyebrow (section) + optional intro | Minimal |
| FeaturedStories | 3-up card grid of top news items | Home |
| KoruPanel | Navy panel with koru illustration — used as divider/section marker | Props: color="orange"\|"cyan"\|"lime"\|"coral"\|"plum" |

## 7.4 Content building blocks (CMS-driven)

| **Component** | **Purpose** |
| --- | --- |
| RichText | Prose block — headings, paragraphs, lists, blockquotes, links |
| CalloutBox | Emphasised panel with title + body + optional CTA. Variants: info, warning, success, deadline |
| PullQuote | Large italic serif quote with attribution |
| StatList | Grid of large-number stats (e.g. "$47M in Lotto funding") |
| DeadlineCard | Fund name, close date (with countdown), status pill, CTA |
| FundCard | Fund tile: name, who it’s for, amount, artform tags |
| PersonCard | Council member or staff: photo, name, role, iwi affiliation (optional), short bio, contact |
| DocumentList | List of downloadable PDFs with meta (size, last updated, accessible alt-format available) |
| AccordionList | FAQ-style collapse. shadcn accordion |
| TabGroup | For sectioning long guidance. shadcn tabs |
| ImageWithCaption | Figure with caption (title / artist / photographer) |
| VideoEmbed | YouTube/Vimeo with caption support, lazy-loaded facade |
| RelatedLinks | "You might also be interested in" list at page end |
| CTASection | Full-width band with headline + button pair |
| NewsletterSignup | Mailchimp form (see section 6.10) |

## 7.5 Funding-specific components

These are the highest-leverage components for the primary audience.

| **Component** | **Purpose** |
| --- | --- |
| FundingCalendar | Table/timeline of all rounds with filters (artform, applicant type, open/closed). Accessible table + filter chips. |
| FundFinder | Quiz-style stepper: "Individual or org?" → "Artform?" → "Early career?" → routes to matching funds. 3–5 steps max. |
| EligibilityChecklist | Checkbox list authored per fund; user ticks; shows "likely eligible / not sure / not eligible". |
| ApplicationTimeline | Vertical timeline: Read guidelines → Draft → Submit → Assessed → Decision → Report. |
| PortalCTA | Persistent "Apply on the CNZ portal" panel linking to portal.creativenz.govt.nz. Contextual, not sticky. |

## 7.6 News and editorial

| **Component** | **Purpose** |
| --- | --- |
| NewsIndex | Filterable grid of news items (filters: artform, category, year) |
| NewsCard | Article preview: image, title, eyebrow, date, read time |
| ArticleHeader | Title, subtitle, meta (author, date, read time), share |
| ArticleBody | Prose wrapper |
| ArticleFooter | Author bio card, related articles, share |
| ShareBar | Email, LinkedIn — minimal; no tracking pixels |

## 7.7 Forms

| **Component** | **Purpose** | **Based on** |
| --- | --- | --- |
| Form, Field, Label, Input, Textarea, Select, Checkbox, RadioGroup | Standard form primitives | shadcn/ui + react-hook-form + zod |
| FieldError | Inline error messaging | Linked via aria-describedby |
| FieldHint | Helper text | Linked via aria-describedby |
| FormSuccess | Success state with next-steps |  |

Forms on the site: contact, OIA request, complaint, newsletter signup.

## 7.8 Interactive / feedback

| **Component** | **Purpose** | **Based on** |
| --- | --- | --- |
| Button | Primary/Secondary/Ghost/Destructive/Link. Sizes sm/md/lg | shadcn button |
| IconButton | Icon-only with required aria-label | Custom |
| Link | Styled anchor; external gets ↗ and rel="noopener" | Custom |
| Tag / Chip | Artform / category pills | Custom |
| Pill | Status indicator: Open / Closing soon / Closed | Custom |
| Toast | Success/error messaging after form submit | shadcn sonner |
| Dialog | Confirmations, occasional content modal | shadcn dialog (use sparingly) |
| Tooltip | Supplementary hints only, never sole source of info | shadcn tooltip |
| Pagination | For long lists | shadcn pagination |

## 7.9 Search UI

| **Component** | **Purpose** |
| --- | --- |
| SearchInput | Header search; large autocomplete on /search |
| SearchResults | Grouped results: Funding, News, Guidance, Results |
| NoResults | Empty state with suggested queries and "Speak with an adviser" CTA |
| FilterBar | Reusable filter chip row for listings |

## 7.10 Accessibility aids

| **Component** | **Purpose** |
| --- | --- |
| SkipLink | Primary skip target #main |
| VisuallyHidden | .sr-only wrapper component |
| AnnounceRegion | aria-live="polite" region for LangToggle, filter changes, etc. |
| ReducedMotionBoundary | Wrap motion components; no-ops if user prefers reduced motion |

## 7.11 21st.dev components worth a serious look

Browse for latest; at time of writing these patterns fit:

- Bento-style home layout for the "Featured stories + funding opportunities + latest news" composition.
- Editorial magazine-style article layout for news detail.
- Animated stepper for the FundFinder.
- Command palette (⌘K) for power users — optional v2.

> **Note:** **Rule**
> Installed components are starting points — they must be re-styled to our tokens and audited for accessibility before they ship. Don’t merge unmodified 21st.dev code.

## 7.12 Component directory structure

```
components/
├── layout/
│   ├── site-header.tsx
│   ├── site-footer.tsx
│   ├── container.tsx
│   └── prose.tsx
├── nav/
│   ├── primary-nav.tsx
│   ├── mobile-nav.tsx
│   ├── section-nav.tsx
│   ├── on-this-page.tsx
│   ├── breadcrumb.tsx
│   └── lang-toggle.tsx
├── hero/
│   ├── home-hero.tsx
│   ├── section-hero.tsx
│   └── page-hero.tsx
├── blocks/
│   ├── rich-text.tsx
│   ├── callout-box.tsx
│   ├── pull-quote.tsx
│   ├── stat-list.tsx
│   ├── deadline-card.tsx
│   ├── fund-card.tsx
│   ├── person-card.tsx
│   ├── document-list.tsx
│   ├── accordion-list.tsx
│   ├── tab-group.tsx
│   ├── image-with-caption.tsx
│   ├── video-embed.tsx
│   ├── related-links.tsx
│   ├── cta-section.tsx
│   └── newsletter-signup.tsx
├── funding/
│   ├── funding-calendar.tsx
│   ├── fund-finder.tsx
│   ├── eligibility-checklist.tsx
│   ├── application-timeline.tsx
│   └── portal-cta.tsx
├── news/
│   ├── news-index.tsx
│   ├── news-card.tsx
│   ├── article-header.tsx
│   ├── article-body.tsx
│   └── article-footer.tsx
├── forms/
│   └── ...
├── ui/                    ← shadcn primitives live here
│   └── ...
├── icons/
│   └── koru-{color}.tsx
└── a11y/
    ├── skip-link.tsx
    ├── visually-hidden.tsx
    └── announce-region.tsx
```

---

## Component State Matrices

Every interactive component must implement all states. This section is the spec — don’t ship a component with half the states and assume "we’ll get to it".

## 20.1 Button

| **State** | **Visual** | **Accessibility** |
| --- | --- | --- |
| Default | Primary: navy bg, paper text. Secondary: ink text on paper-alt with 1px ink border. Ghost: ink text, no bg. | cursor: pointer |
| Hover | Primary: ink bg (darker). Secondary: paper-alt bg deepens. Ghost: paper-alt bg appears. Transition 150ms. | cursor: pointer |
| Focus-visible | 2px focus ring, 2px offset, colour --color-focus. | Outline visible for keyboard users only (focus-visible, not focus). |
| Active (pressed) | Transform: translateY(1px); bg darkens by 5%. |  |
| Loading | Text dims to 70%; spinner icon to the left of label; button remains at same width. | aria-busy="true"; aria-disabled="true"; button ignores clicks. |
| Disabled | Opacity 40%; cursor: not-allowed. | aria-disabled="true"; focusable for screen readers; does not submit. |
| Destructive | Error-red bg, paper text. Only for irreversible actions (none on this site v1). |  |

- **Sizes:** sm (32px, body-sm), md (40px, body — default), lg (48px, body).
- **Minimum tap target:** 44×44 CSS pixels. Small buttons extend their tap area via padding even if visual size is smaller.
- **Icon buttons:** same state matrix. Require `aria-label`. Icon alone never an acceptable label.

## 20.2 Link

| **State** | **Visual** |
| --- | --- |
| Default | Ink text, underlined (underline-offset: 3px, decoration-thickness: 1px). |
| Hover | Decoration thickens to 2px; text slightly darker. |
| Focus-visible | Focus ring around the text box; underline persists. |
| Visited | Optional: subtle muted purple shift. Often skipped on gov sites — discuss with CNZ. |
| External | Appended ↗ glyph (aria-hidden); opens same tab; rel="noopener" for new-tab cases. |

## 20.3 Input / Textarea / Select

| **State** | **Visual** | **Accessibility** |
| --- | --- | --- |
| Default | paper bg; 1px border --color-border; padding 12px 16px; border-radius 8px. | Label always visible above; never placeholder-as-label. |
| Hover | Border darkens to --color-muted. |  |
| Focus | Border becomes 2px --color-focus; focus ring. |  |
| Filled | Same as default. (No "filled" visual distinction — keeps form calm.) |  |
| Disabled | paper-alt bg; muted text; cursor: not-allowed. | aria-disabled="true" |
| Readonly | Same as default but subtle — bg paper-alt. |  |
| Error | 2px border --color-error; error message below input. | aria-invalid="true"; error message linked via aria-describedby. |
| Success | No visual change. Success is on submit, not field-level. |  |

- **Hint text:** body-sm muted, below the label, before the input. Linked via `aria-describedby`.
- **Error message** appears below the input in `--color-error` with an error icon. Linked via `aria-describedby`.
- **Character count:** body-sm, right-aligned under textarea. Updates via aria-live polite. Turns warning colour at 90% of limit.

## 20.4 Checkbox / Radio

| **State** | **Visual** |
| --- | --- |
| Unchecked | 20×20, 2px border --color-border, paper bg, border-radius 4 (checkbox) / 50% (radio). |
| Hover | Border --color-muted; paper-alt bg. |
| Focus-visible | Focus ring 2px offset. |
| Checked | Navy fill; paper checkmark icon (checkbox) or paper inner dot (radio). |
| Checked + hover | Ink fill. |
| Disabled | Muted everything; cursor not-allowed. |
| Indeterminate (checkbox only) | Navy fill with paper horizontal bar. |
| Error | 2px --color-error border; paper bg; error message below field group. |

## 20.5 Chip / Tag

| **State** | **Visual** |
| --- | --- |
| Default (filter chip) | paper-alt bg; ink text; 1px border --color-border; 28px tall; 6px 12px padding; border-radius 9999px. |
| Hover | border --color-muted. |
| Selected | navy bg; paper text; no border. |
| Removable | As above + ✕ on right; x is keyboard-focusable individually. |
| Disabled | Opacity 40%. |
| Tag (informational, not interactive) | Coloured variant based on category token, no border, small padding. |

## 20.6 Card

| **State** | **Visual** |
| --- | --- |
| Default | paper-alt bg OR paper bg + 1px border; border-radius 8px; padding 24px. |
| Hover (linked card) | border darkens; subtle 4px upward translateY; shadow-sm appears; transition 200ms. |
| Focus-visible (linked card) | Focus ring around whole card. |
| Loading | Skeleton shimmer (respects reduced motion: static skeleton). |

- **Whole-card linking:** Single `<a>` wrapping content, OR a real link in the title with `::after { inset: 0 }` pseudo-element trick. Both are fine; be consistent.

## 20.7 Modal / Dialog

| **State** | **Behaviour** |
| --- | --- |
| Closed | Not in DOM. |
| Opening | 200ms fade + scale-up 0.98→1. Backdrop fades to ink/60. |
| Open | Focus moves to first focusable element. Background content has aria-hidden="true". Body scroll locked. |
| Closing | 150ms fade + scale-down. Focus returns to the triggering element. |
| Escape pressed | Close. |
| Backdrop clicked | Close. |

- **Use sparingly.** Only for confirmations and brief content. Long content = dedicated page.

## 20.8 Accordion

| **State** | **Visual** |
| --- | --- |
| Collapsed | Chevron-down icon right of title. Title ink text, bold. |
| Hover | Paper-alt bg appears. |
| Focus-visible | Focus ring on the trigger. |
| Expanded | Chevron rotates 180°. Content reveals with 200ms height transition. |
| Expanding / Collapsing | aria-expanded toggles. Content inside is aria-hidden when collapsed to prevent tabbing into it. |

## 20.9 Toast / Alert

| **Variant** | **Use** | **Visual** |
| --- | --- | --- |
| Info | Neutral announcements. | info-blue left border; paper-alt bg. |
| Success | Form submitted, filter applied. | success-green left border; paper-alt bg. |
| Warning | Deadline approaching, non-blocking issue. | warning-amber left border; paper-alt bg. |
| Error | Form error, failed submission. | error-red left border; paper-alt bg. |

- All toasts: `role="status"` (info/success) or `role="alert"` (warning/error). Auto-dismiss 5s (info/success), sticky (warning/error). Pause timer on hover/focus. Dismiss button always present.

## 20.10 Tooltip

- Supplementary info only — never sole source of critical info.
- Shown on hover + focus. Dismissed on Esc.
- Target is still usable without the tooltip; the tooltip content is `aria-describedby`ed to the target.
- 200ms delay before showing; no delay before hiding.

## 20.11 Pill / Status indicator

| **State** | **Colour** | **Used for** |
| --- | --- | --- |
| Open | success-green bg, ink text | Fund is currently accepting applications |
| Closing soon (≤14 days) | warning-amber bg, ink text | Fund closing within 14 days |
| Closed | muted bg, paper text | Round no longer accepting |
| Upcoming | info bg, paper text | Opens in future |
| Result announced | info bg, paper text | Results published for this round |

## 20.12 Pagination

- **Prefer Load More** for news/funding listings — better for screen readers, no page jumps.
- **Paginated only when:** results > 50 items and context benefits from page numbers.
- Accessibility: `nav aria-label="Pagination"`; current page `aria-current="page"`; arrows have text labels hidden visually but read by screen readers.
