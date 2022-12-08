/** @type {import('tailwindcss').Config} */
module.exports = {
   content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
   theme: {
      extend: {
         colors: {
            darkText: "#222222",
            dark: "#222831",
            gray: "#393E46",
            gray2: "#454C56",
            gray3: "#9CABC8",
            green: "#1FAB89",
            blue: "#3282B8",
            red: "#903749",
            light: "#EEEEEE",
         },
         fontFamily: {
            inter: ["Inter", "Arial"],
         },
      },
   },
   plugins: [],
};
