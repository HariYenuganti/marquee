import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Marquee palette
        base: '#0B0B0D', // warm charcoal, not pure black
        ink: '#F6F1E8', // warm off-white
        ember: '#EA8B4A', // single accent — candlelight
        // Back-compat alias so stray `text-accent` / `bg-accent` usages keep working
        // during incremental migration. Safe to remove once all sites are on `ember`.
        accent: '#EA8B4A',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: [
          'var(--font-fraunces)',
          'Georgia',
          'Cambria',
          '"Times New Roman"',
          'serif',
        ],
      },
    },
  },
  plugins: [],
};
export default config;
