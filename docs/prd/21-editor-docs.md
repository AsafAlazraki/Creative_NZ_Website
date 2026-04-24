# 21 — Editor and Author Documentation

For the CNZ comms team. How to actually use the CMS to create and maintain content, day-to-day. This document, once instantiated, lives at the deployed CMS (Sanity Studio custom structure) as an "Editor handbook" document.

## 28.1 Roles and permissions

| **Role** | **What they can do** |
| --- | --- |
| Admin | Everything: schema, users, publish, delete |
| Editor | Draft, edit, publish. Cannot change schema or user roles. |
| Contributor | Draft and save. Cannot publish. Submits for review. |
| Viewer | Read-only (legal review, compliance) |

## 28.2 Content workflow

1. **Draft** — contributor or editor creates document. Saves as draft. Not live.
1. **Peer review** — second editor reviews for voice, accuracy, macrons, accessibility (alt text, link text).
1. **Accessibility check** — see 28.4 below.
1. **Legal review** (for policy, privacy, complaint-related content) — viewer role reads and approves.
1. **Te reo translation** — if a translation is commissioned, editor links it to the English document via translationGroup.
1. **Publish** — editor clicks Publish. Webhook fires revalidate. Site updates within 60 seconds.
1. **Post-publish** — check the live page in an incognito window. Confirm render and OG preview.

## 28.3 Creating a new page (step by step)

1. In the Studio, click "Pages" in the left nav.
1. Click "+ New page".
1. **Parent section:** pick the section this page belongs under (required; controls breadcrumb and nav).
1. **Title (English):** type the page title. Sentence case.
1. **Slug:** auto-generated from title; edit if needed. Use hyphens, lowercase, no special characters.
1. **Eyebrow (optional):** short category label shown above the title. E.g. "GUIDANCE".
1. **Intro:** 1-2 sentences describing the page and its audience.
1. **Blocks:** add content blocks. Each block has its own editor.
1. **SEO:** override the title/description if the defaults aren’t right. Default is page title + intro.
1. **Preview:** click "Preview" (top right). Opens the page in preview mode at `https://staging.creativenz.govt.nz/preview/[page-id]`. Iterate.
1. **Publish:** when ready, click Publish.

## 28.4 Accessibility checklist for editors

Before publishing any page, check:

- **Headings:** one H1 (the title); H2s describe sections; H3s nested under H2s. No skipped levels.
- **Alt text:** every image has alt unless it is purely decorative (checkbox "decorative" in image block). Alt describes the image’s purpose in context, not its visual details.
- **Link text:** describes destination. No "Read more", "Click here", or "this link".
- **Te reo Māori markup:** every Māori word or phrase in English content is marked with the "te reo Māori" toggle in the editor.
- **Macrons:** Māori not Maori. Ngā not Nga. Double-check by typing into `Ctrl+F`.
- **Bold vs heading:** if it introduces a section, it’s a heading. Don’t bold a paragraph and call it a heading.
- **Tables:** real tables for data. Include a caption.
- **Lists:** use the bulleted or numbered list block, not hyphens typed into paragraphs.
- **PDFs:** check the PDF itself is accessible. If not, attach a plain-text or DOCX alternative.

## 28.5 Using content blocks

### Rich text

- For prose. Paragraphs, headings H2/H3/H4, lists, links, emphasis (bold/italic).
- Insert a te reo toggle: select text → click te reo button in toolbar.
- Keep paragraphs ≤ 5 sentences.

### Callout box

- **When:** surface a key note, warning, or next step.
- **Variants:** Info (default), Warning, Success, Deadline.
- Keep to 2-3 sentences + one CTA maximum.

### Accordion list

- **When:** FAQs, or supplementary detail users can choose to open.
- Don’t hide critical info in accordions.
- Expand order: most common/important questions first.

### Image with caption

- Always include alt text.
- Caption: artist name, photographer, year, venue where relevant. Displayed below the image in italics.
- **Minimum resolution:** 2000px wide. Upload higher if available; CMS generates sizes.

### Video embed

- YouTube URL only. Vimeo if needed.
- **Required:** the video has captions. If it doesn’t, don’t embed it until it does.
- Caption field: short description of the video’s content.

## 28.6 Publishing a news article

Same as page, plus:

- **Categories:** pick 1-2. Drives filtering on /news-and-blog.
- **Featured image:** required. 2000×1000 minimum. Alt text describes the image’s content.
- **Author:** pick a person reference, or type an override name.
- **Publish date:** defaults to now. Can backdate or schedule forward.
- **Pinned:** checkbox — pins to top of news index for up to 14 days.

## 28.7 Adding a new fund

Higher stakes — affects primary audience journey. Process:

1. Editor drafts in Sanity with all fields filled.
1. Arts adviser for the relevant artform reviews eligibility, amount, criteria.
1. Comms reviews voice.
1. Portal deep link confirmed with portal team (URL to the matching application form).
1. Legal reviews Terms and Conditions link.
1. Publish.
1. Announce via news article + newsletter.

## 28.8 Common mistakes

- **Pasting from Word** — brings hidden formatting. Use the "paste as plain text" option or paste into a plain text editor first.
- **Inline styles** — don’t try to centre, colour, or size text. Those are structural; they live in components.
- **Image-only buttons** — an image with a link but no alt text reads as "link" to screen readers. Always add alt or convert to a real button.
- **Uploading uncompressed images** — no need. The CMS compresses. Do upload high resolution so the CMS has room to downscale.
- **Forgetting macrons.** Every. Single. Time. Worth setting up a macron keyboard layout.

## 28.9 Maintenance schedule

- **Weekly:** check the editorial queue; publish pending news; review zero-result search queries.
- **Monthly:** audit upcoming fund rounds — confirm close dates are correct; PortalCTA links alive; adviser contacts current.
- **Quarterly:** review top-traffic pages for accuracy; refresh imagery; link-check all external links.
- **Annually:** audit the whole site. Content inventory review. Accessibility re-audit.
