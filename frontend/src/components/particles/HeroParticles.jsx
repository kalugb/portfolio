const PARTICLES = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  left: `${(i * 19 + 7) % 94}%`,
  top: `${(i * 27 + 12) % 88}%`,
  size: 8 + (i % 5) * 4,
  delay: `${(i * 0.4) % 8}s`,
  duration: `${12 + (i % 4) * 3}s`,
}))

function HeroParticles() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {PARTICLES.map((p) => (
        <span
          key={p.id}
          className="absolute animate-hero-drift rounded-full"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            animationDelay: p.delay,
            animationDuration: p.duration,
            backgroundColor: '#a6b1e1',
            opacity: 0.3,
            boxShadow: '0 0 12px rgba(166, 177, 225, 0.4)',
          }}
        />
      ))}
      {PARTICLES.slice(0, 10).map((p) => (
        <span
          key={`glow-${p.id}`}
          className="absolute animate-hero-glow rounded-full"
          style={{
            left: p.left,
            top: p.top,
            width: 6,
            height: 6,
            backgroundColor: '#424874',
            boxShadow: '0 0 16px rgba(66, 72, 116, 0.5)',
          }}
        />
      ))}
    </div>
  )
}

export default HeroParticles
