/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#d6eae5",
          200: "#add5cb",
          300: "#85c0b0",
          400: "#5cab96",
          500: "#33967c",
          600: "#297863",
          700: "#1f5a4a",
          800: "#143c32",
          900: "#0a1e19"
},
      }
    },
  },
  plugins: [],
}

