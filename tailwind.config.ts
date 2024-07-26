import type { Config } from 'tailwindcss';

import colors from './styles/tailwind.colors';
import screens from './styles/tailwind.screens';
import typography from './styles/tailwind.typography';

const config: Config = {
  content: ['./pages/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors,
      screens,
      ...typography,
    },
  },
  plugins: [],
} satisfies Config;

export default config;
