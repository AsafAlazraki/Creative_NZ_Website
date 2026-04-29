import { useState, useRef, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ChevronDown, Menu, X } from 'lucide-react'

interface DropdownItem {
  label: string
  path: string
  desc?: string
  kupu?: string
  icon?: string
}

interface DropdownGroup {
  heading: string
  items: DropdownItem[]
}

const DROPDOWNS: Record<string, DropdownGroup[]> = {
  funding: [
    { heading: 'Find a fund', items: [
      { label: 'All opportunities', path: '/funding/opportunities', desc: 'Browse every open and upcoming round', icon: '◉' },
      { label: 'Funding calendar', path: '/funding/calendar', desc: 'Plan ahead with deadline dates', icon: '▦' },
      { label: 'Recent results', path: '/funding/results', desc: "See who we've funded", icon: '✓' },
      { label: 'Award winners', path: '/funding/awards', desc: 'Past awardees & ceremonies', icon: '★' },
    ]},
    { heading: 'By stage', items: [
      { label: 'Early career artists', path: '/funding/early-career', kupu: 'Toi tipu', desc: 'Getting started', icon: '↑' },
      { label: 'Artists & practitioners', path: '/funding/artists', kupu: 'Ringatoi', desc: 'Established practice', icon: '✦' },
      { label: 'Arts organisations', path: '/funding/organisations', kupu: 'Whakahaere', desc: 'Collectives & venues', icon: '▢' },
    ]},
    { heading: 'Get help', items: [
      { label: 'Advice & support', path: '/funding/advice', desc: 'Eligibility, budgets & criteria', icon: '?' },
      { label: 'Speak with an adviser', path: '/funding/adviser', desc: 'Free 1:1 kōrero', icon: '✉' },
      { label: 'Start an application', path: '/funding/apply', desc: 'Begin a new application', icon: '→' },
    ]},
  ],
  advocacy: [
    { heading: 'Advocacy', items: [
      { label: 'Overview', path: '/advocacy', desc: 'Section overview', icon: '◌' },
      { label: 'Advocacy tools & research', path: '/advocacy/tools', desc: 'Make the case for the arts', icon: '☰' },
      { label: 'Our advocacy work', path: '/advocacy/work', desc: 'Submissions & policy work', icon: '✦' },
      { label: 'Te Rōpū Mana Toi', path: '/advocacy/rōpū', desc: 'Sector partnership group', icon: '◈' },
    ]},
  ],
  resources: [
    { heading: 'Tools & toolkits', items: [
      { label: 'Toolkits', path: '/resources/toolkits', desc: 'Step-by-step practical guides', icon: '⚒' },
      { label: 'Sustainable careers', path: '/resources/careers', desc: 'Building a long-term practice', icon: '↗' },
      { label: 'Nui te Kōrero', path: '/resources/nui-te-korero', desc: 'Pasifika arts conversations', icon: '◉' },
    ]},
    { heading: 'Research', items: [
      { label: 'Research & reports', path: '/resources/reports', desc: 'Sector data & reports', icon: '▤' },
      { label: 'New Zealanders & the Arts', path: '/resources/research', kupu: 'Ko Aotearoa me ōna Toi', desc: 'Public attitudes survey', icon: '◉' },
    ]},
  ],
  about: [
    { heading: 'About', items: [
      { label: 'What we do', path: '/about/what-we-do', desc: 'Our role and remit', icon: '◌' },
      { label: 'Our change journey', path: '/about/change', desc: 'Te Pae Tata strategy', icon: '↗' },
      { label: 'Vision & values', path: '/about/vision', desc: 'What guides our mahi', icon: '✦' },
      { label: 'Our Council', path: '/about/council', desc: 'Members & governance', icon: '◈' },
      { label: 'Our team', path: '/about/team', desc: 'Kaimahi & leadership', icon: '◍' },
    ]},
    { heading: 'More', items: [
      { label: 'Corporate documents', path: '/about/documents', desc: 'Annual reports & SOI', icon: '▤' },
      { label: 'Work for us', path: '/about/careers', desc: 'Roles at Toi Aotearoa', icon: '✚' },
      { label: 'Contact us', path: '/about/contact', desc: 'Get in touch', icon: '✉' },
    ]},
  ],
  news: [
    { heading: 'News', items: [
      { label: 'All news & blog', path: '/news', desc: 'Latest announcements', icon: '▦' },
      { label: 'Ngā Toi Māori', path: '/toi-maori', desc: 'Māori arts section', icon: '◈' },
      { label: 'Toi Pasifika', path: '/toi-pasifika', desc: 'Pacific arts section', icon: '◉' },
      { label: 'Newsletter', path: '/about/contact', desc: 'Monthly updates by email', icon: '✉' },
    ]},
  ],
}

const NAV_ITEMS = [
  { id: 'funding', label: 'Funding', path: '/funding' },
  { id: 'advocacy', label: 'Advocacy', path: '/advocacy' },
  { id: 'resources', label: 'Resources', path: '/resources' },
  { id: 'about', label: 'About', path: '/about' },
  { id: 'news', label: 'News', path: '/news' },
]

export default function Header() {
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setOpenDropdown(null)
  }, [location.pathname])

  const handleEnter = (id: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setOpenDropdown(id)
  }
  const handleLeave = () => {
    closeTimer.current = setTimeout(() => setOpenDropdown(null), 140)
  }

  return (
    <>
      <header className={`floatbar ${scrolled ? 'scrolled' : ''}`} role="banner">
        <div className="floatbar-pill">
          {/* Brand */}
          <Link to="/" className="floatbar-brand" aria-label="Creative New Zealand home">
            <img src="/logo.webp" alt="Creative New Zealand · Toi Aotearoa" className="floatbar-logo" />
          </Link>

          {/* Nav */}
          <nav className="floatbar-nav" aria-label="Primary">
            {NAV_ITEMS.map(n => {
              const active = location.pathname === n.path || location.pathname.startsWith(n.path + '/')
              const groups = DROPDOWNS[n.id]
              const isOpen = openDropdown === n.id

              return (
                <div key={n.id} className="fb-item" onMouseEnter={() => handleEnter(n.id)} onMouseLeave={handleLeave}>
                  <Link
                    to={n.path}
                    className={`fb-link ${active ? 'active' : ''} ${isOpen ? 'open' : ''}`}
                    aria-haspopup={groups ? 'menu' : undefined}
                    aria-expanded={groups ? isOpen : undefined}
                  >
                    {n.label}
                    {groups && (
                      <ChevronDown size={12} className="fb-chev" aria-hidden="true" />
                    )}
                  </Link>

                  <AnimatePresence>
                    {groups && isOpen && (
                      <motion.div
                        className="fb-dropdown"
                        role="menu"
                        initial={{ opacity: 0, y: -8, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -6, scale: 0.97 }}
                        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        onMouseEnter={() => handleEnter(n.id)}
                        onMouseLeave={handleLeave}
                      >
                        <div className="fb-dropdown-inner">
                          {groups.flatMap(g => g.items).map((item, ii) => (
                            <Link
                              key={ii}
                              to={item.path}
                              className="fb-dd-item"
                              onClick={() => setOpenDropdown(null)}
                              role="menuitem"
                            >
                              <span className="fb-dd-icon" aria-hidden="true">{item.icon || '·'}</span>
                              <span className="fb-dd-text">
                                <span className="fb-dd-label">{item.label}</span>
                                {(item.kupu || item.desc) && (
                                  <span className="fb-dd-desc">{item.kupu || item.desc}</span>
                                )}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </nav>

          {/* Actions */}
          <div className="floatbar-actions">
            <Link to="/search" className="fb-chip" aria-label="Search">
              <Search size={14} aria-hidden="true" />
              <span>Search</span>
            </Link>
            <span className="fb-signin">Sign in</span>
            <Link to="/funding/apply" className="fb-cta">Apply →</Link>
            <button
              className="fb-burger"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(v => !v)}
            >
              {mobileOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>

        {/* Mobile sheet */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              style={{
                pointerEvents: 'auto',
                margin: '6px 16px 0',
                padding: '16px',
                background: 'rgba(255,253,247,0.97)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(28,27,29,0.08)',
                borderRadius: '20px',
                boxShadow: '0 12px 48px rgba(20,16,8,0.12)',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
              }}
            >
              {NAV_ITEMS.map(n => {
                const groups = DROPDOWNS[n.id]
                return (
                  <div key={n.id} style={{ padding: '6px 0', borderBottom: '1px solid rgba(28,27,29,0.06)' }}>
                    <Link to={n.path} style={{ display: 'block', padding: '10px 8px', fontWeight: 600, color: 'var(--ink)', textDecoration: 'none' }} onClick={() => setMobileOpen(false)}>
                      {n.label}
                    </Link>
                    {groups && groups.flatMap(g => g.items).map((it, ii) => (
                      <Link key={ii} to={it.path} style={{ display: 'block', padding: '8px 8px 8px 22px', color: 'var(--ink-2)', fontSize: '14px', textDecoration: 'none' }} onClick={() => setMobileOpen(false)}>
                        {it.label}
                      </Link>
                    ))}
                  </div>
                )
              })}
              <div style={{ display: 'flex', gap: '8px', paddingTop: '12px' }}>
                <Link to="/search" className="fb-chip" onClick={() => setMobileOpen(false)}>Search</Link>
                <Link to="/funding/apply" className="fb-cta" onClick={() => setMobileOpen(false)}>Apply →</Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  )
}
