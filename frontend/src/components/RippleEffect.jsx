import { useEffect, useRef } from 'react'

function RippleEffect() {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleClick = (e) => {
      const ripple = document.createElement('span')
      ripple.className = 'ripple'
      const size = Math.max(window.innerWidth, window.innerHeight) * 0.015
      ripple.style.width = ripple.style.height = `${size}px`
      ripple.style.left = `${e.clientX - size / 2}px`
      ripple.style.top = `${e.clientY - size / 2}px`
      container.appendChild(ripple)
      ripple.addEventListener('animationend', () => ripple.remove())
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  return <div ref={containerRef} className="ripple-container" />
}

export default RippleEffect