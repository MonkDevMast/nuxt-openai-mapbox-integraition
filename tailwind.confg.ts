/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./components/**/*.{js,vue,ts}",
      "./layouts/**/*.vue",
      "./pages/**/*.vue",
      "./plugins/**/*.{js,ts}",
      "./nuxt.config.{js,ts}",
      "./app.vue",
    ],
    theme: {
      extend: {
        fontFamily: {
          'machina-inktrap': ['"PP Neue Machina Inktrap"', 'sans-serif'],
          'machina-light': ['"PP Neue Machina Light"', 'sans-serif'],
          'machina-plain': ['"PP Neue Machina Plain"', 'sans-serif'],
          'machina-inktrap-ulbold': ['"PP Neue Machina Inktrap Ulbold"', 'sans-serif'],
          'dm-sans': ['"DM Sans"', 'sans-serif'],
        },
        // You can add or override other theme configurations here if needed
        // For example, extending colors:
        colors: {
          'primary': '#1585c6',
          'secondary': '#4db6e5',
          'accent': '#ff4d4d',
          'neutral': '#333333',
          'base-100': '#111111', // Example of a dark background color
          'base-200': '#1a1a1a', // Example of a slightly lighter dark color
          'base-300': '#222222',
          'text-primary': '#ffffff',
          'text-secondary': '#cccccc',
          'placeholder': '#666666',
        },
        // Extending spacing:
        spacing: {
          '7': '1.75rem',
          '9': '2.25rem',
          '11': '2.75rem',
          '13': '3.25rem',
          '15': '3.75rem',
          '17': '4.25rem',
          '19': '4.75rem',
        },
        // Extending box shadow (including your neon glow):
        boxShadow: {
          'neon-glow': '0 0 300px #1585c6, 0 0 200px #1585c6, 0 0 125px #1585c6, 0 0 75px #1585c6, 0 0 30px #1585c6, 0 0 15px #1585c6',
          'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.05)',
          'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          'inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
          'none': '0 0 #0000',
        },
        screens: {
          'comparisonDesktop': '1150px',
          'comparisonMobile': '500px',
        }
        // Extend other theme properties as needed (e.g., screens, borderRadius, etc.)
      },
    },
    plugins: [],
  }