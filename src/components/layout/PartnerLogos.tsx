/**
 * Inline-SVG funder/partner badges for the footer.
 * Visually evocative of the official marks shown on creativenz.govt.nz
 * but constructed locally to avoid trademark misuse and CDN dependencies.
 */
export function LotteryGrantsBoardMark() {
  return (
    <a
      href="https://www.communitymatters.govt.nz/lottery-grants-board"
      target="_blank"
      rel="noreferrer noopener"
      className="partner-mark"
      aria-label="Lottery Grants Board · Te Puna Tahua"
    >
      <svg width="48" height="48" viewBox="0 0 48 48" aria-hidden="true">
        <circle cx="24" cy="24" r="22" fill="#0e0c08" />
        {/* four small koru dots arranged in a clover */}
        {[
          [24, 12], [36, 24], [24, 36], [12, 24],
        ].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="3.4" fill="#fff" opacity="0.92" />
        ))}
        <circle cx="24" cy="24" r="2" fill="#fff" opacity="0.6" />
      </svg>
      <span className="partner-text">
        <strong>Lottery Grants Board</strong>
        <em>Te Puna Tahua</em>
        <small>LOTTO FUNDS FOR YOUR COMMUNITY</small>
      </span>
    </a>
  )
}

export function ManatuTaongaMark() {
  return (
    <a
      href="https://www.mch.govt.nz/"
      target="_blank"
      rel="noreferrer noopener"
      className="partner-mark partner-mark-text"
      aria-label="Manatū Taonga · Ministry for Culture & Heritage"
    >
      <span className="partner-text">
        <strong style={{ fontSize: 17 }}>Manatū<br />Taonga</strong>
      </span>
      <span className="partner-text" style={{ borderLeft: '1px solid rgba(255,255,255,0.18)', paddingLeft: 14, marginLeft: 4 }}>
        <small style={{ fontSize: 11, lineHeight: 1.4 }}>Ministry<br />for Culture<br />&amp; Heritage</small>
      </span>
    </a>
  )
}

export function NzGovernmentMark() {
  return (
    <a
      href="https://www.govt.nz/"
      target="_blank"
      rel="noreferrer noopener"
      className="partner-mark"
      aria-label="New Zealand Government"
    >
      <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true" style={{ flexShrink: 0 }}>
        {/* Stylised silver-fern frond — black on transparent */}
        <path
          d="M16 30 Q16 22 12 18 Q14 17 16 18 Q15 14 12 11 Q14 10 16 12 Q15 8 13 5 Q15 5 16 7 Q17 5 19 5 Q17 8 16 12 Q18 10 20 11 Q17 14 16 18 Q18 17 20 18 Q16 22 16 30 Z"
          fill="#fff"
        />
      </svg>
      <span className="partner-text">
        <strong style={{ borderBottom: '1px solid rgba(255,255,255,0.45)', paddingBottom: 1 }}>
          New Zealand
        </strong>
        <em style={{ fontStyle: 'normal', fontWeight: 400 }}>Government</em>
      </span>
    </a>
  )
}

export function PartnerLogos() {
  return (
    <div className="partner-logos">
      <LotteryGrantsBoardMark />
      <ManatuTaongaMark />
      <NzGovernmentMark />
    </div>
  )
}
