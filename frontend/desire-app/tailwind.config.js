/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#4B2826",
        secondary: "#8B7555",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".no-scrollbar::-webkit-scrollbar": {
          display: "none",
        },
        "no-scrollbar": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "non",
        },
      };

      addUtilities(newUtilities);
    },
  ],
};
