import { useState } from 'react'
import { Expand } from 'lucide-react'
import achievements from '../data/achievements.json'
import AchievementsParticles from './particles/AchievementsParticles'
import ScrollReveal from './ScrollReveal'
import ImageModal from './ImageModal'

const IMAGES = import.meta.glob('../assets/achievementImages/*.png', {
  eager: true,
  query: '?url',
  import: 'default',
})

function getImageUrl(filename) {
  if (!filename) return ''
  const key = `../assets/achievementImages/${filename}`
  return IMAGES[key] || ''
}

function Achievements() {
  const [selectedImage, setSelectedImage] = useState(null)

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
              {item.image && (
                <div className="group relative w-full shrink-0 overflow-hidden rounded-lg shadow-md md:w-1/2">
                  <button
                    onClick={() => setSelectedImage(getImageUrl(item.image))}
                    className="block w-full cursor-pointer"
                  >
                    <img
                      src={getImageUrl(item.image)}
                      alt={item.title}
                      className="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-[1.02] md:h-72"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/50">
                      <span className="flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-fourth opacity-0 shadow-lg transition-opacity duration-300 group-hover:opacity-100">
                        <Expand size={16} />
                        Click to see full view
                      </span>
                    </div>
                  </button>
                </div>
              )}

              <div className={`${item.image ? 'w-full md:w-1/2' : 'w-full'}`}>
                <span className="text-sm font-medium text-second">{item.date}</span>
                <h3 className="mt-1 text-2xl font-bold text-first">{item.title}</h3>
                <p className="mt-3 leading-relaxed text-first/90">{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </ScrollReveal>

      {selectedImage && (
        <ImageModal
          src={selectedImage}
          alt="Achievement image"
          onClose={() => setSelectedImage(null)}
        />
      )}
    </section>
  )
}

export default Achievements
