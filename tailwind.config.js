module.exports = {
  purge: ['./dist/*.html'],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      filter: ["dark"],
      brightness: ["dark"],
      invert: ["dark"],
    },
  },
  plugins: [],
};
