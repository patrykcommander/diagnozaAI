import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-blue": "	#000080",
        "secondary-blue": "	#0000FF",
        "table-primary": "#f8f8f8",
        "table-secondary": "#d8d8d8",
        "primary-grey": "#36454F",
        "secondary-grey": "#899499",
      },
    },
  },
  plugins: [],
};
export default config;
