# 26 — Body Copy Drafts

Draft copy for every significant page on the site. Claude Code can instantiate these directly into the CMS; CNZ editors review and sign off. Anything needing CNZ-specific knowledge (exact fund amounts, adviser names, programme details) is marked CONFIRM.

> **Note:** **How to use this section**
> Each page copy is drafted in voice per section 4.4 (clear, direct, respectful).
> Square brackets with CONFIRM are blockers — Claude Code should leave these as placeholders in the CMS and flag them to the product owner before publish.
> Text in {curly braces} is a field the CMS fills dynamically (e.g. {{ fund.amount.max }}).
> Everything else can ship as-is subject to editorial review.

## 35.1 Home

### Hero

```
Eyebrow: TOI AOTEAROA
Headline: Supporting the arts of Aotearoa
Subhead: We fund artists, practitioners, and organisations making the art that defines this place.
CTA primary: Find funding → /funding-and-support
CTA secondary: Read our strategy → /about-creative-nz/our-vision-and-values
```

### Three-door grid

```
Eyebrow: FIND FUNDING
Section title: Three doors in
 
Door 1 — Early career artists
  Supporting sentence: You're starting out in your arts practice and looking for your first funding.
  CTA: See what's for you →
 
Door 2 — Artists and practitioners
  Supporting sentence: You're developing your practice and creating new work.
  CTA: See what's for you →
 
Door 3 — Arts organisations and groups
  Supporting sentence: You run a company, collective, or arts charity.
  CTA: See what's for you →
```

### Advocate band

```
Headline: Advocate for the arts in Aotearoa
Subhead: Use our tools and research to make the case for arts funding in your community.
CTA: Get the advocate toolkit → /advocating-for-the-arts
```

### Newsletter

```
Headline: Stay in the loop
Subhead: Get arts news and funding deadlines in your inbox monthly.
Consent copy: By subscribing you agree to our privacy policy.
Button: Subscribe
```

## 35.2 Funding and support — section landing

```
Eyebrow: FUNDING AND SUPPORT
H1: Find the right fund for you
Intro: We offer grants, fellowships, and investment programmes for individual artists, practitioners, and arts organisations across Aotearoa. There are three ways to find what fits.
 
Secondary CTAs:
  View funding calendar → /funding-and-support/all-opportunities/funding-calendar
  Talk with an adviser → /funding-and-support/advice-and-support/talk-with-an-adviser
 
H2: I am…
  (routes to three-door grid — copy as on home)
 
H2 (Fund Finder callout):
  Not sure where to start?
  Our Fund Finder asks five quick questions and points you to the right programmes.
  CTA: Start the Fund Finder → /funding-and-support/fund-finder
 
H2: More ways we can help
 
Tile 1 — Advice and support
  Guidance before, during, and after your application.
  Link: /funding-and-support/advice-and-support
 
Tile 2 — Funding calendar
  Every round we run across the year, in one place.
  Link: /funding-and-support/all-opportunities/funding-calendar
 
Tile 3 — Talk with an adviser
  Get in touch with an arts adviser before you apply.
  Link: /funding-and-support/advice-and-support/talk-with-an-adviser
 
Tile 4 — Results
  See who was funded in past rounds and read recent results.
  Link: /funding-and-support/results
```

## 35.3 Early career artists

```
Eyebrow: FUNDING AND SUPPORT
H1: Early career artists
Intro: If you're starting out as an artist, we have funding and support designed for you. This page lists what's available and what to read before you apply.
 
H2: What "early career" means here
We use "early career" as shorthand for artists who have been practising for less than about two years, or who haven't yet received significant public funding. If that's roughly you, you're in the right place — even if you don't tick every box.
 
H2: Funds you might be eligible for
[CMS: dynamically rendered list of funds where fund.tags includes 'early-career' OR fund.audience includes 'early-career-artist']
 
H2: Before you apply
1. Read our applicant types page to see which category fits you best.
2. Check our terms and conditions of funding — these apply to every grant.
3. Set up a portal account (takes about 15 minutes).
 
H2: Talk with us first
If you're applying for the first time, or if your project is unusual, talk with an arts adviser before you submit. Advisers can't write your application — but they can save you from common mistakes and point you to examples of successful projects.
 
CTA: Find your arts adviser → /funding-and-support/advice-and-support/talk-with-an-adviser
 
H2: Related resources
- Arts Funding 101 — a short guide to how arts funding works
- Making an application — step-by-step
- Sustainable careers — resources for building an arts career
```

## 35.4 Artists and practitioners

```
Eyebrow: FUNDING AND SUPPORT
H1: Artists and practitioners
Intro: If you're an established or developing artist, this page lists the funds we run for individuals. Find what fits your next project and check eligibility before you apply.
 
H2: Funds for individual artists
[CMS: dynamically rendered list of funds where audience includes 'individual-artist']
 
H2: Fellowships and residencies
[CMS: sub-list of fund.category === 'Fellowship' || 'Residency']
 
H2: What to know before you apply
Every fund has its own eligibility and criteria. Common requirements:
- You're a New Zealand citizen or permanent resident.
- You've been working as an artist for at least two years (for most funds).
- You haven't recently received a grant from the same programme.
 
Read the specific fund page for exact eligibility.
 
H2: How we assess applications
We score applications against published criteria — usually quality of the proposal, your experience, feasibility, and reach. Assessment takes up to eight weeks. We tell everyone their outcome, whether successful or not.
 
H2: Related resources
- All funding opportunities
- Advice and support
- Use of Artificial Intelligence in applications [CONFIRM: link exists]
```

## 35.5 Arts organisations and groups

```
Eyebrow: FUNDING AND SUPPORT
H1: Arts organisations and groups
Intro: If you run or represent an arts organisation — a company, charity, or collective — this page lists the funding available to you, plus the investment programmes that support arts organisations long-term.
 
H2: Project funding for organisations
[CMS: fund list filtered by audience includes 'arts-organisation']
 
H2: Investment programmes
Two multi-year programmes back our established arts organisations:
 
Toi Tōtara Haemata — our long-term investment programme for larger, nationally significant arts organisations.
Toi Uru Kahikatea — our investment in developing and emerging arts organisations.
 
Both programmes are assessed against strategic fit, sector leadership, audience reach, and governance capability.
 
H2: What we fund
- Programmed work: seasons, exhibitions, publications, tours.
- Artistic development: new-work commissions, residencies, mentorship.
- Audience development: marketing, outreach, access programmes.
- Operational capability: core staffing, governance support.
 
H2: Reporting and accountability
If you're funded, you'll submit progress reports at set intervals — usually 6-monthly. These focus on: artistic activity, audience reach, financial health, and progress toward your development goals.
 
[CONFIRM with CNZ: exact reporting cadence per programme.]
 
H2: Related resources
- Investment programme guidelines
- Submit your programme and budget
- Assessment criteria
```

## 35.6 Funding calendar

```
Eyebrow: ALL OPPORTUNITIES
H1: Funding calendar
Intro: Every current and upcoming funding round in one place. Filter by artform, who it's for, or deadline to find what applies to you.
 
Results heading: Showing {{ count }} of {{ total }} funding rounds
Empty state — no results:
  No funding rounds match your filters.
  Try removing an artform, switching status to "All", or checking the calendar view for upcoming rounds.
  [Reset all filters]
 
Empty state — none open system-wide:
  There are no open funding rounds right now.
  Our next round opens {{ nextOpenDate }} — subscribe to be notified.
  [Subscribe for updates] [See past results]
```

## 35.7 Advice and support landing

```
Eyebrow: FUNDING AND SUPPORT
H1: Advice and support
Intro: Guidance before, during, and after your application. Whether you're new to CNZ funding or coming back for another round, these pages answer the most common questions.
 
H2: Before you apply
→ Applicant types — which category applies to you
→ Terms and conditions of funding
→ Making an application — step by step
 
H2: Getting help
→ Talk with an adviser
→ Webinars and Q+A sessions
→ Supported application service
 
H2: Using the portal
→ CNZ portal help — overview
→ Manage your CNZ account
→ Apply
→ Report
→ Assess
 
H2: If you receive funding
→ Add an activity record to your report
→ Activity details and statistics
→ How to count activity statistics
→ Creative New Zealand logos
 
H2: For investment programme holders
→ Investment programme guidelines
→ Submit your programme and budget
→ 6-month reports
→ Financial year-end reports
→ Assessment criteria
```

## 35.8 Applicant types

```
Eyebrow: BEFORE YOU APPLY
H1: Applicant types
Intro: Before you apply for funding, work out which applicant type fits you best. This affects which funds you're eligible for and what information you'll need to provide.
 
H2: Individual artist
You're applying as a sole practitioner for funding toward your own work or development.
Use this type if: you're applying in your own name; the funds will be paid to you personally; you're the primary creator of the work.
 
H2: Group or collective
Two or more people working together on a shared project.
Use this type if: up to five people are making the work together; you don't need to be a registered entity; one person applies as the nominated recipient.
 
H2: Arts organisation
A registered company, charity, incorporated society, or trust whose core purpose is arts-related.
Use this type if: your organisation has a legal structure; you have governance in place; you file annual returns with the relevant regulator.
 
H2: Toi Tōtara Haemata or Toi Uru Kahikatea investment holder
If your organisation is currently funded through either investment programme, separate guidelines apply. See investment programme guidelines.
 
H2: Not sure?
Talk with an adviser before you apply. Picking the wrong applicant type is one of the more common causes of application issues.
 
CTA: Find your arts adviser →
```

## 35.9 Terms and Conditions of Funding

```
Eyebrow: BEFORE YOU APPLY
H1: Terms and Conditions of Funding
Intro: These terms apply to every grant, fellowship, or investment awarded by Creative New Zealand. By submitting an application you accept these conditions.
 
[CONFIRM with CNZ legal: the actual full terms live here. The sections below are the expected structure — do NOT invent legal text.]
 
H2: 1. Definitions
H2: 2. What the funding is for
H2: 3. Reporting obligations
H2: 4. Acknowledging Creative New Zealand
H2: 5. If your project changes
H2: 6. If things go wrong
H2: 7. Privacy and information sharing
H2: 8. Intellectual property
H2: 9. Accessibility expectations
H2: 10. Ending the agreement
H2: 11. Disputes
H2: 12. Contact
 
Download: Terms and Conditions of Funding (PDF, {{ size }}) — link to CMS document
Plain-text version: available [link]
```

## 35.10 Making an application

```
Eyebrow: ADVICE AND SUPPORT
H1: Making an application
Intro: This page walks you through preparing and submitting an application. Following these steps in order is the fastest way to a strong application.
 
H2: 1. Read the guidelines in full
Every fund has its own guidelines page with eligibility, criteria, amounts, and deadlines. Read these before you draft anything.
 
H2: 2. Confirm you're eligible
If you're not sure about a specific requirement, check with an adviser before you spend time on an application. Ineligible applications can't be funded — regardless of how strong the project is.
 
H2: 3. Draft your proposal
Most applications include:
- A project description (what you'll make and why).
- A budget (what it'll cost and how the grant fits in).
- A timeline (what happens when).
- Evidence of your practice (support material: work samples, reviews, bios).
 
Keep it clear. Assessors read hundreds of applications — concise writing lands better than elaborate prose.
 
H2: 4. Gather support material
Most funds allow up to 10 support items. Choose work that's relevant to what you're proposing — not just your best-ever work. If you're proposing a music project, show your music. If you're proposing a collaborative project, show your history of collaboration.
 
H2: 5. Submit on the portal before the deadline
The deadline is firm. We can't accept late applications — not because of rigidness, but because every application is assessed in the same window and we can't be seen to treat some applicants differently.
 
H2: Using AI in your application
You can use AI tools to help draft, edit, or check an application — but the application must represent your own work and ideas. Don't use AI to generate work samples or fabricate project content. See our full guidance on use of AI.
 
H2: After you submit
We email you to confirm receipt, usually within an hour. Assessment takes up to eight weeks. You'll hear from us by email with the outcome, whether successful or not.
 
CTA: If you're not sure about anything, talk with an adviser →
```

## 35.11 Use of Artificial Intelligence

```
Eyebrow: MAKING AN APPLICATION
H1: Use of Artificial Intelligence
Intro: Artificial Intelligence (AI) tools are changing how creative work is made, described, and assessed. This page explains how we think about AI in the context of funding applications.
 
H2: You can use AI to help you write
If AI helps you structure your proposal, check your grammar, or translate between English and te reo Māori, that's fine. Just like spellcheck, a thesaurus, or a peer editor.
 
H2: The ideas and the work must be yours
What we're funding is your artistic practice — your vision, your skills, your contribution. If you use AI to generate content that you then present as your artistic work (text, image, music), be transparent about it. Some funds specifically support AI-as-medium work; most don't.
 
H2: Don't use AI to fabricate
- Don't use AI-generated work samples to represent your practice.
- Don't use AI to invent collaborators, reviews, or credits.
- Don't use AI to create an application that reads as yours but isn't.
 
H2: Be transparent
If AI played a significant role in shaping your application or your proposed work, tell us. We won't reject an application for honest disclosure of tool use.
 
H2: Assessment and AI
We don't use AI to make funding decisions. Applications are read and scored by human assessors.
 
H2: If you're unsure
Talk with an adviser. We're working this out alongside the sector — your questions help shape our guidance.
```

## 35.12 Talk with an adviser

```
Eyebrow: ADVICE AND SUPPORT
H1: Talk with an adviser
Intro: Our arts advisers are here to help. They can discuss your project before you apply, explain eligibility, and point you to the right fund. They can't write your application — but they can save you from common mistakes.
 
H2: When to get in touch
- You're new to CNZ funding and not sure where to start.
- You have an unusual project that doesn't fit obvious categories.
- You're not sure which applicant type applies to you.
- You've applied before and weren't successful — and want feedback before trying again.
 
H2: When NOT to get in touch
- You're asking us to review your draft application — we can't pre-assess.
- You want us to tell you whether you'll be funded — we can't; that's the assessors' job.
- You're on deadline day — we likely can't reply in time.
 
H2: Find your adviser
Our advisers are organised by artform. Contact the adviser for your primary artform.
 
[CMS: list of advisers, filterable by artform, showing name, iwi affiliation where consented, role, email, phone]
 
H2: Don't know which adviser?
Fill in the form below and we'll route your enquiry to the right person.
 
[Form: Talk with an adviser enquiry — see section 24.6]
 
H2: Supported application service
If you need more support than a conversation — because English isn't your first language, you're disabled, or you're applying from a community that's historically been underrepresented — you may be eligible for our Supported Application Service.
 
[CONFIRM with CNZ: exact eligibility for Supported Application Service.]
 
Link: Supported application service →
```

## 35.13 Results landing

```
Eyebrow: FUNDING AND SUPPORT
H1: Results
Intro: See who we've funded, in what artforms, and with what outcomes. We publish results after each round closes and assessments are complete.
 
H2: Recent funding rounds
[CMS: list of fundingResult documents by publishedDate desc, most recent 10]
 
H2: Investment programmes
Our multi-year investment programmes support nationally significant and developing arts organisations. Recipients are announced at the start of each investment cycle.
 
Links:
- Toi Tōtara Haemata recipients
- Toi Uru Kahikatea recipients
 
H2: Awards
Recognition and awards we present to mark outstanding contribution to the arts.
- Arts Pasifika Awards
- Prime Minister's Awards for Literary Achievement
- Te Waka Toi Awards
 
H2: Bursaries, fellowships, scholarships, and residencies
Current and past recipients of our named opportunities.
[CMS: list of 18 named fellowships/residencies per sitemap]
```

## 35.14 About Creative NZ — landing

```
Eyebrow: ABOUT US
H1: About Creative New Zealand
Intro: Creative New Zealand Toi Aotearoa is the national arts development agency of Aotearoa. We fund artists, practitioners, and arts organisations; build capability across the sector; and advocate for the arts in government, local councils, and communities.
 
H2: Kōrero about us
- What we do — our purpose, powers, and remit
- Our change journey — the strategic shift we're in
- Our vision and values
- Our Council — the governing body
- The team — who you'll deal with
- Corporate documents — annual reports, strategies, policies
 
H2: Working with us
- Requesting information — Official Information Act requests
- Making a complaint — how to raise a concern
- Work for us — current vacancies
- Contact us — find the right person
```

## 35.15 What we do

```
Eyebrow: ABOUT CREATIVE NZ
H1: What we do
Intro: Creative New Zealand is the Arts Council of New Zealand Toi Aotearoa. We're an autonomous Crown entity established under the Arts Council of New Zealand Toi Aotearoa Act 2014.
 
H2: Our role
We do four things:
1. Fund individual artists, practitioners, groups, and arts organisations.
2. Build capability across the arts sector — through resources, advocacy tools, and professional development.
3. Advocate for the arts — with government, councils, and the public.
4. Represent Aotearoa's arts internationally — through residencies, market development, and exchanges.
 
H2: What we fund
We fund across ten artforms: craft/object art, dance, inter-arts and multi-disciplinary work, literature, media arts, music, ngā toi Māori, Pacific arts, theatre, and visual arts.
 
H2: Who funds us
Our income comes from two main sources:
- Crown funding through Manatū Taonga (the Ministry for Culture and Heritage).
- Grants from Lotto New Zealand.
 
In [CONFIRM: most recent financial year], we invested [CONFIRM: $M] across [CONFIRM: number] projects and organisations. See our annual report for the detailed breakdown.
 
H2: How we decide
Every funding decision goes through a structured assessment process:
1. Staff check applications for eligibility.
2. Independent assessors — working artists and arts professionals — score applications against published criteria.
3. Final decisions are made by our Council, informed by assessor recommendations.
 
This structure keeps decisions at arm's length from politics and from CNZ staff.
 
H2: Our strategic direction
Our current strategic direction is set out in [CONFIRM: current strategy document name and period]. It emphasises:
- Equity — ensuring our funding reaches the full breadth of Aotearoa's arts communities.
- Bicultural commitment — honouring the Treaty of Waitangi in how we work.
- Sustainability — supporting careers and organisations for the long term.
- Public value — demonstrating the impact of public investment in the arts.
 
CTA: Read our full strategy → /about-creative-nz/our-vision-and-values
```

## 35.16 Our vision and values

```
Eyebrow: ABOUT CREATIVE NZ
H1: Our vision and values
Intro: Our vision, values, and strategic direction shape every decision we make — from how we assess funding applications to how we work with the arts sector.
 
H2: Vision
[CONFIRM: exact vision statement from current CNZ strategy]
 
H2: Values
[CONFIRM: CNZ's published values — examples below are placeholders]
- Manaakitanga — care and respect for artists, practitioners, and communities.
- Whakawhanaungatanga — building relationships of trust.
- Rangatiratanga — supporting the self-determination of artists.
- Kaitiakitanga — stewarding public resources responsibly.
- Tika — doing the right thing, fairly and transparently.
 
H2: Our commitment to the Treaty of Waitangi
[CONFIRM: CNZ's bicultural policy / te Tiriti commitment statement]
As a Crown entity we're bound by te Tiriti o Waitangi. In practice this means: Ngā Toi Māori has standing as a distinct funding stream; Māori assessors are part of our decision-making; te reo Māori is used across our work; and we consult with iwi and Māori arts communities on our strategic direction.
 
H2: Strategic priorities
[CONFIRM: current priorities]
 
Download: Full strategy document — [CMS document reference]
```

## 35.17 Our Council

```
Eyebrow: ABOUT CREATIVE NZ
H1: Our Council
Intro: Creative New Zealand is governed by a Council of up to 13 members, appointed by the Minister for Arts, Culture and Heritage. The Council sets strategic direction, makes funding decisions on the largest investments, and ensures we operate in line with the Arts Council Act.
 
H2: The Chair
[CMS: person reference — Chair, with photo, role, bio, iwi affiliation if consented]
 
H2: Deputy Chair
[CMS: person reference]
 
H2: Council members
[CMS: list of person documents where team === 'Council']
 
H2: How the Council is appointed
Council members are appointed by the Minister for Arts, Culture and Heritage for terms of up to four years. Appointments reflect a range of artforms, geographic regions, and perspectives — including a requirement that the Council has a strong understanding of te ao Māori and Pacific arts.
 
[CONFIRM with CNZ governance: exact current appointment process.]
 
H2: Meeting schedule and papers
The Council meets [CONFIRM: how often]. Publicly available papers are listed in our corporate documents section.
 
Link: Corporate documents →
```

## 35.18 The team

```
Eyebrow: ABOUT CREATIVE NZ
H1: The team
Intro: Our staff are based in three offices — Te Whanganui-a-Tara Wellington (head office), Tāmaki Makaurau Auckland, and Ōtepoti Dunedin. You'll most often deal with our arts advisers when you apply for funding; the team page below also lists our leadership and operational staff.
 
H2: Executive leadership
[CMS: persons where team === 'Executive']
 
H2: Arts development (advisers)
[CMS: persons where team === 'Arts development', grouped by artform]
If you're looking for the adviser for your artform, contact details are on each person's entry.
 
H2: Māori arts team
[CMS: persons where team === 'Māori arts']
 
H2: Pacific arts team
[CMS: persons where team === 'Pacific arts']
 
H2: Communications and operations
[CMS: other public-visibility staff]
 
H2: Getting in touch
For funding enquiries, the fastest route is to contact the adviser for your artform directly. For general enquiries, email info@creativenz.govt.nz or phone +64 4 473 0880.
 
Full contact details: /about-creative-nz/contact-us
```

## 35.19 Contact us

```
Eyebrow: ABOUT CREATIVE NZ
H1: Contact us
Intro: The fastest way to reach us depends on what you need. For funding questions, contact the arts adviser for your artform. For everything else, use the options below.
 
H2: Offices
Te Whanganui-a-Tara Wellington (head office)
Level 5, 131 Cuba Street
PO Box 3806, Wellington 6140
+64 4 473 0880
info@creativenz.govt.nz
 
Tāmaki Makaurau Auckland
[CONFIRM: current Auckland office address and phone]
 
Ōtepoti Dunedin
[CONFIRM: current Dunedin office address and phone]
 
Opening hours: Monday to Friday, 9am to 5pm NZT (excluding public holidays).
 
H2: Funding enquiries
Contact the arts adviser for your artform — see the team page.
 
Link: The team →
 
H2: Media enquiries
[CONFIRM: media contact email]
We respond to media requests within 24 hours during business days.
 
H2: General enquiries
Use the form below, or email info@creativenz.govt.nz.
 
[Contact form — see section 24.2]
 
H2: Official Information Act requests
If you're requesting information we hold, use our OIA request form — we respond within 20 working days as required by the Act.
 
Link: Requesting information →
 
H2: Complaints
If you have a concern about CNZ, our processes, or our staff, you can make a formal complaint.
 
Link: Making a complaint →
 
H2: Follow us
Facebook · LinkedIn · Instagram · YouTube
```

## 35.20 News and blog landing

```
Eyebrow: NEWS AND BLOG
H1: News and blog
Intro: Updates from Creative New Zealand — funding news, sector announcements, policy updates, and thinking from the team. Filter below or browse by topic.
 
Filters: Category · Artform · Year
 
H2: Latest
[CMS: newsArticle grid, filterable, 12 per page, Load more]
 
Empty state:
  No news items in this category yet.
 
H2: Subscribe
Get these in your inbox. We send a monthly digest.
[NewsletterSignup]
```

## 35.21 Accessibility statement

```
Eyebrow: ABOUT THIS SITE
H1: Accessibility statement
Last updated: {{ lastUpdated }}
Intro: Creative New Zealand is committed to ensuring our website is accessible to all New Zealanders, including disabled people. This website is designed to meet WCAG 2.2 Level AA, as required by the NZ Government Web Accessibility Standard 1.2.
 
H2: Conformance status
We believe this site fully conforms to WCAG 2.2 at Level AA. The site was last audited by [CONFIRM: auditor name] on [CONFIRM: audit date]. A summary of findings is available on request.
 
H2: What we've done to make this site accessible
- Semantic HTML throughout, with meaningful heading hierarchy.
- Visible focus indicators on all interactive elements.
- Colour contrast meets or exceeds 4.5:1 for body text and 3:1 for non-text elements.
- The site works fully with a keyboard alone.
- Images have meaningful alternative text; decorative images are marked as such.
- Forms have visible labels and clearly associated error messages.
- Te reo Māori words are marked with lang="mi" so screen readers pronounce them correctly.
- Motion respects prefers-reduced-motion.
- PDFs linked from the site are accessible, or accompanied by an accessible alternative format.
 
H2: Known issues
[CONFIRM: list any known accessibility gaps, e.g. older PDF archives awaiting remediation]
 
H2: Feedback
If you find something hard to use, please contact us.
 
Email: info@creativenz.govt.nz
Phone: +64 4 473 0880
 
We respond to accessibility feedback within 5 working days and aim to resolve issues within 20 working days.
 
H2: Alternative formats
We can provide content in these formats on request:
- Plain text
- Large print
- Easy-read summaries for key pages
- NZSL video for priority content
 
Contact us to request an alternative format.
 
H2: Compatibility
This site is tested with:
- Latest versions of Chrome, Firefox, Safari, and Edge.
- NVDA + Firefox (Windows).
- VoiceOver + Safari (macOS, iOS).
- TalkBack + Chrome (Android).
 
H2: Technical specifications
This site relies on HTML, CSS, JavaScript, and ARIA. It's designed to degrade gracefully when any of these aren't fully supported.
 
H2: Legal basis
This accessibility statement is published in accordance with the NZ Government Web Accessibility Standard 1.2 (effective 17 March 2025) and our obligations under the New Zealand Human Rights Act 1993.
```

## 35.22 Privacy

```
Eyebrow: ABOUT THIS SITE
H1: Privacy
Last updated: {{ lastUpdated }}
Intro: This privacy statement explains how Creative New Zealand collects, uses, and protects personal information through this website. Our handling of personal information is governed by the Privacy Act 2020.
 
H2: What we collect on this website
- Information you give us through forms (your name, email, and anything else you enter on a contact, newsletter, complaint, or OIA form).
- Basic website usage data (pages visited, approximate region, device type) — we use Plausible Analytics, which does not use cookies or track individuals across sites.
 
We don't:
- Use advertising trackers.
- Share your information with advertisers.
- Sell your information to anyone.
 
H2: Cookies
This site uses only strictly-necessary cookies for core functionality (e.g. remembering your language preference if you toggle it).
 
H2: Newsletter
If you subscribe to our newsletter, we store your email and any preferences you give us with Mailchimp. You can unsubscribe at any time using the link in every newsletter email.
 
H2: Your rights
Under the Privacy Act 2020 you have the right to:
- Request a copy of the personal information we hold about you.
- Ask us to correct it if it's wrong.
- Complain to the Office of the Privacy Commissioner if you think we've handled your information incorrectly.
 
To exercise these rights, contact our Privacy Officer: privacy@creativenz.govt.nz.
 
H2: Security
We take reasonable steps to protect personal information. Data is transmitted over HTTPS, and stored with providers who meet New Zealand privacy standards.
 
[CONFIRM with CNZ legal: exact data-residency commitments based on chosen CMS / analytics / email providers.]
 
H2: Changes to this statement
We update this statement when our practices change. Material changes will be signalled on our website and in our newsletter.
 
H2: Contact
Privacy Officer
Creative New Zealand Toi Aotearoa
PO Box 3806, Wellington 6140
privacy@creativenz.govt.nz
```

## 35.23 Copyright

```
Eyebrow: ABOUT THIS SITE
H1: Copyright
Intro: Material on the creativenz.govt.nz website is copyright to Creative New Zealand unless otherwise noted.
 
H2: Creative Commons
Unless stated otherwise, content on this site is licensed under Creative Commons Attribution 4.0 International (CC BY 4.0). This means you're free to copy, redistribute, adapt, and build upon the material, provided you give appropriate credit.
 
Credit format: "© Creative New Zealand Toi Aotearoa, creativenz.govt.nz, CC BY 4.0"
 
H2: What's not covered by CC BY
- The Creative New Zealand logo and koru brand assets — all rights reserved.
- Photographs and artwork of funded artists and their work — copyright belongs to the individual artists and photographers.
- Third-party content clearly marked as such.
 
For permission to use logos or branded materials, contact comms@creativenz.govt.nz.
 
H2: Quoting and linking
You don't need permission to quote short extracts or link to our pages. If you're republishing significant portions of content, the CC BY terms apply.
 
H2: Reporting infringement
If you believe material on this site infringes your copyright, contact us at copyright@creativenz.govt.nz with enough detail for us to identify and assess the material. [CONFIRM: exact CNZ copyright contact.]
```

## 35.24 404 and 500

Both covered in section 25.1 and 25.2 — copy is already authored there.

## 35.25 Pages not yet drafted

The following pages are lower-traffic or highly CNZ-specific. Claude Code should create them as CMS documents with the heading structure below and a placeholder intro, then flag to the editor for full copy authoring.

- Our change journey — CNZ-specific strategic programme; editor authors.
- Work for us — ATS-linked; editor authors; template: "See current vacancies at [ATS link]".
- Requesting information — structured around the OIA form; template copy per section 24.4.
- Making a complaint — structured around the complaint form; template copy per section 24.5.
- Corporate documents — listing template; editor adds `document` references.
- The 18 bursary/fellowship/scholarship/residency item pages — each has its own structure (fund template); CNZ supplies specifics per round.
- Toolkit pages (Community arts, Risk management, Volunteer management, Donations) — existing content migrates 1:1; editor reviews for voice.
- Nui te Kōrero pages — existing symposium content; migrates 1:1.
- Research and reports — listing template.
- Past reports (New Zealanders and the Arts) — listing template.
- Advocacy tools and research children — migrate existing content.
- Sustainable careers children — migrate existing content.
- Portal help pages (`cnz-portal-help/*`) — migrate existing content; verify links to portal are current.
- Investment programme guidelines (`investment-programme-guidelines/*`) — CNZ-specific; migrate 1:1.
