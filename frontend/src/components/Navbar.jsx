import { useState, useRef, useEffect } from 'react'

const navLinks = [
  { label: 'About Me', id: 'about' },
  { label: 'Achievements', id: 'achievements' },
  { label: 'Certifications & Licenses', id: 'certifications' },
  { label: 'Skills', id: 'skills' },
  { label: 'Contact Info', id: 'contact' },
]

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setIsOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

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
        <ul className="hidden items-center gap-6 md:flex">
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
        <div className="relative md:hidden" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className={`flex items-center rounded border p-2 transition-colors duration-200 ${isOpen ? 'border-first bg-first/10 text-first' : 'border-first/30 bg-fourth text-second'}`}
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 12h18" />
              <path d="M3 6h18" />
              <path d="M3 18h18" />
            </svg>
          </button>
          {isOpen && (
            <div className="absolute right-0 top-full z-50 mt-2 flex w-56 max-w-[80vw] flex-col overflow-hidden rounded border border-first/20 bg-fourth shadow-lg">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => scrollToSection(link.id)}
                  className="truncate px-4 py-2.5 text-left text-sm text-second transition-colors duration-200 hover:bg-first/10 hover:text-first"
                >
                  {link.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
