/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef6ff',
          100: '#d9ecff',
          200: '#bcdcff',
          300: '#8ec5ff',
          400: '#58a4ff',
          500: '#2f7df0',
          600: '#1e5fce',
          700: '#1b4ba6',
          800: '#1c4087',
          900: '#1d386f'
        }
      }
    },
  },
  plugins: [],
}
