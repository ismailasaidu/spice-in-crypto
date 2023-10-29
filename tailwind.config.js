/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,css}"],
  theme: {
    extend: {},

    flexGrow: {
      2: "2",
    },

    values: {
      "100px": "100px",
    },
    screens: {
      "2xl": { max: "1535px" },
      // => @media (max-width: 1535px) { ... }

      xl: { max: "1279px" },
      // => @media (max-width: 1279px) { ... }

      lg: { max: "1023px" },
      // => @media (max-width: 1023px) { ... }

      md: { max: "1224px" },
      // => @media (max-width: 767px) { ... }

      sm: { max: "639px" },
      // => @media (max-width: 639px) { ... }

      // 'sm-landscape': {'raw': '(max-width: 639px) and (orientation: landscape)'},
    },

    fontFamily: {
      MT: ["Montserrat'"],
    },
    colors: {
      blue: "#0F1231",
      black: "#000000",
      headerwhite: "#EFEEEF",
      lightblack: "#191919",
      textcolor: "#272A31",
      lightblue: "#2C9ED7",
      white: "#FFFFFF",
      footer: "#8B8A8B",
      grey: "#716B6B",
      rescol: "#1d1d1d",
      divider: "#E8E8E8",
      darktext: "#3A3939",
      back: "#EBEBEB",
      anime: "#74DAB5",
    },
    fontFamily: {
      MT: ["Montserrat'"],
    },
  },
  plugins: [],
};
