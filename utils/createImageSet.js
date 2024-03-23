export default function createImageSet(sources) {
  const sizes = Object.keys(sources)
  const imgSet = []
  sizes.forEach((size) => {
    if (sources[size]) {
      imgSet.push({
        size,
        url: sources[size],
      })
    }
  })

  return imgSet
}
