import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    'aspect-square',
    'aspect-video',
    'aspect-[3/4]',
    'aspect-[4/3]',
    'aspect-[16/10]',
    'aspect-[16/7]',
    'line-clamp-2',
    'order-1',
    'order-2',
    'columns-2',
    'columns-3',
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['var(--font-poppins)', 'sans-serif'],
        noto: ['var(--font-noto)', 'sans-serif'],
      },
      colors: {
        black: '#111111',
        white: '#ffffff',
      },
      screens: {
        sp: { max: '767px' },
      },
      animation: {
        'scroll-down': 'scrollDown 1.6s cubic-bezier(.4,0,.2,1) infinite',
      },
      keyframes: {
        scrollDown: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(280%)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
