export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'optimaz',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Optimaz is a timed maze game to raise funds for charity' },
      { name: 'format-detection', content: 'telephone=no' },
      {
        hid: 'og-title',
        name: 'og:title',
        content:
          'Optimaz',
      },
      {
        hid: 'og-site_name',
        name: 'og:site_name',
        content:
          'Optimaz',
      },
      {
        hid: 'og-url',
        name: 'og:url',
        content:
          'https://www.optimaz.me',
      },
      {
        hid: 'og-image',
        name: 'og:image',
        content:
          'https://www.optimaz.me/image.png',
      },
      {
        hid: 'twitter-title',
        name: 'twitter:title',
        content:
          'Optimaz',
      },
      {
        hid: 'twitter-description',
        name: 'twitter:description',
        content:
        'Optimaz is a timed maze game to raise funds for charity',
      },
      {
        hid: 'twitter-card',
        name: 'twitter:card',
        content:
          'summary_large_image',
      },
      {
        hid: 'twitter-image',
        name: 'twitter:image',
        content:
        'https://www.optimaz.me',
      },
      {
        hid: 'apple-mobile-web-app-title',
        name: 'apple-mobile-web-app-title',
        content:
          'Art inspired by Banned Books',
      },
      {
        hid: 'twitter-card',
        name: 'twitter:card',
        value: 'summary'
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      { src: 'https://aframe.io/releases/1.3.0/aframe.min.js', ssr: false },
      { src: 'https://unpkg.com/aframe-environment-component@1.3.1/dist/aframe-environment-component.min.js', ssr: false },
      { src: 'https://unpkg.com/aframe-event-set-component@^4.0.0/dist/aframe-event-set-component.min.js', ssr: false }
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],
  env: {
    BASE_URL: process.env.BASE_URL,
    BASE_BACKEND_URL: process.env.BASE_BACKEND_URL,
    BLOCK_EXPLORER_URL: process.env.BLOCK_EXPLORER_URL,
    CHAIN_ID: process.env.CHAIN_ID,
    CHAIN_NAME: process.env.CHAIN_NAME,
    CURRENCY_SYMBOL: process.env.CURRENCY_SYMBOL,
    CONTRACT_ADDRESS: process.env.CONTRACT_ADDRESS,
    NETWORK_NAME: process.env.NETWORK_NAME,
    NIFTY_DOG_AI_API_KEY: process.env.NIFTY_DOG_AI_API_KEY,
    OPENSEA_API_KEY: process.env.OPENSEA_API_KEY,
    SYMBOL_NAME: process.env.SYMBOL_NAME,
    RPC_URL: process.env.RPC_URL
  },
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxt/image',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
