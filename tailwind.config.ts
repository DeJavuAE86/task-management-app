import type { Config } from 'tailwindcss';

const config: Config = {
  prefix: 'tw-',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-geist-sans)'],
        mono: ['var(--font-geist-mono)'],
      },
      keyframes: {
        'sakura-fall': {
          '0%': {
            transform: 'translateY(-10vh) rotate(0deg)',
            opacity: '1',
          },
          '100%': {
            transform: 'translateY(100vh) rotate(360deg)',
            opacity: '0',
          },
        },
      },
      animation: {
        'sakura-fall': 'sakura-fall 10s linear forwards',
      },
    },
  },
  plugins: [],
};

export default config;
