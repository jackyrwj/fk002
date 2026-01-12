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
        heading: ['var(--font-poppins)', 'sans-serif'],
        body: ['var(--font-open-sans)', 'sans-serif'],
      },
      colors: {
        // Memphis Design Colors
        primary: {
          DEFAULT: '#FF71CE',
          dark: '#FF1493',
          light: '#FFB3E6',
        },
        secondary: {
          DEFAULT: '#FFCE5C',
          dark: '#FFB300',
          light: '#FFE08A',
        },
        accent: {
          DEFAULT: '#86CCCA',
          dark: '#5FBDBA',
          light: '#B3E0DF',
        },
        purple: {
          DEFAULT: '#6A7BB4',
          dark: '#4A5A94',
          light: '#9AA8D4',
        },
        success: '#10b981',
        error: '#ef4444',
        background: '#FFF9F0',
        surface: '#FFFFFF',
      },
    },
  },
  plugins: [],
};
export default config;
