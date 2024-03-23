import { computed, ref } from '#imports'

const showDialog = ref(false)

export default function () {
  const setShowDialog = (val) => {
    showDialog.value = val
  }

  return {
    showDialog: computed(() => showDialog.value),
    setShowDialog,
  }
}
