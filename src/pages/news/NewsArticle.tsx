import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { STORIES } from '@/data'
import { KoruCorner, ScrollReveal, MagneticHover } from '@/components/motif/KoruMotifs'
import Breadcrumbs from '@/components/ui/Breadcrumbs'

// Expanded article bodies keyed by story id
const ARTICLE_BODIES: Record<string, string[]> = {
  'pasifika-awards-2026': [
    "The 2026 Arts Pasifika Awards ceremony, held at Auckland's Aotea Centre last Tuesday evening, celebrated twelve recipients whose contributions to Pacific arts have shaped and enriched the cultural life of Aotearoa.",
    "The awards, established to honour excellence, resilience and innovation in Pacific creative practice, drew nominations from across the country — from Northland to Invercargill — reflecting the breadth and depth of Pacific arts communities throughout Aotearoa.",
    "This year's Lifetime Achievement Award was presented to master weaver and cultural custodian Makerita Urale, whose four-decade career has been defined by a fierce commitment to the transmission of sāmoan ta tatau and fine-mat weaving traditions to younger generations. 'The arts are the living memory of our people,' she said in accepting the award. 'To be recognised this way is to say our memory matters.'",
    "In the Emerging Artist category, Tongan dancer and choreographer Lani Taufa was recognised for her boundary-crossing work blending lakalaka with contemporary movement vocabulary. Her recent commission for Auckland Arts Festival drew standing ovations and sparked conversation about what fusion can mean when rooted in cultural knowledge rather than appropriation.",
    "Community Contribution awards were presented to four individuals and collectives who have worked largely without fanfare to keep Pacific arts alive in their neighbourhoods — from kapa haka coaches in South Auckland to Niuean storytellers working in libraries in Wellington.",
    "Creative New Zealand Chief Executive Stephen Wainwright acknowledged the ongoing challenges faced by Pacific artists, including access to affordable studio and rehearsal space and the particular pressures of working across multiple cultural obligations. 'Tonight is a celebration, but tomorrow we recommit to the structural work that makes sustained practice possible,' he said.",
    "The full list of 2026 Arts Pasifika Award recipients is available on the Creative New Zealand website.",
  ],
  'ccs-r2-open': [
    "Round two of the Creative Communities Scheme opens on 14 May 2026, offering grants of between $1,000 and $7,500 for community-led arts projects across Aotearoa.",
    "The scheme, administered through local councils, supports projects that make the arts accessible to a wide range of people — particularly those who face barriers to participation. Applications are assessed at the local level by community panels who understand the needs and character of their regions.",
    "This round, Creative New Zealand is particularly encouraging applications from projects that reach rural and remote communities, that work with older adults, and that involve youth in meaningful artistic roles rather than as passive audiences.",
    "To apply, contact your local council to find out about their specific process and deadlines. Some councils open applications before 14 May; others align their round with the national opening date. Your council's arts adviser can discuss your project and help you put together the strongest possible application.",
    "Projects funded through the Creative Communities Scheme must take place within the council area where the application is made. Multi-council projects require a separate application to each council.",
  ],
  'te-waka-toi': [
    "Te Waka Toi Awards, Aotearoa's most prestigious recognition of excellence in ngā toi Māori, will return to Te Whanganui-a-Tara this November after a two-year absence from the capital.",
    "Nominations are now open across all categories: Toihuarewa (lifetime achievement), Haeata (emerging artist), Toi Hou (innovation in traditional forms), Toi Ora (contribution to Māori arts in community), and Te Kāhui Toi Māori (arts governance and leadership).",
    "The awards, which have been presented annually since 1994, have recognised over 300 individual artists, collectives and arts leaders. Many recipients credit the recognition with opening new doors, attracting international interest, and — perhaps most importantly — affirming the value of dedicated practice within their own whānau and hapū.",
    "This year's ceremony will be hosted at Te Papa Tongarewa, with a programme that will include performances, wānanga and an exhibition of work by past recipients.",
    "Nominations close on 30 June. Nominations must be made by a third party — artists cannot nominate themselves. Full criteria and nomination forms are available on the Creative New Zealand website.",
    "Te Kāhui Toi Māori, the Māori arts board of Creative New Zealand, oversees the awards alongside the Ministry for Culture and Heritage.",
  ],
  default: [
    "Creative New Zealand is committed to supporting a vibrant arts sector across Aotearoa. This story reflects our ongoing work with artists, communities, and organisations to ensure the arts are accessible, sustainable, and celebrated.",
    "Our investment in the arts sector takes many forms — from direct funding to artists and organisations, to advocacy at a national policy level, to providing resources and professional development that help practitioners build lasting careers.",
    "We continue to be guided by our strategic vision: a flourishing arts sector that contributes to the cultural, social and economic wellbeing of all New Zealanders, and that honours the place of ngā toi Māori as the indigenous arts of Aotearoa.",
    "For more information about our work, visit the About section of this website or contact our team in Wellington, Auckland or Christchurch.",
  ],
}

function getBody(id: string): string[] {
  return ARTICLE_BODIES[id] ?? ARTICLE_BODIES['default']
}

const ACCENT_VARS: Record<string, string> = {
  pohutukawa: 'var(--pohutukawa)',
  kowhai: 'var(--kowhai)',
  bush: 'var(--bush)',
  moana: 'var(--moana)',
}

export default function NewsArticle() {
  const { id } = useParams<{ id: string }>()
  const story = STORIES.find(s => s.id === id)

  if (!story) {
    return (
      <div className="container section" style={{ textAlign: 'center' }}>
        <h2 style={{ marginBottom: 16 }}>Story not found</h2>
        <p style={{ color: 'var(--muted)', marginBottom: 32 }}>This article may have moved or been removed.</p>
        <Link to="/news" className="btn btn-primary">Back to news →</Link>
      </div>
    )
  }

  const body = getBody(story.id)
  const [firstPara, ...restParas] = body
  const accentColor = ACCENT_VARS[story.accent] ?? 'var(--pohutukawa)'

  const related = STORIES.filter(s => s.id !== story.id && s.cat === story.cat).slice(0, 3)
  const fallbackRelated = STORIES.filter(s => s.id !== story.id).slice(0, 3)
  const relatedStories = related.length >= 2 ? related : fallbackRelated

  return (
    <>
      <Breadcrumbs trail={[
        { label: 'Home', path: '/' },
        { label: 'News & stories', path: '/news' },
        { label: story.title },
      ]} />

      {/* Hero image */}
      <motion.div
        style={{ width: '100%', height: 'clamp(280px, 42vw, 540px)', overflow: 'hidden', position: 'relative' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <img
          src={story.img}
          alt={story.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, transparent 40%, rgba(10,8,4,0.55))',
        }} />
        <div style={{ position: 'absolute', bottom: 28, left: 0, right: 0 }}>
          <div className="container">
            <span style={{
              display: 'inline-block',
              background: accentColor,
              color: '#fff',
              fontSize: 10.5,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              fontWeight: 700,
              padding: '5px 12px',
              borderRadius: 'var(--r-pill)',
            }}>
              {story.cat}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Article header */}
      <section className="section-tight" style={{ borderBottom: '1px solid var(--line)', position: 'relative', overflow: 'hidden' }}>
        <KoruCorner position="tr" size={260} color="var(--kowhai)" opacity={0.06} />
        <div className="container">
          <div style={{ maxWidth: 760, margin: '0 auto' }}>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            >
              {story.kupu && (
                <div className="kupu" style={{ marginBottom: 18, fontSize: 15 }}>{story.kupu}</div>
              )}
              <h1 style={{ marginBottom: 24, lineHeight: 1.08 }}>{story.title}</h1>
              <div style={{ display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap', paddingBottom: 28, borderBottom: '1px solid var(--line)' }}>
                <span style={{ fontSize: 13, color: 'var(--muted)' }}>{story.date}</span>
                <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--muted)', flexShrink: 0 }} />
                <span style={{ fontSize: 13, color: 'var(--muted)' }}>{story.read} read</span>
                <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--muted)', flexShrink: 0 }} />
                <span style={{ fontSize: 13, color: 'var(--muted)' }}>Creative New Zealand</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Article body */}
      <section className="section-tight">
        <div className="container">
          <div style={{ maxWidth: 760, margin: '0 auto' }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Lede / excerpt */}
              <p className="lede" style={{ marginBottom: 36 }}>{story.excerpt}</p>

              {/* First paragraph with drop cap */}
              <p style={{ fontSize: 17, lineHeight: 1.75, marginBottom: 28 }}>
                <span style={{
                  float: 'left',
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(56px, 7vw, 80px)',
                  lineHeight: 0.82,
                  marginRight: 10,
                  marginTop: 6,
                  color: accentColor,
                  fontStyle: 'italic',
                  fontWeight: 400,
                }}>
                  {firstPara[0]}
                </span>
                {firstPara.slice(1)}
              </p>

              {/* Rest of paragraphs */}
              {restParas.map((para, i) => (
                <p
                  key={i}
                  style={{
                    fontSize: 17,
                    lineHeight: 1.75,
                    color: 'var(--ink-2)',
                    marginBottom: 28,
                    clear: i === 0 ? 'left' : undefined,
                  }}
                >
                  {para}
                </p>
              ))}
            </motion.div>

            {/* Share / CTA row */}
            <ScrollReveal delay={0.1}>
              <div style={{
                marginTop: 56,
                paddingTop: 36,
                borderTop: '1px solid var(--line)',
                display: 'flex',
                gap: 16,
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
                <div>
                  <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 10, fontWeight: 500 }}>Share this story</div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    {(() => {
                      const url = typeof window !== 'undefined' ? window.location.href : ''
                      const text = `${story.title} — Creative New Zealand`
                      const e = encodeURIComponent
                      const SHARES = [
                        { label: 'Twitter / X', href: `https://twitter.com/intent/tweet?url=${e(url)}&text=${e(text)}` },
                        { label: 'LinkedIn',    href: `https://www.linkedin.com/sharing/share-offsite/?url=${e(url)}` },
                        { label: 'Facebook',    href: `https://www.facebook.com/sharer/sharer.php?u=${e(url)}` },
                        { label: 'Copy link',   href: '' },
                      ]
                      return SHARES.map(s => s.label === 'Copy link' ? (
                        <button
                          key={s.label}
                          className="pill"
                          style={{ fontSize: 12 }}
                          onClick={() => {
                            if (typeof navigator !== 'undefined' && navigator.clipboard) {
                              navigator.clipboard.writeText(url)
                            }
                          }}
                        >
                          {s.label}
                        </button>
                      ) : (
                        <a
                          key={s.label}
                          className="pill"
                          style={{ fontSize: 12, textDecoration: 'none' }}
                          href={s.href}
                          target="_blank"
                          rel="noreferrer noopener"
                        >
                          {s.label}
                        </a>
                      ))
                    })()}
                  </div>
                </div>
                <MagneticHover strength={0.2}>
                  <Link to="/news" className="btn btn-ghost">← Back to news</Link>
                </MagneticHover>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Related stories */}
      {relatedStories.length > 0 && (
        <section className="section" style={{ background: 'var(--paper)', borderTop: '1px solid var(--line)' }}>
          <div className="container">
            <ScrollReveal>
              <div className="section-head">
                <div>
                  <span className="eyebrow">Keep reading</span>
                  <h2 style={{ marginTop: 16 }}>Related stories</h2>
                </div>
                <Link to="/news" className="btn-link">All news →</Link>
              </div>
            </ScrollReveal>
            <div className="news-grid">
              {relatedStories.map((s, i) => (
                <motion.div
                  key={s.id}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-32px' }}
                  transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
                >
                  <Link to={`/news/${s.id}`} className="ncard">
                    <div className="ncard-img">
                      <img src={s.img} alt={s.title} />
                    </div>
                    <div className="cat">{s.cat}</div>
                    <h3>{s.title}</h3>
                    <p style={{ marginTop: 8, marginBottom: 10 }}>{s.excerpt}</p>
                    <div className="date">{s.date} · {s.read} read</div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
