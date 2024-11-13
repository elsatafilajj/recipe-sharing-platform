module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      scrollBehavior: ['smooth'],
      colors: {
        beige: {
          300: '#f5f5dc', 
          400: '#e6e0c8', 
        },
        gray: {
          700: '#4a4a4a', 
        },
      },
    },
  },
  plugins: [],
}
