/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,html,css}"],
  theme: {
    extend: {
      fontFamily: {
        sans: "Aldrich, sans-serif",
      },
    },
  },
  plugins: [],
};

process.env.TAILWIND_DISABLE_TOUCH = true;
