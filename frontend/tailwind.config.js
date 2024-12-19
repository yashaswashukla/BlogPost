import { transform } from "typescript";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        slideInFromTop: {
          "0%": { transform: "translateY(-200%)", opacity: "0" },
          "50%": { transform: "translateY(-25%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideOutToTop: {
          "0%": { transform: "translateY(0)", opacity: "1" },
          "50%": { transform: "translateY(-25%)", opacity: "0" },
          "100%": { transform: "translateY(-200%)", opacity: "0" },
        },
      },
      animation: {
        slideInFromTop: "slideInFromTop 0.5s ease-in-out forwards",
        slideOutToTop: "slideOutToTop 0.5s ease-in-out forwards",
      },
    },
  },
  plugins: [],
};
