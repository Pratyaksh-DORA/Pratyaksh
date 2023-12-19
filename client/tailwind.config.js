/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#864cf6',
        background: '#f8f9fd',
        secondary: '#FF5722',
        searchGray: '#E5EAEF',
        iconsLight: '#666666',
        iconDark: '#333333',
        negFeedback: '#FF686B',
        neutral: '#ffcc5f',
        highlight: '#F9A620',
        posFeedback: '#9EE493'
      },
    },
  },
  plugins: [],
}
