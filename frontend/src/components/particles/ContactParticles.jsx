const EMBERS = Array.from({ length: 22 }, (_, i) => ({
  id: i,
  left: `${(i * 17 + 10) % 90}%`,
  bottom: `${-(i * 13) % 40}%`,
  size: 4 + (i % 4) * 2,
  delay: `${(i * 0.8) % 12}s`,
  duration: `${8 + (i % 5) * 3}s`,
}))

function ContactParticles() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {EMBERS.map((e) => (
        <span
          key={e.id}
          className="absolute animate-ember-rise rounded-full"
          style={{
            left: e.left,
            bottom: e.bottom,
            width: e.size,
            height: e.size,
            animationDelay: e.delay,
            animationDuration: e.duration,
            backgroundColor: '#dcd6f7',
            opacity: 0.4,
            boxShadow: '0 0 10px rgba(220, 214, 247, 0.6)',
          }}
        />
      ))}
      {EMBERS.slice(0, 10).map((f) => (
        <span
          key={`flicker-${f.id}`}
          className="absolute animate-ember-flicker rounded-full"
          style={{
            left: `calc(${f.left} + 12px)`,
            bottom: `calc(${f.bottom} + 5%)`,
            width: f.size * 0.7,
            height: f.size * 0.7,
            backgroundColor: '#f4eeff',
            opacity: 0.5,
            boxShadow: '0 0 14px rgba(244, 238, 255, 0.6)',
            animationDelay: `${(f.id * 0.7) % 4}s`,
          }}
        />
      ))}
    </div>
  )
}

export default ContactParticles
