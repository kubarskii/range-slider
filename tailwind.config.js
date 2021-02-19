const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class',
  theme: {
    extend: {
      borderWidth: {
        'strange': '1.5px solid',
      },
      width: {
        '30px': '30px',
        '6px': '6px',
        '15': '3.75rem'
      },
      height: {
        '30px': '30px',
        '6px': '6px',
        '18px': '18px',
      },
      margin: {
        'r-25px': '0 25px 0 0',
        'r-22px': '0 22px 0 0',
      },
    },
    colors: {
      gray: {
        100: '#F4F4F5',
        200: '#E5E7EB',
        400: '#A3A3A3',
        800: '#262626',
        900: '#171717',
      },
      black: '#000000',
      white: '#ffffff',
      blue: {
        600: '#2563EB'
      },
      transparent: 'transparent',
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
