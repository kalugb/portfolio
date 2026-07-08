import { useInView } from '../hooks/useInView'

function ScrollReveal({ children, className = '' }) {
  const [ref, inView] = useInView(0.15)

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        inView ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0'
      } ${className}`}
    >
      {children}
    </div>
  )
}

export default ScrollReveal
