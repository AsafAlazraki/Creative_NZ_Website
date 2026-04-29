// Funding pages: hub, tier (early/artists/orgs), opportunities list, opportunity detail, apply flow, calendar, advice, results, awards
const { Link, MotifCorner, useRouter } = window;

// Draft application storage helpers
const DRAFTS_KEY = 'cnz.appDrafts';
function loadDrafts() {
  try { return JSON.parse(localStorage.getItem(DRAFTS_KEY) || '{}'); } catch { return {}; }
}
function saveDraft(oppId, data) {
  const all = loadDrafts();
  all[oppId] = { ...data, savedAt: new Date().toISOString() };
  localStorage.setItem(DRAFTS_KEY, JSON.stringify(all));
}
function getDraft(oppId) { return loadDrafts()[oppId]; }
window.cnzDrafts = { loadDrafts, saveDraft, getDraft };

// Parse query params from hash route (e.g. /funding/apply?opp=tuk)
function parseHashQuery() {
  const h = window.location.hash.replace(/^#/, '');
  const qi = h.indexOf('?');
  if (qi === -1) return {};
  const out = {};
  new URLSearchParams(h.slice(qi+1)).forEach((v,k)=>{ out[k]=v; });
  return out;
}

// Toast — global
function showToast(msg) {
  const id = 'cnz-toast';
  let el = document.getElementById(id);
  if (el) el.remove();
  el = document.createElement('div');
  el.id = id;
  el.style.cssText = 'position:fixed;bottom:32px;left:50%;transform:translateX(-50%);background:var(--ink);color:var(--bg);padding:16px 28px;border-radius:var(--r-pill);font-size:15px;font-weight:500;box-shadow:var(--shadow-3);z-index:200;display:flex;align-items:center;gap:12px;animation:fadeInUp 0.3s ease-out;';
  el.innerHTML = '<span style="display:inline-grid;place-items:center;width:22px;height:22px;border-radius:50%;background:var(--bush);color:#fff;font-size:13px;">✓</span>' + msg;
  document.body.appendChild(el);
  setTimeout(()=>{ el.style.transition='opacity 0.4s'; el.style.opacity='0'; }, 3200);
  setTimeout(()=>el.remove(), 3700);
}
window.showToast = showToast;

function FundingHub() {
  return (
    <>
      <section className="page-head">
        <MotifCorner position="tr" size={300} color="var(--kowhai)" opacity={0.12} />
        <div className="container">
          <span className="eyebrow">Pūtea tautoko</span>
          <h1 style={{marginTop:20}}>Funding & support.</h1>
          <p className="lede">Grants, residencies, fellowships and multi-year investment for artists, ringatoi and arts organisations across Aotearoa.</p>
        </div>
      </section>
      <SubNav items={[
        {label:'Overview', path:'/funding'},
        {label:'All opportunities', path:'/funding/opportunities'},
        {label:'Calendar', path:'/funding/calendar'},
        {label:'Advice', path:'/funding/advice'},
        {label:'Results', path:'/funding/results'},
        {label:'Awards', path:'/funding/awards'},
      ]}/>
      <section className="section">
        <div className="container">
          <h2 style={{marginBottom:32}}>Find what fits where you are.</h2>
          <div className="tier-grid">
            {window.FUNDING_TIERS.map(t => (
              <Link key={t.id} to={t.path} className="tier-card">
                <div className="tier-card-img"><img src={t.img} alt={t.label}/></div>
                <div className="tier-card-body">
                  <h3>{t.label}</h3>
                  <span className="kupu">{t.kupu}</span>
                  <p>{t.blurb}</p>
                  <div className="meta-row">
                    <div>Funding<strong>{t.amount}</strong></div>
                    <div>Next round<strong>{t.next}</strong></div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="section-tight" style={{background:'var(--paper)', borderTop:'1px solid var(--line)', borderBottom:'1px solid var(--line)'}}>
        <div className="container" style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:32}}>
          <div>
            <span className="eyebrow">Need help?</span>
            <h3 style={{marginTop:14, marginBottom:10}}>Speak with an adviser</h3>
            <p style={{color:'var(--muted)', margin:0}}>Free 1:1 conversations with our funding advisers — kanohi ki te kanohi or by phone.</p>
            <Link to="/funding/adviser" className="btn btn-ghost" style={{marginTop:18}}>Book a kōrero →</Link>
          </div>
          <div>
            <span className="eyebrow">Read first</span>
            <h3 style={{marginTop:14, marginBottom:10}}>Funding advice</h3>
            <p style={{color:'var(--muted)', margin:0}}>Eligibility, evidence of work, budget, assessment criteria — what to know before you apply.</p>
            <Link to="/funding/advice" className="btn btn-ghost" style={{marginTop:18}}>Read advice →</Link>
          </div>
          <div>
            <span className="eyebrow">Already supported?</span>
            <h3 style={{marginTop:14, marginBottom:10}}>Recent results</h3>
            <p style={{color:'var(--muted)', margin:0}}>See who we've funded recently across Toi Tōtara Haemata, Toi Uru Kahikatea, and project funds.</p>
            <Link to="/funding/results" className="btn btn-ghost" style={{marginTop:18}}>View results →</Link>
          </div>
        </div>
      </section>
    </>
  );
}

function FundingTier({ tierId }) {
  const tier = window.FUNDING_TIERS.find(t => t.id === tierId);
  const opps = window.OPPORTUNITIES.filter(o => o.tier === tierId);
  if (!tier) return <div className="container section">Tier not found.</div>;
  return (
    <>
      <Crumbs trail={[{label:'Home',path:'/'},{label:'Funding',path:'/funding'},{label:tier.label}]} />
      <section className="page-head">
        <div className="container" style={{display:'grid', gridTemplateColumns:'1.2fr 1fr', gap:64, alignItems:'end'}}>
          <div>
            <span className="eyebrow">{tier.kupu}</span>
            <h1 style={{marginTop:16}}>{tier.label}</h1>
            <p className="lede" style={{marginTop:16}}>{tier.blurb}</p>
            <div style={{display:'flex', gap:32, marginTop:32, paddingTop:24, borderTop:'1px solid var(--line)'}}>
              <div><div className="kupu" style={{fontSize:11, letterSpacing:'0.12em', textTransform:'uppercase', color:'var(--muted)', marginBottom:6}}>Funding</div><strong style={{fontSize:20, fontFamily:'var(--font-display)', fontStyle:'italic'}}>{tier.amount}</strong></div>
              <div><div className="kupu" style={{fontSize:11, letterSpacing:'0.12em', textTransform:'uppercase', color:'var(--muted)', marginBottom:6}}>Next round</div><strong style={{fontSize:20, fontFamily:'var(--font-display)', fontStyle:'italic'}}>{tier.next}</strong></div>
            </div>
            <div style={{display:'flex', gap:12, marginTop:32}}>
              <Link to="/funding/apply" className="btn btn-primary">Start application →</Link>
              <Link to="/funding/adviser" className="btn btn-ghost">Speak with an adviser</Link>
            </div>
          </div>
          <div style={{aspectRatio:'4/5', borderRadius:'var(--r-sm)', overflow:'hidden', background:'var(--paper-2)'}}>
            <img src={tier.img} alt="" style={{width:'100%', height:'100%', objectFit:'cover'}} />
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container" style={{display:'grid', gridTemplateColumns:'1fr 2fr', gap:64}}>
          <div>
            <h2>How it works</h2>
          </div>
          <div style={{display:'flex', flexDirection:'column', gap:32}}>
            {[
              ['01','Check you fit','Read the eligibility criteria carefully. If you\'re not sure, book a free kōrero with one of our advisers.'],
              ['02','Build your case','Tell us about your work, your community, your plan and your budget. We\'re looking for a clear case for support.'],
              ['03','Submit & assess','Submit before the deadline. Peer assessors review against published criteria — you\'ll hear back within 8 weeks.'],
              ['04','Deliver & report','If successful, we\'ll work with you on accountability and reporting. Your story becomes part of the sector record.'],
            ].map(([n,t,d])=>(
              <div key={n} style={{display:'grid', gridTemplateColumns:'60px 1fr', gap:24, paddingBottom:24, borderBottom:'1px solid var(--line)'}}>
                <div style={{fontFamily:'var(--font-display)', fontSize:32, fontStyle:'italic', color:'var(--accent-2)'}}>{n}</div>
                <div><h3 style={{marginBottom:8, fontSize:22}}>{t}</h3><p style={{color:'var(--muted)', margin:0}}>{d}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section" style={{background:'var(--paper)', borderTop:'1px solid var(--line)', borderBottom:'1px solid var(--line)'}}>
        <div className="container">
          <div className="section-head">
            <div><span className="eyebrow">Open in this tier</span><h2 style={{marginTop:14}}>Available now & upcoming</h2></div>
            <Link to="/funding/opportunities" className="btn-link">All opportunities →</Link>
          </div>
          <div className="opp-list" style={{borderTop:'1px solid var(--line)', background:'var(--card)', borderRadius:'var(--r-md)', padding:'0 16px', border:'1px solid var(--line)'}}>
            {opps.length === 0 && <div style={{padding:48, textAlign:'center', color:'var(--muted)'}}>No opportunities open in this tier right now. Check back soon.</div>}
            {opps.map(o => (
              <Link key={o.id} to={`/funding/opportunity/${o.id}`} className="opp-row">
                <div className="code">{o.code}</div>
                <div className="title-cell"><h4>{o.title} <span className={`status ${o.status}`}>{o.status}</span></h4>{o.kupu && <span className="kupu">{o.kupu}</span>}</div>
                <div className="desc">{o.desc}</div>
                <div className="amt">{o.amount}</div>
                <div className="when"><span className="lbl">Next</span>{o.next}</div>
                <div className="arrow">→</div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function Opportunities() {
  const [filters, setFilters] = useState({ who:'', stage:'', artform:'', status:'all', q:'' });
  const [drafts, setDrafts] = useState(() => loadDrafts());
  useEffect(() => {
    const onStorage = () => setDrafts(loadDrafts());
    window.addEventListener('storage', onStorage);
    window.addEventListener('cnz-drafts-updated', onStorage);
    return () => { window.removeEventListener('storage', onStorage); window.removeEventListener('cnz-drafts-updated', onStorage); };
  }, []);
  const filtered = useMemo(() => {
    return window.OPPORTUNITIES.filter(o => {
      if (filters.status !== 'all' && o.status !== filters.status) return false;
      if (filters.q && !(o.title + o.desc).toLowerCase().includes(filters.q.toLowerCase())) return false;
      return true;
    });
  }, [filters]);
  return (
    <>
      <Crumbs trail={[{label:'Home',path:'/'},{label:'Funding',path:'/funding'},{label:'All opportunities'}]} />
      <section className="page-head">
        <div className="container">
          <span className="eyebrow">Pūtea tautoko · {window.OPPORTUNITIES.length} opportunities</span>
          <h1 style={{marginTop:16}}>All funding opportunities.</h1>
          <p className="lede">Filter by who's eligible, the stage of your work, and your artform.</p>
        </div>
      </section>
      <section className="section-tight" style={{borderBottom:'1px solid var(--line)', background:'var(--paper)'}}>
        <div className="container">
          <div style={{marginBottom:18}}>
            <div className="searchbar" style={{maxWidth:600}}>
              <span style={{fontSize:18, color:'var(--muted)'}}>⌕</span>
              <input value={filters.q} onChange={e=>setFilters(f=>({...f,q:e.target.value}))} placeholder="Search opportunities…"/>
            </div>
          </div>
          <div style={{display:'flex', gap:12, flexWrap:'wrap', alignItems:'center'}}>
            <span className="eyebrow" style={{borderBottom:'none'}}>Status</span>
            {['all','open','upcoming','closed'].map(s => (
              <button key={s} className={`pill ${filters.status===s?'on':''}`} onClick={()=>setFilters(f=>({...f,status:s}))}>{s}</button>
            ))}
            <span style={{flex:1}}></span>
            <span className="eyebrow" style={{borderBottom:'none'}}>Showing {filtered.length}</span>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="opp-list" style={{borderTop:'1px solid var(--line)'}}>
            {filtered.map(o => {
              const draft = drafts[o.id];
              return (
              <Link key={o.id} to={`/funding/opportunity/${o.id}`} className="opp-row">
                <div className="code">{o.code}</div>
                <div className="title-cell"><h4>{o.title} <span className={`status ${o.status}`}>{o.status}</span></h4>{o.kupu && <span className="kupu">{o.kupu}</span>}
                  {draft && (
                    <span className="draft-badge" onClick={(e)=>{e.preventDefault(); e.stopPropagation(); window.location.hash = `/funding/apply?opp=${o.id}`; window.scrollTo({top:0});}}>
                      <span className="dot"></span>Draft saved · Finish your application →
                    </span>
                  )}
                </div>
                <div className="desc">{o.desc}</div>
                <div className="amt">{o.amount}</div>
                <div className="when"><span className="lbl">Next</span>{o.next}</div>
                <div className="arrow">→</div>
              </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

function OpportunityDetail({ oppId }) {
  const o = window.OPPORTUNITIES.find(x => x.id === oppId);
  if (!o) return <div className="container section"><h2>Opportunity not found</h2><Link to="/funding/opportunities" className="btn-link">Back to all opportunities →</Link></div>;
  return (
    <>
      <Crumbs trail={[{label:'Home',path:'/'},{label:'Funding',path:'/funding'},{label:'Opportunities',path:'/funding/opportunities'},{label:o.title}]} />
      <section className="page-head">
        <div className="container">
          <div style={{display:'flex', gap:16, alignItems:'center', marginBottom:20}}>
            <span className="code" style={{fontFamily:'var(--font-mono)', fontSize:12, color:'var(--muted)', letterSpacing:'0.06em'}}>{o.code}</span>
            <span className={`status ${o.status}`} style={{padding:'4px 12px', borderRadius:'var(--r-pill)', fontSize:11, letterSpacing:'0.1em', textTransform:'uppercase', fontWeight:600,
              background: o.status==='open' ? 'rgba(63,94,58,0.12)' : o.status==='upcoming' ? 'rgba(232,163,23,0.18)' : 'rgba(0,0,0,0.06)',
              color: o.status==='open' ? 'var(--bush)' : o.status==='upcoming' ? 'var(--kowhai-deep)' : 'var(--muted)'}}>{o.status}</span>
          </div>
          <h1>{o.title}</h1>
          {o.kupu && <p className="kupu" style={{fontSize:18, marginTop:8}}>{o.kupu}</p>}
          <p className="lede" style={{marginTop:16}}>{o.desc}</p>
        </div>
      </section>
      <section className="section">
        <div className="container" style={{display:'grid', gridTemplateColumns:'2fr 1fr', gap:64, alignItems:'start'}}>
          <div>
            <h2 style={{marginBottom:16}}>About this fund</h2>
            <p style={{fontSize:17, lineHeight:1.6, color:'var(--ink-2)'}}>{o.desc} The fund supports projects that demonstrate clear artistic vision, a meaningful relationship with audiences or community, and the practical capacity to deliver.</p>
            <h3 style={{marginTop:48, marginBottom:14}}>Who can apply</h3>
            <ul style={{margin:0, paddingLeft:20, color:'var(--ink-2)', lineHeight:1.7}}>
              <li>Individual artists, ringatoi or arts practitioners</li>
              <li>Groups, collectives or unincorporated organisations</li>
              <li>Registered arts organisations</li>
              <li>Applicants whose work is grounded in or for communities in Aotearoa New Zealand</li>
            </ul>
            <h3 style={{marginTop:48, marginBottom:14}}>What we'll fund</h3>
            <ul style={{margin:0, paddingLeft:20, color:'var(--ink-2)', lineHeight:1.7}}>
              <li>Artist fees and time</li>
              <li>Materials, production and technical costs</li>
              <li>Marketing, audience and presentation costs</li>
              <li>Mentorship, professional development and travel</li>
            </ul>
            <h3 style={{marginTop:48, marginBottom:14}}>Assessment criteria</h3>
            <p style={{color:'var(--ink-2)', lineHeight:1.6}}>Peer assessors review your application against the published criteria. We weight artistic merit, public value and capacity to deliver.</p>
          </div>
          <aside style={{position:'sticky', top:120, padding:32, background:'var(--paper)', border:'1px solid var(--line)', borderRadius:'var(--r-md)'}}>
            <div style={{paddingBottom:20, borderBottom:'1px solid var(--line)', marginBottom:20}}>
              <div style={{fontSize:11, letterSpacing:'0.12em', textTransform:'uppercase', color:'var(--muted)', marginBottom:8}}>Funding</div>
              <div style={{fontSize:28, fontFamily:'var(--font-display)', fontStyle:'italic'}}>{o.amount}</div>
            </div>
            <div style={{paddingBottom:20, borderBottom:'1px solid var(--line)', marginBottom:20}}>
              <div style={{fontSize:11, letterSpacing:'0.12em', textTransform:'uppercase', color:'var(--muted)', marginBottom:8}}>Next round</div>
              <div style={{fontSize:18, fontFamily:'var(--font-display)'}}>{o.next}</div>
            </div>
            <div style={{paddingBottom:20, borderBottom:'1px solid var(--line)', marginBottom:20}}>
              <div style={{fontSize:11, letterSpacing:'0.12em', textTransform:'uppercase', color:'var(--muted)', marginBottom:8}}>Decision</div>
              <div style={{fontSize:14}}>Within 8 weeks of close</div>
            </div>
            {o.status === 'open' ? (
              getDraft(o.id) ? (
                <Link to={`/funding/apply?opp=${o.id}`} className="btn btn-accent" style={{width:'100%', justifyContent:'center'}}>Resume draft →</Link>
              ) : (
                <Link to={`/funding/apply?opp=${o.id}`} className="btn btn-accent" style={{width:'100%', justifyContent:'center'}}>Start application →</Link>
              )
            ) : o.status === 'upcoming' ? (
              <button className="btn btn-ghost" style={{width:'100%', justifyContent:'center'}} onClick={()=>alert('You\'ll be notified when this round opens.')}>Notify me when open</button>
            ) : (
              <button className="btn btn-ghost" disabled style={{width:'100%', justifyContent:'center', opacity:0.5}}>Round closed</button>
            )}
            <Link to="/funding/adviser" className="btn btn-ghost" style={{marginTop:12, width:'100%', justifyContent:'center'}}>Speak with an adviser →</Link>
          </aside>
        </div>
      </section>
    </>
  );
}

function ApplyFlow() {
  const query = parseHashQuery();
  const oppId = query.opp || 'general';
  const opp = window.OPPORTUNITIES.find(o => o.id === oppId);
  const existing = getDraft(oppId);
  const [step, setStep] = useState(existing?.step ?? 0);
  const [form, setForm] = useState(existing?.form || { legalName:'', practiceName:'', email:'', region:'', iwi:'', projectTitle:'', projectDesc:'', projectStory:'', startDate:'', endDate:'', reach:'' });
  const upd = (k,v) => setForm(f => ({...f, [k]: v}));
  const steps = ['Eligibility','About you','Your project','Budget','Review'];

  const handleSaveDraft = () => {
    saveDraft(oppId, { step, form, oppTitle: opp?.title || 'Application' });
    window.dispatchEvent(new Event('cnz-drafts-updated'));
    showToast('Your application has been saved as a draft.');
    setTimeout(() => { window.location.hash = '/funding/opportunities'; window.scrollTo({top:0}); }, 900);
  };
  const handleSubmit = () => {
    const all = loadDrafts(); delete all[oppId]; localStorage.setItem(DRAFTS_KEY, JSON.stringify(all));
    window.dispatchEvent(new Event('cnz-drafts-updated'));
    alert('Application submitted (demo).');
    window.location.hash = '/funding/opportunities';
  };

  return (
    <>
      <Crumbs trail={[{label:'Home',path:'/'},{label:'Funding',path:'/funding'},{label:opp?.title || 'Apply', path: opp ? `/funding/opportunity/${opp.id}` : '/funding'},{label:'Apply'}]} />
      <section className="section">
        <div className="container" style={{maxWidth:960}}>
          <span className="eyebrow">Application · Save anytime{existing && ' · Resuming draft'}</span>
          <h1 style={{marginTop:16, marginBottom:8}}>{opp ? opp.title : 'Start your application.'}</h1>
          {opp && <p style={{color:'var(--muted)', margin:0, marginBottom:32, fontSize:15}}>{opp.amount} · Next round: {opp.next}</p>}
          {!opp && <div style={{marginBottom:32}}></div>}
          <div className="stepper">
            {steps.map((s, i) => (
              <div key={i} className={`step ${i===step?'active':i<step?'done':''}`} onClick={()=>setStep(i)}>
                <span className="num">Step {i+1}</span>{s}
              </div>
            ))}
          </div>
          {step === 0 && (
            <div>
              <h3 style={{marginBottom:24}}>Let's check this fund's right for you.</h3>
              <div style={{display:'flex', flexDirection:'column', gap:14, maxWidth:680}}>
                {[
                  'I am applying as an individual, group or organisation based in Aotearoa NZ',
                  'My project has a clear artistic purpose and audience',
                  'I have not received CNZ funding for the same activity in the last 12 months',
                  'I have read the assessment criteria for this fund',
                ].map((q, i) => (
                  <label key={i} style={{display:'flex', gap:14, padding:18, border:'1px solid var(--line)', borderRadius:'var(--r-md)', cursor:'pointer', alignItems:'center'}}>
                    <input type="checkbox" defaultChecked={i<2} /> <span>{q}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
          {step === 1 && (
            <div className="form-step">
              <div className="field"><label>Legal name</label><input value={form.legalName} onChange={e=>upd('legalName',e.target.value)}/></div>
              <div className="field"><label>Artist / practice name</label><input value={form.practiceName} onChange={e=>upd('practiceName',e.target.value)}/></div>
              <div className="field full"><label>Email</label><input type="email" value={form.email} onChange={e=>upd('email',e.target.value)}/></div>
              <div className="field"><label>Region</label><select value={form.region} onChange={e=>upd('region',e.target.value)}><option>Te Whanganui-a-Tara · Wellington</option><option>Tāmaki Makaurau · Auckland</option><option>Ōtautahi · Christchurch</option><option>Other</option></select></div>
              <div className="field"><label>Iwi / heritage (optional)</label><input value={form.iwi} onChange={e=>upd('iwi',e.target.value)}/></div>
              <div className="field full"><label>Artform</label>
                <div style={{display:'flex', gap:8, flexWrap:'wrap', marginTop:6}}>{window.FILTERS.artform.map(a=><button key={a} type="button" className="pill" onClick={(e)=>e.target.classList.toggle('on')}>{a}</button>)}</div>
              </div>
            </div>
          )}
          {step === 2 && (
            <div className="form-step">
              <div className="field full"><label>Project title</label><input value={form.projectTitle} onChange={e=>upd('projectTitle',e.target.value)}/></div>
              <div className="field full"><label>One-sentence description</label><input placeholder="Describe your project in one sentence" value={form.projectDesc} onChange={e=>upd('projectDesc',e.target.value)}/><div className="hint">This appears on the public list of funded projects if successful.</div></div>
              <div className="field full"><label>Tell us about your project (max 500 words)</label><textarea rows={8} value={form.projectStory} onChange={e=>upd('projectStory',e.target.value)}/></div>
              <div className="field"><label>Start date</label><input type="date" value={form.startDate} onChange={e=>upd('startDate',e.target.value)}/></div>
              <div className="field"><label>End date</label><input type="date" value={form.endDate} onChange={e=>upd('endDate',e.target.value)}/></div>
              <div className="field full"><label>Who will this work reach?</label><textarea rows={4} value={form.reach} onChange={e=>upd('reach',e.target.value)}/></div>
            </div>
          )}
          {step === 3 && (
            <div>
              <h3 style={{marginBottom:24}}>Your budget</h3>
              <table style={{width:'100%', borderCollapse:'collapse'}}>
                <thead><tr style={{borderBottom:'1px solid var(--line)'}}><th style={{textAlign:'left', padding:'12px 0', fontSize:12, letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--muted)', fontWeight:600}}>Line item</th><th style={{textAlign:'right', padding:'12px 0', fontSize:12, letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--muted)', fontWeight:600, width:140}}>Cost (NZD)</th></tr></thead>
                <tbody>
                  {['Artist fees','Materials','Production','Venue / travel','Marketing','Other'].map(line=>(
                    <tr key={line} style={{borderBottom:'1px solid var(--line)'}}>
                      <td style={{padding:'14px 0'}}><input placeholder={line} style={{border:'none', background:'transparent', fontSize:15, fontFamily:'inherit', color:'var(--ink)', width:'100%', outline:'none'}}/></td>
                      <td style={{padding:'14px 0'}}><input style={{width:'100%', border:'none', background:'transparent', fontSize:15, fontFamily:'var(--font-mono)', color:'var(--ink)', textAlign:'right', outline:'none'}} placeholder="0"/></td>
                    </tr>
                  ))}
                  <tr><td style={{padding:'18px 0', fontFamily:'var(--font-display)', fontSize:18}}>Total requested</td><td style={{padding:'18px 0', textAlign:'right', fontFamily:'var(--font-display)', fontSize:22, fontStyle:'italic'}}>$24,500</td></tr>
                </tbody>
              </table>
            </div>
          )}
          {step === 4 && (
            <div>
              <h3 style={{marginBottom:24}}>Review & submit</h3>
              <p style={{color:'var(--muted)', marginBottom:32}}>Please review the information you've entered. You can return to any step to make changes before submitting.</p>
              <div style={{display:'flex', flexDirection:'column', gap:16}}>
                {steps.slice(0,4).map((s,i)=>(
                  <div key={i} style={{padding:20, border:'1px solid var(--line)', borderRadius:'var(--r-md)', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                    <div><div style={{fontFamily:'var(--font-display)', fontSize:18}}>{s}</div><div style={{fontSize:13, color:'var(--muted)', marginTop:2}}>Complete</div></div>
                    <button className="btn-link" onClick={()=>setStep(i)}>Edit →</button>
                  </div>
                ))}
              </div>
              <div style={{marginTop:32, padding:24, background:'var(--paper)', borderRadius:'var(--r-md)'}}>
                <label style={{display:'flex', gap:12, alignItems:'start', cursor:'pointer'}}>
                  <input type="checkbox" style={{marginTop:4}}/>
                  <span style={{fontSize:14}}>I confirm the information in this application is accurate, and I have read CNZ's funding terms and privacy policy.</span>
                </label>
              </div>
            </div>
          )}
          <div style={{display:'flex', justifyContent:'space-between', marginTop:48, paddingTop:32, borderTop:'1px solid var(--line)'}}>
            <button className="btn btn-ghost" disabled={step===0} onClick={()=>setStep(s=>Math.max(0,s-1))}>← Back</button>
            <div style={{display:'flex', gap:12}}>
              <button className="btn btn-ghost" onClick={handleSaveDraft}>Save draft</button>
              {step < steps.length - 1 ? <button className="btn btn-primary" onClick={()=>setStep(s=>s+1)}>Continue →</button>
                : <button className="btn btn-accent" onClick={handleSubmit}>Submit application →</button>}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function FundingCalendar() {
  const months = ['May 2026','Jun 2026','Jul 2026','Aug 2026','Sep 2026','Oct 2026'];
  return (
    <>
      <Crumbs trail={[{label:'Home',path:'/'},{label:'Funding',path:'/funding'},{label:'Calendar'}]} />
      <section className="page-head"><div className="container"><span className="eyebrow">Funding calendar</span><h1 style={{marginTop:16}}>What's coming up.</h1><p className="lede">Plan ahead — every published round and deadline at a glance.</p></div></section>
      <section className="section"><div className="container">
        <div style={{display:'grid', gridTemplateColumns:'200px 1fr', gap:0}}>
          {months.map((m, mi) => (
            <React.Fragment key={m}>
              <div style={{padding:'24px 16px 24px 0', borderTop:'1px solid var(--line)', borderRight:'1px solid var(--line)', fontFamily:'var(--font-display)', fontSize:24, fontStyle:'italic'}}>{m}</div>
              <div style={{padding:'24px 0 24px 24px', borderTop:'1px solid var(--line)', display:'flex', flexDirection:'column', gap:14}}>
                {window.OPPORTUNITIES.filter(o=>o.next.includes(m.split(' ')[0]) || (mi===0 && o.next==='Open year-round')).map(o=>(
                  <Link to={`/funding/opportunity/${o.id}`} key={o.id} style={{display:'flex', gap:16, alignItems:'center', padding:'12px 16px', background:'var(--paper)', borderRadius:'var(--r-md)', cursor:'pointer'}}>
                    <span style={{fontFamily:'var(--font-mono)', fontSize:11, color:'var(--muted)', width:60}}>{o.code}</span>
                    <span style={{fontWeight:500, flex:1}}>{o.title}</span>
                    <span style={{fontSize:13, color:'var(--muted)'}}>{o.next}</span>
                    <span style={{color:'var(--accent-2)'}}>→</span>
                  </Link>
                ))}
                {window.OPPORTUNITIES.filter(o=>o.next.includes(m.split(' ')[0]) || (mi===0 && o.next==='Open year-round')).length===0 && <span style={{color:'var(--muted)', fontSize:14}}>Nothing scheduled.</span>}
              </div>
            </React.Fragment>
          ))}
        </div>
      </div></section>
    </>
  );
}

function FundingResults() {
  const fundedProjects = [
    {amt:'$65,000', recip:'Whetūrangi Theatre Collective', proj:'A new bilingual work for the 2027 Auckland Arts Festival', region:'Tāmaki Makaurau'},
    {amt:'$24,500', recip:'Mereana Hudson', proj:'Solo painting exhibition exploring whakapapa through landscape', region:'Te Whanganui-a-Tara'},
    {amt:'$18,000', recip:'Pasifika Sound Lab', proj:'Album of contemporary Pacific electronic music', region:'Tāmaki Makaurau'},
    {amt:'$40,000', recip:'Te Pou o Mangataawhiri', proj:'Touring kapa haka education programme to ten regional centres', region:'Waikato'},
    {amt:'$22,000', recip:'Christchurch Symphonia', proj:'Commissioned suite from emerging composer Aroha Tikao', region:'Ōtautahi'},
    {amt:'$12,000', recip:'Sina Latu', proj:'Tongan dance documentary, premiering at NZIFF 2026', region:'Auckland'},
  ];
  return (
    <>
      <Crumbs trail={[{label:'Home',path:'/'},{label:'Funding',path:'/funding'},{label:'Results'}]} />
      <section className="page-head"><div className="container"><span className="eyebrow">Hua · Funded projects</span><h1 style={{marginTop:16}}>Recent results.</h1><p className="lede">A selection of recently funded projects across Aotearoa.</p></div></section>
      <section className="section"><div className="container">
        <table style={{width:'100%', borderCollapse:'collapse'}}>
          <thead><tr style={{borderBottom:'1px solid var(--line)'}}>{['Amount','Recipient','Project','Region',''].map(h=><th key={h} style={{textAlign:'left', padding:'14px 12px', fontSize:11, letterSpacing:'0.12em', textTransform:'uppercase', color:'var(--muted)', fontWeight:600}}>{h}</th>)}</tr></thead>
          <tbody>{fundedProjects.map((r,i)=>(
            <tr key={i} style={{borderBottom:'1px solid var(--line)'}}>
              <td style={{padding:'18px 12px', fontFamily:'var(--font-display)', fontSize:18, fontStyle:'italic'}}>{r.amt}</td>
              <td style={{padding:'18px 12px', fontWeight:500}}>{r.recip}</td>
              <td style={{padding:'18px 12px', color:'var(--ink-2)', fontSize:14, maxWidth:480}}>{r.proj}</td>
              <td style={{padding:'18px 12px', color:'var(--muted)', fontSize:13}}>{r.region}</td>
              <td style={{padding:'18px 12px', color:'var(--accent-2)'}}>→</td>
            </tr>
          ))}</tbody>
        </table>
        <div style={{marginTop:32, textAlign:'center'}}><button className="btn btn-ghost">Load more results</button></div>
      </div></section>
    </>
  );
}

function FundingAdvice() {
  const topics = [
    {
      t: 'Eligibility',
      d: 'Are you eligible? Read the criteria carefully. Most funds are for individuals or organisations based in Aotearoa, but each fund has its own specifics.',
      links: [
        { label: 'Browse all opportunities', to: '/funding/opportunities' },
        { label: 'Early career criteria', to: '/funding/early-career' },
        { label: 'Organisation criteria', to: '/funding/organisations' },
      ],
    },
    {
      t: 'Evidence of work',
      d: 'We need to see what you make. Provide links to recordings, photos, scripts, exhibition documentation — whatever shows your practice.',
      links: [
        { label: 'See recently funded projects', to: '/funding/results' },
        { label: 'Speak with an adviser', to: '/funding/adviser' },
      ],
    },
    {
      t: 'Budgets',
      d: 'Be realistic. Include artist fees, production costs, materials, marketing, contingency. Underbudgeting is one of the most common reasons for declined applications.',
      links: [
        { label: 'Sustainable careers resources', to: '/resources' },
        { label: 'Donations Toolkit', to: '/resources' },
        { label: 'Book a budget kōrero', to: '/funding/adviser' },
      ],
    },
    {
      t: 'Letters of support',
      d: 'Letters from collaborators, presenters, mentors, or community partners help us understand the wider context of your work.',
      links: [
        { label: 'Volunteer Management Toolkit', to: '/resources' },
        { label: 'Get advice from an adviser', to: '/funding/adviser' },
      ],
    },
    {
      t: 'Te Tiriti & cultural protocols',
      d: 'If your project engages with Māori or Pacific communities, knowledge or imagery, tell us how you\'re working with the right people in the right way.',
      links: [
        { label: 'Ngā Toi Māori', to: '/toi-maori' },
        { label: 'Toi Pasifika', to: '/toi-pasifika' },
        { label: 'Speak with a kaitohutohu', to: '/funding/adviser' },
      ],
    },
    {
      t: 'Accessibility',
      d: 'Tell us how you\'re thinking about access for d/Deaf, disabled, neurodivergent or otherwise underserved audiences.',
      links: [
        { label: 'Research & reports', to: '/resources' },
        { label: 'Discuss your access plan', to: '/funding/adviser' },
      ],
    },
  ];
  return (
    <>
      <Crumbs trail={[{label:'Home',path:'/'},{label:'Funding',path:'/funding'},{label:'Advice'}]} />
      <section className="page-head"><div className="container"><span className="eyebrow">Tohutohu</span><h1 style={{marginTop:16}}>Advice & support.</h1><p className="lede">Things worth knowing before you put pen to application — with somewhere to go for each one.</p></div></section>
      <section className="section"><div className="container" style={{display:'grid', gridTemplateColumns:'repeat(2, 1fr)', gap:32}}>
        {topics.map(({t,d,links})=>(
          <div key={t} style={{padding:32, background:'var(--paper)', borderRadius:'var(--r-md)', display:'flex', flexDirection:'column'}}>
            <h3 style={{fontSize:22, marginBottom:12}}>{t}</h3>
            <p style={{color:'var(--muted)', margin:0, lineHeight:1.6, marginBottom:20}}>{d}</p>
            <div style={{marginTop:'auto', paddingTop:20, borderTop:'1px solid var(--line)', display:'flex', flexDirection:'column', gap:10}}>
              <div style={{fontSize:11, letterSpacing:'0.12em', textTransform:'uppercase', color:'var(--muted)', fontWeight:600, marginBottom:4}}>Where to next</div>
              {links.map((l,i)=>(
                <Link key={i} to={l.to} className="btn-link" style={{alignSelf:'start'}}>{l.label} →</Link>
              ))}
            </div>
          </div>
        ))}
      </div></section>
      <section className="section-tight" style={{background:'var(--ink)', color:'var(--bg)'}}>
        <div className="container" style={{display:'grid', gridTemplateColumns:'1.4fr 1fr', gap:48, alignItems:'center'}}>
          <div>
            <span className="eyebrow" style={{color:'var(--kowhai)'}}>Kanohi ki te kanohi</span>
            <h2 style={{marginTop:14, marginBottom:14, color:'var(--bg)'}}>Still have questions? Book an in-person kōrero.</h2>
            <p style={{margin:0, opacity:0.8, fontSize:17, lineHeight:1.6, maxWidth:560}}>Our funding advisers offer free 30-minute conversations — kanohi ki te kanohi at one of our offices, online, or by phone. They can talk through your project, your budget, your eligibility, and what would strengthen your application.</p>
          </div>
          <div style={{display:'flex', flexDirection:'column', gap:12}}>
            <Link to="/funding/adviser" className="btn btn-accent" style={{justifyContent:'center'}}>Book a kōrero with an adviser →</Link>
            <Link to="/about/contact" className="btn btn-ghost" style={{justifyContent:'center', borderColor:'rgba(255,255,255,0.3)', color:'var(--bg)'}}>Other ways to get in touch →</Link>
          </div>
        </div>
      </section>
    </>
  );
}

function AwardsPage() {
  const winners = [
    {cat:'Lifetime Achievement', name:'Igelese Ete', kupu:'Mōhiotanga', desc:'Composer, conductor and educator — for decades of work shaping Pacific music in Aotearoa and beyond.'},
    {cat:'Contemporary Pacific Art', name:'Yuki Kihara', desc:'For continued international leadership in contemporary fa\'afafine and Sāmoan visual practice.'},
    {cat:'Senior Pacific Artist', name:'Daren Kamali', desc:'Fijian-Aotearoa poet and storyteller, recognised for sustained contribution to Pacific literature.'},
    {cat:'Emerging Pacific Artist', name:'Sēini Taumoepeau', desc:'Tongan-Sāmoan filmmaker whose first feature premiered to acclaim at the 2025 Festival.'},
  ];
  return (
    <>
      <Crumbs trail={[{label:'Home',path:'/'},{label:'Funding',path:'/funding'},{label:'Awards'}]} />
      <section className="page-head" style={{position:'relative'}}>
        <MotifCorner position="tr" size={300} color="var(--pohutukawa)" opacity={0.15}/>
        <div className="container"><span className="eyebrow">Ngā tohu</span><h1 style={{marginTop:16}}>Arts Pasifika Awards 2026.</h1><p className="lede">Honouring twelve recipients across lifetime achievement, emerging talent and contribution to community.</p></div>
      </section>
      <section className="section"><div className="container" style={{display:'flex', flexDirection:'column', gap:0}}>
        {winners.map((w,i)=>(
          <div key={i} style={{display:'grid', gridTemplateColumns:'180px 1fr 200px', gap:32, padding:'40px 0', borderTop:'1px solid var(--line)'}}>
            <div className="eyebrow" style={{borderBottom:'none', alignSelf:'start'}}>{w.cat}</div>
            <div><h2 style={{fontSize:36, marginBottom:8}}>{w.name}</h2>{w.kupu && <p className="kupu" style={{fontSize:16, marginBottom:14}}>{w.kupu}</p>}<p style={{fontSize:16, lineHeight:1.6, color:'var(--ink-2)', maxWidth:680, margin:0}}>{w.desc}</p></div>
            <div style={{textAlign:'right', fontFamily:'var(--font-display)', fontSize:48, fontStyle:'italic', color:'var(--accent-2)'}}>{String(i+1).padStart(2,'0')}</div>
          </div>
        ))}
      </div></section>
    </>
  );
}

function AdviserPage() {
  return (
    <>
      <Crumbs trail={[{label:'Home',path:'/'},{label:'Funding',path:'/funding'},{label:'Speak with an adviser'}]} />
      <section className="page-head"><div className="container" style={{maxWidth:880}}><span className="eyebrow">Free, 30 minute kōrero</span><h1 style={{marginTop:16}}>Speak with an adviser.</h1><p className="lede">Our funding advisers can help you understand if a fund is right for you, talk through your project, and answer questions about applying.</p></div></section>
      <section className="section"><div className="container" style={{maxWidth:880}}>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:24, marginBottom:48}}>
          {[
            {name:'Hinemoa Tareha', region:'Te Whanganui-a-Tara', specialty:'Ngā Toi Māori, theatre, dance', avail:'Mon, Wed'},
            {name:'Tomasi Ulufale', region:'Tāmaki Makaurau', specialty:'Toi Pasifika, music, multi-disciplinary', avail:'Tue, Thu'},
            {name:'Sarah Mitchell', region:'Ōtautahi', specialty:'Visual arts, craft, literature', avail:'Mon, Fri'},
            {name:'Aroha Patterson', region:'Remote', specialty:'Early career, regional artists', avail:'All week'},
          ].map((a,i)=>(
            <div key={i} className="card" style={{cursor:'pointer'}}>
              <div className="card-body">
                <h3 style={{fontSize:20, marginBottom:6}}>{a.name}</h3>
                <p style={{fontSize:13, color:'var(--muted)', margin:0, marginBottom:14}}>{a.region}</p>
                <p style={{fontSize:14, color:'var(--ink-2)', margin:0, marginBottom:14}}>Specialty: {a.specialty}</p>
                <p style={{fontSize:13, color:'var(--muted)', margin:0}}>Available {a.avail}</p>
                <button className="btn btn-ghost" style={{marginTop:18}}>Book a kōrero →</button>
              </div>
            </div>
          ))}
        </div>
      </div></section>
    </>
  );
}

window.FundingHub = FundingHub;
window.FundingTier = FundingTier;
window.Opportunities = Opportunities;
window.OpportunityDetail = OpportunityDetail;
window.ApplyFlow = ApplyFlow;
window.FundingCalendar = FundingCalendar;
window.FundingResults = FundingResults;
window.FundingAdvice = FundingAdvice;
window.AwardsPage = AwardsPage;
window.AdviserPage = AdviserPage;
