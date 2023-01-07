/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "weather-primary": "#E7EDFA",
        "weather-secondary": "#004E71",
      },
    },
    fontFamily: {
      TitilliumWeb: ["Titillium Web, sans-serif"],
    },
    container: {
      padding: "2rem",
      center: true,
    },
  },
  plugins: [],
};
