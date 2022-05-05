module.exports = {
  mode: "jit",
  content: ["index.html", "./src/**/*.{js,jsx,ts,tsx,vue,html}"],
  darkMode: "media", // or 'media' or 'class'
  theme: {
    screens: {
      // sm: { min: '320px', max: '575px' },
      // md: { min: '576px', max: '991px' },
      // lg: { min: '992px', max: '1279px' },
      // xl: { min: '1280px', max: '1535px' },
      // '2xl': { min: '1536px' }
      sm: "320px",
      md: "576px",
      lg: "992px",
      xl: "1280px",
      "2xl": "1536px"
    },
    extend: {
      colors: {
        primary: "#F4D19B"
      },
      keyframes: {
        "fade-in-down-out-up": {
          "0%, 100%": {
            opacity: "0",
            transform: "translateY(-10px)"
          },
          "20% , 80%": {
            opacity: "1",
            transform: "translateY(0)"
          }
        },
        "fade-in-down": {
          "0%": {
            opacity: "0",
            transform: "translateY(-10px)"
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)"
          }
        },
        "fade-out-up": {
          "0%": {
            opacity: "1",
            transform: "translateY(0)"
          },
          "100%": {
            opacity: "0",
            transform: "translateY(-10px)"
          }
        }
      },
      animation: {
        "fade-in-down": "fade-in-down 0.5s ease-out",
        "fade-out-up": "fade-out-up 0.5s ease-out",

        // 目前使用在 Toast 進出場
        "fade-in-down-out-up": "fade-in-down-out-up 4.2s ease-out"
      }
    }
  },
  plugins: [
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/line-clamp"),
    require("daisyui")
  ]
};
