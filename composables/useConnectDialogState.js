import { computed, ref, useRuntimeConfig } from '#imports'

const showDialog = ref(false)
const successUrl = ref(null)
const failUrl = ref(null)

export default function () {
  const { WEBSITE_URL } = useRuntimeConfig()

  const setShowDialog = (val) => {
    showDialog.value = val
  }
  const setSuccessUrl = (val) => {
    successUrl.value = val
  }
  const setFailUrl = (val) => {
    failUrl.value = val
  }

  /**
   * Function to set the success and fallback URLs and then copen the global connection dialog.
   * @param {String} successUrl Route to be added to the base url to redirect to on successfull connection to NEAR wallet.
   * @param {String} failUrl Route to be added to the base url to redirect to on failled connection to NEAR wallet.
   */
  const openDialog = (successUrl = '', failUrl = '') => {
    setSuccessUrl(`${WEBSITE_URL}${successUrl}`) // set succes URL
    setFailUrl(`${WEBSITE_URL}${failUrl}`) // set fail URL
    setShowDialog(true) // open the dialog
  }

  return {
    showDialog: computed(() => showDialog.value),
    setShowDialog,

    successUrl: computed(() => successUrl.value),
    setSuccessUrl,

    failUrl: computed(() => failUrl.value),
    setFailUrl,

    openDialog,
  }
}
