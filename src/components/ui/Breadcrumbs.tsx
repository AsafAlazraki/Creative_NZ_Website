import { Link } from 'react-router-dom'

interface Crumb {
  label: string
  path?: string
}

export default function Breadcrumbs({ trail }: { trail: Crumb[] }) {
  return (
    <div className="container">
      <div className="crumbs">
        {trail.map((c, i) => (
          <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {i > 0 && <span className="sep">/</span>}
            {i === trail.length - 1
              ? <span className="here">{c.label}</span>
              : <Link to={c.path!}>{c.label}</Link>}
          </span>
        ))}
      </div>
    </div>
  )
}
