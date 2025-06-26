/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/typography"), // ✅ thêm plugin typography tại đây
    require("@tailwindcss/line-clamp"), 
  ],
}
