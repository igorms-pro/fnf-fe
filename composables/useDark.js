import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)

export default function () {
  return {
    isDark,
    toggleDark,
  }
}
