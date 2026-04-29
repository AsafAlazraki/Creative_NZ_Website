import { Link } from 'react-router-dom'
import { SITE } from '@/data'

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
              <li><Link to="/about/contact">info@creativenz.govt.nz</Link></li>
              <li>0800 432 248</li>
            </ul>
          </div>
          <div>
            <h4>Connect</h4>
            <ul>
              <li><a href="#" onClick={e => e.preventDefault()}>Newsletter</a></li>
              <li><a href="#" onClick={e => e.preventDefault()}>Facebook</a></li>
              <li><a href="#" onClick={e => e.preventDefault()}>Instagram</a></li>
              <li><a href="#" onClick={e => e.preventDefault()}>LinkedIn</a></li>
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
  )
}
