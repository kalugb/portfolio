import achievements from '../data/achievements.json'
import AchievementsParticles from './particles/AchievementsParticles'
import ScrollReveal from './ScrollReveal'

// TODO: Replace cat placeholder URLs with real achievement images from backend/CDN
function getPlaceholderImage(id) {
  return `https://cataas.com/cat?width=400&height=300&t=${id}`
}

function Achievements() {
  return (
    <section
      id="achievements"
      className="relative overflow-hidden bg-gradient-to-b from-[#a6b1e1] to-[#424874] px-4 py-20 font-sans md:px-8"
    >
      <AchievementsParticles />

      <ScrollReveal className="relative z-10 mx-auto max-w-6xl">
        <h2 className="mb-12 text-center text-3xl font-bold text-first md:text-4xl">
          Achievements
        </h2>

        <div className="flex flex-col gap-16">
          {achievements.map((item, index) => (
            <article
              key={item.id}
              className={`flex flex-col items-center gap-8 md:flex-row ${
                index % 2 === 1 ? 'md:flex-row-reverse' : ''
              }`}
            >
              <div className="w-full shrink-0 overflow-hidden rounded-lg shadow-md md:w-1/2">
                <img
                  src={getPlaceholderImage(item.id)}
                  alt={item.title}
                  className="h-64 w-full object-cover transition-transform duration-300 hover:scale-[1.02] md:h-72"
                />
              </div>

              <div className="w-full md:w-1/2">
                <span className="text-sm font-medium text-second">{item.date}</span>
                <h3 className="mt-1 text-2xl font-bold text-first">{item.title}</h3>
                <p className="mt-3 leading-relaxed text-first/90">{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </ScrollReveal>
    </section>
  )
}

export default Achievements
