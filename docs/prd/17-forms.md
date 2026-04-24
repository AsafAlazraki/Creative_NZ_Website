# 17 — Forms — Detailed Specification

Every form on the site, field by field, with validation rules, error messages, submission behaviour, and accessibility notes.

## 24.1 Shared form rules

- **Labels visible, always.** Never placeholder-as-label.
- **Required fields marked:** visual "*" AND `required` attribute AND `aria-required="true"`.
- **Validation timing:** on blur for individual fields; on submit for the form. Don’t validate as the user types.
- **Error presentation:** inline below field, red colour, icon, linked via `aria-describedby`.
- **Submit failure:** scroll to top; show error summary `role="alert"` listing each failed field as a link that moves focus to the field.
- **Submit success:** dedicated success page/state — not just a toast. Page title changes. Focus moves to success heading.
- **Submit button:** disabled AND `aria-busy="true"` during submission; label changes to "Sending...".
- **Honeypot + Turnstile** for spam protection. No visible CAPTCHA.
- **CSRF:** Next.js built-in for server actions.

## 24.2 Contact form

**URL:** `/about-creative-nz/contact-us`

| **Field** | **Type** | **Rules** | **Error message** |
| --- | --- | --- | --- |
| Full name | text, required | Min 2 chars, max 120 | Please enter your name. |
| Email | email, required | Valid email format | That doesn’t look like an email — check for typos. |
| Phone (optional) | tel | NZ format accepted loosely | Check the phone number format. |
| I’m contacting about… | select, required | Options: Funding, Media, Partnership, Complaint, Other | Please choose a topic. |
| Artform (conditional on Funding) | select | Optional |  |
| Your message | textarea, required | Min 20, max 2000 chars; counter visible | Please write at least 20 characters. |
| I’d like a reply | checkbox | Checked by default |  |

### Contact form submission

- POST `/api/contact`; server action validates with zod; forwards via Resend to the team inbox specified in globalSettings.
- **Success state:** navigate to `/about-creative-nz/contact-us/thanks`. Page H1 "Thanks — we’ve got your message". Follow-up text: "We reply within 5 working days. If you don’t hear back, check your spam folder or email info@creativenz.govt.nz."
- **Error state:** inline error banner; form data preserved.

## 24.3 Newsletter signup

**Lives in:** footer; bottom of home; bottom of article pages.

| **Field** | **Rules** |
| --- | --- |
| Email | Required, valid format |
| Name (optional) | Optional, max 120 |
| Interests (optional) | Multi-checkbox: Funding news, Sector updates, Events, Jobs |
| Consent | Checkbox, required: "I agree to receive emails from CNZ per the privacy policy." Link to /privacy. |

- POST `/api/newsletter`; validates; calls Mailchimp Members API with subscriber list `817361bc26`.
- **Double opt-in** enabled in Mailchimp — user gets a confirmation email before being subscribed.
- **Success:** inline "Thanks — check your inbox for a confirmation email". aria-live announces. Form stays visible (do not hide it — confusing for screen reader users who hear the announcement but can no longer find the form).

## 24.4 Official Information Act (OIA) request form

**URL:** `/about-creative-nz/requesting-information`

| **Field** | **Rules** |
| --- | --- |
| Full name | Required |
| Email | Required |
| Phone | Optional |
| Postal address | Optional (but useful for complex responses) |
| Information requested | Textarea required, min 50 chars, max 5000 |
| Preferred format | Radio: Email, Post, Other (specify) |
| Urgency | Radio: No urgency, Specific deadline (explain below) |
| Deadline reason | Conditional textarea if Specific deadline chosen |
| Acknowledgement | Checkbox required: "I understand CNZ aims to respond within 20 working days." |

- **Success:** reference number displayed ("Your request reference: OIA-2026-0123"). Followup explains the 20 working day response timeline.
- **Backend:** adds a structured entry to the OIA tracker (existing CNZ tool) and emails the legal team.

## 24.5 Complaint form

**URL:** `/about-creative-nz/making-a-complaint`

Structured to separate types so routing is automatic.

| **Field** | **Rules** |
| --- | --- |
| Full name | Required |
| Email | Required |
| Phone | Optional |
| Nature of complaint | Radio: Funding decision, Staff conduct, Organisational process, Other |
| Date of incident | Date picker; optional |
| Reference (if applicable) | Text; e.g. funding application number |
| Description | Textarea required, min 100 chars, max 10000 |
| Desired outcome | Textarea required, min 50 chars, max 2000 |
| Attachments | Up to 5 files, each ≤ 10MB (PDF, DOCX, PNG, JPG) |

- **Attachment handling:** stored encrypted in Azure Blob or S3; signed URLs to the handler; retention 7 years per CNZ policy.
- **Privacy notice** prominent above the form.
- **Success:** complaint reference displayed. Email acknowledgement within 24 hours promised.

## 24.6 Talk with an adviser (enquiry)

**URL:** `/funding-and-support/advice-and-support/talk-with-an-adviser`

| **Field** | **Rules** |
| --- | --- |
| Full name | Required |
| Email | Required |
| Phone | Optional |
| Artform | Required — routes to the right adviser |
| Career stage | Radio: Early career, Mid-career, Established |
| Nature of question | Radio: Which fund fits me, Eligibility, Application help, Portal help, Other |
| What you’d like to discuss | Textarea required, min 40 chars, max 2000 |
| Preferred contact method | Radio: Email, Phone call, Video call |
| Available times | Textarea optional |

- **Auto-routing:** artform → adviser map in globalSettings. Form posts to matching adviser + copies a manager.

## 24.7 Search (not a form strictly, but same patterns apply)

- **Input:** `<input type="search">`, autofocus on /search page, autocomplete off.
- **Submit:** Enter or click; Pagefind runs client-side.
- **Results update:** aria-live polite announces "Showing N results for [query]".
- **Empty query:** button disabled (both visually and aria-disabled).
