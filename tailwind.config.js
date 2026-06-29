/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html'],
  theme: {
    extend: {
      colors: {
        'tech-bg': '#252038',
        'tech-purple-dark': '#1E1A2E',
        'tech-purple-light': '#3D3658',
        'tech-purple-accent': '#524A72',
        'tech-gold': '#D4A088',
        'tech-gold-light': '#F0D4C8',
        'tech-gold-dark': '#B8836A',
        'tech-text': '#F5F3F0',
        'tech-text-muted': '#A8A4B8',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Montserrat', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
};
