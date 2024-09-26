/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        keyframes: {
            pulse: {
                '0%, 100%': { opacity: '0.7' },
                '50%': { opacity: '1' },
            },
        },
        animation: {
            pulse: 'pulse 2s infinite',
        },
    },
},
  plugins: [],
}

