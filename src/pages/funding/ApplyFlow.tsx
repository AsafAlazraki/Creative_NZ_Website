import { Link, useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { OPPORTUNITIES, FILTERS, getDraft, saveDraft, deleteDraft } from '@/data'
import Breadcrumbs from '@/components/ui/Breadcrumbs'

// Stepper step descriptive labels
const STEPS: { name: string; sub: string }[] = [
  { name: 'Eligibility',  sub: 'Are you eligible?' },
  { name: 'About you',    sub: 'Your details & practice' },
  { name: 'Your project', sub: 'What you want to do' },
  { name: 'Budget',       sub: 'How much it will cost' },
  { name: 'Review',       sub: 'Check & submit' },
]
const STEP_NAMES = STEPS.map(s => s.name)
const PROJECT_DESC_LIMIT = 25      // words for one-line summary
const PROJECT_STORY_LIMIT = 500    // words for project body
function countWords(s: string) {
  return s.trim() ? s.trim().split(/\s+/).length : 0
}

const CHECKLIST = [
  'I am applying as an individual, group or organisation based in Aotearoa NZ',
  'My project has a clear artistic purpose and audience',
  'I have not received CNZ funding for the same activity in the last 12 months',
  'I have read the assessment criteria for this fund',
]

const BUDGET_LINES = ['Artist fees', 'Materials', 'Production', 'Venue / travel', 'Marketing', 'Other']

interface FormState {
  legalName: string
  practiceName: string
  email: string
  region: string
  iwi: string
  projectTitle: string
  projectDesc: string
  projectStory: string
  startDate: string
  endDate: string
  reach: string
  artforms: string[]
}

// Live word counter shown beneath text inputs/textareas.
function WordCounter({ id, value, limit, hint }: { id?: string; value: string; limit: number; hint?: string }) {
  const count = countWords(value)
  const ratio = count / limit
  const cls =
    count > limit ? 'field-counter field-counter--over' :
    ratio > 0.8 ? 'field-counter field-counter--warn' :
    'field-counter'
  return (
    <div id={id} className="hint" style={{ display: 'flex', justifyContent: 'space-between', gap: 12, marginTop: 6, alignItems: 'center' }}>
      <span>{hint}</span>
      <span className={cls} aria-live="polite" aria-atomic="true">
        {count} / {limit} words
      </span>
    </div>
  )
}

export default function ApplyFlow() {
  const [searchParams] = useSearchParams()
  const oppId = searchParams.get('opp') ?? 'general'
  const opp = OPPORTUNITIES.find(o => o.id === oppId)

  const existing = getDraft(oppId)
  const [step, setStep] = useState<number>(existing?.step ?? 0)
  const [form, setForm] = useState<FormState>(existing?.form ?? {
    legalName: '', practiceName: '', email: '', region: '', iwi: '',
    projectTitle: '', projectDesc: '', projectStory: '',
    startDate: '', endDate: '', reach: '', artforms: [],
  })

  // Eligibility checkboxes (step 0) and final confirmation (step 4) gate progress
  const [eligible, setEligible] = useState<boolean[]>(() => CHECKLIST.map(() => false))
  const [confirmed, setConfirmed] = useState(false)
  const allEligible = eligible.every(Boolean)

  // Step 2 (Your project) requires the textarea word counts to be within limits
  const projectStoryWords = countWords(form.projectStory)
  const projectDescWords = countWords(form.projectDesc)
  const overStoryLimit = projectStoryWords > PROJECT_STORY_LIMIT
  const overDescLimit  = projectDescWords > PROJECT_DESC_LIMIT
  const overLimits = overStoryLimit || overDescLimit

  const canContinue =
    step === 0 ? allEligible :
    step === 2 ? !overLimits :
    true
  const canSubmit = confirmed && !overLimits

  const continueBlockedReason =
    step === 0 ? 'Tick all four eligibility statements to continue.' :
    step === 2 && overLimits ? 'Reduce overlong fields below their word limit.' :
    undefined

  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null)

  const upd = (k: keyof FormState, v: string | string[]) =>
    setForm(f => ({ ...f, [k]: v }))

  const toggleArtform = (a: string) => {
    setForm(f => ({
      ...f,
      artforms: f.artforms.includes(a)
        ? f.artforms.filter(x => x !== a)
        : [...f.artforms, a],
    }))
  }

  // Autosave: debounce 1s after any field change, then persist as draft
  const autosaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  useEffect(() => {
    if (autosaveTimer.current) clearTimeout(autosaveTimer.current)
    autosaveTimer.current = setTimeout(() => {
      saveDraft(oppId, { step, form, oppTitle: opp?.title ?? 'Application' })
      setLastSavedAt(new Date())
    }, 1000)
    return () => { if (autosaveTimer.current) clearTimeout(autosaveTimer.current) }
  }, [form, step, oppId, opp?.title])

  const [toast, setToast] = useState('')

  const handleSaveDraft = () => {
    saveDraft(oppId, { step, form, oppTitle: opp?.title ?? 'Application' })
    setLastSavedAt(new Date())
    setToast('Your application has been saved as a draft.')
    setTimeout(() => setToast(''), 4000)
  }

  const handleSubmit = () => {
    deleteDraft(oppId)
    setToast('Application submitted (demo). Thank you!')
    setTimeout(() => setToast(''), 5000)
  }

  return (
    <>
      <Breadcrumbs
        trail={[
          { label: 'Home', path: '/' },
          { label: 'Funding', path: '/funding' },
          ...(opp ? [{ label: opp.title, path: `/funding/opportunity/${opp.id}` }] : []),
          { label: 'Apply' },
        ]}
      />

      <section className="section">
        <div className="container" style={{ maxWidth: 960 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="eyebrow">
              Application · Save anytime{existing ? ' · Resuming draft' : ''}
            </span>
            <h1 style={{ marginTop: 16, marginBottom: 8 }}>
              {opp ? opp.title : 'Start your application.'}
            </h1>
            {opp && (
              <p style={{ color: 'var(--muted)', margin: '0 0 32px', fontSize: 15 }}>
                {opp.amount} · Next round: {opp.next}
              </p>
            )}
            {!opp && <div style={{ marginBottom: 32 }} />}
          </motion.div>

          {/* Stepper */}
          <ol className="stepper" aria-label="Application steps">
            {STEPS.map((s, i) => (
              <li key={i} style={{ listStyle: 'none' }}>
                <button
                  className={`step${i === step ? ' active' : i < step ? ' done' : ''}`}
                  onClick={() => setStep(i)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', width: '100%' }}
                  aria-current={i === step ? 'step' : undefined}
                >
                  <span className="num">{String(i + 1).padStart(2, '0')} / {s.name}</span>
                  <span className="step-sub">{s.sub}</span>
                </button>
              </li>
            ))}
          </ol>

          {/* Step panels */}
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              {step === 0 && (
                <div>
                  <h3 style={{ marginBottom: 12 }}>Let's check this fund is right for you.</h3>
                  <p style={{ color: 'var(--muted)', fontSize: 14, marginBottom: 24 }}>
                    Tick all four to continue.
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 680 }}>
                    {CHECKLIST.map((q, i) => (
                      <label key={i} style={{
                        display: 'flex', gap: 14, padding: 18,
                        border: `1px solid ${eligible[i] ? 'var(--bush)' : 'var(--line)'}`,
                        background: eligible[i] ? 'rgba(63,94,58,0.04)' : 'transparent',
                        borderRadius: 'var(--r)',
                        cursor: 'pointer', alignItems: 'center',
                        transition: 'border-color 0.18s, background 0.18s',
                      }}>
                        <input
                          type="checkbox"
                          checked={eligible[i]}
                          onChange={e => setEligible(prev => prev.map((v, idx) => idx === i ? e.target.checked : v))}
                        />
                        <span>{q}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {step === 1 && (
                <div className="form-step">
                  <div className="field">
                    <label>Legal name</label>
                    <input value={form.legalName} onChange={e => upd('legalName', e.target.value)} />
                  </div>
                  <div className="field">
                    <label>Artist / practice name</label>
                    <input value={form.practiceName} onChange={e => upd('practiceName', e.target.value)} />
                  </div>
                  <div className="field full">
                    <label>Email</label>
                    <input type="email" value={form.email} onChange={e => upd('email', e.target.value)} />
                  </div>
                  <div className="field">
                    <label>Region</label>
                    <select value={form.region} onChange={e => upd('region', e.target.value)}>
                      <option value="">Select a region</option>
                      <option>Te Whanganui-a-Tara · Wellington</option>
                      <option>Tāmaki Makaurau · Auckland</option>
                      <option>Ōtautahi · Christchurch</option>
                      <option>Waikato</option>
                      <option>Bay of Plenty · Te Moana-a-Toi</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="field">
                    <label>Iwi / heritage (optional)</label>
                    <input value={form.iwi} onChange={e => upd('iwi', e.target.value)} />
                  </div>
                  <div className="field full">
                    <label>Artform</label>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 8 }}>
                      {FILTERS.artform.map(a => (
                        <button
                          key={a}
                          type="button"
                          className={`pill${form.artforms.includes(a) ? ' on' : ''}`}
                          onClick={() => toggleArtform(a)}
                        >
                          {a}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="form-step">
                  <div className="field full">
                    <label>Project title</label>
                    <input value={form.projectTitle} onChange={e => upd('projectTitle', e.target.value)} />
                  </div>
                  <div className={`field full${overDescLimit ? ' field--error' : ''}`}>
                    <label htmlFor="apply-project-desc">One-sentence description</label>
                    <input
                      id="apply-project-desc"
                      placeholder="Describe your project in one sentence"
                      value={form.projectDesc}
                      onChange={e => upd('projectDesc', e.target.value)}
                      aria-invalid={overDescLimit}
                      aria-describedby="apply-project-desc-counter"
                    />
                    <WordCounter id="apply-project-desc-counter" value={form.projectDesc} limit={PROJECT_DESC_LIMIT} hint="This appears on the public list of funded projects if successful." />
                  </div>
                  <div className={`field full${overStoryLimit ? ' field--error' : ''}`}>
                    <label htmlFor="apply-project-story">Tell us about your project</label>
                    <textarea
                      id="apply-project-story"
                      rows={8}
                      value={form.projectStory}
                      onChange={e => upd('projectStory', e.target.value)}
                      aria-invalid={overStoryLimit}
                      aria-describedby="apply-project-story-counter"
                    />
                    <WordCounter id="apply-project-story-counter" value={form.projectStory} limit={PROJECT_STORY_LIMIT} hint="Up to 500 words. Tell us what, who and why." />
                  </div>
                  <div className="field">
                    <label>Start date</label>
                    <input type="date" value={form.startDate} onChange={e => upd('startDate', e.target.value)} />
                  </div>
                  <div className="field">
                    <label>End date</label>
                    <input type="date" value={form.endDate} onChange={e => upd('endDate', e.target.value)} />
                  </div>
                  <div className="field full">
                    <label>Who will this work reach?</label>
                    <textarea rows={4} value={form.reach} onChange={e => upd('reach', e.target.value)} />
                  </div>
                </div>
              )}

              {step === 3 && (
                <div>
                  <h3 style={{ marginBottom: 24 }}>Your budget</h3>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid var(--line)' }}>
                        <th style={{ textAlign: 'left', padding: '12px 0', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', fontWeight: 600 }}>
                          Line item
                        </th>
                        <th style={{ textAlign: 'right', padding: '12px 0', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', fontWeight: 600, width: 160 }}>
                          Cost (NZD)
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {BUDGET_LINES.map(line => (
                        <tr key={line} style={{ borderBottom: '1px solid var(--line)' }}>
                          <td style={{ padding: '14px 0' }}>
                            <input
                              placeholder={line}
                              style={{ border: 'none', background: 'transparent', fontSize: 15, fontFamily: 'inherit', color: 'var(--ink)', width: '100%', outline: 'none' }}
                            />
                          </td>
                          <td style={{ padding: '14px 0' }}>
                            <input
                              placeholder="0"
                              style={{ width: '100%', border: 'none', background: 'transparent', fontSize: 15, fontFamily: 'var(--font-mono)', color: 'var(--ink)', textAlign: 'right', outline: 'none' }}
                            />
                          </td>
                        </tr>
                      ))}
                      <tr>
                        <td style={{ padding: '18px 0', fontFamily: 'var(--font-display)', fontSize: 18 }}>Total requested</td>
                        <td style={{ padding: '18px 0', textAlign: 'right', fontFamily: 'var(--font-display)', fontSize: 22, fontStyle: 'italic' }}>$0</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

              {step === 4 && (
                <div>
                  <h3 style={{ marginBottom: 24 }}>Review & submit</h3>
                  <p style={{ color: 'var(--muted)', marginBottom: 32 }}>
                    Review the information you've entered. Return to any step to make changes before submitting.
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    {STEPS.slice(0, 4).map((s, i) => {
                      // Build a one-line preview of what the user has entered for each step.
                      let preview = ''
                      if (i === 0) preview = allEligible ? 'All four eligibility criteria met' : 'Not yet confirmed'
                      else if (i === 1) preview = [form.legalName, form.region].filter(Boolean).join(' · ') || 'Not yet filled'
                      else if (i === 2) preview = form.projectTitle || 'No project title yet'
                      else if (i === 3) preview = 'Budget breakdown'
                      return (
                        <div key={i} style={{
                          padding: 20, border: '1px solid var(--line)', borderRadius: 'var(--r-md)',
                          display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16,
                        }}>
                          <div style={{ minWidth: 0, flex: 1 }}>
                            <div style={{ fontFamily: 'var(--font-display)', fontSize: 18 }}>{s.name}</div>
                            <div style={{
                              fontSize: 13, color: 'var(--muted)', marginTop: 4,
                              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                            }}>
                              {preview}
                            </div>
                          </div>
                          <button
                            className="btn btn-ghost"
                            style={{ padding: '8px 16px', fontSize: 13, flexShrink: 0 }}
                            onClick={() => setStep(i)}
                          >
                            Edit
                          </button>
                        </div>
                      )
                    })}
                  </div>
                  <div style={{ marginTop: 32, padding: 24, background: 'var(--surface)', borderRadius: 'var(--r)' }}>
                    <label style={{ display: 'flex', gap: 12, alignItems: 'flex-start', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        style={{ marginTop: 4 }}
                        checked={confirmed}
                        onChange={e => setConfirmed(e.target.checked)}
                      />
                      <span style={{ fontSize: 14 }}>
                        I confirm the information in this application is accurate, and I have read CNZ's funding terms and privacy policy.
                      </span>
                    </label>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Nav row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 48, paddingTop: 32, borderTop: '1px solid var(--line)' }}>
            <button className="btn btn-ghost" disabled={step === 0} onClick={() => setStep(s => Math.max(0, s - 1))}>
              ← Back
            </button>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              {lastSavedAt && (
                <span style={{ fontSize: 12, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }} aria-live="polite">
                  Saved {lastSavedAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              )}
              <button className="btn btn-ghost" onClick={handleSaveDraft}>Save draft</button>
              {step < STEPS.length - 1
                ? (
                  <button
                    className="btn btn-primary"
                    onClick={() => canContinue && setStep(s => s + 1)}
                    disabled={!canContinue}
                    style={!canContinue ? { opacity: 0.4, cursor: 'not-allowed' } : undefined}
                    title={continueBlockedReason}
                  >
                    Continue →
                  </button>
                )
                : (
                  <button
                    className="btn btn-accent"
                    onClick={() => canSubmit && handleSubmit()}
                    disabled={!canSubmit}
                    style={!canSubmit ? { opacity: 0.4, cursor: 'not-allowed' } : undefined}
                    title={!canSubmit ? 'Please confirm before submitting' : undefined}
                  >
                    Submit application →
                  </button>
                )
              }
            </div>
          </div>
        </div>
      </section>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            style={{
              position: 'fixed', bottom: 32, left: '50%', transform: 'translateX(-50%)',
              background: 'var(--ink)', color: 'var(--bg)', padding: '16px 28px',
              borderRadius: 'var(--r-pill)', fontSize: 15, fontWeight: 500,
              boxShadow: 'var(--shadow-3)', zIndex: 200, display: 'flex', alignItems: 'center', gap: 12,
            }}
          >
            <span style={{ display: 'inline-grid', placeItems: 'center', width: 22, height: 22, borderRadius: '50%', background: 'var(--bush)', color: '#fff', fontSize: 13 }}>✓</span>
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
