/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Clash Display"', 'Inter', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        ink: {
          950: '#06060a',
          900: '#0a0a12',
          800: '#10101c',
          700: '#181828',
        },
        bone: '#f4f1ea',
        accent: {
          DEFAULT: '#7c5cff',
          hot: '#ff4d6d',
          lime: '#c6ff3d',
          ice: '#7fe7ff',
        },
      },
      letterSpacing: {
        tightest: '-0.06em',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        glow: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
      },
      animation: {
        marquee: 'marquee 38s linear infinite',
        glow: 'glow 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
