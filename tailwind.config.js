/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#800000', // Maroon
        secondary: '#FF69B4', // Hot Pink
        accent: '#9370DB', // Medium Purple
      },
    },
  },
  plugins: [],
}
