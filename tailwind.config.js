/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brandYellow: '#FF9D14',
        brandGrey: '#D3D3D3',
        primary: "#FF9D14",
        secondary: "#EBB12A",
        tertiary: "#F63428",
        light: "#EAEAEA",
        dark: "#0F0A02",
      },
      fontFamily: {
        sans: ["Montserrat", "sans-serif"]
      }
    },
  },
  plugins: [],
}
