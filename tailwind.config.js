/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#F2B544",
        accent: "#F2EA7E",
        secondary: "#8C4303",
        darkAccent: "#592202",
        background: "#0D0D0D",
      },
    },
  },
  plugins: [],
};

