import { useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'

interface SubNavItem {
  label: string
  path: string
}

export default function SubNav({ items }: { items: SubNavItem[] }) {
  const location = useLocation()
  const innerRef = useRef<HTMLDivElement>(null)

  // Toggle .subnav--has-overflow on the parent based on whether the inner
  // scroll container actually overflows + whether we're at the right edge.
  // Drives the CSS gradient fade affordance defined in globals.css.
  useEffect(() => {
    const el = innerRef.current
    if (!el) return
    const subnav = el.closest('.subnav')
    if (!subnav) return
    const update = () => {
      const hasOverflow = el.scrollWidth > el.clientWidth + 2
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4
      subnav.classList.toggle('subnav--has-overflow', hasOverflow && !atEnd)
    }
    el.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    update()
    return () => {
      el.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [items])

  return (
    <div className="subnav">
      <div className="subnav-inner" ref={innerRef}>
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
