/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", // Ensures index.html is scanned for Tailwind classes
    "./src/**/*.{js,ts,jsx,tsx}", // Scans all JavaScript and TypeScript files
  ],
  theme: {
    extend: {
      colors: {
        green: {
          600: '#38a169',
          900: '#276749',
        },
      },
      backgroundImage: {
        'gradient-to-b': 'linear-gradient(to bottom, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'), // Enables scrollbar customization
  ],
};
