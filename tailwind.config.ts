import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors : {
        "primary-blue": "#2196f3",
        "secondary-blue": "#d6eaf3",
        "table-primary": "#f8f8f8",
        "table-secondary": "#c8c8c8",
      }
    },
  },
  plugins: [],
};
export default config;
