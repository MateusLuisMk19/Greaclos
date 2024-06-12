/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "#D9D9D9",
      black: "#000000",
      paleteOne: {
        100: "#F0E9F0",
        200: "#D2C4D2",
        300: "#B39EB3",
        400: "#4D194D",
        500: "#3E1F47",
      },
      paleteTwo: {
        100: "#006466",
        200: "#065B61",
        300: "#0B525B",
        400: "#212F45",
        500: "#272640",
      },
      yellow: {
        100: "#E7D384",
        200: "#E0C762",
        300: "#D9BB41",
        400: "#CAA928",
        500: "#A88D21",
      },
      orange: {
        100: "#F58A51",
        200: "#F3732F",
        300: "#F05D0E",
        400: "#CD500C",
        500: "#AB420A",
      },
      blue: {
        100: "#8FD3F7",
        200: "#66C3F4",
        300: "#3EB3F2",
        400: "#15A3EF",
        500: "#0E89CB",
      },
    },
  },
  plugins: [],
};
