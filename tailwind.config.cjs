/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html",
  "./Client/**/*.jsx"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}

