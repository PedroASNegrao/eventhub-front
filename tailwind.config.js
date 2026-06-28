/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        // Electric blue — the signature accent
        primary: {
          50: '#eef5ff',
          100: '#d9e7ff',
          200: '#bcd5ff',
          300: '#8ebaff',
          400: '#5993ff',
          500: '#316bff',
          600: '#1a4cf5',
          700: '#1539db',
          800: '#1830b1',
          900: '#1a2f8b',
          950: '#141d54',
        },
        // Cyan highlight used in gradients / glows
        accent: {
          400: '#38e1ff',
          500: '#06b6d4',
          600: '#0891b2',
        },
        // Blue-tinted near-black surfaces
        ink: {
          50: '#eef1fa',
          100: '#d6dcec',
          200: '#aab4d4',
          300: '#7783ad',
          400: '#4f5b82',
          500: '#344060',
          600: '#222c47',
          700: '#171f36',
          800: '#101728',
          900: '#0a0f1d',
          950: '#05070f',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 1px 2px 0 rgb(0 0 0 / 0.3), 0 1px 3px 0 rgb(0 0 0 / 0.4)',
        'soft-lg': '0 10px 30px -10px rgb(0 0 0 / 0.6), 0 4px 10px -4px rgb(0 0 0 / 0.5)',
        glow: '0 0 0 1px rgb(49 107 255 / 0.25), 0 10px 40px -12px rgb(26 76 245 / 0.6)',
        'glow-sm': '0 0 22px -6px rgb(49 107 255 / 0.55)',
        'glow-lg': '0 0 70px -14px rgb(49 107 255 / 0.6)',
        'inner-top': 'inset 0 1px 0 0 rgb(255 255 255 / 0.06)',
      },
      backgroundImage: {
        'grid-faint':
          'linear-gradient(to right, rgb(120 145 255 / 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgb(120 145 255 / 0.05) 1px, transparent 1px)',
        'brand-gradient': 'linear-gradient(120deg, #5993ff 0%, #316bff 45%, #38e1ff 100%)',
      },
      backgroundSize: {
        grid: '44px 44px',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(0, -18px) scale(1.04)' },
        },
        auroraShift: {
          '0%, 100%': { transform: 'translate3d(0,0,0) scale(1)', opacity: '0.55' },
          '33%': { transform: 'translate3d(6%, -4%, 0) scale(1.1)', opacity: '0.75' },
          '66%': { transform: 'translate3d(-5%, 5%, 0) scale(0.95)', opacity: '0.5' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        gradientPan: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.5s cubic-bezier(0.22, 1, 0.36, 1) both',
        'float-slow': 'floatSlow 9s ease-in-out infinite',
        aurora: 'auroraShift 16s ease-in-out infinite',
        'glow-pulse': 'glowPulse 4s ease-in-out infinite',
        shimmer: 'shimmer 1.8s infinite',
        'gradient-pan': 'gradientPan 6s ease infinite',
      },
    },
  },
  plugins: [],
}
