/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#6A9C89',
        'bg-secondary': '#E9EFEC',
        'primary': '#16423C',
      },
    },
  },
  plugins: [],
}

