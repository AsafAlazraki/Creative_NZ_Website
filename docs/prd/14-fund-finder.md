# 14 — Fund Finder — Detailed UX Specification

The Fund Finder is a guided stepper that helps users who don’t know which fund fits them. It asks 3–5 short questions and routes to a filtered result set. It’s not a replacement for the calendar — it’s an alternative entry point for the less confident user.

## 21.1 Entry points

- Callout block on `/funding-and-support` section lander.
- Home page secondary CTA (optional, A/B test).
- Direct URL: `/funding-and-support/fund-finder`.
- Empty-state CTA on funding calendar when filters return zero.

## 21.2 Flow diagram

```
         [Start]
            │
            ▼
┌───────────────────────┐
│ Q1: Are you applying  │  Options:
│ as an individual or   │   • Individual or small group
│ as an organisation?   │   • Registered organisation (charity/company)
└───────────┬───────────┘   • Not sure
            │
            ▼
┌───────────────────────┐
│ Q2 (if individual):   │  Options:
│ How long have you been│   • Less than 2 years
│ working as an artist? │   • 2-10 years
│                       │   • 10+ years
└───────────┬───────────┘
            │                   (if organisation):
            ▼                   Skip to Q3
┌───────────────────────┐
│ Q3: What artform(s)   │  Multi-select chips:
│ does your work        │   Craft/object · Dance · Inter-arts ·
│ involve?              │   Literature · Media · Music ·
│                       │   Ngā toi Māori · Pacific · Theatre · Visual
└───────────┬───────────┘
            │
            ▼
┌───────────────────────┐
│ Q4: What do you need  │  Options:
│ funding for?          │   • Creating new work
│                       │   • Developing my practice/skills
│                       │   • Presenting work to audiences
│                       │   • Multi-year operational funding (orgs only)
│                       │   • Travel / international opportunity
│                       │   • Something else
└───────────┬───────────┘
            │
            ▼
┌───────────────────────┐
│ Q5 (optional):        │  Options:
│ How soon do you need  │   • Within 3 months
│ it?                   │   • In 3-6 months
│                       │   • No rush
└───────────┬───────────┘
            │
            ▼
    [Results screen]
       │
       ▼
┌──────────────────────────────────────────────────────────────┐
│ Based on your answers, these funds might be for you:         │
│                                                              │
│ Strong match (3 funds)   ← primary list                      │
│  [FundCard] [FundCard] [FundCard]                            │
│                                                              │
│ Also consider (2 funds)  ← secondary list                    │
│  [FundCard] [FundCard]                                       │
│                                                              │
│ None of these feel right? [Talk with an adviser]             │
│                                                              │
│ [Start over]  or  [See all funding]                          │
└──────────────────────────────────────────────────────────────┘
```

## 21.3 Step component spec

```
┌──────────────────────────────────────────────────────────────┐
│ Fund Finder                                       [ ✕ Close ]│  ← header with exit
│ Step 2 of 5                                                  │
│ ████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░            │  ← progress bar
├──────────────────────────────────────────────────────────────┤
│                                                              │
│   How long have you been working as an artist?               │  ← question, h2
│                                                              │
│   This helps us suggest funds suited to your career stage.   │  ← hint (optional)
│                                                              │
│   ┌──────────────────────────────────────────────────────┐   │
│   │ ○  Less than 2 years                                 │   │  ← radio list
│   │    (You might be eligible for early-career funds)    │   │    44px tall each
│   └──────────────────────────────────────────────────────┘   │    large tap target
│   ┌──────────────────────────────────────────────────────┐   │
│   │ ○  2-10 years                                        │   │
│   └──────────────────────────────────────────────────────┘   │
│   ┌──────────────────────────────────────────────────────┐   │
│   │ ○  10+ years                                         │   │
│   │    (You might also want to see senior-artist funds)  │   │
│   └──────────────────────────────────────────────────────┘   │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│ [ ← Back ]                                      [ Next → ]   │  ← nav, disabled
│                                                              │    until answered
└──────────────────────────────────────────────────────────────┘
```

## 21.4 Rules

- **URL state:** `/funding-and-support/fund-finder?step=2&a=individual&b=2-10`. Answers are query params so back button works and URLs are shareable.
- **Validation:** Next button disabled until current step has an answer (visual and aria-disabled).
- **Progress announcement:** On step change, `aria-live` announces "Step 2 of 5: How long...".
- **Skip logic:** If user picks "Registered organisation" in Q1, Q2 is skipped; progress bar updates to 4 steps.
- **Keyboard:** Arrow keys navigate radio options; Enter submits Next; Esc opens "Are you sure you want to exit?" confirmation.
- **Exit:** Close button triggers confirmation if any answer selected. If user confirms, answers are cleared and they return to `/funding-and-support`.

## 21.5 Matching logic

```
// Score each fund against the user's answers.
function scoreFund(fund, answers) {
  let score = 0;
 
  // Applicant type match (required)
  if (fund.audience includes answers.applicantType) score += 10;
  else if (answers.applicantType === 'not-sure') score += 2;
  else return 0;  // hard filter out
 
  // Artform overlap
  const overlap = fund.artforms.filter(a => answers.artforms.includes(a)).length;
  if (overlap > 0) score += 3 * overlap;
  if (fund.artforms.includes('all')) score += 2;
 
  // Purpose match
  if (fund.purposes includes answers.purpose) score += 5;
 
  // Career stage
  if (answers.careerStage === 'less-than-2' && fund.tags.includes('early-career')) score += 4;
  if (answers.careerStage === '10+' && fund.tags.includes('senior')) score += 2;
 
  // Timing
  if (answers.timing === 'within-3-months') {
    const daysToNext = daysBetween(now, fund.nextRound.closeDate);
    if (daysToNext < 90) score += 3;
  }
 
  return score;
}
 
// Strong match: score >= 10; also-consider: 5-9; drop: < 5.
```

## 21.6 Empty results

```
┌──────────────────────────────────────────────────────────────┐
│ Hmm — no funds are an obvious match right now.               │
│                                                              │
│ That might mean:                                             │
│  • Your combination is rare but real — an adviser can help.  │
│  • Rounds aren't open right now; check the calendar.         │
│  • Your needs might fit a non-CNZ funder; see "Other         │
│    sources of funding and support".                          │
│                                                              │
│ [ Talk with an adviser ]  [ See funding calendar ]           │
└──────────────────────────────────────────────────────────────┘
```

## 21.7 Analytics events

- `fund_finder_started` — entry point as property.
- `fund_finder_step_completed` — step number + answer.
- `fund_finder_completed` — strong-match count + also-consider count.
- `fund_finder_exit` — step number, "close" or "back to start".
- `fund_finder_result_click` — which fund was clicked from results.

## 21.8 Technical implementation

- Client component (`"use client"`) for interactivity.
- Steps defined in `lib/fundFinder.ts` as a typed config — order and questions are data, not hard-coded.
- Matching runs server-side via a route handler that takes answers as JSON and returns scored results — keeps the business logic testable and the scoring algorithm out of the client bundle.
- Results page prefetched once Q4 is answered (so Next feels instant).
