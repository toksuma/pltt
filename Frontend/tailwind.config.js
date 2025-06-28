/** @type {import('tailwindcss').Config} */ // Nơi chứa các pugins 

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/typography"), 
    require("@tailwindcss/line-clamp"), 
  ],
}
