// tailwind.config.js
module.exports = {
  purge: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html',
  ],
  darkMode: false,
  theme: {
    extend: {
      boxShadow: {
        neumorph: '20px 20px 50px rgba(0, 0, 0, 0.6), -20px -20px 50px rgba(255, 255, 255, 0.2)',
      },
      backgroundColor: {
        'blue-500': '#3498db',
        'blue-600': '#2980b9',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
