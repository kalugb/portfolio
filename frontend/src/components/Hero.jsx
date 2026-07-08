import { useEffect, useState } from 'react'
import HeroParticles from './particles/HeroParticles'
import ScrollReveal from './ScrollReveal'

function Hero() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const timer = requestAnimationFrame(() => setIsLoaded(true))
    return () => cancelAnimationFrame(timer)
  }, [])

  return (
    <section
      id="about"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gradient-to-b from-[#f4eeff] to-[#dcd6f7] px-4 pb-16 pt-24 font-sans md:px-8"
    >
      <HeroParticles />

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        {/* Title stacked vertically — slide in from left/right with tilt */}
        <div className="flex flex-col items-center justify-center">
          <h1
            className={`font-title text-5xl font-black uppercase tracking-[0.25em] text-fourth transition-all duration-[800ms] ease-out md:text-7xl lg:text-8xl ${
              isLoaded
                ? 'translate-x-0 -rotate-6 opacity-100'
                : '-translate-x-[60vw] rotate-0 opacity-0'
            }`}
            style={{
              textShadow: '0 0 20px rgba(166, 177, 225, 0.4), 0 0 40px rgba(66, 72, 116, 0.2)',
            }}
          >
            Daniel
          </h1>
          <h1
            className={`font-title -mt-3 text-5xl font-black uppercase tracking-[0.25em] text-third transition-all duration-[800ms] ease-out md:-mt-5 md:text-7xl lg:-mt-6 lg:text-8xl ${
              isLoaded
                ? 'translate-x-0 rotate-6 opacity-100'
                : 'translate-x-[60vw] rotate-0 opacity-0'
            }`}
          >
            Yong
          </h1>
        </div>

        <ScrollReveal className="mx-auto mt-16 max-w-2xl md:mt-20">
          <h2 className="mb-4 text-xl font-bold text-fourth md:text-2xl">
            About Me
          </h2>
          <p className="text-base leading-relaxed text-fourth/80 md:text-lg">
            I&apos;m a software developer passionate about building clean, accessible web
            experiences. With a background in full-stack development and a love for
            problem-solving, I enjoy turning complex ideas into intuitive digital products.
            When I&apos;m not coding, you&apos;ll find me exploring new technologies or
            contributing to open-source projects.
          </p>
        </ScrollReveal>
      </div>
    </section>
  )
}

export default Hero
