/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {
      colors: {
        Grey50: "#EBEEF5",
        Grey300: "#8E95A9",
        Primary400: "#7B6EF6",
        White100: "#FFFFFF",
        Grey900: "#121829",
        Primary500: "#5A4AF4",
        Grey700: "#323B54",
        Black10: "#0000001A",
        Block80: "#20283ECC",
        Primary800: "#251E62",
        Primary300: "#9C92F8",
        Primary600: "#483BC3",
        Primary700: "#362C92",
        Primary50: "#EBE9FE",
        Grey800: "#20283E",
        Primary200: "#BEB7FB",
        Warning500: "#FFAD49",
        Black65: "#000000",
        Grey400: "#767E94",
        Grey100: "#C3C8D4",
      },
      fontSize: {
        "custom-64": "64px",
      },
      fontFamily: {
        Poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [flowbite.plugin()],
};
