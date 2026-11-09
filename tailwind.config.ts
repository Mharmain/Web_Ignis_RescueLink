import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#00254D",
        muted: "#4A5F7A",
        brand: { DEFAULT: "#E5484D", dark: "#D13A3F" },
        blue: { DEFAULT: "#2F6FEB" },
        green: { DEFAULT: "#1E9E5A" },
        amber: { DEFAULT: "#F2B04A" },
        tint: "#E8F0FE",
        line: "#DCE7F5",
      },
      fontFamily: { sans: ["Manrope", "system-ui", "sans-serif"] },
      borderRadius: { xl2: "20px", xl3: "24px" },
      boxShadow: {
        glass: "0 10px 40px -12px rgba(0, 37, 77, 0.18)",
        soft: "0 4px 18px -6px rgba(0, 37, 77, 0.14)",
      },
    },
  },
  plugins: [],
};
export default config;
