import type { Config } from 'tailwindcss'

export default <Config>{
  content: [
    './app/components/**/*.{vue,ts}',
    './app/layouts/**/*.vue',
    './app/pages/**/*.vue',
    './app/composables/**/*.ts',
    './app/plugins/**/*.ts',
    './app/app.vue',
    './app/error.vue',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f0ff',
          100: '#e0e0ff',
          200: '#c2c1ff',
          300: '#a3a1ff',
          400: '#8580ff',
          500: '#6C63FF',
          600: '#5650e6',
          700: '#403dcc',
          800: '#2a2ab3',
          900: '#141799',
          950: '#0a0d66',
        },
        surface: {
          950: '#000000',
          900: '#0a0a0a',
          800: '#141414',
          700: '#1e1e1e',
          600: '#2a2a2a',
          500: '#3a3a3a',
        },
      },
      fontFamily: {
        sans: ['Sora', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        display: ['Sora', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-hero': ['clamp(4rem, 10vw, 10rem)', { lineHeight: '0.9', letterSpacing: '-0.04em' }],
        'display-xl': ['4.5rem', { lineHeight: '1.0', letterSpacing: '-0.03em' }],
        'display-lg': ['3.5rem', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-md': ['2.5rem', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
        'display-sm': ['2rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'marquee': ['clamp(3rem, 8vw, 8rem)', { lineHeight: '1', letterSpacing: '-0.02em' }],
      },
      borderRadius: {
        'card': '16px',
        'card-inner': '12px',
        'button': '10px',
        'badge': '6px',
      },
      animation: {
        'shimmer': 'shimmer 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 4s linear infinite',
      },
      keyframes: {
        shimmer: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#A0A3BD',
            a: { color: '#6C63FF' },
            h1: { color: '#F0F0F8' },
            h2: { color: '#F0F0F8' },
            h3: { color: '#F0F0F8' },
            h4: { color: '#F0F0F8' },
            strong: { color: '#F0F0F8' },
            code: { color: '#a3a1ff' },
            'code::before': { content: '""' },
            'code::after': { content: '""' },
            blockquote: { color: '#A0A3BD', borderLeftColor: '#363966' },
            hr: { borderColor: '#1e2042' },
            'thead th': { color: '#F0F0F8' },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
