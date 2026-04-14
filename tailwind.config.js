/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          0: '#08080d',
          1: '#0c0c14',
          2: '#12121e',
          3: '#16162a',
          4: '#1c1c36',
        },
        accent: '#FF6B47',
        'accent-light': '#FF8A5C',
        'accent-dim': '#CC4420',
        brand: '#8B5CF6',
        'brand-light': '#A78BFA',
        'brand-dim': '#6D28D9',
        success: '#34D399',
        warning: '#FBBF24',
        danger: '#FB7185',
        sky: '#38BDF8',
      },
      fontFamily: {
        display: ['Space Grotesk', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'slide-up': 'slideUp 0.6s cubic-bezier(0.16,1,0.3,1)',
        'slide-in-right': 'slideInRight 0.5s cubic-bezier(0.16,1,0.3,1)',
        'fade-in': 'fadeIn 0.4s ease-out',
        'scale-in': 'scaleIn 0.3s cubic-bezier(0.16,1,0.3,1)',
        'shimmer': 'shimmer 2.5s linear infinite',
        'spin-slow': 'spin 12s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4,0,0.6,1) infinite',
        'bounce-soft': 'bounceSoft 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-12px) rotate(0.5deg)' },
          '66%': { transform: 'translateY(-6px) rotate(-0.5deg)' },
        },
        glowPulse: {
          '0%,100%': { opacity: '0.4', filter: 'blur(40px)' },
          '50%': { opacity: '0.8', filter: 'blur(60px)' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          from: { opacity: '0', transform: 'translateX(-24px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        scaleIn: {
          from: { opacity: '0', transform: 'scale(0.95)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1200px 0' },
          '100%': { backgroundPosition: '1200px 0' },
        },
        bounceSoft: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
      boxShadow: {
        'glow': '0 0 30px rgba(255,107,71,0.3)',
        'glow-sm': '0 0 15px rgba(255,107,71,0.2)',
        'glow-lg': '0 0 60px rgba(255,107,71,0.35)',
        'glow-violet': '0 0 25px rgba(139,92,246,0.3)',
        'glow-success': '0 0 20px rgba(52,211,153,0.3)',
        'card': '0 2px 8px rgba(0,0,0,0.3), 0 1px 2px rgba(0,0,0,0.2)',
        'card-hover': '0 8px 32px rgba(0,0,0,0.5), 0 0 20px rgba(255,107,71,0.08)',
        'glass': '0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)',
        'modal': '0 25px 80px rgba(0,0,0,0.8)',
      },
    },
  },
  plugins: [],
}
