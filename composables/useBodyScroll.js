export default function () {
  const bodyScroll = (open) => {
    if (open) {
      document.body.classList.add('overflow-y-hidden')
    } else {
      document.body.classList.remove('overflow-y-hidden')
    }
  }

  return { bodyScroll }
}
