// Advocacy, Resources, About, News, Search, Contact, Council, Toi Maori/Pasifika
const { Link, MotifCorner, useRouter } = window;

function NewsIndex() {
  const [cat, setCat] = useState('all');
  const cats = ['all', ...Array.from(new Set(window.STORIES.map(s=>s.cat)))];
  const filtered = cat === 'all' ? window.STORIES : window.STORIES.filter(s=>s.cat===cat);
  return (
    <>
      <section className="page-head"><div className="container"><span className="eyebrow">Pitopito kōrero</span><h1 style={{marginTop:16}}>News & blog.</h1><p className="lede">Sector updates, opportunities, research and reflections from across Aotearoa.</p></div></section>
      <section className="section-tight" style={{borderBottom:'1px solid var(--line)'}}>
        <div className="container" style={{display:'flex', gap:8, flexWrap:'wrap'}}>
          {cats.map(c => <button key={c} className={`pill ${cat===c?'on':''}`} onClick={()=>setCat(c)}>{c}</button>)}
        </div>
      </section>
      <section className="section"><div className="container">
        <div className="news-grid">
          {filtered.map((s,i)=>(
            <Link key={s.id} to={`/news/${s.id}`} className={`ncard ${i===0?'news-feature':''}`}>
              <div className="ncard-img"><img src={s.img} alt=""/></div>
              <div className="cat">{s.cat}{s.kupu?` · ${s.kupu}`:''}</div>
              <h3>{s.title}</h3>
              {i===0 && <p>{s.excerpt}</p>}
              <div className="date">{s.date} · {s.read} read</div>
            </Link>
          ))}
        </div>
      </div></section>
    </>
  );
}

function NewsArticle({ id }) {
  const story = window.STORIES.find(s=>s.id===id);
  if (!story) return <div className="container section"><h2>Story not found</h2><Link to="/news" className="btn-link">All news →</Link></div>;
  const related = window.STORIES.filter(s=>s.id!==id).slice(0,3);
  return (
    <>
      <Crumbs trail={[{label:'Home',path:'/'},{label:'News',path:'/news'},{label:story.cat}]} />
      <article style={{maxWidth:780, margin:'0 auto', padding:'0 var(--pad) 0'}}>
        <div className="cat" style={{fontSize:11, letterSpacing:'0.14em', textTransform:'uppercase', fontWeight:600, color:'var(--accent-2)', marginBottom:16}}>{story.cat}{story.kupu?` · ${story.kupu}`:''}</div>
        <h1 style={{fontSize:'clamp(36px, 4.5vw, 56px)', marginBottom:24}}>{story.title}</h1>
        <p className="lede">{story.excerpt}</p>
        <div style={{display:'flex', gap:24, fontSize:13, color:'var(--muted)', padding:'24px 0', borderTop:'1px solid var(--line)', borderBottom:'1px solid var(--line)', marginTop:32}}>
          <span>{story.date}</span><span>·</span><span>{story.read} read</span><span>·</span><span>By Creative NZ</span>
        </div>
      </article>
      <div style={{maxWidth:980, margin:'40px auto 0', padding:'0 var(--pad)'}}>
        <div style={{aspectRatio:'16/9', borderRadius:'var(--r-sm)', overflow:'hidden', background:'var(--paper-2)'}}><img src={story.img} alt="" style={{width:'100%', height:'100%', objectFit:'cover'}}/></div>
      </div>
      <article style={{maxWidth:780, margin:'48px auto', padding:'0 var(--pad)', fontSize:18, lineHeight:1.7, color:'var(--ink-2)'}}>
        <p style={{fontFamily:'var(--font-display)', fontSize:24, lineHeight:1.5}}><span style={{fontFamily:'var(--font-display)', fontSize:88, lineHeight:0.8, float:'left', paddingRight:14, paddingTop:8, fontStyle:'italic', color:'var(--accent-2)'}}>{story.excerpt[0]}</span>{story.excerpt.slice(1)}</p>
        <p>The arts continue to play a central role in Aotearoa's identity and wellbeing. As we work alongside artists, ringatoi, organisations and communities across the country, the strength and breadth of practice is remarkable.</p>
        <p>Creative NZ — Toi Aotearoa — invests over $38 million each year into the sector through grants, investment programmes, residencies and fellowships. We also lead advocacy for the arts at every level of government, and develop tools and research to grow the conditions for the arts to thrive.</p>
        <h2 style={{marginTop:48, marginBottom:16}}>What this means</h2>
        <p>This work continues a long whakapapa of Aotearoa's arts being recognised as essential — not optional — to a flourishing society. We acknowledge the artists and communities whose work makes this possible.</p>
        <blockquote style={{margin:'48px 0', padding:'24px 32px', borderLeft:'4px solid var(--accent)', fontFamily:'var(--font-display)', fontSize:22, fontStyle:'italic', lineHeight:1.5, color:'var(--ink)'}}>"The arts give life to the spirit, and the spirit gives life to the people. We're proud to walk alongside this mahi."</blockquote>
        <p>Read more about our funding programmes, advocacy work, and how to get involved.</p>
      </article>
      <section className="section" style={{borderTop:'1px solid var(--line)'}}><div className="container">
        <h3 style={{marginBottom:32}}>Related stories</h3>
        <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:24}}>
          {related.map(r => (
            <Link key={r.id} to={`/news/${r.id}`} className="ncard">
              <div className="ncard-img"><img src={r.img} alt=""/></div>
              <div className="cat">{r.cat}</div>
              <h3 style={{fontSize:18}}>{r.title}</h3>
              <div className="date">{r.date}</div>
            </Link>
          ))}
        </div>
      </div></section>
    </>
  );
}

function AdvocacyPage() {
  return (
    <>
      <section className="page-head"><MotifCorner position="tr" size={300} color="var(--moana)" opacity={0.1}/>
        <div className="container"><span className="eyebrow">Tautoko toi</span><h1 style={{marginTop:16}}>Advocating for the arts.</h1><p className="lede">Speaking up for the value of toi at every level — local, central, sector-wide.</p></div></section>
      <SubNav items={[
        {label:'Overview', path:'/advocacy'},
        {label:'Tools & research', path:'/advocacy/tools'},
        {label:'Our work', path:'/advocacy/work'},
        {label:'Te Rōpū Mana Toi', path:'/advocacy/rōpū'},
      ]}/>
      <section className="section"><div className="container" style={{display:'grid', gridTemplateColumns:'1.4fr 1fr', gap:64}}>
        <div>
          <h2>Why advocacy matters.</h2>
          <p style={{fontSize:18, lineHeight:1.65, color:'var(--ink-2)', marginTop:16}}>Arts are essential to a flourishing Aotearoa — to our identity, our wellbeing, and our economy. We work to make sure decision-makers understand the value of the arts, and that artists and arts organisations have the conditions to thrive.</p>
          <p style={{fontSize:18, lineHeight:1.65, color:'var(--ink-2)'}}>Our advocacy spans research, policy submissions, sector partnerships, and direct engagement with central and local government.</p>
          <div style={{display:'flex', gap:12, marginTop:32}}>
            <Link to="/resources" className="btn btn-primary">Explore tools & toolkits →</Link>
          </div>
        </div>
        <div style={{aspectRatio:'4/5', borderRadius:'var(--r-sm)', overflow:'hidden'}}><img src={window.IMAGES.community} alt="" style={{width:'100%', height:'100%', objectFit:'cover'}}/></div>
      </div></section>
      <section className="stats-band">
        <div className="stats-band-inner">
          <span className="eyebrow" style={{color:'var(--kowhai)'}}>The case for the arts</span>
          <h2 style={{marginTop:24}}>Numbers that matter when we make the case.</h2>
          <div className="stats-grid">
            <div className="stat"><div className="num">$16.4B</div><div className="lbl">Cultural sector contribution to NZ GDP (2024)</div></div>
            <div className="stat"><div className="num">115,000</div><div className="lbl">people employed in cultural occupations</div></div>
            <div className="stat"><div className="num">88%</div><div className="lbl">of NZers say the arts contribute to our identity</div></div>
            <div className="stat"><div className="num">73%</div><div className="lbl">attended an arts event in the past year</div></div>
          </div>
        </div>
      </section>
    </>
  );
}

function ResourcesPage() {
  return (
    <>
      <section className="page-head"><div className="container"><span className="eyebrow">Rauemi · Development & resources</span><h1 style={{marginTop:16}}>Tools, toolkits & research.</h1><p className="lede">Free practical resources for arts workers, organisations and communities.</p></div></section>
      <section className="section"><div className="container">
        <h2 style={{marginBottom:32}}>Toolkits</h2>
        <div style={{display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:24}}>
          {window.TOOLKITS.map(t=>(
            <div key={t.id} className="card" style={{cursor:'pointer'}}>
              <div className="card-body">
                <span className="eyebrow" style={{borderBottom:'none'}}>{t.sections} sections · Free download</span>
                <h3 style={{marginTop:14, marginBottom:8}}>{t.title}</h3>
                {t.kupu && <p className="kupu" style={{marginBottom:12}}>{t.kupu}</p>}
                <p style={{color:'var(--muted)', margin:0, marginBottom:18}}>{t.desc}</p>
                <button className="btn-link">Open toolkit →</button>
              </div>
            </div>
          ))}
        </div>
      </div></section>
      <section className="section" style={{background:'var(--paper)', borderTop:'1px solid var(--line)', borderBottom:'1px solid var(--line)'}}>
        <div className="container">
          <h2 style={{marginBottom:32}}>Reports & research</h2>
          <div style={{display:'flex', flexDirection:'column'}}>
            {window.REPORTS.map((r,i)=>(
              <div key={i} style={{display:'grid', gridTemplateColumns:'80px 1fr 100px 80px', gap:24, alignItems:'center', padding:'24px 0', borderTop:'1px solid var(--line)', cursor:'pointer'}}>
                <div style={{fontFamily:'var(--font-display)', fontSize:28, fontStyle:'italic', color:'var(--accent-2)'}}>{r.year}</div>
                <div><h3 style={{fontSize:20, marginBottom:6}}>{r.title}</h3><p style={{color:'var(--muted)', margin:0, fontSize:14}}>{r.desc}</p></div>
                <div style={{fontSize:13, color:'var(--muted)'}}>PDF · {r.size}</div>
                <div style={{textAlign:'right', color:'var(--accent-2)'}}>↓</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function AboutPage() {
  return (
    <>
      <section className="page-head"><MotifCorner position="tr" size={300} color="var(--bush)" opacity={0.1}/>
        <div className="container"><span className="eyebrow">Mō mātou · About</span><h1 style={{marginTop:16}}>Toi Aotearoa is the arts council for New Zealand.</h1><p className="lede">We invest, we advocate, and we develop the conditions for the arts to thrive — across every region, every artform, and every stage of practice.</p></div></section>
      <SubNav items={[
        {label:'What we do', path:'/about/what-we-do'},
        {label:'Vision & values', path:'/about/vision'},
        {label:'Council', path:'/about/council'},
        {label:'Team', path:'/about/team'},
        {label:'Documents', path:'/about/documents'},
        {label:'Careers', path:'/about/careers'},
        {label:'Contact', path:'/about/contact'},
      ]}/>
      <section className="section"><div className="container" style={{display:'grid', gridTemplateColumns:'1fr 2fr', gap:64}}>
        <h2>What we do</h2>
        <div style={{display:'flex', flexDirection:'column', gap:32}}>
          {[
            ['01','Invest','We invest over $38 million annually in artists, ringatoi and arts organisations through grants, investment programmes, residencies and fellowships.'],
            ['02','Advocate','We make the case for the arts to government, councils, funders and communities — backed by research and the voices of the sector.'],
            ['03','Develop','We grow the sector through strategy, research, toolkits and the development of artistic and organisational capability.'],
            ['04','Honour','Through Te Kāhui Toi Māori and Te Kāhui Toi Pasifika, we honour ngā toi Māori and Toi Pasifika as essential to the cultural fabric of Aotearoa.'],
          ].map(([n,t,d])=>(
            <div key={n} style={{display:'grid', gridTemplateColumns:'80px 1fr', gap:24, paddingBottom:24, borderBottom:'1px solid var(--line)'}}>
              <div style={{fontFamily:'var(--font-display)', fontSize:40, fontStyle:'italic', color:'var(--accent-2)'}}>{n}</div>
              <div><h3 style={{fontSize:24, marginBottom:8}}>{t}</h3><p style={{color:'var(--ink-2)', margin:0, lineHeight:1.6}}>{d}</p></div>
            </div>
          ))}
        </div>
      </div></section>
    </>
  );
}

function CouncilPage() {
  return (
    <>
      <Crumbs trail={[{label:'Home',path:'/'},{label:'About',path:'/about'},{label:'Council'}]} />
      <section className="page-head"><div className="container"><span className="eyebrow">Te Kaunihera · Our Council</span><h1 style={{marginTop:16}}>The Arts Council.</h1><p className="lede">The Arts Council of New Zealand Toi Aotearoa is appointed by the Minister for Arts, Culture and Heritage. The Council provides governance and strategic leadership.</p></div></section>
      <section className="section"><div className="container">
        <div className="people-grid">
          {window.COUNCIL.map((p,i)=>(
            <div key={i} className="person">
              <div className="photo" style={{background: ['var(--kowhai)','var(--pohutukawa)','var(--moana)','var(--bush)','var(--sand)','var(--siapo)','var(--kowhai-deep)','var(--paper-2)'][i%8]}}>
                <span style={{color:'#fff', mixBlendMode:'overlay', fontSize:64}}>{p.name.split(' ').map(s=>s[0]).slice(0,2).join('')}</span>
              </div>
              <h4>{p.name}</h4>
              <div className="role">{p.role}</div>
              {p.iwi && <div style={{fontSize:12, color:'var(--accent-2)', marginTop:-4, marginBottom:6}}>{p.iwi}</div>}
              <p>{p.bio}</p>
            </div>
          ))}
        </div>
      </div></section>
    </>
  );
}

function ContactPage() {
  return (
    <>
      <Crumbs trail={[{label:'Home',path:'/'},{label:'About',path:'/about'},{label:'Contact'}]} />
      <section className="page-head"><div className="container"><span className="eyebrow">Whakapā mai</span><h1 style={{marginTop:16}}>Contact us.</h1><p className="lede">Get in touch — we're here to help.</p></div></section>
      <section className="section"><div className="container" style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:64}}>
        <div>
          <h3 style={{fontSize:24, marginBottom:14}}>Wellington — Te Whanganui-a-Tara</h3>
          <p style={{color:'var(--ink-2)', margin:0, lineHeight:1.7}}>Level 2, 191 Thorndon Quay<br/>Pipitea, Wellington 6011<br/>PO Box 3806, Wellington 6140<br/><br/>+64 4 473 0880<br/>0800 432 248 (NZ only)<br/>info@creativenz.govt.nz</p>
          <h3 style={{fontSize:24, marginTop:48, marginBottom:14}}>Auckland — Tāmaki Makaurau</h3>
          <p style={{color:'var(--ink-2)', margin:0, lineHeight:1.7}}>Level 7, 25 Wyndham Street<br/>Auckland Central, Auckland 1010<br/><br/>+64 9 373 3066</p>
          <h3 style={{fontSize:24, marginTop:48, marginBottom:14}}>Christchurch — Ōtautahi</h3>
          <p style={{color:'var(--ink-2)', margin:0, lineHeight:1.7}}>By appointment.<br/>Contact our Wellington office.</p>
        </div>
        <div style={{padding:32, background:'var(--paper)', borderRadius:'var(--r-md)'}}>
          <h3 style={{fontSize:24, marginBottom:24}}>Send us a message</h3>
          <div className="form-step" style={{gridTemplateColumns:'1fr', gap:18}}>
            <div className="field"><label>Name</label><input/></div>
            <div className="field"><label>Email</label><input type="email"/></div>
            <div className="field"><label>Topic</label><select><option>General enquiry</option><option>Funding</option><option>Media</option><option>Accessibility</option><option>Privacy</option></select></div>
            <div className="field"><label>Message</label><textarea rows={6}/></div>
            <button className="btn btn-primary" style={{justifyContent:'center'}}>Send message →</button>
          </div>
        </div>
      </div></section>
    </>
  );
}

function ToiMaoriPage() {
  return (
    <>
      <section className="page-head" style={{background:'var(--paper)', borderBottom:'1px solid var(--line)'}}>
        <MotifCorner position="tr" size={400} color="var(--bush)" opacity={0.12}/>
        <MotifCorner position="bl" size={300} color="var(--pohutukawa)" opacity={0.1}/>
        <div className="container"><span className="eyebrow">Ngā Toi Māori</span><h1 style={{marginTop:16}}>Honouring ngā toi Māori.</h1><p className="lede">Te Kāhui Toi Māori champions Māori arts as living, dynamic and essential to the identity of Aotearoa.</p></div>
      </section>
      <section className="section"><div className="container" style={{display:'grid', gridTemplateColumns:'1.2fr 1fr', gap:64, alignItems:'center'}}>
        <div>
          <h2>Te Hā o ngā Toi.</h2>
          <p style={{fontSize:18, lineHeight:1.65, color:'var(--ink-2)', marginTop:16}}>Te Hā o ngā Toi is our long-term strategy for ngā toi Māori. It guides our investment, advocacy and development work, and is led by Te Kāhui Toi Māori — our Māori arts council.</p>
          <p style={{fontSize:18, lineHeight:1.65, color:'var(--ink-2)'}}>Through Te Waka Toi, we recognise excellence in Māori arts annually with awards that celebrate emerging and established practice.</p>
          <div style={{display:'flex', gap:12, marginTop:32}}>
            <Link to="/funding/awards" className="btn btn-primary">Te Waka Toi Awards →</Link>
            <Link to="/resources/reports" className="btn btn-ghost">Read the strategy</Link>
          </div>
        </div>
        <div style={{aspectRatio:'4/5', borderRadius:'var(--r-sm)', overflow:'hidden'}}><img src={window.IMAGES.carving} alt="" style={{width:'100%', height:'100%', objectFit:'cover'}}/></div>
      </div></section>
    </>
  );
}

function ToiPasifikaPage() {
  return (
    <>
      <section className="page-head" style={{background:'var(--paper)', borderBottom:'1px solid var(--line)'}}>
        <MotifCorner position="tr" size={400} color="var(--moana)" opacity={0.12}/>
        <MotifCorner position="bl" size={300} color="var(--kowhai)" opacity={0.1}/>
        <div className="container"><span className="eyebrow">Toi Pasifika</span><h1 style={{marginTop:16}}>Honouring Toi Pasifika.</h1><p className="lede">Te Kāhui Toi Pasifika champions Pacific arts in Aotearoa — across the diversity of Pacific peoples, languages, and creative practices.</p></div>
      </section>
      <section className="section"><div className="container" style={{display:'grid', gridTemplateColumns:'1.2fr 1fr', gap:64, alignItems:'center'}}>
        <div>
          <h2>Pacific arts strategy.</h2>
          <p style={{fontSize:18, lineHeight:1.65, color:'var(--ink-2)', marginTop:16}}>Our Pacific arts strategy guides our work with Sāmoan, Tongan, Cook Islands Māori, Niuean, Tokelauan, Fijian, Tuvaluan, Kiribati and Pacific diaspora artists and communities.</p>
          <p style={{fontSize:18, lineHeight:1.65, color:'var(--ink-2)'}}>The Arts Pasifika Awards are a highlight of our calendar — honouring lifetime achievement, contemporary practice, and emerging Pacific artists.</p>
          <div style={{display:'flex', gap:12, marginTop:32}}>
            <Link to="/funding/awards" className="btn btn-primary">Arts Pasifika Awards →</Link>
            <Link to="/funding/opportunity/pacific-heritage" className="btn btn-ghost">Heritage Fund</Link>
          </div>
        </div>
        <div style={{aspectRatio:'4/5', borderRadius:'var(--r-sm)', overflow:'hidden'}}><img src={window.IMAGES.pasifika} alt="" style={{width:'100%', height:'100%', objectFit:'cover'}}/></div>
      </div></section>
    </>
  );
}

function SearchPage() {
  const [q, setQ] = useState('');
  const ql = q.toLowerCase().trim();
  const opps = ql ? window.OPPORTUNITIES.filter(o=>(o.title+o.desc+(o.kupu||'')).toLowerCase().includes(ql)) : [];
  const stories = ql ? window.STORIES.filter(s=>(s.title+s.excerpt+s.cat).toLowerCase().includes(ql)) : [];
  return (
    <>
      <section className="section">
        <div className="container" style={{maxWidth:880}}>
          <span className="eyebrow">Rapu</span>
          <h1 style={{marginTop:16, marginBottom:24}}>Search.</h1>
          <div className="searchbar">
            <span style={{fontSize:18, color:'var(--muted)'}}>⌕</span>
            <input autoFocus value={q} onChange={e=>setQ(e.target.value)} placeholder="Search funds, news, people, toolkits..."/>
          </div>
          {ql && (
            <div style={{marginTop:48}}>
              <h2 style={{marginBottom:24}}>{opps.length + stories.length} results for "{q}"</h2>
              {opps.length > 0 && <><h3 style={{fontSize:14, color:'var(--muted)', textTransform:'uppercase', letterSpacing:'0.12em', marginBottom:14}}>Funding ({opps.length})</h3>
                <div style={{marginBottom:48}}>{opps.slice(0,5).map(o=>(<Link key={o.id} to={`/funding/opportunity/${o.id}`} style={{display:'block', padding:'18px 0', borderBottom:'1px solid var(--line)'}}>
                  <div style={{display:'flex', justifyContent:'space-between'}}><div><div style={{fontFamily:'var(--font-display)', fontSize:20}}>{o.title}</div><div style={{color:'var(--muted)', fontSize:14, marginTop:2}}>{o.desc}</div></div><div style={{color:'var(--accent-2)'}}>→</div></div>
                </Link>))}</div></>}
              {stories.length > 0 && <><h3 style={{fontSize:14, color:'var(--muted)', textTransform:'uppercase', letterSpacing:'0.12em', marginBottom:14}}>News ({stories.length})</h3>
                <div>{stories.slice(0,5).map(s=>(<Link key={s.id} to={`/news/${s.id}`} style={{display:'block', padding:'18px 0', borderBottom:'1px solid var(--line)'}}>
                  <div style={{display:'flex', justifyContent:'space-between'}}><div><div style={{fontSize:11, letterSpacing:'0.12em', textTransform:'uppercase', color:'var(--accent-2)', fontWeight:600, marginBottom:4}}>{s.cat}</div><div style={{fontFamily:'var(--font-display)', fontSize:20}}>{s.title}</div></div><div style={{color:'var(--accent-2)'}}>→</div></div>
                </Link>))}</div></>}
              {opps.length===0 && stories.length===0 && <p style={{color:'var(--muted)'}}>No results. Try another term.</p>}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

window.NewsIndex = NewsIndex; window.NewsArticle = NewsArticle;
window.AdvocacyPage = AdvocacyPage; window.ResourcesPage = ResourcesPage;
window.AboutPage = AboutPage; window.CouncilPage = CouncilPage; window.ContactPage = ContactPage;
window.ToiMaoriPage = ToiMaoriPage; window.ToiPasifikaPage = ToiPasifikaPage;
window.SearchPage = SearchPage;
