// Koru motif — extracted from the CNZ logo's spiral pattern
// Provides reusable SVG components for decorative use throughout the site

// Single koru spiral — the core element from the CNZ logo
function KoruSpiral({ size = 60, color = 'currentColor', opacity = 0.12, strokeWidth = 1.5, className = '', style = {} }) {
  return (
    <svg viewBox="0 0 60 60" width={size} height={size} className={`koru-spiral ${className}`} style={{ display: 'block', ...style }} aria-hidden="true">
      <path
        d="M 30 52 C 30 52 12 48 12 30 C 12 16 22 10 30 10 C 38 10 44 16 44 24 C 44 32 38 36 32 36 C 26 36 22 32 22 28 C 22 24 26 22 28 22 C 30 22 32 24 32 26"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        opacity={opacity}
      />
    </svg>
  );
}

// Double koru — two spirals facing each other (manaia-inspired)
function KoruPair({ size = 120, color = 'currentColor', opacity = 0.08, className = '', style = {} }) {
  return (
    <svg viewBox="0 0 120 60" width={size} height={size / 2} className={`koru-pair ${className}`} style={{ display: 'block', ...style }} aria-hidden="true">
      <path
        d="M 30 52 C 30 52 12 48 12 30 C 12 16 22 10 30 10 C 38 10 44 16 44 24 C 44 32 38 36 32 36 C 26 36 22 32 22 28 C 22 24 26 22 28 22 C 30 22 32 24 32 26"
        fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity={opacity}
      />
      <path
        d="M 90 52 C 90 52 108 48 108 30 C 108 16 98 10 90 10 C 82 10 76 16 76 24 C 76 32 82 36 88 36 C 94 36 98 32 98 28 C 98 24 94 22 92 22 C 90 22 88 24 88 26"
        fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity={opacity}
      />
    </svg>
  );
}

// Koru band — repeating spirals for section dividers
function KoruBand({ count = 12, color = 'var(--accent)', opacity = 0.15, height = 40, className = '' }) {
  const w = count * 48;
  return (
    <svg viewBox={`0 0 ${w} 40`} preserveAspectRatio="xMidYMid slice" style={{ width: '100%', height, display: 'block' }} className={`koru-band ${className}`} aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <g key={i} transform={`translate(${i * 48}, 0)`}>
          <path
            d="M 24 34 C 24 34 10 31 10 20 C 10 11 16 7 22 7 C 28 7 32 11 32 17 C 32 23 28 25 25 25 C 22 25 20 23 20 21 C 20 19 22 18 23 18 C 24 18 25 19 25 20"
            fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity={opacity}
          />
        </g>
      ))}
    </svg>
  );
}

// Koru corner — decorative corner piece replacing the old MotifCorner
function KoruCorner({ position = 'tr', size = 180, color = 'currentColor', opacity = 0.06 }) {
  const positions = {
    tr: { top: 0, right: 0, transform: '' },
    tl: { top: 0, left: 0, transform: 'scaleX(-1)' },
    br: { bottom: 0, right: 0, transform: 'scaleY(-1)' },
    bl: { bottom: 0, left: 0, transform: 'scale(-1)' },
  };
  return (
    <div style={{ position: 'absolute', ...positions[position], width: size, height: size, opacity, transform: positions[position].transform, pointerEvents: 'none' }}>
      <svg viewBox="0 0 180 180" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" style={{ width: '100%', height: '100%' }}>
        {/* Primary koru */}
        <path d="M 140 160 C 140 160 100 150 100 110 C 100 80 118 65 138 65 C 155 65 165 78 165 92 C 165 106 155 114 145 114 C 135 114 128 106 128 98 C 128 90 134 86 140 86" />
        {/* Secondary smaller koru */}
        <path d="M 60 130 C 60 130 40 125 40 100 C 40 82 50 74 60 74 C 70 74 76 82 76 90 C 76 98 70 102 66 102 C 62 102 58 98 58 94" />
        {/* Dots pattern */}
        <circle cx="30" cy="150" r="2.5" fill={color} />
        <circle cx="45" cy="155" r="2" fill={color} />
        <circle cx="35" cy="165" r="1.5" fill={color} />
        {/* Connecting wave */}
        <path d="M 80 45 Q 100 25 120 45 Q 140 25 160 45" />
      </svg>
    </div>
  );
}

// Scroll reveal wrapper — fades + slides children in on viewport entry
function ScrollReveal({ children, delay = 0, direction = 'up', distance = 30, className = '', style = {} }) {
  const ref = React.useRef(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); io.disconnect(); }
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  const transforms = {
    up: `translateY(${distance}px)`,
    down: `translateY(-${distance}px)`,
    left: `translateX(${distance}px)`,
    right: `translateX(-${distance}px)`,
    none: 'none',
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : transforms[direction],
        transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// Staggered children reveal
function StaggerReveal({ children, stagger = 0.08, direction = 'up', className = '', style = {} }) {
  return (
    <div className={className} style={style}>
      {React.Children.map(children, (child, i) => (
        <ScrollReveal delay={i * stagger} direction={direction}>
          {child}
        </ScrollReveal>
      ))}
    </div>
  );
}

// Magnetic hover — element subtly follows cursor on hover
function MagneticHover({ children, strength = 0.3, className = '', style = {} }) {
  const ref = React.useRef(null);
  const [offset, setOffset] = React.useState({ x: 0, y: 0 });

  const onMove = (e) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) * strength;
    const y = (e.clientY - r.top - r.height / 2) * strength;
    setOffset({ x, y });
  };
  const onLeave = () => setOffset({ x: 0, y: 0 });

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        transform: `translate(${offset.x}px, ${offset.y}px)`,
        transition: offset.x === 0 ? 'transform 0.4s cubic-bezier(0.16,1,0.3,1)' : 'transform 0.1s ease-out',
      }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </div>
  );
}

// Parallax wrapper — shifts content based on scroll position
function Parallax({ children, speed = 0.15, className = '', style = {} }) {
  const ref = React.useRef(null);
  const [y, setY] = React.useState(0);

  React.useEffect(() => {
    const onScroll = () => {
      if (!ref.current) return;
      const r = ref.current.getBoundingClientRect();
      const center = r.top + r.height / 2;
      const viewCenter = window.innerHeight / 2;
      setY((center - viewCenter) * speed);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [speed]);

  return (
    <div ref={ref} className={className} style={{ ...style, transform: `translateY(${y}px)`, willChange: 'transform' }}>
      {children}
    </div>
  );
}

// Animated counter with easing
function AnimatedCounter({ to, prefix = '', suffix = '', duration = 1600, className = '' }) {
  const [n, setN] = React.useState(0);
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (!ref.current) return;
    let raf, started = false;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started) {
        started = true;
        const start = performance.now();
        const tick = (t) => {
          const p = Math.min(1, (t - start) / duration);
          // Smooth cubic ease-out
          const eased = 1 - Math.pow(1 - p, 3);
          setN(to * eased);
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      }
    }, { threshold: 0.3 });
    io.observe(ref.current);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [to, duration]);
  const formatted = Number.isInteger(to) ? Math.round(n).toLocaleString() : n.toFixed(1);
  return <span ref={ref} className={className}>{prefix}{formatted}{suffix}</span>;
}

// Smooth page transition wrapper
function PageTransition({ routeKey, children }) {
  const [show, setShow] = React.useState(false);
  React.useEffect(() => {
    setShow(false);
    const t = requestAnimationFrame(() => requestAnimationFrame(() => setShow(true)));
    return () => cancelAnimationFrame(t);
  }, [routeKey]);

  return (
    <div style={{
      opacity: show ? 1 : 0,
      transform: show ? 'none' : 'translateY(12px)',
      transition: 'opacity 0.35s cubic-bezier(0.16,1,0.3,1), transform 0.35s cubic-bezier(0.16,1,0.3,1)',
    }}>
      {children}
    </div>
  );
}

// Export all
window.KoruSpiral = KoruSpiral;
window.KoruPair = KoruPair;
window.KoruBand = KoruBand;
window.KoruCorner = KoruCorner;
window.ScrollReveal = ScrollReveal;
window.StaggerReveal = StaggerReveal;
window.MagneticHover = MagneticHover;
window.Parallax = Parallax;
window.AnimatedCounter = AnimatedCounter;
window.PageTransition = PageTransition;
