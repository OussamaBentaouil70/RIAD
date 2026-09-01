/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        charcoal: '#3D2B34',
        taupe: '#7A5C68',
        rose: '#E87DA0',
        blush: '#F9A8C4',
        plum: '#280F19',
        green: '#2A6E45',
        mint: '#D4F7E0',
        sage: '#8EDC9E',
        cream: '#FFF9F6',
        beige: '#F6EDE6',
        lightblush: '#FDE8EE',
        ivory: '#F5EDE8',
        lavender: '#F3EEF8',
        gray: '#767676',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Jost', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
