/**
 * Pacific Arts Strategy — constellation data.
 *
 * Coordinates are normalised on a 1600×1000 viewBox.
 * `revealAt` is the scroll-progress (0→1) at which a node fades in.
 * Stars connect via `lines` with the same revealAt timing.
 */

export type StarKind = 'guiding' | 'aspiration' | 'vision' | 'value' | 'support'

export interface Star {
  id: string
  kind: StarKind
  /** primary label visible on the canvas */
  label: string
  /** sub-label (Pasifika or English translation) */
  sublabel?: string
  /** descriptive sentence shown on click */
  description: string
  /** position on the 1600×1000 viewBox */
  x: number
  y: number
  /** scroll progress at which this node reveals */
  revealAt: number
}

export interface Line {
  from: string
  to: string
  revealAt: number
  /** soft / strong line weight */
  weight?: 'soft' | 'medium'
}

export const STARS: Star[] = [
  // ── BOTTOM-LEFT framing label (the aspirations preamble) ──────────
  {
    id: 'aspirations',
    kind: 'aspiration',
    label: 'Our aspirations',
    sublabel: 'for the future of Pacific arts in Aotearoa',
    description:
      "Our vision and outcomes — the difference we want our work to make, informed by the aspirations of the Pacific arts community.",
    x: 130, y: 230,
    revealAt: 0.05,
  },

  // ── HEADLINE STAR — top of the lower constellation ───────────────
  {
    id: 'powerful-resilient',
    kind: 'aspiration',
    label: 'Powerful and resilient Pacific arts',
    sublabel: 'led by passionate and enterprising Pasifika people',
    description:
      'For Aotearoa, Te Moana-nui-a-Kiwa and the world. Powerful and resilient Pacific arts, led by passionate and enterprising Pasifika people.',
    x: 540, y: 240,
    revealAt: 0.10,
  },

  // ── THREE OUTER ASPIRATION STARS ─────────────────────────────────
  {
    id: 'bold',
    kind: 'aspiration',
    label: 'Pacific arts are bold and enterprising',
    description:
      'Pacific arts in Aotearoa are bold and enterprising — led by Pasifika voices that take creative risks, build new audiences and shape the cultural future.',
    x: 380, y: 360,
    revealAt: 0.16,
  },
  {
    id: 'connected',
    kind: 'aspiration',
    label: 'Pacific arts are powerfully connected',
    sublabel: 'through resilient ecosystems of creative communities',
    description:
      'Pacific arts are powerfully connected through resilient ecosystems of creative communities — across artforms, generations, islands and diasporas.',
    x: 600, y: 340,
    revealAt: 0.18,
  },
  {
    id: 'inspire',
    kind: 'aspiration',
    label: 'Pacific arts inspire and influence people, everywhere',
    description:
      'Pacific arts inspire and influence people, everywhere. They shape Aotearoa and Te Moana-nui-a-Kiwa, and they reach the world.',
    x: 800, y: 360,
    revealAt: 0.20,
  },

  // ── FOUR GUIDING STARS — the heart of the strategy ───────────────
  {
    id: 'vaka',
    kind: 'guiding',
    label: 'VAKA',
    sublabel: 'Organisations',
    description:
      'Pacific arts groups, collectives and organisations are supported to help lead and grow Pacific arts in Aotearoa.',
    x: 540, y: 540,
    revealAt: 0.30,
  },
  {
    id: 'tagata',
    kind: 'guiding',
    label: 'TAGATA',
    sublabel: 'People',
    description:
      'Pasifika artists and arts practitioners are resourced to develop their practice and deliver outstanding work.',
    x: 360, y: 600,
    revealAt: 0.34,
  },
  {
    id: 'moana',
    kind: 'guiding',
    label: 'MOANA',
    sublabel: 'Connections',
    description:
      'Meaningful connections, across Aotearoa, Oceania and globally, ensure that Pacific arts are further enriched.',
    x: 720, y: 620,
    revealAt: 0.38,
  },
  {
    id: 'va',
    kind: 'guiding',
    label: 'VA',
    sublabel: 'Environment',
    description:
      'An innovative and networked Pacific arts environment exists, so that Pacific arts are strengthened for future success.',
    x: 540, y: 720,
    revealAt: 0.42,
  },

  // ── MIDDLE FRAMING LABEL ─────────────────────────────────────────
  {
    id: 'focus-areas-label',
    kind: 'aspiration',
    label: "The areas we'll focus on",
    sublabel: 'over the course of this Strategy',
    description:
      "Working to these guiding stars will help us reach our future aspirations.",
    x: 200, y: 480,
    revealAt: 0.26,
  },

  // ── KAUPAPA + MANA PASIFIKA (lower-left base of constellation) ───
  {
    id: 'kaupapa-pasifika',
    kind: 'value',
    label: 'Kaupapa Pasifika',
    description:
      'How we work — in Kaupapa Pasifika ways, recognising the different journeys of Pacific arts communities to uphold Mana Pasifika in the arts of Aotearoa.',
    x: 280, y: 800,
    revealAt: 0.46,
  },
  {
    id: 'mana-pasifika',
    kind: 'value',
    label: 'Mana Pasifika',
    description:
      'The dignity, authority and uniqueness of Pacific peoples — held and uplifted in everything we do.',
    x: 200, y: 860,
    revealAt: 0.48,
  },

  // ── UPPER CONSTELLATION — vision pyramid (right side) ────────────
  {
    id: 'vision',
    kind: 'vision',
    label: 'Our vision',
    sublabel: 'Toi Aotearoa',
    description:
      'Dynamic and resilient New Zealand arts, valued in Aotearoa and internationally.',
    x: 1380, y: 200,
    revealAt: 0.55,
  },
  {
    id: 'value-for-nz',
    kind: 'support',
    label: 'The value we create for New Zealanders',
    description: 'Through our support for the arts.',
    x: 1080, y: 360,
    revealAt: 0.58,
  },
  {
    id: 'purpose-values',
    kind: 'support',
    label: 'Our purpose and values',
    sublabel: 'including Mana Pasifika',
    description:
      'Our purpose and values guide every part of how we work, including Mana Pasifika and our commitment to Te Tiriti o Waitangi.',
    x: 1380, y: 380,
    revealAt: 0.61,
  },
  {
    id: 'focus-areas',
    kind: 'support',
    label: 'Our strategic focus areas',
    description: 'Resilience · Wellbeing · Access, Inclusion and Equity.',
    x: 1100, y: 530,
    revealAt: 0.64,
  },
  {
    id: 'resilience',
    kind: 'support',
    label: 'Resilience',
    description: 'Building strength and adaptability across the Pacific arts ecosystem.',
    x: 1220, y: 520,
    revealAt: 0.66,
  },
  {
    id: 'wellbeing',
    kind: 'support',
    label: 'Wellbeing',
    description: 'The wellbeing of artists, communities and audiences underpins our investment.',
    x: 1320, y: 540,
    revealAt: 0.67,
  },
  {
    id: 'access',
    kind: 'support',
    label: 'Access, Inclusion and Equity',
    description: 'Access, inclusion and equity for all artists and communities, particularly those historically underserved.',
    x: 1390, y: 580,
    revealAt: 0.68,
  },
  {
    id: 'strategies-policies',
    kind: 'support',
    label: 'Our strategies and policies',
    sublabel: 'Pacific Arts Strategy + Te Hā o ngā Toi',
    description:
      'Including the Pacific Arts Strategy and Te Hā o ngā Toi — Māori Arts Strategy.',
    x: 1080, y: 720,
    revealAt: 0.70,
  },
  {
    id: 'mata-alii',
    kind: 'support',
    label: "Mata Ali'i",
    sublabel: '"The eyes of the chief"',
    description:
      "How we measure the impact of the Pacific Arts Strategy. Mata Ali'i — the eyes of the chief — watches and learns.",
    x: 920, y: 600,
    revealAt: 0.72,
  },
  {
    id: 'te-waka-toi',
    kind: 'support',
    label: 'Te Waka Toi Pātaka',
    sublabel: 'our Mātauranga Māori Framework',
    description: 'Our Mātauranga Māori framework, anchoring how we work alongside ngā toi Māori.',
    x: 1430, y: 700,
    revealAt: 0.74,
  },
]

export const LINES: Line[] = [
  // Lower constellation — kite/diamond
  { from: 'vaka',     to: 'tagata',  revealAt: 0.32, weight: 'medium' },
  { from: 'vaka',     to: 'moana',   revealAt: 0.36, weight: 'medium' },
  { from: 'tagata',   to: 'va',      revealAt: 0.40, weight: 'medium' },
  { from: 'moana',    to: 'va',      revealAt: 0.42, weight: 'medium' },

  // Outer aspirations connect down to the diamond peaks
  { from: 'bold',      to: 'tagata',  revealAt: 0.22, weight: 'soft' },
  { from: 'connected', to: 'vaka',    revealAt: 0.23, weight: 'soft' },
  { from: 'inspire',   to: 'moana',   revealAt: 0.24, weight: 'soft' },

  // Powerful-resilient is the apex
  { from: 'powerful-resilient', to: 'connected', revealAt: 0.14, weight: 'soft' },
  { from: 'powerful-resilient', to: 'bold',      revealAt: 0.14, weight: 'soft' },
  { from: 'powerful-resilient', to: 'inspire',   revealAt: 0.14, weight: 'soft' },

  // Aspirations into the lower group
  { from: 'aspirations', to: 'powerful-resilient', revealAt: 0.08, weight: 'soft' },

  // VA down into kaupapa values
  { from: 'va', to: 'kaupapa-pasifika', revealAt: 0.46, weight: 'soft' },
  { from: 'kaupapa-pasifika', to: 'mana-pasifika', revealAt: 0.48, weight: 'soft' },

  // Upper constellation — vision pyramid
  { from: 'value-for-nz', to: 'vision',         revealAt: 0.58, weight: 'medium' },
  { from: 'purpose-values', to: 'vision',       revealAt: 0.61, weight: 'medium' },
  { from: 'value-for-nz', to: 'purpose-values', revealAt: 0.62, weight: 'soft' },
  { from: 'focus-areas',  to: 'purpose-values', revealAt: 0.64, weight: 'soft' },
  { from: 'focus-areas',  to: 'resilience',     revealAt: 0.66, weight: 'soft' },
  { from: 'focus-areas',  to: 'wellbeing',      revealAt: 0.67, weight: 'soft' },
  { from: 'focus-areas',  to: 'access',         revealAt: 0.68, weight: 'soft' },
  { from: 'strategies-policies', to: 'focus-areas', revealAt: 0.70, weight: 'soft' },
  { from: 'mata-alii',     to: 'strategies-policies', revealAt: 0.72, weight: 'soft' },
  { from: 'te-waka-toi',   to: 'strategies-policies', revealAt: 0.74, weight: 'soft' },
]

export interface FoundationColumn {
  eyebrow: string
  title: string
  body: string | string[]
}

export const FOUNDATION_STRIP: FoundationColumn[] = [
  {
    eyebrow: 'Foundation',
    title: 'The foundation for our work',
    body: 'How we work and what we do, as the basis for delivering to our focus areas and our future aspirations.',
  },
  {
    eyebrow: 'How we work',
    title: 'Kaupapa Pasifika ways',
    body: 'We work in Kaupapa Pasifika ways, recognising the different journeys of Pacific arts communities to uphold Mana Pasifika in the arts of Aotearoa New Zealand.',
  },
  {
    eyebrow: 'What we do',
    title: 'Celebrate · Connect · Develop · Invest',
    body: "Through our work we celebrate, connect, develop and invest in Pacific arts, by delivering to the Strategy's priorities for action.",
  },
  {
    eyebrow: 'Our deliverables',
    title: 'Five deliverables',
    body: [
      'Investing in the arts',
      'Developing the arts',
      'Advocating for the arts',
      'Leadership in the arts',
      'Partnering for the arts',
    ],
  },
  {
    eyebrow: 'Our resources',
    title: 'People · Systems · Public money',
    body: 'Our people and expertise, including our Pasifika staff, Arts Council members, assessors and others. Our systems and processes, including Kaupapa Pasifika approaches. The public money we receive.',
  },
  {
    eyebrow: 'Internal operating environment',
    title: 'Strategies and policies',
    body: 'The strategies and policies that shape our work and collectively form our strategic intentions, as set by the Council.',
  },
]
