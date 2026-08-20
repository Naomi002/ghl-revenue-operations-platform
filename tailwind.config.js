/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        slate: {
          primary: '#243B4A',
          secondary: '#2D4654',
          dark: '#1A2B37',
        },
        charcoal: {
          DEFAULT: '#4E4D5C',
          muted: '#616070',
          border: 'rgba(78, 77, 92, 0.4)',
          hairline: 'rgba(78, 77, 92, 0.25)',
        },
        mauve: {
          DEFAULT: '#805E73',
          hover: '#684A5D',
          light: '#9B748D',
        },
        ice: {
          DEFAULT: '#87BCDE',
          hover: '#6EA9CF',
          light: '#B0D5EC',
        }
      },
      fontFamily: {
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        heading: ['"Manrope"', 'sans-serif'],
        sans: ['"Inter"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
