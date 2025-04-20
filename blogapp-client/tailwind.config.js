/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: { // ✅ Use extend to keep Tailwind's default colors
      
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        charter: ["Domine", "serif"],
        // gelasio: ["Gelasio", "serif"],
      },
    },
  },
  plugins: [],
}
