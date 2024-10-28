const { nextui } = require('@nextui-org/react');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        darkBlue: '#005395',
      },
    },
  },
  darkMode: 'class',
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            primary: '#008BD0',
            white: 'white',
          },
        },
        dark: {
          colors: {},
        },
        purple: {
          colors: {
            primary: '#2C244D', // Sidebar background color
            sidebarBg: '#1F183E', // Sidebar box background color
            borderColor: '#616099', // Sidebar box border color
            hoverBg: '#555', // Sidebar hover color
            buttonBg: '#444', // Toggle button background
          },
        },
        green: {
          colors: {
            primary: '#2D6A4F', // Main green color for the theme
            sidebarBg: '#1B4332', // Sidebar background
            borderColor: '#40916C', // Sidebar border color
            hoverBg: '#74C69D', // Hover color for sidebar items
            buttonBg: '#081C15', // Toggle button background
            textColor: '#D8F3DC', // Text color for contrast
          },
        },
      },
    }),
  ],
};
