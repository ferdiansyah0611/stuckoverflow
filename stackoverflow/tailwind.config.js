
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        main: '#000000',
        primary: {
          'middle': '#0d94882b'
        }
      }
    },
  },
  mode: 'jit',
  plugins: [
  	require('@tailwindcss/forms')
  ],
}