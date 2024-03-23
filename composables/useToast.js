import { useToast } from 'vue-toastification'
import ToastNotification from '~/components/toast-message/ToastMessage.vue'

const toast = useToast()

const displayToast = (props, params = {}) => {
  const content = {
    component: ToastNotification,
    props,
  }

  toast(
    content,
    Object.assign(
      {},
      {
        toastClassName: ['custom-toast', props.type ?? 'info'],
        timeout: 4000,
        newestOnTop: false,
        hideProgressBar: false,
        closeButton: false,
        icon: false,
        closeOnClick: false,
      },
      params
    )
  )
}

export default function () {
  return {
    displayToast,
  }
}
