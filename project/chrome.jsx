// Shared chrome — header, footer, breadcrumbs, motifs, helpers
// Uses window.NAV, window.SITE from data.jsx

const { useState, useEffect, useRef, useMemo, createContext, useContext } = React;

// Router context — global navigation
const RouterCtx = createContext({ path: '/', go: () => {} });

function Router({ children }) {
  const [path, setPath] = useState(() => {
    const h = window.location.hash.replace(/^#/, '');
    return h || '/';
  });
  useEffect(() => {
    const onHash = () => setPath(window.location.hash.replace(/^#/, '') || '/');
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  const go = (p) => {
    window.location.hash = p;
    window.scrollTo({ top: 0, behavior: 'instant' });
  };
  return <RouterCtx.Provider value={{ path, go }}>{children}</RouterCtx.Provider>;
}

function useRouter() { return useContext(RouterCtx); }

function Link({ to, children, className, style, ...rest }) {
  const { go } = useRouter();
  return (
    <a className={className} style={style} onClick={(e) => { e.preventDefault(); go(to); }} {...rest}>{children}</a>
  );
}

// Brand mark — placeholder, NOT the official CNZ logo
function BrandMark({ size = 44 }) {
  return (
    <div className="brand-mark" style={{ width: size, height: size }}>
      <span className="swatch"></span>
      <span className="letter">c</span>
    </div>
  );
}

function Brand() {
  return (
    <Link to="/" className="brand">
      <BrandMark />
      <div className="brand-text">
        <span className="reo">Toi Aotearoa</span>
        <span className="name">Creative New Zealand</span>
      </div>
    </Link>
  );
}

function TopBar() {
  return (
    <div className="topbar">
      <div>Toi Aotearoa · Arts Council of New Zealand</div>
      <div className="topbar-right">
        <a>Reo Māori</a>
        <a>Accessibility</a>
        <a>Subscribe</a>
        <a>Sign in →</a>
      </div>
    </div>
  );
}

function Header() {
  const { path } = useRouter();
  const top = window.NAV.filter(n => ['funding','advocacy','resources','about','news'].includes(n.id));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const closeTimer = useRef(null);

  // Build dropdown contents per top-level item from NAV.children + a couple of curated extras
  const dropdownsFor = (n) => {
    if (n.id === 'funding') return [
      { heading: 'Find a fund', items: [
        { label: 'All opportunities', path: '/funding/opportunities' },
        { label: 'Funding calendar', path: '/funding/calendar' },
        { label: 'Recent results', path: '/funding/results' },
        { label: 'Award winners', path: '/funding/awards' },
      ]},
      { heading: 'By stage', items: [
        { label: 'Early career artists', kupu: 'Toi tipu', path: '/funding/early-career' },
        { label: 'Artists & practitioners', kupu: 'Ringatoi', path: '/funding/artists' },
        { label: 'Arts organisations', kupu: 'Whakahaere', path: '/funding/organisations' },
      ]},
      { heading: 'Get help', items: [
        { label: 'Advice & support', path: '/funding/advice' },
        { label: 'Speak with an adviser', path: '/funding/adviser' },
        { label: 'Start an application', path: '/funding/apply' },
      ]},
    ];
    if (n.id === 'advocacy') return [
      { heading: 'Advocacy', items: [
        { label: 'Overview', path: '/advocacy' },
        { label: 'Advocacy tools & research', path: '/advocacy/tools' },
        { label: 'Our advocacy work', path: '/advocacy/work' },
        { label: 'Te Rōpū Mana Toi', path: '/advocacy/rōpū' },
      ]},
    ];
    if (n.id === 'resources') return [
      { heading: 'Tools & toolkits', items: [
        { label: 'Toolkits', path: '/resources/toolkits' },
        { label: 'Sustainable careers', path: '/resources/careers' },
        { label: 'Nui te Kōrero', path: '/resources/nui-te-korero' },
      ]},
      { heading: 'Research', items: [
        { label: 'Research & reports', path: '/resources/reports' },
        { label: 'New Zealanders & the Arts', kupu: 'Ko Aotearoa me ōna Toi', path: '/resources/research' },
      ]},
    ];
    if (n.id === 'about') return [
      { heading: 'About', items: [
        { label: 'What we do', path: '/about/what-we-do' },
        { label: 'Our change journey', path: '/about/change' },
        { label: 'Vision & values', path: '/about/vision' },
        { label: 'Our Council', path: '/about/council' },
        { label: 'Our team', path: '/about/team' },
      ]},
      { heading: 'More', items: [
        { label: 'Corporate documents', path: '/about/documents' },
        { label: 'Work for us', path: '/about/careers' },
        { label: 'Contact us', path: '/about/contact' },
      ]},
    ];
    if (n.id === 'news') return [
      { heading: 'News', items: [
        { label: 'All news & blog', path: '/news' },
        { label: 'Newsletter', path: '/about/contact' },
      ]},
    ];
    if (n.id === 'maori') return [
      { heading: 'Ngā Toi Māori', items: [
        { label: 'Overview', path: '/toi-maori' },
        { label: 'Te Waka Toi Awards', path: '/funding/awards' },
      ]},
    ];
    if (n.id === 'pasifika') return [
      { heading: 'Toi Pasifika', items: [
        { label: 'Overview', path: '/toi-pasifika' },
        { label: 'Arts Pasifika Awards', path: '/funding/awards' },
      ]},
    ];
    return null;
  };

  const handleEnter = (id) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenDropdown(id);
  };
  const handleLeave = () => {
    closeTimer.current = setTimeout(() => setOpenDropdown(null), 120);
  };

  // scroll-based weight toggle
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // dropdown icon — small line icon based on section
  const iconFor = (label) => {
    const map = {
      'All opportunities': '◉', 'Funding calendar': '▦', 'Recent results': '✓', 'Award winners': '★',
      'Early career artists': '↑', 'Artists & practitioners': '✦', 'Arts organisations': '▢',
      'Advice & support': '?', 'Speak with an adviser': '✉', 'Start an application': '→',
      'Overview': '◌', 'Advocacy tools & research': '☰', 'Our advocacy work': '✦', 'Te Rōpū Mana Toi': '◈',
      'Toolkits': '⚒', 'Sustainable careers': '↗', 'Nui te Kōrero': '◉', 'Research & reports': '▤', 'New Zealanders & the Arts': '◉',
      'What we do': '◌', 'Our change journey': '↗', 'Vision & values': '✦', 'Our Council': '◈', 'Our team': '◍',
      'Corporate documents': '▤', 'Work for us': '✚', 'Contact us': '✉',
      'All news & blog': '▦', 'Newsletter': '✉',
      'Te Waka Toi Awards': '★', 'Arts Pasifika Awards': '★',
    };
    return map[label] || '·';
  };
  const descFor = (label) => {
    const map = {
      'All opportunities': 'Browse every open and upcoming round',
      'Funding calendar': 'Plan ahead with deadline dates',
      'Recent results': 'See who we\'ve funded',
      'Award winners': 'Past awardees & ceremonies',
      'Early career artists': 'Toi tipu — getting started',
      'Artists & practitioners': 'Ringatoi — established practice',
      'Arts organisations': 'Whakahaere — collectives & venues',
      'Advice & support': 'Eligibility, budgets & criteria',
      'Speak with an adviser': 'Free 1:1 kōrero',
      'Start an application': 'Begin a new application',
      'Advocacy tools & research': 'Make the case for the arts',
      'Our advocacy work': 'Submissions & policy work',
      'Te Rōpū Mana Toi': 'Sector partnership group',
      'Toolkits': 'Step-by-step practical guides',
      'Sustainable careers': 'Building a long-term practice',
      'Research & reports': 'Sector data & reports',
      'New Zealanders & the Arts': 'Public attitudes survey',
      'What we do': 'Our role and remit',
      'Our change journey': 'Te Pae Tata strategy',
      'Vision & values': 'What guides our mahi',
      'Our Council': 'Members & governance',
      'Our team': 'Kaimahi & leadership',
      'Corporate documents': 'Annual reports & SOI',
      'Work for us': 'Roles at Toi Aotearoa',
      'Contact us': 'Get in touch',
      'All news & blog': 'Latest announcements',
      'Newsletter': 'Monthly updates by email',
      'Overview': 'Section overview',
      'Te Waka Toi Awards': 'Excellence in Māori arts',
      'Arts Pasifika Awards': 'Excellence in Pacific arts',
      'Nui te Kōrero': 'Pasifika arts conversations',
    };
    return map[label] || '';
  };

  return (
    <>
      <header className={`floatbar ${scrolled ? 'scrolled' : ''}`} role="banner">
        <div className="floatbar-pill">
          <Link to="/" className="floatbar-brand" aria-label="Creative New Zealand home">
            <img src="assets/logo.webp" alt="Creative New Zealand · Toi Aotearoa" className="floatbar-logo" />
          </Link>
          <nav className="floatbar-nav" aria-label="Primary">
            {top.map(n => {
              const active = path === n.path || path.startsWith(n.path + '/');
              const groups = dropdownsFor(n);
              const isOpen = openDropdown === n.id;
              return (
                <div key={n.id} className="fb-item" onMouseEnter={()=>handleEnter(n.id)} onMouseLeave={handleLeave}>
                  <Link to={n.path}
                    className={`fb-link ${active ? 'active' : ''} ${isOpen?'open':''}`}
                    aria-haspopup={groups ? 'menu' : undefined}
                    aria-expanded={groups ? isOpen : undefined}>
                    <span>{n.id === 'funding' ? 'Funding' : n.id === 'advocacy' ? 'Advocacy' : n.id === 'resources' ? 'Resources' : n.id === 'about' ? 'About' : n.label}</span>
                    {groups && <svg className="fb-chev" width="10" height="10" viewBox="0 0 10 10" aria-hidden="true"><path d="M2 3.5 L5 6.5 L8 3.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                  </Link>
                  {groups && isOpen && (
                    <div className="fb-dropdown" role="menu" onMouseEnter={()=>handleEnter(n.id)} onMouseLeave={handleLeave}>
                      <div className="fb-dropdown-inner">
                        {groups.flatMap(g => g.items).map((it, ii) => (
                          <Link key={ii} to={it.path} className="fb-dd-item" onClick={()=>setOpenDropdown(null)} role="menuitem">
                            <span className="fb-dd-icon" aria-hidden="true">{iconFor(it.label)}</span>
                            <span className="fb-dd-text">
                              <span className="fb-dd-label">{it.label}</span>
                              {(it.kupu || descFor(it.label)) && <span className="fb-dd-desc">{it.kupu || descFor(it.label)}</span>}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
          <div className="floatbar-actions">
            <Link to="/search" className="fb-chip" aria-label="Search">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><circle cx="6" cy="6" r="4" stroke="currentColor" strokeWidth="1.4"/><path d="M9 9 L12 12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>
              <span>Search</span>
            </Link>
            <a className="fb-signin">Sign in</a>
            <Link to="/funding/apply" className="fb-cta">Apply →</Link>
            <button className="fb-burger" aria-label="Open menu" aria-expanded={mobileOpen} onClick={() => setMobileOpen(v=>!v)}>
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>
        {mobileOpen && (
          <div className="floatbar-sheet">
            {top.map(n => {
              const groups = dropdownsFor(n);
              return (
                <div key={n.id} className="fb-sheet-group">
                  <Link to={n.path} className="fb-sheet-head" onClick={()=>setMobileOpen(false)}>{n.label}</Link>
                  {groups && groups.flatMap(g=>g.items).map((it, ii) => (
                    <Link key={ii} to={it.path} className="fb-sheet-link" onClick={()=>setMobileOpen(false)}>{it.label}</Link>
                  ))}
                </div>
              );
            })}
            <div className="fb-sheet-footer">
              <Link to="/search" className="fb-chip" onClick={()=>setMobileOpen(false)}>Search</Link>
              <Link to="/funding/apply" className="fb-cta" onClick={()=>setMobileOpen(false)}>Apply →</Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

// Sub-navigation — for funding, advocacy etc.
function SubNav({ items, basePath }) {
  const { path } = useRouter();
  return (
    <div className="subnav">
      <div className="subnav-inner">
        {items.map(it => {
          const active = path === it.path;
          return <Link key={it.path} to={it.path} className={active ? 'active' : ''}>{it.label}</Link>;
        })}
      </div>
    </div>
  );
}

function Crumbs({ trail }) {
  // trail: [{label, path}]
  return (
    <div className="container">
      <div className="crumbs">
        {trail.map((c, i) => (
          <React.Fragment key={i}>
            {i > 0 && <span className="sep">/</span>}
            {i === trail.length - 1
              ? <span className="here">{c.label}</span>
              : <Link to={c.path}>{c.label}</Link>}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="motif-strip" style={{position:'absolute', top:0, left:0, right:0}}>
        <span></span><span></span><span></span><span></span><span></span>
      </div>
      <div className="footer-inner">
        <p className="footer-mihi">{window.SITE.whakatauki.text}</p>
        <p className="footer-mihi-en">{window.SITE.whakatauki.en}</p>
        <div className="footer-cols footer-cols-slim">
          <div>
            <h4>Toi Aotearoa</h4>
            <ul>
              <li>Level 2, 191 Thorndon Quay</li>
              <li>Pipitea, Wellington 6011</li>
              <li><Link to="/about/contact">info@creativenz.govt.nz</Link></li>
              <li>0800 432 248</li>
            </ul>
          </div>
          <div>
            <h4>Connect</h4>
            <ul>
              <li><a>Newsletter</a></li>
              <li><a>Facebook</a></li>
              <li><a>Instagram</a></li>
              <li><a>LinkedIn</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© Creative New Zealand · Toi Aotearoa 2026 — placeholder demo, not the live site</span>
          <div className="footer-sponsors">
            <span className="footer-sponsor">Lottery Grants</span>
            <span className="footer-sponsor">Manatū Taonga</span>
            <span className="footer-sponsor">NZ Government</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// CountUp helper for animated stats
function CountUp({ to, prefix = '', suffix = '', duration = 1400 }) {
  const [n, setN] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) return;
    let raf, started = false;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started) {
        started = true;
        const start = performance.now();
        const tick = (t) => {
          const p = Math.min(1, (t - start) / duration);
          setN(to * (1 - Math.pow(1 - p, 3)));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      }
    }, { threshold: 0.3 });
    io.observe(ref.current);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [to, duration]);
  const formatted = Number.isInteger(to) ? Math.round(n).toLocaleString() : n.toFixed(1);
  return <span ref={ref}>{prefix}{formatted}{suffix}</span>;
}

// Pacific motif corner — restrained, decorative, primitive shapes only
function MotifCorner({ position = 'tr', size = 200, color = 'currentColor', opacity = 0.06 }) {
  const positions = {
    tr: { top: 0, right: 0, transform: '' },
    tl: { top: 0, left: 0, transform: 'scaleX(-1)' },
    br: { bottom: 0, right: 0, transform: 'scaleY(-1)' },
    bl: { bottom: 0, left: 0, transform: 'scale(-1)' },
  };
  return (
    <div className="motif-bg" style={{ ...positions[position], width: size, height: size, opacity, transform: positions[position].transform }}>
      <svg viewBox="0 0 200 200" fill="none" stroke={color} strokeWidth="1.5">
        <circle cx="160" cy="40" r="32" />
        <circle cx="160" cy="40" r="20" />
        <circle cx="160" cy="40" r="8" fill={color} />
        <path d="M 110 90 L 160 40 L 160 90 Z" />
        <path d="M 30 100 Q 60 60 90 100 Q 120 60 150 100" />
        <path d="M 30 130 Q 60 90 90 130 Q 120 90 150 130" />
        <circle cx="40" cy="170" r="3" fill={color} />
        <circle cx="60" cy="170" r="3" fill={color} />
        <circle cx="80" cy="170" r="3" fill={color} />
        <circle cx="100" cy="170" r="3" fill={color} />
      </svg>
    </div>
  );
}

// Diamond rosette band — used as section divider
function MotifBand({ color = 'var(--kowhai)', height = 12 }) {
  const repeat = 30;
  return (
    <svg viewBox={`0 0 ${repeat * 40} 40`} preserveAspectRatio="xMidYMid slice" style={{ width: '100%', height, display: 'block' }}>
      {Array.from({ length: repeat }).map((_, i) => (
        <g key={i} transform={`translate(${i * 40},0)`}>
          <path d="M 20 8 L 28 20 L 20 32 L 12 20 Z" fill={color} opacity="0.85" />
          <circle cx="20" cy="20" r="2" fill={color} />
        </g>
      ))}
    </svg>
  );
}

window.Router = Router; window.useRouter = useRouter; window.Link = Link;
window.Header = Header; window.Footer = Footer; window.Crumbs = Crumbs; window.SubNav = SubNav;
window.Brand = Brand; window.BrandMark = BrandMark;
window.CountUp = CountUp; window.MotifCorner = MotifCorner; window.MotifBand = MotifBand;
