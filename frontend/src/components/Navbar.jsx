const navLinks = [
  { label: 'About Me', id: 'about' },
  { label: 'Achievements', id: 'achievements' },
  { label: 'Certifications & Licenses', id: 'certifications' },
  { label: 'Contact Info', id: 'contact' },
]

function Navbar() {
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-fourth font-sans shadow-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-10">
        <button
          type="button"
          onClick={() => scrollToSection('about')}
          className="font-title text-lg font-bold tracking-wider text-first transition-opacity duration-300 hover:opacity-80"
        >
          DY
        </button>
        <ul className="flex flex-wrap items-center gap-3 md:gap-6">
          {navLinks.map((link) => (
            <li key={link.id}>
              <button
                type="button"
                onClick={() => scrollToSection(link.id)}
                className="text-sm text-second transition-opacity duration-300 hover:text-first md:text-base"
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
