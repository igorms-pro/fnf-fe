export default function () {
  const getImgUrl = (filename) => {
    return new URL(`/public/${filename}`, import.meta.url).href
  }

  return { getImgUrl }
}
