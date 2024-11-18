/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customRed: '#F63428',
        customOrange: '#FF9D14',
        customYellow: '#EBB12A',
        customBlack: '#0F0A02',
        customGray: '#EAEAEA',
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'], // Montserrat como fuente sans
      },
    },
  },
  plugins: [],
}
