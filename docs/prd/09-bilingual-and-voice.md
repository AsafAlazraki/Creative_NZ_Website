# 09 — Voice and Bilingual Content

This section governs how CNZ writes on the site, how te reo Māori is used, and the technical requirements for bilingual markup.

## 12.1 Length guidance

- **Page intros:** 1–2 sentences. Answer "what is this and who is it for?"
- **Paragraphs:** 3–5 sentences max.
- **Headings:** describe the content beneath, not clever ("How to apply", not "Ready to take the leap?").
- **CTAs:** action verbs, specific object. "Apply on the CNZ portal", not "Click here" or "Learn more".
- **Link text:** describes the destination in isolation.

## 12.2 Accessibility of language

- Target reading age: 13–14 (Flesch–Kincaid grade 7–8).
- Spell out acronyms on first use: "Creative New Zealand (CNZ)".
- Expand "etc.", "e.g.", "i.e." in body copy: "for example", "such as", "that is".
- Avoid idiom where possible (many users are ESL).
- Numbers: numerals for 10+; spell out zero–nine except when mixing with larger numbers or units.

## 12.3 Te reo Māori handling

Te reo Māori is one of Aotearoa’s official languages. For a Crown entity arts funder, its presence is both mandatory and meaningful.

### Which words are te reo Māori on the site (known)

- **Organisational names:** Toi Aotearoa (Arts Council of NZ), Ngā Toi Māori (Māori arts), Te Rōpū Mana Toi (advisory group), Toi Tōtara Haemata, Toi Uru Kahikatea, Te Waka Toi Awards, Manatū Taonga (Ministry for Culture and Heritage), Ko Aotearoa me ōna Toi (national arts survey), Nui te Kōrero (symposium programme).
- **People:** ringatoi (artist/practitioner, often in Māori arts context), kaumātua, tangata whenua.
- **Concepts:** mana, kaupapa, whakapapa, tikanga, rangatiratanga.
- **Place names:** Aotearoa, Te Whanganui-a-Tara (Wellington), Tāmaki Makaurau (Auckland), Ōtepoti (Dunedin).

### Writing rules

- **Macrons are required.** "Māori" not "Maori". "ngā" not "nga". ā ē ī ō ū in both cases. Hard rule; any editor shipping content without macrons is shipping a bug.
- **No "s" plural** on te reo Māori words. "Kaumātua" serves as both singular and plural. "Iwi" likewise.
- **Don’t translate a te reo word** where the te reo word is the point. "Kaupapa" carries meaning that "project" or "purpose" doesn’t. Gloss with a parenthetical on first use: "kaupapa (guiding purpose)".
- **Word order in bilingual phrases.** Follow the convention: `Māori / English` for dual names. "Te Whanganui-a-Tara Wellington", "Creative New Zealand Toi Aotearoa". Don’t mash an English plural "s" onto a Māori word.
- **Don’t say "the te reo".** "te" means "the" — "the te reo" is "the the language". Write "te reo Māori" or just "te reo".

### Technical markup — mandatory

Every te reo Māori word or phrase in English-language content **must** be wrapped in an element with `lang="mi"`:

```
<p>
  Creative New Zealand funds
  <span lang="mi">ngā toi Māori</span>
  alongside all other artforms.
</p>
```
**Why:** screen readers switch pronunciation dictionaries when they encounter a lang attribute. Without `lang="mi"`, "Māori" is read as "mao-ree" instead of "mah-or-ee", which is both inaccurate and disrespectful.

The CMS provides a **te reo toggle** in the rich-text editor: select a span of text, click "Mark as te reo Māori", and the published HTML carries `lang="mi"`.

### When a full page has a te reo Māori translation

- The page lives at the parallel URL under `/mi/`.
- The `<html>` element has `lang="mi"` at the root, with `lang="en"` on any English fallback content on the page.
- The LangToggle in the header shows `Te reo Māori / English` and deep-links to the sibling.
- **When a page has no te reo translation**, the toggle still works but routes to the home page in te reo with a polite explanatory message:

### Content rollout plan for te reo

- **Phase 1 (launch):** all L1 navigation labels, all section titles, and the home page in both languages. Key funding landing pages in both languages.
- **Phase 2:** All fund detail pages in both languages. This is a translation commission.
- **Phase 3 (ongoing):** New content in both languages by default where reasonable.

> **Note:** **The toggle must work from day one**
> Even if coverage is English-heavy. It’s better to expose real coverage than to pretend.

## 12.4 New Zealand English spelling

- NZ English, not US. "Organisation", "programme" (for events/schemes), "colour".
- **Exception:** code / technical terms (CSS "color", etc.) stay American.
- **Exception:** proper nouns ("Creative New Zealand" is the legal name).

## 12.5 Reusable copy patterns

### Fund status pill

- **Upcoming:** "Opens 12 May"
- **Open:** "Closes 5pm, 12 June"
- **Closing soon** (≤14 days): "Closes in 7 days"
- **Closed:** "Closed 12 March 2026"

### Error messages

Tell the user what happened, and what to do: "We couldn’t submit your message. Please check your email address and try again, or contact us at info@creativenz.govt.nz."

### Empty states

Not "No results". Instead: "No funding rounds match those filters. Try removing an artform or applicant type."

### Dates and times

- **Format:** "12 April 2026", not "04/12/26" or "April 12, 2026" (US).
- **Times:** "5pm", "9:30am" — no "17:00" except in calendar downloads.
- **Timezone** on deadlines: default implied NZT; state explicitly when it matters: "Closes 5pm NZT, 12 June 2026".

### Currency

- **"$10,000"** — NZD is default and implied.
- **When specifying:** "NZ$10,000" or "$10,000 NZD".

## 12.6 Content review workflow

1. Author writes in English (draft).
1. Peer edit by a second CNZ comms person — for voice and plain English.
1. Accessibility check (short list in section 13).
1. Te reo translation commissioned (if applicable).
1. Final publish.
