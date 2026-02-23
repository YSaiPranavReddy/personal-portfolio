/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#090909", // dark bg
        secondary: "#111111", // card bg
        accent: "#38bdf8", // sky blue accent
        textMain: "#e2e8f0",
        textMuted: "#94a3b8",
      },
      fontFamily: {
        sans: ["Raleway", "sans-serif"],
        display: ["Raleway", "sans-serif"],
      },
      keyframes: {
        "dock-rise": {
          "0%": {
            opacity: "0",
            transform: "translateX(-50%) translateY(40px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateX(-50%) translateY(0px)",
          },
        },
      },
      animation: {
        "dock-rise": "dock-rise 0.6s cubic-bezier(0.16,1,0.3,1) 0.2s both",
      },
    },
  },
  plugins: [],
};
