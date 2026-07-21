import { useInView } from '../hooks/useInView'

const HIDDEN = {
  up: 'translate-y-24',
  left: '-translate-x-24',
  right: 'translate-x-24',
}

function ScrollReveal({ children, className = '', direction = 'up' }) {
  const [ref, inView] = useInView(0.15)

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        inView ? 'translate-x-0 translate-y-0 opacity-100' : `${HIDDEN[direction] || HIDDEN.up} opacity-0`
      } ${className}`}
    >
      {children}
    </div>
  )
}

export default ScrollReveal
