import skills from '../data/skills.json'
import SkillsParticles from './particles/SkillsParticles'
import ScrollReveal from './ScrollReveal'

const IMAGES = import.meta.glob('../assets/skillsImages/*.png', {
  eager: true,
  query: '?url',
  import: 'default',
})

function getImageUrl(filename) {
  if (!filename) return ''
  const key = `../assets/skillsImages/${filename}`
  return IMAGES[key] || ''
}

function Skills() {
  return (
    <section
      id="skills"
      className="relative overflow-hidden bg-gradient-to-b from-[#a6b1e1] to-[#424874] px-4 py-20 font-sans md:px-8"
    >
      <SkillsParticles />

      <ScrollReveal className="relative z-10 mx-auto max-w-6xl">
        <h2 className="mb-12 text-center text-3xl font-bold text-fourth md:text-4xl">
          Skills
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {skills.map((skill) => (
            <article
              key={skill.id}
              className="flex flex-col items-center rounded-lg bg-second p-8 shadow-md transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="mb-4 flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-fourth p-2">
                <img
                  src={getImageUrl(skill.image)}
                  alt={skill.name}
                  className="h-full w-full object-contain"
                />
              </div>
              <h3 className="text-lg font-bold text-fourth">{skill.name}</h3>
            </article>
          ))}
        </div>
      </ScrollReveal>
    </section>
  )
}

export default Skills
