const SQUARES = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  left: `${(i * 21 + 8) % 92}%`,
  top: `${(i * 29 + 5) % 90}%`,
  size: 4 + (i % 4) * 3,
  delay: `${(i * 0.4) % 7}s`,
  duration: `${10 + (i % 4) * 4}s`,
}))

function CertificationsParticles() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {SQUARES.map((s) => (
        <span
          key={s.id}
          className="absolute animate-square-float"
          style={{
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
            animationDelay: s.delay,
            animationDuration: s.duration,
            backgroundColor: '#f4eeff',
            opacity: 0.25,
            borderRadius: s.size > 6 ? '3px' : '1px',
            boxShadow: s.size > 6 ? '0 0 8px rgba(244, 238, 255, 0.3)' : 'none',
          }}
        />
      ))}
      {SQUARES.slice(0, 8).map((s) => (
        <span
          key={`pulse-${s.id}`}
          className="absolute animate-square-pulse rounded-sm"
          style={{
            left: s.left,
            top: `calc(${s.top} + 10px)`,
            width: s.size * 0.7,
            height: s.size * 0.7,
            backgroundColor: '#dcd6f7',
            boxShadow: '0 0 10px rgba(220, 214, 247, 0.4)',
          }}
        />
      ))}
    </div>
  )
}

export default CertificationsParticles
