/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          700: "#1D4C8B",
          800: "#153E78",
          900: "#0E3163"
        }
      },
      boxShadow: {
        card: "0 2px 8px rgba(0,0,0,0.08)"
      }
    },
  },
  plugins: [],
}
