import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "custom-gradient-2":
          "linear-gradient(to top, #5ee7df 0%, #b490ca 100%)",
      },
      animation: {
        aurora: "aurora 60s linear infinite",
        bounce: "bounce 2s linear infinite",
        rotate: "rotate 2s linear infinite",
      },
      colors: {
        backgroundGray:
          "linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
