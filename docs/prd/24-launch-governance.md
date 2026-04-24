# 24 — Launch Comms, Training, and Governance

## 31.1 Launch communications plan

### Internal (CNZ staff)

- **T-4 weeks:** All-staff demo of the new site on staging.
- **T-2 weeks:** Team leads briefed on what’s changed for their area (editors, advisers, comms).
- **T-1 week:** Staff-wide email: what’s new, where things moved, link to staging.
- **Launch day:** Slack announcement; celebrations; on-call list published.

### External (audiences)

- **T-2 weeks:** Newsletter teaser: "A refreshed website is coming on [date]. Here’s what’s new."
- **T-1 week:** Social media posts (LinkedIn, Facebook, Instagram). No full reveal — just the date.
- **Launch day:** News article on the new site announcing itself. Newsletter send. Social posts with screenshots.
- **T+1 week:** "What’s new" article highlighting specific improvements (Fund Finder, funding calendar, bilingual toggle).

### Sector / government

- **Email to partner organisations** (sister Crown entities, Manatū Taonga, major arts orgs) on launch day with a link and brief on any structural changes.
- **Ministerial briefing** if the portfolio Minister’s office wants one. Arranged by CNZ leadership.

## 31.2 Training

### CMS training for editors

- **Format:** 2-hour workshop, small groups (3-5 editors).
- **Sessions:** three sessions in launch week; repeat quarterly for new joiners.
- **Content:** walk through the handbook (section 28); hands-on practice creating a page, article, fund update; accessibility checklist; publish workflow.
- **Take-home:** the handbook printed + link to the Studio docs.
- **Recording:** sessions recorded (with captions) for future onboarding.

### Advisor training

- Arts advisers: 1-hour session on how to find content that answers common enquiries; how the Fund Finder works so they can explain it; how the portal deep-links work.

### Developer handover

- **Repo README:** setup, run locally, deploy, troubleshoot common issues.
- **Architecture doc:** this PRD + a "what’s where" map of the repo.
- **Runbook:** on-call procedures, Sentry triage, how to rollback, how to revoke secrets.
- **Knowledge transfer session** with CNZ IT on hosting, secrets, DNS, CI.

## 31.3 Post-launch governance

### Roles

| **Role** | **Responsibilities** |
| --- | --- |
| Product owner (CNZ) | Roadmap, prioritisation, sign-off on content and functionality changes |
| Lead editor (CNZ) | Editorial calendar, content quality, te reo commission management |
| Web lead (CNZ IT or agency) | Technical health, deploys, performance, incidents |
| Accessibility champion (CNZ) | Quarterly a11y reviews, accessibility statement, user feedback |
| Analytics reviewer | Monthly analytics digest, zero-result query review |

### Cadence

- **Weekly:** editorial standup; zero-result query review; deploys as needed.
- **Monthly:** product owner reviews roadmap + user feedback; performance report.
- **Quarterly:** accessibility spot-check; link-check; content audit of top pages.
- **Annually:** external accessibility audit; full content audit; tech-debt review; brand refresh check-in.

### Feedback channels

- **Site feedback** — a persistent "Feedback on this site?" link in the footer → dedicated form → tracked in CMS.
- **Accessibility feedback** — per the accessibility statement, email channel with 5 working day response target.
- **Staff feedback** — Slack channel #web-feedback for internal raises.

### Change management

- **Small changes** (copy, images, news): editor publishes directly.
- **Medium changes** (new pages, nav changes): reviewed by product owner before publish.
- **Large changes** (new sections, IA changes, new templates): design + dev work, PRD addendum, staged rollout.

## 31.4 Roadmap beyond launch

v1 ships with the scope of this document. Candidates for v1.x and v2:

- **v1.1** — Fund Finder live (if punted from v1); funding calendar view mode.
- **v1.2** — More te reo Māori coverage (phase 2 of translation).
- **v1.3** — Personalisation: remembered artform/audience-group filter preferences in localStorage. Opt-in.
- **v2.0** — Consider: account hub on marketing site that shows portal application status inline (requires portal API); saved searches; notification preferences.
