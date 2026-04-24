# 06 — CMS Content Model

Assumes Sanity. If you go with Payload, the schemas port 1:1 — the concepts are the same.

## 9.1 Design principles

1. **Every piece of content is a typed document.** No "pages" that are just a bag of HTML.
1. **Reuse by reference, not duplication.** An artform, an applicant-type, a staff member are documents — funds reference them.
1. **Structured over free-form.** A "fund" has a typed amount, closeDate, eligibility[] — not a WYSIWYG blob.
1. **Bilingual support is built in from day one.** Every user-facing string is `{ en: string; mi?: string }`.
1. **Required alt text on every image,** with a `decorative: true` escape hatch.

## 9.2 Document types

### page — generic content page

```
{
  _type: 'page',
  slug: { current: string, _type: 'slug' },           // e.g. "what-we-do"
  parentSection: reference → section,                  // for breadcrumb + nav
  title: localizedString,
  eyebrow?: localizedString,
  intro?: localizedText,                               // paragraph
  blocks: array of (richText | callout | pullQuote | statList | accordion |
                    tabs | imageWithCaption | videoEmbed | documentList |
                    cta | relatedLinks),
  seo: { title?, description?, image? },
  lastUpdated: datetime,
  locale: 'en' | 'mi',
}
```

### section — L1/L2 section reference

```
{
  _type: 'section',
  slug,
  title: localizedString,
  parent?: reference → section,                        // null for L1s
  introPage?: reference → page,                        // the landing page for the section
  order: number,                                       // nav order
  theme?: 'orange' | 'lime' | 'cyan' | 'coral' | 'plum' | 'navy',
}
```

### fund — a funding opportunity

```
{
  _type: 'fund',
  slug,
  name: localizedString,
  shortName?: localizedString,
  category: 'Grant' | 'Fellowship' | 'Scholarship' | 'Bursary' | 'Residency' | 'Investment',
  audience: array of reference → applicantType,
  artforms: array of reference → artform,
  summary: localizedText,
  amount: {
    min?: number,
    max?: number,
    currency: 'NZD',
    note?: localizedString,                            // "Up to $10,000"
  },
  rounds: array of fundRound,
  eligibility: localizedRichText,
  whatWeFund: localizedRichText,
  whatWeDoNotFund: localizedRichText,
  howToApply: localizedRichText,
  assessmentCriteria: localizedRichText,
  timeline?: array of timelineStep,
  faqs?: array of { question, answer },
  contactPerson?: reference → person,
  portalUrl?: string,
  relatedFunds: array of reference → fund,
  seo,
}
 
fundRound: {
  name: localizedString,                               // "Round 2 — November 2026"
  openDate: date,
  closeDate: datetime,                                 // with tz
  status: 'upcoming' | 'open' | 'closed',
  results?: reference → fundingResult,
}
```

### fundingResult — round recipients

```
{
  _type: 'fundingResult',
  slug,
  fund: reference → fund,
  round: reference → fundRound,
  publishedDate: date,
  summary: localizedText,
  recipients: array of {
    name: string,
    iwiOrRegion?: string,
    projectTitle: string,
    artform: reference → artform,
    amount: number,
    projectDescription?: localizedText,
  },
}
```

### newsArticle — news & blog

```
{
  _type: 'newsArticle',
  slug,
  title: localizedString,
  standfirst: localizedText,
  author?: reference → person,
  authorOverride?: string,
  publishedAt: datetime,
  categories: array of reference → newsCategory,
  artforms?: array of reference → artform,
  featuredImage?: { asset, alt: localizedString, caption?, credit? },
  body: localizedRichText,                             // Portable Text
  seo,
}
```

### person — staff, council, advisers

```
{
  _type: 'person',
  slug,
  name: string,
  iwiAffiliation?: string,                             // only if person has consented
  role: localizedString,
  team: 'Council' | 'Executive' | 'Arts development' | 'Māori arts' |
        'Pacific arts' | 'Communications' | 'Operations' | ...,
  photo?: { asset, alt },
  bio?: localizedRichText,
  email?: string,
  phone?: string,
  visibility: 'public' | 'internal',
}
```

### artform — reference data

```
{
  _type: 'artform',
  slug,
  name: localizedString,                               // e.g. { en: 'Theatre', mi: 'Toi whakaari' }
  colorToken?: 'orange' | 'lime' | ...,
  order: number,
}
 
Seed: Craft/object art, Dance, Inter-arts/Multi-disciplinary, Literature,
      Media arts, Music, Ngā Toi Māori, Pacific arts, Theatre, Visual art.
```

### applicantType — reference data

```
{
  _type: 'applicantType',
  slug,
  name: localizedString,
  description: localizedText,
  examples?: array of localizedString,
}
 
Seed: Individual artist, Early career artist, Group, Arts organisation,
      Toi Tōtara Haemata holder, Toi Uru Kahikatea holder.
```

### newsCategory, document, event, globalSettings

**newsCategory:** Funding news, Sector update, Policy, Announcement, Event, Opinion/blog.

```
document: {
  _type: 'document',
  title: localizedString,
  description?: localizedString,
  file: fileAsset,
  alternativeFormats?: array of fileAsset,             // e.g. plain text version
  lastUpdated: date,
  category: 'Strategy' | 'Policy' | 'Report' | 'Guideline' | 'Form',
}
 
event: {
  _type: 'event',
  slug,
  title: localizedString,
  startsAt: datetime,
  endsAt: datetime,
  timezone: 'Pacific/Auckland',
  location: { type: 'online' | 'in-person' | 'hybrid', venue?, city?, url? },
  description: localizedRichText,
  registerUrl?: string,
  accessibilityNotes?: localizedRichText,
  recordingUrl?: string,
}
 
globalSettings: {                                      // singleton
  _type: 'globalSettings',
  siteTitle: localizedString,
  siteTagline: localizedString,
  defaultSeoImage?,
  headerCtas?: array of { label, href },
  announcementBanner?: { enabled, message, href, type: 'info' | 'warning' | 'emergency' },
  footerColumns: array of footerColumn,
  sponsorLogos: array of { image, alt, href },
  socialLinks: array of { platform, url },
  newsletterIntro: localizedText,
}
```

## 9.3 Portable Text rich-text schema

Customise Sanity’s block editor with our block marks:

- **Styles:** normal, h2, h3, h4, blockquote
- **Lists:** bulleted, numbered
- **Marks:** strong, em, link (with rel, target, te reo `lang="mi"` toggle), code
- **Custom blocks inside body:** callout, pullQuote, imageWithCaption, videoEmbed, documentList inline

## 9.4 GROQ queries (samples)

#### Fetch content page with referenced data

```
*[_type == "page" && slug.current == $slug && locale == $locale][0]{
  _id,
  title,
  eyebrow,
  intro,
  "section": parentSection->{
    title,
    slug,
    "parent": parent->{title, slug}
  },
  blocks[]{
    _type,
    ...,
    _type == "cta" => {
      ...,
      "link": link->{title, slug}
    }
  },
  seo,
  lastUpdated
}
```

#### Upcoming funding rounds for the calendar

```
*[_type == "fund" && defined(rounds) && count(rounds[closeDate > now()]) > 0]{
  slug,
  name,
  category,
  "audience": audience[]->name,
  "artforms": artforms[]->name,
  amount,
  "nextRound": rounds[closeDate > now()] | order(closeDate asc)[0]
} | order(nextRound.closeDate asc)
```

## 9.5 Authoring UX expectations

- **Previews:** Every document type has a live preview pane pointing at the deploy preview’s `/draft` route.
- **Required fields:** Alt text on every image. Close dates on funds. SEO title/description on pages or fall through to title.
- **Validation on publish:** No broken references. No empty required fields. Warn (don’t block) on missing mi translation — we ship English-first.
- **Roles:** admin (schema), editor (publish), contributor (draft-only).

## 9.6 Localisation strategy

- Each top-level document has a `locale` field.
- A `translationGroup` field links English and Māori versions of the same content.
- The route `/mi/...` mirrors `/...` where a mi translation exists; falls back to English with a notice when it doesn’t.
- The LangToggle swaps between sibling translations; if missing, it points to the home in the other locale.
