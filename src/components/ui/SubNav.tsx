import { Link, useLocation } from 'react-router-dom'

interface SubNavItem {
  label: string
  path: string
}

export default function SubNav({ items }: { items: SubNavItem[] }) {
  const location = useLocation()
  return (
    <div className="subnav">
      <div className="subnav-inner">
        {items.map(it => (
          <Link
            key={it.path}
            to={it.path}
            className={location.pathname === it.path ? 'active' : ''}
          >
            {it.label}
          </Link>
        ))}
      </div>
    </div>
  )
}
