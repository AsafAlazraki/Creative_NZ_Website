import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { COUNCIL } from '@/data'
import { KoruCorner, ScrollReveal } from '@/components/motif/KoruMotifs'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import SubNav from '@/components/ui/SubNav'

const SUBNAV = [
  { label: 'What we do', path: '/about' },
  { label: 'Vision & values', path: '/about/vision' },
  { label: 'Council', path: '/about/council' },
  { label: 'Team', path: '/about/team' },
  { label: 'Documents', path: '/about/documents' },
  { label: 'Careers', path: '/about/careers' },
  { label: 'Contact', path: '/about/contact' },
]

// Colour palette for photo placeholders — cycles through brand colours
const PLACEHOLDER_COLORS = [
  { bg: 'var(--moana)', text: 'rgba(255,255,255,0.82)' },
  { bg: 'var(--pohutukawa)', text: 'rgba(255,255,255,0.82)' },
  { bg: 'var(--bush)', text: 'rgba(255,255,255,0.82)' },
  { bg: 'var(--kowhai)', text: 'rgba(20,16,8,0.65)' },
  { bg: 'var(--siapo)', text: 'rgba(255,255,255,0.82)' },
  { bg: 'var(--moana)', text: 'rgba(255,255,255,0.82)' },
  { bg: 'var(--pohutukawa)', text: 'rgba(255,255,255,0.82)' },
  { bg: 'var(--bush)', text: 'rgba(255,255,255,0.82)' },
]

function initials(name: string) {
  return name
    .split(' ')
    .filter(p => !p.startsWith('(') && !['Sir', 'Dr', 'Hon'].includes(p))
    .slice(0, 2)
    .map(p => p[0])
    .join('')
}

const BOARDS = [
  {
    id: 'council',
    title: 'Arts Council',
    kupu: 'Te Kaunihera Toi',
    desc: 'The Arts Council of New Zealand Toi Aotearoa is composed of nine members appointed by the Minister for Arts, Culture and Heritage. The Council is the governing body of Creative New Zealand and is responsible for the overall direction, strategy and management of the organisation.',
  },
  {
    id: 'maori',
    title: 'Te Kāhui Toi Māori',
    kupu: 'Māori Arts Board',
    desc: 'Te Kāhui Toi Māori is the Māori arts board of Creative New Zealand. It advises the Council on matters relating to ngā toi Māori and administers dedicated Māori arts funding.',
  },
  {
    id: 'pasifika',
    title: 'Te Kāhui Toi Pasifika',
    kupu: 'Pacific Arts Board',
    desc: 'Te Kāhui Toi Pasifika advises the Council on matters relating to Pacific arts and administers dedicated Pacific arts funding across Aotearoa.',
  },
]

export default function CouncilPage() {
  return (
    <>
      <Breadcrumbs trail={[
        { label: 'Home', path: '/' },
        { label: 'About us', path: '/about' },
        { label: 'Council' },
      ]} />

      <section className="page-head" style={{ position: 'relative', overflow: 'hidden' }}>
        <KoruCorner position="tr" size={320} color="var(--moana)" opacity={0.07} />
        <div className="container">
          <motion.span
            className="eyebrow"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Te Kaunihera Toi · Governance
          </motion.span>
          <motion.h1
            style={{ marginTop: 18, marginBottom: 20 }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.06 }}
          >
            Our council & boards
          </motion.h1>
          <motion.p
            className="lede"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12 }}
          >
            Creative New Zealand is governed by the Arts Council of New Zealand. Two expert advisory boards — Te Kāhui Toi Māori and Te Kāhui Toi Pasifika — provide dedicated oversight of our work with Māori and Pacific communities.
          </motion.p>
        </div>
      </section>

      <SubNav items={SUBNAV} />

      {/* Board overviews */}
      <section className="section-tight" style={{ background: 'var(--paper)', borderBottom: '1px solid var(--line)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28 }}>
            {BOARDS.map((board, i) => (
              <motion.div
                key={board.id}
                className="card card-body"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: i * 0.09 }}
              >
                <div style={{ marginBottom: 8 }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 13, color: 'var(--muted)', marginBottom: 6 }}>{board.kupu}</div>
                  <h3 style={{ fontSize: 22 }}>{board.title}</h3>
                </div>
                <p style={{ fontSize: 14, lineHeight: 1.65, color: 'var(--ink-2)', marginTop: 12 }}>{board.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Council members grid */}
      <section className="section">
        <div className="container">
          <ScrollReveal>
            <div className="section-head">
              <div>
                <span className="eyebrow">Ngā mema o te Kaunihera</span>
                <h2 style={{ marginTop: 16 }}>Arts Council members</h2>
              </div>
            </div>
          </ScrollReveal>

          <div className="people-grid">
            {COUNCIL.map((member, i) => {
              const palette = PLACEHOLDER_COLORS[i % PLACEHOLDER_COLORS.length]
              const inits = initials(member.name)
              return (
                <motion.div
                  key={member.name}
                  className="person"
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-24px' }}
                  transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: i * 0.07 }}
                >
                  <div
                    className="photo"
                    style={{ background: palette.bg, color: palette.text }}
                  >
                    {inits}
                  </div>
                  <div>
                    <h4>{member.name}</h4>
                    <div className="role">{member.role}</div>
                    {member.iwi && (
                      <div style={{ fontSize: 11.5, color: 'var(--muted)', marginBottom: 8, fontStyle: 'italic', fontFamily: 'var(--font-display)' }}>
                        {member.iwi}
                      </div>
                    )}
                    <p>{member.bio}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Appointments note */}
      <ScrollReveal>
        <section className="section-tight" style={{ background: 'var(--paper)', borderTop: '1px solid var(--line)' }}>
          <div className="container">
            <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
              <span className="eyebrow">Appointments</span>
              <h3 style={{ marginTop: 16, marginBottom: 20, fontWeight: 400 }}>Council appointments are made by the Minister</h3>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--muted)', marginBottom: 28 }}>
                Arts Council members are appointed by the Minister for Arts, Culture and Heritage for a term of up to three years and may be reappointed. Members bring a broad range of expertise in the arts, governance, law, business and community leadership.
              </p>
              <Link to="/about/documents" className="btn-link">Read the Statement of Intent →</Link>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </>
  )
}
