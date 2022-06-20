/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{html,ts}"],
  theme: {
    listStyleType: {
      square: "square",
    },
    container: {
      padding: {
        default: "1rem",
        sm: "3rem",
        md: "5rem",
        lg: "7rem",
        xl: "9rem",
      },
    },
    extend: {},
  },
  plugins: [require("tailwindcss"), require("autoprefixer")],
};
