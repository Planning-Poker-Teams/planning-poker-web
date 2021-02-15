module.exports = {
  purge: {
    preserveHtmlElements: false,
  },
  plugins: [require('tailwindcss')('tailwind.js')],
};
