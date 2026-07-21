import { useState } from 'react'
import { Expand } from 'lucide-react'
import certifications from '../data/certifications.json'
import CertificationsParticles from './particles/CertificationsParticles'
import ScrollReveal from './ScrollReveal'
import ImageModal from './ImageModal'

const IMAGES = import.meta.glob('../assets/certsImages/*.png', {
  eager: true,
  query: '?url',
  import: 'default',
})

function getImageUrl(filename) {
  if (!filename) return ''
  const key = `../assets/certsImages/${filename}`
  return IMAGES[key] || ''
}

function Certifications() {
  const [selectedImage, setSelectedImage] = useState(null)

  return (
    <section
      id="certifications"
      className="relative overflow-hidden bg-gradient-to-b from-[#a6b1e1] to-[#424874] px-4 py-20 font-sans md:px-8"
    >
      <CertificationsParticles />

      <div className="relative z-10 mx-auto max-w-6xl">
        <ScrollReveal>
          <h2 className="mb-12 text-center text-3xl font-bold text-fourth md:text-4xl">
            Certifications &amp; Licenses
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {certifications.map((cert) => (
            <ScrollReveal key={cert.id} duration={500}>
              <article className="overflow-hidden rounded-lg bg-second shadow-md transition-transform duration-300 hover:-translate-y-1">
                <div className="group relative">
                  <button
                    onClick={() => setSelectedImage(getImageUrl(cert.image))}
                    className="block w-full cursor-pointer"
                  >
                    <img
                      src={getImageUrl(cert.image)}
                      alt={cert.name}
                      className="h-48 w-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/50">
                      <span className="flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-fourth opacity-0 shadow-lg transition-opacity duration-300 group-hover:opacity-100">
                        <Expand size={16} />
                        Click to see full view
                      </span>
                    </div>
                  </button>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-fourth">{cert.name}</h3>
                  <p className="mt-1 text-sm text-fourth/70">{cert.issuer}</p>
                  <p className="mt-2 text-sm font-medium text-third">{cert.date}</p>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {selectedImage && (
        <ImageModal
          src={selectedImage}
          alt="Certification image"
          onClose={() => setSelectedImage(null)}
        />
      )}
    </section>
  )
}

export default Certifications
