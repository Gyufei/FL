/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      colors: {
        black: "var(--color-black)",
        yellow: "var(--color-yellow)",
        green: "var(--color-green)",
        red: "var(--color-red)",
        lightgray: "var(--color-lightgray)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
