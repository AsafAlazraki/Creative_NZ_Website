import { Link } from 'react-router-dom'
import { Mail } from 'lucide-react'
import { SITE } from '@/data'
import { PartnerLogos } from './PartnerLogos'
import { FacebookIcon, InstagramIcon, LinkedinIcon, YoutubeIcon } from './SocialIcons'

const SOCIALS = [
  { label: 'Facebook',  href: 'https://www.facebook.com/creativenz/',                Icon: FacebookIcon },
  { label: 'Instagram', href: 'https://www.instagram.com/creativenz/',                Icon: InstagramIcon },
  { label: 'LinkedIn',  href: 'https://nz.linkedin.com/company/creative-new-zealand', Icon: LinkedinIcon },
  { label: 'YouTube',   href: 'https://www.youtube.com/user/CreativeNewZealand',      Icon: YoutubeIcon },
]

function handleBackToTop() {
  const reduced = typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top: 0, behavior: reduced ? 'instant' : 'smooth' })
}

export default function Footer() {
  return (
    <footer className="footer footer--ink">
      <div className="motif-strip" style={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
        <span /><span /><span /><span /><span />
      </div>

      {/* Large decorative koru in top-right (§08) */}
      <svg
        className="footer-koru-decor"
        viewBox="0 0 120 120"
        aria-hidden="true"
      >
        <path
          d="M 60 100 C 60 100 24 92 24 58 C 24 32 42 20 60 20 C 78 20 90 32 90 50 C 90 68 78 76 66 76 C 54 76 46 68 46 60 C 46 52 54 48 58 48 C 62 48 66 52 66 56"
          fill="none" stroke="#ffffff" strokeWidth="1.4" strokeLinecap="round"
        />
        <circle cx="66" cy="56" r="3.5" fill="#ffffff" />
      </svg>

      <div className="footer-inner">
        <p className="footer-mihi">{SITE.whakatauki.text}</p>
        <p className="footer-mihi-en">{SITE.whakatauki.en}</p>

        <div className="footer-cols">
          <div>
            <h4>Toi Aotearoa</h4>
            <ul>
              <li>Level 2, 191 Thorndon Quay</li>
              <li>Pipitea, Wellington 6011</li>
              <li>
                <a href="mailto:info@creativenz.govt.nz">
                  <Mail size={14} style={{ display: 'inline-block', verticalAlign: -2, marginRight: 6 }} />
                  info@creativenz.govt.nz
                </a>
              </li>
              <li>0800 432 248</li>
              <li><Link to="/about/contact">All offices →</Link></li>
            </ul>
          </div>

          <div>
            <h4>Connect</h4>
            <div className="footer-socials">
              {SOCIALS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={label}
                  className="footer-social-btn"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
            <ul style={{ marginTop: 22 }}>
              <li><a href="#" onClick={e => e.preventDefault()}>Subscribe to newsletter →</a></li>
              <li><Link to="/news">News & stories →</Link></li>
            </ul>
          </div>

          <div>
            <h4>Quick links</h4>
            <ul>
              <li><Link to="/funding/opportunities">All opportunities</Link></li>
              <li><Link to="/funding/calendar">Funding calendar</Link></li>
              <li><Link to="/funding/adviser">Speak with an adviser</Link></li>
              <li><Link to="/about">About Creative NZ</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Funder band — flows naturally on the now-dark footer */}
      <div className="footer-funder-band">
        <div className="footer-funder-inner">
          <span className="footer-funder-eyebrow">Creative New Zealand is funded by</span>
          <PartnerLogos />
          <div className="footer-funder-bottom">
            <span>© Creative New Zealand · Toi Aotearoa 2026 — demo prototype, not the live site</span>
            <div className="footer-funder-links">
              <a href="#" onClick={e => e.preventDefault()}>Privacy</a>
              <a href="#" onClick={e => e.preventDefault()}>Accessibility</a>
              <a href="#" onClick={e => e.preventDefault()}>Copyright</a>
              <button onClick={handleBackToTop} className="footer-back-top" aria-label="Back to top">
                Back to top ↑
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
