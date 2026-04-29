// Home page — refined, restrained, with koru motifs and scroll animations

const { Link } = window;

function Home() {
  const [q, setQ] = useState('');
  const results = useMemo(() => {
    if (!q.trim()) return [];
    const ql = q.toLowerCase();
    return window.OPPORTUNITIES.filter(o =>
      o.title.toLowerCase().includes(ql) || o.desc.toLowerCase().includes(ql) || (o.kupu||'').toLowerCase().includes(ql)
    ).slice(0, 5);
  }, [q]);

  const featuredOpps = window.OPPORTUNITIES.filter(o => o.status === 'open').slice(0, 4);

  return (
    <>
      <div className="banner">
        Round two of the Creative Communities Scheme opens 14 May. <Link to="/funding/opportunities">View all opportunities →</Link>
      </div>

      {/* Hero */}
      <section className="hero">
        <KoruCorner position="tr" size={360} color="var(--kowhai)" opacity={0.14} />
        <div className="container">
          <div className="hero-grid">
            <div>
              <ScrollReveal>
                <span className="eyebrow">Toi Aotearoa · Funding · Advocacy · Development</span>
                <h1 style={{marginTop:24}}>
                  The arts <span className="accent">give life</span> to the spirit, the spirit gives life to the people.
                </h1>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <p className="lede">
                  We invest in artists, ringatoi and arts organisations across Aotearoa — championing toi as part of who we are, and growing the conditions for the arts to thrive.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.15}>
                <div style={{display:'flex', gap:12, flexWrap:'wrap', marginTop:32}}>
                  <MagneticHover strength={0.2}>
                    <Link to="/funding" className="btn btn-primary">Find funding →</Link>
                  </MagneticHover>
                  <MagneticHover strength={0.2}>
                    <Link to="/about/what-we-do" className="btn btn-ghost">What we do</Link>
                  </MagneticHover>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={0.2}>
                <div style={{marginTop:48}}>
                  <span className="eyebrow" style={{marginBottom:12, display:'block'}}>Quick search</span>
                  <div className="searchbar">
                    <span style={{fontSize:18, color:'var(--muted)'}}>⌕</span>
                    <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Try: 'early career', 'Pasifika', 'residency'..." />
                    {q && <button className="pill" onClick={()=>setQ('')}>clear</button>}
                  </div>
                  {results.length > 0 && (
                    <div className="search-results">
                      {results.map(r => (
                        <Link key={r.id} to={`/funding/opportunity/${r.id}`} className="row">
                          <div>
                            <div className="label">{r.title}</div>
                            <div className="meta">{r.amount} · next: {r.next}</div>
                          </div>
                          <div className="meta">→</div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </ScrollReveal>
            </div>
            <Parallax speed={0.08}>
              <div className="hero-img">
                <img src={window.IMAGES.performance} alt="A performer on stage" />
                <span className="credit">Photo placeholder · NZ Festival 2025</span>
              </div>
            </Parallax>
          </div>
        </div>
      </section>

      {/* Koru band divider */}
      <KoruBand count={24} color="var(--accent)" opacity={0.12} height={32} />

      {/* Three funding tiers */}
      <section className="section">
        <div className="container">
          <ScrollReveal>
            <div className="section-head">
              <div>
                <span className="eyebrow">Pūtea tautoko</span>
                <h2 style={{marginTop:16, maxWidth:640}}>Funding designed for where you are in your practice.</h2>
              </div>
              <Link to="/funding/opportunities" className="btn-link">All opportunities ({window.OPPORTUNITIES.length}) →</Link>
            </div>
          </ScrollReveal>
          <div className="tier-grid">
            {window.FUNDING_TIERS.map((t, i) => (
              <ScrollReveal key={t.id} delay={i * 0.1}>
                <MagneticHover strength={0.08}>
                  <Link to={t.path} className="tier-card">
                    <div className="tier-card-img"><img src={t.img} alt={t.label} /></div>
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
                </MagneticHover>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stats band */}
      <section className="stats-band">
        <KoruCorner position="bl" size={400} color="#fff" opacity={0.04} />
        <KoruCorner position="tr" size={300} color="#fff" opacity={0.03} />
        <div className="stats-band-inner">
          <ScrollReveal>
            <span className="eyebrow" style={{color:'var(--kowhai)'}}>Ko Aotearoa me ōna Toi · 2026</span>
            <h2 style={{marginTop:24}}>The arts shape who we are — and they're made in every corner of Aotearoa.</h2>
          </ScrollReveal>
          <div className="stats-grid">
            {window.STATS.map((s, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="stat">
                  {s.kupu && <div className="kupu">{s.kupu}</div>}
                  <div className="num"><AnimatedCounter to={s.value} prefix={s.prefix||''} suffix={s.suffix||''} /></div>
                  <div className="lbl">{s.label}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Open opportunities */}
      <section className="section">
        <div className="container">
          <ScrollReveal>
            <div className="section-head">
              <div>
                <span className="eyebrow">Open now</span>
                <h2 style={{marginTop:16}}>Opportunities accepting applications.</h2>
              </div>
              <Link to="/funding/opportunities" className="btn-link">View all →</Link>
            </div>
          </ScrollReveal>
          <div className="opp-list" style={{borderTop:'1px solid var(--line)'}}>
            {featuredOpps.map((o, i) => (
              <ScrollReveal key={o.id} delay={i * 0.06}>
                <Link to={`/funding/opportunity/${o.id}`} className="opp-row">
                  <div className="code">{o.code}</div>
                  <div className="title-cell">
                    <h4>{o.title} <span className={`status ${o.status}`}>{o.status}</span></h4>
                    {o.kupu && <span className="kupu">{o.kupu}</span>}
                  </div>
                  <div className="desc">{o.desc}</div>
                  <div className="amt">{o.amount}</div>
                  <div className="when"><span className="lbl">Next</span>{o.next}</div>
                  <div className="arrow">→</div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <KoruBand count={24} color="var(--moana)" opacity={0.10} height={28} />

      {/* Pasifika & Maori */}
      <section className="pasifika-band">
        <KoruCorner position="tl" size={300} color="var(--moana)" opacity={0.08} />
        <KoruCorner position="br" size={300} color="var(--pohutukawa)" opacity={0.08} />
        <div className="pasifika-band-inner">
          <ScrollReveal>
            <div>
              <span className="eyebrow">Ngā Toi Māori · Toi Pasifika</span>
              <h2 style={{marginTop:16}}>Honouring the artistic traditions of Aotearoa and Te Moana-nui-a-Kiwa.</h2>
              <p>Dedicated kāhui, dedicated funding, and dedicated advocacy for Māori and Pacific artists, knowledge-holders and communities.</p>
              <div style={{display:'flex', gap:12, marginTop:24}}>
                <MagneticHover strength={0.15}><Link to="/toi-maori" className="btn btn-ghost">Ngā Toi Māori →</Link></MagneticHover>
                <MagneticHover strength={0.15}><Link to="/toi-pasifika" className="btn btn-ghost">Toi Pasifika →</Link></MagneticHover>
              </div>
            </div>
          </ScrollReveal>
          <div className="pasifika-tiles">
            {[
              { to: '/funding/opportunity/pacific-heritage', h: 'Pacific Heritage Fund', k: 'Tuku iho Pasifika', p: 'Practice, transmission and revitalisation of Pacific heritage arts.', a: 'Apply →' },
              { to: '/funding/awards', h: 'Arts Pasifika Awards', k: 'Ngā tohu', p: 'Honouring excellence and contribution across the Pacific arts.', a: '2026 winners →' },
              { to: '/funding/opportunity/banff', h: 'Banff Indigenous Arts', k: 'Karahipi', p: 'Residencies for Māori artists at Banff Centre, Canada.', a: 'Learn more →' },
              { to: '/resources/reports', h: 'Te Hā o ngā Toi', k: 'Rautaki', p: 'Our long-term strategy for ngā toi Māori.', a: 'Read strategy →' },
            ].map((tile, i) => (
              <ScrollReveal key={i} delay={i * 0.08} direction="left">
                <Link to={tile.to} className="pasifika-tile">
                  <KoruSpiral size={32} color="var(--moana)" opacity={0.2} style={{position:'absolute', top:12, right:12}} />
                  <h4>{tile.h}</h4>
                  <span className="kupu">{tile.k}</span>
                  <p>{tile.p}</p>
                  <span className="arrow">{tile.a}</span>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* News */}
      <section className="section">
        <div className="container">
          <ScrollReveal>
            <div className="section-head">
              <div>
                <span className="eyebrow">Pitopito kōrero</span>
                <h2 style={{marginTop:16}}>News & stories from the sector.</h2>
              </div>
              <Link to="/news" className="btn-link">All news →</Link>
            </div>
          </ScrollReveal>
          <div className="news-grid">
            {window.STORIES.slice(0, 5).map((s, i) => (
              <ScrollReveal key={s.id} delay={i * 0.08}>
                <Link to={`/news/${s.id}`} className={`ncard ${i===0 ? 'news-feature' : ''}`}>
                  <div className="ncard-img"><img src={s.img} alt="" /></div>
                  <div className="cat">{s.cat}{s.kupu ? ` · ${s.kupu}` : ''}</div>
                  <h3>{s.title}</h3>
                  {i===0 && <p>{s.excerpt}</p>}
                  <div className="date">{s.date} · {s.read} read</div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

window.HomePage = Home;
