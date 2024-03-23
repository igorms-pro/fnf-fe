/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 ** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */

const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  darkMode: 'class',
  content: {
    files: [
      './components/**/*.{vue,js}',
      './composables/**/*.{vue,js}',
      './layouts/**/*.vue',
      './pages/**/*.vue',
      './error.vue',
      './plugins/**/*.{js,ts}',
    ],
  },
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: 'white',
      black: 'black',
      dark: '#1f1f1f',
      darkSecondary: '#252525',
      grey: {
        light: '#D8D8D8',
        light2: '#DDDDDD',
        light3: '#F9F9F9',
        100: '#F4F4F4',
        140: '#E7E7E7',
        150: '#E8E8E8',
        180: '#D5D5D5',
        185: '#CCCCCC',
        200: '#979797',
        300: '#4F4F4F',
        400: '#2D2D2D',
      },
      purple: {
        light: '#DEDFFF',
        DEFAULT: '#9B9DFE',
        dark: '#6061A6',
        secondary: '#4C4D8A',
        opacity: '#4A4B6D',
      },
      pink: {
        light: '#FFDEF3',
      },
      card: {
        apple: '#BEDB6E',
        pink: '#FD92D6',
        cyan: '#4CBEC9',
        indigo: '#797DF9',
      },
      green: {
        light: '#EEF8D2',
        light2: '#c9e3a2',
        radial: '#99CF95',
        DEFAULT: '#B2CF67',
      },
      blue: {
        light: '#D0F9FD',
        light2: '#8BE6FF',
        radial: '#AABBF2',
        DEFAULT: '#75CED7',
        dark: '#49969D',
      },
      red: {
        DEFAULT: '#F04A25',
      },
    },

    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      borderRadius: {
        lg: '10px',
        xl: '12px',
      },
      borderWidth: {
        3: '3px',
      },
      backgroundImage: {
        'gradient-radial':
          'radial-gradient(10em 120px at center, var(--tw-gradient-stops))',
      },
      spacing: {
        100: '35rem',
      },
    },

    container: {
      center: true,
      padding: {
        DEFAULT: '1.25rem',
        sm: '1.25rem',
        lg: '2rem',
        xl: '3rem',
      },
    },

    opacity: {
      0: '0',
      10: '.1',
      20: '.2',
      25: '.25',
      30: '.3',
      40: '.4',
      50: '.5',
      60: '.6',
      70: '.7',
      75: '.75',
      80: '.8',
      85: '.85',
      90: '.9',
      100: '1',
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    // require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
    // require('@tailwindcss/aspect-ratio'),
  ],
}
