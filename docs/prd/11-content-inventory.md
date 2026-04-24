# 11 — Content Inventory

A record of every page/content type to migrate. The canonical URL list lives in section 3; this section adds migration metadata.

## 14.1 Top-level + utility pages (P0)

| **Page** | **Template** | **Doc type** | **Owner** |
| --- | --- | --- | --- |
| Home | Home | page (singleton) | Comms + CEO |
| Site map | generated | — | — |
| Privacy | Content | page | Legal |
| Accessibility statement | Content | page | Web team |
| Copyright | Content | page | Legal |
| Search | custom | — | — |

## 14.2 Funding and support (P0 — highest traffic)

| **Page** | **Template** | **Doc type** |
| --- | --- | --- |
| Funding and support (landing) | Section Landing | section + intro page |
| Early career artists | Content | page |
| Artists and practitioners | Content | page |
| Arts organisations and groups | Content | page |
| All opportunities | Listing | custom view of fund |
| Funding calendar | Listing | custom view of fund.rounds |
| Other sources of funding and support | Content | page |
| Advice and support | Sub-section Landing | section |
| — Before you apply | Content | page |
| — — Applicant types | Content | page |
| — — Terms and Conditions of Funding | Content | page |
| — Making an application | Content | page |
| — — Use of Artificial Intelligence | Content | page |
| — If you receive funding | Content | page |
| — — Add an activity record to your report | Content | page |
| — — Activity details and statistics | Content | page |
| — — How to count Activity statistics | Content | page |
| — — How to use Creative New Zealand logos | Content | page + document |
| — Speak with an adviser | Content | page |
| — — Webinars and Q+A sessions | Listing | view of event |
| — — Supported application service | Content | page |
| — CNZ portal help (+ 4 child pages) | Content | page each |
| — Investment programme guidelines (+ 5 children) | Content | page each |
| Sustainable careers (+ 3 children) | Content | page each |
| Results (landing) | Sub-section | section |
| — Funding rounds | Listing | view of fundingResult |
| — Investment Programmes | Content + Listing | page + view |
| — Award winners (+ 3 children) | Content | page each |
| — Bursaries, fellowships (+ 18 items) | Item Detail | fund each |
| Our change journey | Content | page |

## 14.3 Advocating for the arts (P0)

| **Page** | **Template** | **Doc type** |
| --- | --- | --- |
| Advocating for the arts (landing) | Section Landing | section |
| Advocacy tools and research | Sub-section | section |
| — A guide for arts advocates | Content | page |
| — Arts Funding 101 | Content | page |
| — Fact finder for arts advocates | Content | page |
| — How you can advocate | Content | page |
| — How to make a submission on local council plans | Content | page |
| — Creative New Zealand submissions to councils | Listing | view of document |
| Our advocacy work | Content | page |
| Our Advisory Group — Te Rōpū Mana Toi | Content | page + person list |

## 14.4 Development and resources (P1)

| **Page** | **Template** | **Doc type** |
| --- | --- | --- |
| Development and resources (landing) | Section Landing | section |
| New Zealanders and the Arts — Ko Aotearoa me ōna Toi | Content | page |
| — Past reports | Listing | view of document |
| Sustainable careers (duplicate — resolve) | — | — |
| Nui te Kōrero (+ 4 children) | Sub-section + Content | section + pages |
| Toolkits — Community arts (+ 5 children) | Content | page each |
| Toolkits — Risk Management | Content | page |
| Toolkits — Volunteer Management | Content | page |
| Toolkits — Donations (+ 8 children) | Content | page each |
| Research and reports | Listing | view of document |

## 14.5 About Creative NZ (P0)

| **Page** | **Template** | **Doc type** |
| --- | --- | --- |
| About Creative NZ (landing) | Section Landing | section |
| What we do | Content | page |
| Our change journey | Content | page (may dedupe) |
| Our vision and values | Content | page |
| Our Council | Content | page + person list |
| Our team | Content | page + person directory |
| Corporate documents | Listing | view of document |
| Requesting information | Content + form | page |
| Making a complaint | Content + form | page |
| Work for us | Content | page + ATS link |
| Contact us | Content + form | page + person list by artform |

## 14.6 News and blog (P0)

| **Page** | **Template** | **Doc type** |
| --- | --- | --- |
| News and blog (landing) | Listing | view of newsArticle |
| Article pages | Article | newsArticle |

**Migration strategy for news:** import all existing articles as `newsArticle` documents with original `publishedAt`. Map existing timestamp URLs to new shorter URLs via redirects. Maintain RSS feed at `/news.xml` for reader continuity.

## 14.7 Reference data (P0 — seed before content)

| **Type** | **Records** |
| --- | --- |
| artform | Craft/object art, Dance, Inter-arts/Multi-disciplinary, Literature, Media arts, Music, Ngā Toi Māori, Pacific arts, Theatre, Visual art |
| applicantType | Individual artist, Early career artist, Group, Arts organisation, Toi Tōtara Haemata holder, Toi Uru Kahikatea holder |
| newsCategory | Funding news, Sector update, Policy, Announcement, Event, Opinion/blog |
| section | All L1/L2 sections per sitemap |

## 14.8 Global / structural content (P0)

| **Key** | **Where** |
| --- | --- |
| Site title, tagline | globalSettings |
| Header CTAs | globalSettings |
| Footer columns | globalSettings |
| Sponsor logos (Lotto, Manatū Taonga, NZ Government) | globalSettings |
| Social links | globalSettings |
| Newsletter intro copy | globalSettings |
