import certifications from '../data/certifications.json'
import CertificationsParticles from './particles/CertificationsParticles'
import ScrollReveal from './ScrollReveal'

// TODO: Replace cat placeholder URLs with real certification badge images from backend/CDN
function getPlaceholderImage(id) {
  return `https://cataas.com/cat?width=400&height=300&t=${id}`
}

function Certifications() {
  return (
    <section
      id="certifications"
      className="relative overflow-hidden bg-gradient-to-b from-[#a6b1e1] to-[#424874] px-4 py-20 font-sans md:px-8"
    >
      <CertificationsParticles />

      <ScrollReveal className="relative z-10 mx-auto max-w-6xl">
        <h2 className="mb-12 text-center text-3xl font-bold text-fourth md:text-4xl">
          Certifications &amp; Licenses
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {certifications.map((cert) => (
            <article
              key={cert.id}
              className="overflow-hidden rounded-lg bg-second shadow-md transition-transform duration-300 hover:-translate-y-1"
            >
              <img
                src={getPlaceholderImage(cert.id)}
                alt={cert.name}
                className="h-48 w-full object-cover"
              />
              <div className="p-5">
                <h3 className="text-lg font-bold text-fourth">{cert.name}</h3>
                <p className="mt-1 text-sm text-fourth/70">{cert.issuer}</p>
                <p className="mt-2 text-sm font-medium text-third">{cert.date}</p>
              </div>
            </article>
          ))}
        </div>
      </ScrollReveal>
    </section>
  )
}

export default Certifications
