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
        primary: '#0066CC',
        'primary-dark': '#0052A3',
        secondary: '#00B894',
        accent: '#FF6B6B',
        dark: '#0F172A',
        light: '#F8FAFC',
      },
    },
  },
  plugins: [],
};
export default config;
