const colors = require('tailwindcss/colors')



/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{vue,js,ts}"],
    theme: {
        colors: {
         green: colors.green,
        },
        fontFamily: {
            "raleway": "Raleway",
            'sans': ['"Proxima Nova"', ...defaultTheme.fontFamily.sans],
            
      },
    },
    plugins: [],
  };