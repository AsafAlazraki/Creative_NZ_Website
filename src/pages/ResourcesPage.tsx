import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { TOOLKITS, REPORTS } from '@/data'
import { KoruCorner, ScrollReveal, MagneticHover } from '@/components/motif/KoruMotifs'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import { Users, ShieldCheck, HandHeart, Coins, FileText } from 'lucide-react'

const TOOLKIT_ICONS: Record<string, React.ComponentType<{ size?: number; strokeWidth?: number }>> = {
  community: Users,
  risk: ShieldCheck,
  volunteer: HandHeart,
  donations: Coins,
}

export default function ResourcesPage() {
  const [activeTab, setActiveTab] = useState<'toolkits' | 'reports'>('toolkits')

  return (
    <>
      <Breadcrumbs trail={[{ label: 'Home', path: '/' }, { label: 'Resources' }]} />

      <section className="page-head" style={{ position: 'relative', overflow: 'hidden' }}>
        <KoruCorner position="tr" size={340} color="var(--bush)" opacity={0.07} />
        <KoruCorner position="bl" size={240} color="var(--moana)" opacity={0.05} />
        <div className="container">
          <motion.span
            className="eyebrow"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Ngā rauemi · Resources
          </motion.span>
          <motion.h1
            style={{ marginTop: 18, marginBottom: 20, maxWidth: 720 }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.06 }}
          >
            Tools, toolkits & research
          </motion.h1>
          <motion.p
            className="lede"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12 }}
          >
            Practical resources to help artists, arts organisations and communities plan, manage and grow their work — alongside the research and evidence that underpins our sector.
          </motion.p>
        </div>
      </section>

      {/* Tab switcher */}
      <div style={{ background: 'var(--paper)', borderBottom: '1px solid var(--line)', padding: '20px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', gap: 8 }}>
            {(['toolkits', 'reports'] as const).map(tab => (
              <button
                key={tab}
                className={`pill${activeTab === tab ? ' on' : ''}`}
                onClick={() => setActiveTab(tab)}
                style={{ textTransform: 'capitalize' }}
              >
                {tab === 'toolkits' ? 'Toolkits & guides' : 'Reports & research'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Toolkits section */}
      {activeTab === 'toolkits' && (
        <section className="section">
          <div className="container">
            <ScrollReveal>
              <div className="section-head">
                <div>
                  <span className="eyebrow">Ngā pūkete awhina</span>
                  <h2 style={{ marginTop: 16 }}>Practical toolkits for arts practitioners</h2>
                </div>
              </div>
            </ScrollReveal>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 28 }}>
              {TOOLKITS.map((toolkit, i) => (
                <motion.div
                  key={toolkit.id}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: i * 0.09 }}
                >
                  <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <div style={{
                      padding: '32px 32px 0',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 16,
                    }}>
                      <div style={{
                        width: 52,
                        height: 52,
                        borderRadius: 'var(--r-md)',
                        background: 'rgba(232,163,23,0.12)',
                        color: 'var(--kowhai-deep)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}>
                        {(() => {
                          const Icon = TOOLKIT_ICONS[toolkit.id] ?? FileText
                          return <Icon size={22} strokeWidth={1.6} />
                        })()}
                      </div>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, flexWrap: 'wrap' }}>
                          <h3 style={{ fontSize: 22 }}>{toolkit.title}</h3>
                          {toolkit.kupu && <span className="kupu">{toolkit.kupu}</span>}
                        </div>
                        <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4 }}>
                          {toolkit.sections} sections
                        </div>
                      </div>
                    </div>
                    <div className="card-body" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 20 }}>
                      <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--ink-2)', margin: 0 }}>{toolkit.desc}</p>
                      <div style={{ marginTop: 'auto', display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                        <MagneticHover strength={0.2}>
                          <Link to={`/resources/toolkits/${toolkit.id}`} className="btn btn-primary" style={{ fontSize: 13 }}>
                            View toolkit →
                          </Link>
                        </MagneticHover>
                        <button className="btn btn-ghost" style={{ fontSize: 13 }}>Download PDF</button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Newsletter CTA */}
            <ScrollReveal delay={0.2}>
              <div style={{
                marginTop: 64,
                padding: 40,
                background: 'var(--paper)',
                border: '1px solid var(--line)',
                borderRadius: 'var(--r-lg)',
                display: 'grid',
                gridTemplateColumns: '1fr auto',
                gap: 32,
                alignItems: 'center',
              }}>
                <div>
                  <h3 style={{ fontSize: 22, marginBottom: 8 }}>Get new resources in your inbox</h3>
                  <p style={{ fontSize: 15, color: 'var(--muted)' }}>
                    Subscribe to our resources newsletter and we'll let you know when new toolkits, guides and research are published.
                  </p>
                </div>
                <Link to="/about/contact" className="btn btn-primary">Subscribe →</Link>
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* Reports section */}
      {activeTab === 'reports' && (
        <section className="section">
          <div className="container">
            <ScrollReveal>
              <div className="section-head">
                <div>
                  <span className="eyebrow">Rangahau · Research</span>
                  <h2 style={{ marginTop: 16 }}>Reports & research publications</h2>
                </div>
              </div>
            </ScrollReveal>

            {/* Reports table */}
            <div style={{
              border: '1px solid var(--line)',
              borderRadius: 'var(--r-md)',
              overflow: 'hidden',
              background: 'var(--card)',
            }}>
              {/* Table header */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '72px 1fr auto auto',
                gap: 24,
                padding: '14px 28px',
                background: 'var(--paper)',
                borderBottom: '1px solid var(--line)',
              }}>
                {['Year', 'Title', 'Size', ''].map(h => (
                  <div key={h} style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', fontWeight: 600 }}>{h}</div>
                ))}
              </div>

              {/* Rows */}
              {REPORTS.map((report, i) => (
                <motion.div
                  key={report.title}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-16px' }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: i * 0.06 }}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '72px 1fr auto auto',
                    gap: 24,
                    padding: '22px 28px',
                    borderBottom: i < REPORTS.length - 1 ? '1px solid var(--line)' : 'none',
                    alignItems: 'center',
                    transition: 'background 0.12s',
                  }}
                  whileHover={{ backgroundColor: 'var(--paper)' } as any}
                >
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--muted)' }}>{report.year}</div>
                  <div>
                    <div style={{ fontWeight: 500, marginBottom: 4, fontFamily: 'var(--font-display)', fontSize: 17 }}>{report.title}</div>
                    <div style={{ fontSize: 13, color: 'var(--muted)' }}>{report.desc}</div>
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--muted)', whiteSpace: 'nowrap' }}>{report.size}</div>
                  <button className="btn btn-ghost" style={{ fontSize: 12, padding: '9px 16px', whiteSpace: 'nowrap' }}>
                    Download →
                  </button>
                </motion.div>
              ))}
            </div>

            <ScrollReveal delay={0.2}>
              <div style={{ marginTop: 40, padding: '28px 32px', background: 'var(--paper-2)', borderRadius: 'var(--r-md)', border: '1px solid var(--line)' }}>
                <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.7 }}>
                  <strong style={{ color: 'var(--ink)' }}>Older publications:</strong>{' '}
                  Archive reports and research from 2010–2023 are available on request. Contact our research team at{' '}
                  <a href="mailto:research@creativenz.govt.nz" style={{ color: 'var(--moana)', fontWeight: 500 }}>research@creativenz.govt.nz</a>.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}
    </>
  )
}
