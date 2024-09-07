/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        slideOutRight: {
          '0%': { transform: 'translateX(0)', opacity: '1' },
          '100%': { transform: 'translateX(100vw)', opacity: '0' },
        },
      },
      animation: {
        slideOutRight: 'slideOutRight 0.5s ease-out forwards',
      },
    },
  },
  plugins: [],
}