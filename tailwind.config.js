/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#F4C158", // --color-1
        accent: "#EF9A1D", // --color-4
        secondary: "#421D0D", // --color-2
        darkAccent: "#1B0703",
        background: "#0D0000", // --color-3
        cream: "#FFFBBD", // --color-5
        white: "#FFFFFF",
      },
    },
  },
  plugins: [],
};
