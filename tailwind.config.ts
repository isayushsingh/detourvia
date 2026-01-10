import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
      sans: ['var(--font-inter)'],
      hand: ['var(--font-caveat)'],
      serif: ['var(--font-serif)'],
    },
    colors: {
      'paper': '#FDFBF7',
      'ink': '#2D2D2D',
    },
      boxShadow: {
        'card': '0 6px 16px rgba(0,0,0,0.08)',
      },
    },
  },
  plugins: [],
};

export default config;