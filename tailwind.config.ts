import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {

    extend: {
      colors: {
        mainIndigo: "#092635",
        darkGreen: "#1B4242",
        midGreen: "#5C8374",
        lightGreen: "#9EC8B9"

      },
    },
  },
  plugins: [],
}
export default config
