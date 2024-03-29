/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./**/*.{html,js,liquid}"],
    theme: {
      extend: {},
      container: {
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '2rem',
          xl: '2rem',
          '2xl': '2rem',
        },
      },
    },
    plugins: [],
  }