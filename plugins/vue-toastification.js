import Toast from 'vue-toastification'
import { defineNuxtPlugin } from '#imports'

import 'vue-toastification/dist/index.css'

const options = {
  // You can set your default options here
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Toast, options)
})
