const DASHES = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  left: `${(i * 23 + 3) % 100}%`,
  top: `${(i * 31 + 20) % 100}%`,
  width: 16 + (i % 4) * 10,
  delay: `${(i * 0.7) % 10}s`,
  duration: `${8 + (i % 4) * 3}s`,
}))

function AchievementsParticles() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {DASHES.map((d) => (
        <span
          key={d.id}
          className="absolute block h-1 animate-dash-drift rounded-full"
          style={{
            left: d.left,
            top: d.top,
            width: d.width,
            animationDelay: d.delay,
            animationDuration: d.duration,
            background: 'linear-gradient(90deg, transparent, #f4eeff, #dcd6f7, transparent)',
            boxShadow: '0 0 10px rgba(244, 238, 255, 0.5)',
          }}
        />
      ))}
    </div>
  )
}

export default AchievementsParticles
