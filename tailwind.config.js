/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        colorBg: "#9CAAC5",
        primary: "#114084",
        secondary: "#114084",
        accent: "#000062",
        warning: "#CE0000",
        inputBg: "#5A79A5"
      },
    },
  },
  plugins: [],
};
