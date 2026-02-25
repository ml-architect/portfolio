import type { Config } from 'tailwindcss'

export default <Config>{
  content: [
    './components/**/*.{vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './composables/**/*.ts',
    './plugins/**/*.ts',
    './app.vue',
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
          950: '#0a0b14',
          900: '#0f1021',
          800: '#161830',
          700: '#1e2042',
          600: '#272a54',
          500: '#363966',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.03em' }],
        'display-lg': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-md': ['2.5rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        'display-sm': ['2rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
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
