/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2B7A4B',
          dark: '#1E5434',
          light: '#4C9F6E',
        },
        secondary: {
          DEFAULT: '#FFA500',
          dark: '#CC8400',
          light: '#FFB733',
        },
      },
    },
  },
  plugins: [],
}
