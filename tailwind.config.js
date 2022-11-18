/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bgColor: "hsl(223, 19%, 93%)",
        counterBg: "hsl(228, 33%, 97%)",
        textColor: "hsl(211, 10%, 45%)",
        nameColor: "hsl(212, 24%, 26%)",
        counterText: "hsl(238, 40%, 52%)  ",
      },
    },
  },
  plugins: [],
};
