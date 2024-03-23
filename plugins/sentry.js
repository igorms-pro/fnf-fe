import * as Sentry from '@sentry/vue'
import { defineNuxtPlugin } from '#imports'

const SentryPlugin = () => {
  Sentry.init({
    dsn: 'https://1160849a98a7423ab5bd71724051a2fe@o1295814.ingest.sentry.io/6521871',
    sampleRate: 1,
    tracesSampleRate: 1,
  })
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(SentryPlugin)
})
