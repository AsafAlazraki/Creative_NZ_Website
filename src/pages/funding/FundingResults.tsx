import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { KoruCorner, ScrollReveal } from '@/components/motif/KoruMotifs'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import SubNav from '@/components/ui/SubNav'

const SUB_ITEMS = [
  { label: 'Overview', path: '/funding' },
  { label: 'All opportunities', path: '/funding/opportunities' },
  { label: 'Calendar', path: '/funding/calendar' },
  { label: 'Advice', path: '/funding/advice' },
  { label: 'Results', path: '/funding/results' },
  { label: 'Awards', path: '/funding/awards' },
]

const RESULTS = [
  { amt: '$65,000', recip: 'Whetūrangi Theatre Collective', proj: 'A new bilingual work for the 2027 Auckland Arts Festival', region: 'Tāmaki Makaurau', fund: 'Arts Grants' },
  { amt: '$24,500', recip: 'Mereana Hudson', proj: 'Solo painting exhibition exploring whakapapa through landscape', region: 'Te Whanganui-a-Tara', fund: 'Arts Grants' },
  { amt: '$18,000', recip: 'Pasifika Sound Lab', proj: 'Album of contemporary Pacific electronic music', region: 'Tāmaki Makaurau', fund: 'Arts Grants' },
  { amt: '$40,000', recip: 'Te Pou o Mangataawhiri', proj: 'Touring kapa haka education programme to ten regional centres', region: 'Waikato', fund: 'Arts Grants' },
  { amt: '$22,000', recip: 'Christchurch Symphonia', proj: 'Commissioned suite from emerging composer Aroha Tikao', region: 'Ōtautahi', fund: 'Arts Grants' },
  { amt: '$12,000', recip: 'Sina Latu', proj: 'Tongan dance documentary, premiering at NZIFF 2026', region: 'Tāmaki Makaurau', fund: 'Toi Tipu' },
  { amt: '$25,000', recip: 'Aoraki Craft Collective', proj: 'Collaborative ceramics residency and exhibition programme', region: 'Ōtautahi', fund: 'Arts Grants' },
  { amt: '$15,000', recip: 'Hemi Walker', proj: 'Poetry collection and nationwide school tour — reading, writing, language', region: 'Northland', fund: 'Toi Tipu' },
  { amt: '$38,000', recip: 'Tūhoe Film Trust', proj: 'Three-part documentary on Tūhoe land and language', region: 'Te Urewera', fund: 'Arts Grants' },
  { amt: '$7,500', recip: 'Papatoetoe Youth Arts', proj: 'Community mural project and arts skills programme for at-risk youth', region: 'Tāmaki Makaurau', fund: 'CCS' },
  { amt: '$65,000', recip: 'Black Grace Dance Company', proj: 'New full-length work for domestic and international touring', region: 'Tāmaki Makaurau', fund: 'Arts Grants' },
  { amt: '$20,000', recip: 'Sarah Smuts-Kennedy', proj: 'Large-scale site-specific ecological installation', region: 'Tāmaki Makaurau', fund: 'Arts Grants' },
]

const ROUNDS = ['All rounds', 'Arts Grants R2 2026', 'Toi Tipu 2026', 'Creative Communities Scheme']

export default function FundingResults() {
  const [round, setRound] = useState('All rounds')

  return (
    <>
      <SubNav items={SUB_ITEMS} />
      <Breadcrumbs
        trail={[
          { label: 'Home', path: '/' },
          { label: 'Funding', path: '/funding' },
          { label: 'Results' },
        ]}
      />

      <div className="page-head" style={{ position: 'relative', overflow: 'hidden' }}>
        <KoruCorner position="tr" size={280} color="var(--bush)" opacity={0.07} />
        <div className="container">
          <motion.span
            className="eyebrow"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            Hua · Funded projects
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
          >
            Recent results
          </motion.h1>
          <motion.p
            className="lede"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.14 }}
          >
            A selection of recently funded projects from across Aotearoa.
          </motion.p>
        </div>
      </div>

      {/* Filter */}
      <section className="section-tight" style={{ borderBottom: '1px solid var(--line)' }}>
        <div className="container" style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {ROUNDS.map(r => (
            <button
              key={r}
              className={`pill${round === r ? ' on' : ''}`}
              onClick={() => setRound(r)}
            >
              {r}
            </button>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <ScrollReveal>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--line)' }}>
                  {['Amount', 'Recipient', 'Project', 'Region', 'Fund', ''].map(h => (
                    <th key={h} style={{
                      textAlign: 'left', padding: '14px 12px',
                      fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase',
                      color: 'var(--muted)', fontWeight: 600,
                    }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {RESULTS.map((r, i) => (
                  <motion.tr
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-12px' }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: i * 0.04 }}
                    style={{ borderBottom: '1px solid var(--line)' }}
                  >
                    <td style={{ padding: '18px 12px', fontFamily: 'var(--font-display)', fontSize: 18, fontStyle: 'italic', whiteSpace: 'nowrap' }}>
                      {r.amt}
                    </td>
                    <td style={{ padding: '18px 12px', fontWeight: 500 }}>{r.recip}</td>
                    <td style={{ padding: '18px 12px', color: 'var(--ink-2)', fontSize: 14, maxWidth: 420 }}>{r.proj}</td>
                    <td style={{ padding: '18px 12px', color: 'var(--muted)', fontSize: 13, whiteSpace: 'nowrap' }}>{r.region}</td>
                    <td style={{ padding: '18px 12px', color: 'var(--muted)', fontSize: 13 }}>{r.fund}</td>
                    <td style={{ padding: '18px 12px', color: 'var(--accent-2)' }}>→</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </ScrollReveal>

          <div style={{ marginTop: 36, textAlign: 'center', color: 'var(--muted)', fontSize: 13 }}>
            Showing the most recent {RESULTS.length} results from the published rounds.{' '}
            <Link to="/funding/opportunities" className="btn-link" style={{ marginLeft: 8 }}>
              See current opportunities →
            </Link>
          </div>
        </div>
      </section>

      <section className="section-tight" style={{ background: 'var(--surface)', borderTop: '1px solid var(--line)' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
            <div>
              <h3 style={{ margin: '0 0 6px', fontSize: 20 }}>Want to see what's currently open?</h3>
              <p style={{ margin: 0, color: 'var(--muted)', fontSize: 15 }}>
                Find and apply to current rounds.
              </p>
            </div>
            <Link to="/funding/opportunities?status=open" className="btn btn-primary" style={{ flexShrink: 0 }}>
              Open opportunities →
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
