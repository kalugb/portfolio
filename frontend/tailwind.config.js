/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      colors: {
        first: '#f4eeff',
        second: '#dcd6f7',
        third: '#a6b1e1',
        fourth: '#424874',
        accentPeach: {
          light: '#f7e1d7',
          dark: '#f2c6b0',
        },
        accentTeal: {
          light: '#3f5765',
          dark: '#2f4550',
        },
        accentRose: {
          light: '#e8c1c5',
          dark: '#d99aa1',
        },
      },
      fontFamily: {
        title: ['Orbitron', 'sans-serif'],
        sans: ['Sora', 'sans-serif'],
      },
      animation: {
        'hero-drift': 'heroDrift 20s ease-in-out infinite',
        'hero-glow': 'heroGlow 4s ease-in-out infinite alternate',
        'dash-drift': 'dashDrift 16s linear infinite',
        'square-float': 'squareFloat 18s ease-in-out infinite',
        'square-pulse': 'squarePulse 3s ease-in-out infinite alternate',
        'ember-rise': 'emberRise 14s linear infinite',
        'ember-flicker': 'emberFlicker 2s ease-in-out infinite alternate',
      },
      keyframes: {
        heroDrift: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)', opacity: '0.2' },
          '25%': { transform: 'translate(40px, -30px) scale(1.4)', opacity: '0.4' },
          '50%': { transform: 'translate(-20px, -50px) scale(0.8)', opacity: '0.3' },
          '75%': { transform: 'translate(30px, -15px) scale(1.3)', opacity: '0.4' },
        },
        heroGlow: {
          '0%': { boxShadow: '0 0 6px rgba(66, 72, 116, 0.15)', opacity: '0.5' },
          '100%': { boxShadow: '0 0 30px rgba(66, 72, 116, 0.45)', opacity: '1' },
        },
        dashDrift: {
          '0%': { transform: 'translate(-40px, 40px) rotate(-45deg)', opacity: '0' },
          '10%': { opacity: '0.3' },
          '50%': { opacity: '0.4' },
          '90%': { opacity: '0.3' },
          '100%': { transform: 'translate(calc(100vw + 40px), calc(-100vh - 40px)) rotate(-45deg)', opacity: '0' },
        },
        squareFloat: {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg) scale(1)', opacity: '0.15' },
          '25%': { transform: 'translate(24px, -16px) rotate(90deg) scale(1.25)', opacity: '0.3' },
          '50%': { transform: 'translate(-16px, -32px) rotate(180deg) scale(0.85)', opacity: '0.25' },
          '75%': { transform: 'translate(14px, -8px) rotate(270deg) scale(1.2)', opacity: '0.3' },
        },
        squarePulse: {
          '0%': { opacity: '0.15' },
          '100%': { opacity: '0.35' },
        },
        emberRise: {
          '0%': { transform: 'translateY(0) translateX(0)', opacity: '0.4' },
          '25%': { transform: 'translateY(-28vh) translateX(12px)', opacity: '0.35' },
          '50%': { transform: 'translateY(-55vh) translateX(-8px)', opacity: '0.25' },
          '75%': { transform: 'translateY(-82vh) translateX(10px)', opacity: '0.12' },
          '100%': { transform: 'translateY(-110vh) translateX(-5px)', opacity: '0' },
        },
        emberFlicker: {
          '0%': { opacity: '0.2' },
          '100%': { opacity: '0.5' },
        },
      },
    },
  },
}
