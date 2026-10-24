
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './public/**/*.html',
    './public/js/**/*.js',
    './js/**/*.js',
  ],

  theme: {
    extend: {
      colors: {
        brand: '#DDBE6F',
        gold: '#B89A55',
        deep: '#2A5A3A',
        surface: '#224D31',
        ink: '#EAF1EC',
        mute: '#B9CBC0',
        line: '#4A7F5E',
        leaf: '#58B368',
      },
    },
  },

  plugins: [],
};