import { Analytics } from '@vercel/analytics/react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Achievements from './components/Achievements'
import Certifications from './components/Certifications'
import Skills from './components/Skills'
import ContactFooter from './components/ContactFooter'
import ChatWidget from './components/ChatWidget'
import RippleEffect from './components/RippleEffect'

function App() {
  return (
    <>
      <RippleEffect />
      <Navbar />
      <main>
        <Hero />
        <Achievements />
        <Certifications />
        <Skills />
        <ContactFooter />
      </main>
      <ChatWidget />
      <Analytics />
    </>
  )
}

export default App
