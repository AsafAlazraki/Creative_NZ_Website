import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
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

const OFFICES = [
  {
    city: 'Wellington',
    kupu: 'Te Whanganui-a-Tara · National Office',
    address: '228 Wakefield Street\nTe Aro, Wellington 6011',
    phone: '+64 4 473 0880',
    hours: 'Monday – Friday, 9 am – 5 pm',
    note: 'Our national office. All general enquiries and funding applications.',
  },
  {
    city: 'Auckland',
    kupu: 'Tāmaki Makaurau · Regional Office',
    address: 'Level 2, 45 Pipitea Street\nParnell, Auckland 1052',
    phone: '+64 9 373 3080',
    hours: 'Monday – Friday, 9 am – 4:30 pm',
    note: 'Serving artists and organisations in the upper North Island.',
  },
  {
    city: 'Christchurch',
    kupu: 'Ōtautahi · Regional Office',
    address: 'Level 1, 225 High Street\nChristchurch Central 8011',
    phone: '+64 3 366 4050',
    hours: 'Monday – Thursday, 9 am – 4:30 pm',
    note: 'Serving artists and organisations in the South Island.',
  },
]

const ENQUIRY_TYPES = [
  'Funding enquiry',
  'Application support',
  'Media enquiry',
  'Partnership proposal',
  'Complaints & feedback',
  'General enquiry',
]

interface FormState {
  name: string
  email: string
  phone: string
  organisation: string
  type: string
  subject: string
  message: string
}

export default function ContactPage() {
  const [form, setForm] = useState<FormState>({
    name: '', email: '', phone: '', organisation: '',
    type: '', subject: '', message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const set = (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(prev => ({ ...prev, [key]: e.target.value }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <>
      <Breadcrumbs trail={[
        { label: 'Home', path: '/' },
        { label: 'About us', path: '/about' },
        { label: 'Contact' },
      ]} />

      <section className="page-head" style={{ position: 'relative', overflow: 'hidden' }}>
        <KoruCorner position="tr" size={300} color="var(--kowhai)" opacity={0.07} />
        <div className="container">
          <motion.span
            className="eyebrow"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Whakapā mai · Get in touch
          </motion.span>
          <motion.h1
            style={{ marginTop: 18, marginBottom: 20 }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.06 }}
          >
            Contact us
          </motion.h1>
          <motion.p
            className="lede"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12 }}
          >
            We have offices in Wellington, Auckland and Christchurch. Our advisers can help you find the right funding, understand the application process, or discuss your arts project.
          </motion.p>
        </div>
      </section>

      <SubNav items={SUBNAV} />

      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 80, alignItems: 'start' }}>

            {/* Offices column */}
            <div>
              <ScrollReveal>
                <span className="eyebrow" style={{ marginBottom: 32, display: 'block' }}>Our offices · Ā mātou tari</span>
              </ScrollReveal>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
                {OFFICES.map((office, i) => (
                  <motion.div
                    key={office.city}
                    initial={{ opacity: 0, x: -24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-20px' }}
                    transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
                  >
                    <div style={{
                      padding: 28,
                      background: 'var(--card)',
                      border: '1px solid var(--line)',
                      borderRadius: 'var(--r-md)',
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                        <div>
                          <h3 style={{ fontSize: 22, marginBottom: 4 }}>{office.city}</h3>
                          <div className="kupu" style={{ fontSize: 12 }}>{office.kupu}</div>
                        </div>
                        <div style={{
                          width: 10,
                          height: 10,
                          borderRadius: '50%',
                          background: 'var(--bush)',
                          marginTop: 6,
                          flexShrink: 0,
                        }} />
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                          <span style={{ fontSize: 13, color: 'var(--muted)', minWidth: 64, fontWeight: 500 }}>Address</span>
                          <span style={{ fontSize: 14, lineHeight: 1.6, whiteSpace: 'pre-line' }}>{office.address}</span>
                        </div>
                        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                          <span style={{ fontSize: 13, color: 'var(--muted)', minWidth: 64, fontWeight: 500 }}>Phone</span>
                          <a href={`tel:${office.phone.replace(/\s/g, '')}`} style={{ fontSize: 14, color: 'var(--moana)', fontWeight: 500 }}>{office.phone}</a>
                        </div>
                        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                          <span style={{ fontSize: 13, color: 'var(--muted)', minWidth: 64, fontWeight: 500 }}>Hours</span>
                          <span style={{ fontSize: 13.5 }}>{office.hours}</span>
                        </div>
                        <div style={{ paddingTop: 12, borderTop: '1px solid var(--line)', marginTop: 4 }}>
                          <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.55 }}>{office.note}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* General email */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  style={{ padding: '20px 0', borderTop: '1px solid var(--line)' }}
                >
                  <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 6 }}>General enquiries</div>
                  <a href="mailto:cnz.enquiries@creativenz.govt.nz" style={{ fontSize: 15, color: 'var(--moana)', fontWeight: 500 }}>
                    cnz.enquiries@creativenz.govt.nz
                  </a>
                  <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 4 }}>We aim to respond within two business days.</div>
                </motion.div>
              </div>
            </div>

            {/* Contact form column */}
            <ScrollReveal direction="right" delay={0.1}>
              <div style={{
                background: 'var(--paper)',
                border: '1px solid var(--line)',
                borderRadius: 'var(--r-lg)',
                padding: 44,
              }}>
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    style={{ textAlign: 'center', padding: '32px 0' }}
                  >
                    <div style={{
                      width: 56,
                      height: 56,
                      borderRadius: '50%',
                      background: 'var(--bush)',
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 24,
                      margin: '0 auto 24px',
                    }}>✓</div>
                    <h3 style={{ marginBottom: 12 }}>Message sent</h3>
                    <p style={{ color: 'var(--muted)', marginBottom: 28 }}>
                      Thanks for getting in touch. We'll get back to you within two business days.
                    </p>
                    <button className="btn btn-ghost" onClick={() => setSubmitted(false)}>Send another message</button>
                  </motion.div>
                ) : (
                  <>
                    <h2 style={{ fontSize: 26, marginBottom: 8 }}>Send us a message</h2>
                    <p style={{ color: 'var(--muted)', fontSize: 14, marginBottom: 32 }}>
                      Fill in the form below and a member of our team will be in touch.
                    </p>
                    <form onSubmit={handleSubmit}>
                      <div className="form-step" style={{ marginBottom: 0 }}>
                        <div className="field">
                          <label htmlFor="name">Full name *</label>
                          <input id="name" type="text" value={form.name} onChange={set('name')} required placeholder="Your full name" />
                        </div>
                        <div className="field">
                          <label htmlFor="email">Email address *</label>
                          <input id="email" type="email" value={form.email} onChange={set('email')} required placeholder="you@example.com" />
                        </div>
                        <div className="field">
                          <label htmlFor="phone">Phone (optional)</label>
                          <input id="phone" type="tel" value={form.phone} onChange={set('phone')} placeholder="+64 21 000 0000" />
                        </div>
                        <div className="field">
                          <label htmlFor="organisation">Organisation (optional)</label>
                          <input id="organisation" type="text" value={form.organisation} onChange={set('organisation')} placeholder="Your arts organisation or group" />
                        </div>
                        <div className="field full">
                          <label htmlFor="type">Enquiry type *</label>
                          <select id="type" value={form.type} onChange={set('type')} required>
                            <option value="">Select enquiry type…</option>
                            {ENQUIRY_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                          </select>
                        </div>
                        <div className="field full">
                          <label htmlFor="subject">Subject *</label>
                          <input id="subject" type="text" value={form.subject} onChange={set('subject')} required placeholder="Brief subject of your enquiry" />
                        </div>
                        <div className="field full">
                          <label htmlFor="message">Message *</label>
                          <textarea
                            id="message"
                            value={form.message}
                            onChange={set('message')}
                            required
                            rows={6}
                            placeholder="Tell us about your project, question or enquiry…"
                          />
                          <div className="hint">The more context you provide, the better we can help you.</div>
                        </div>
                      </div>
                      <div style={{ marginTop: 28, display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
                        <button type="submit" className="btn btn-primary">Send message →</button>
                        <span style={{ fontSize: 12, color: 'var(--muted)' }}>
                          Fields marked * are required. View our{' '}
                          <Link to="/about/privacy" style={{ color: 'var(--moana)' }}>privacy policy</Link>.
                        </span>
                      </div>
                    </form>
                  </>
                )}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  )
}
