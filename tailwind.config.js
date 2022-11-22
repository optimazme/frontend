const colors = require('tailwindcss/colors')

module.exports = {
  theme: {
    fontFamily: {
     body: ['Roboto', 'Helvetica', 'Arial', 'sans-serif']
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      blue: colors.blue,
      brown: '#663300',
      gray: colors.trueGray,
      green: colors.green,
      indigo: colors.indigo,
      pink: colors.pink,
      purple: colors.purple,
      red: colors.rose,
      teal: '#1f7a7a',
      darkyellow: '#997a00',
      yellow: colors.amber,
      white: colors.white,
      // light theme
      dark: '#813405',
      light: '#ebf2fa',
      accent: '#361F27',
      primary: '#c2af83',
      'primary-dark': '#ab8b3e',
      secondary: '#F9A03F',
      'secondary-dark': '#1e3888',
      warning: '#b8002e'
    },
    // extend: {
    //   backgroundImage: {
    //     'hero-image': "url('static/far_away_landscape.webp')"
    //   }
    // }
    extend: {
      backgroundImage: {
        'logo-p': "url('static/saun_maze_p.png')",
        'maze': "url('static/saun_maze.png')",
        'optimaz': "url('static/optimaz.png')",
      },
      width: {
        '128': '32rem',
        '256': '64rem'
      },
      margin: {
        '128': '32rem',
        '256': '64rem'
      }
    }
  },
  content: [
    './assets/**/*.{vue,js,css}',
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  plugins: [],
  variants: {
    extend: {
        backgroundColor: ['active', "odd", "even"],
        display: ["group-hover"],
    },
  },
}