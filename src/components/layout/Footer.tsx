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

export default function Footer() {
  return (
    <footer className="footer">
      <div className="motif-strip" style={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
        <span /><span /><span /><span /><span />
      </div>

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

      {/* Dark "funded by" band — mirrors creativenz.govt.nz */}
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
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
