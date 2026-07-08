import { Github, Linkedin } from 'lucide-react'
import contacts from '../data/contacts.json'
import ContactParticles from './particles/ContactParticles'
import ScrollReveal from './ScrollReveal'

const iconMap = {
  Github,
  Linkedin,
}

function ContactFooter() {
  return (
    <footer
      id="contact"
      className="relative overflow-hidden bg-gradient-to-b from-[#424874] to-[#2f4550] px-4 py-16 font-sans md:px-8"
    >
      <ContactParticles />

      <ScrollReveal className="relative z-10 mx-auto max-w-6xl text-center">
        <h2 className="mb-8 text-3xl font-bold text-first md:text-4xl">
          Contact Info
        </h2>

        <ul className="flex flex-wrap items-center justify-center gap-8">
          {contacts.map((contact) => {
            const Icon = iconMap[contact.icon]
            return (
              <li key={contact.id}>
                <a
                  href={contact.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-first transition-opacity duration-300 hover:opacity-80"
                >
                  {Icon && <Icon size={24} />}
                  <span className="text-lg">{contact.platform}</span>
                </a>
              </li>
            )
          })}
        </ul>

        <p className="mt-12 text-sm text-second/70">
          &copy; {new Date().getFullYear()} Daniel Yong. All rights reserved.
        </p>
      </ScrollReveal>
    </footer>
  )
}

export default ContactFooter
