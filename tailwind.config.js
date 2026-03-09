/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // enable dark mode with a class
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        medical: {
          green: "#0F766E",
          turquoise: "#14B8A6",
          light: "#CCFBF1",
          dark: "#115E59",
          gray: "#F1F5F9"
        }
      }
    },
  },
  plugins: [],
}