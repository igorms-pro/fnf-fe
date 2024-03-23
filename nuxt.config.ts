import { defineNuxtConfig } from 'nuxt'
import svgLoader from 'vite-svg-loader'

const viteConfDefineGlobal =
  process.env.FF_NODE_ENV === 'development' ? { define: { global: {} } } : {}

const viteConf = Object.assign(
  {},
  {
    plugins: [
      svgLoader({
        defaultImport: 'url',
      }),
    ],
  },
  viteConfDefineGlobal
)

let nuxtConfig = Object.assign(
  {},
  {
    ssr: false,

    meta: {
      link: [
        { rel: 'stylesheet', href: 'https://rsms.me/inter/inter.css' },
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: '/favicon.png',
        },
      ],
    },

    css: ['~/assets/css/tailwind.css'],

    buildModules: ['floating-vue/nuxt', '@pinia/nuxt'],
    modules: [],

    sentry: {
      dsn: process.env.FF_SENTRY_DSN,
      config: {
        tracesSampleRate: 1.0,
      },
    },

    publicRuntimeConfig: {
      API_BASE: process.env.FF_API_BASE,
      MARKET_CONTRACT: process.env.FF_MARKET_CONTRACT,
      NEAR_NET: process.env.FF_NEAR_NET,
      NEAR_RPC: process.env.FF_NEAR_RPC,
      NODE_ENV: process.env.FF_NODE_ENV,
      WEBSITE_URL: process.env.FF_WEBSITE_URL,
    },
    privateRuntimeConfig: {
      API_BASE: process.env.FF_API_BASE,
      MARKET_CONTRACT: process.env.FF_MARKET_CONTRACT,
      NEAR_NET: process.env.FF_NEAR_NET,
      NEAR_RPC: process.env.FF_NEAR_RPC,
      NODE_ENV: process.env.FF_NODE_ENV,
      WEBSITE_URL: process.env.FF_WEBSITE_URL,
    },

    build: {
      postcss: {
        postcssOptions: {
          plugins: {
            tailwindcss: {},
            autoprefixer: {},
          },
        },
      },
    },

    vite: viteConf,
  }
)

// ENABLE SENTRY IF IN PRODUCTION AND ON MAINNNET
if (
  process.env.FF_NODE_ENV == 'production' &&
  process.env.FF_NEAR_NET == 'mainnet'
) {
  nuxtConfig.modules.push('@nuxtjs/sentry')
}

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig(nuxtConfig)
