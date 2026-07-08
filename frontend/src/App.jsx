import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Achievements from './components/Achievements'
import Certifications from './components/Certifications'
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
        <ContactFooter />
      </main>
      <ChatWidget />
    </>
  )
}

export default App
