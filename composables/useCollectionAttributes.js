import { computed, useRouteQuery } from '#imports'

export default function () {
  const routeQueryAttributes = useRouteQuery('attributes')

  const attributes = computed(() => {
    if (
      routeQueryAttributes.value == null ||
      routeQueryAttributes.value?.trim() === ''
    ) {
      return {}
    }

    const res = {}
    const attrs = routeQueryAttributes.value?.split(',')
    for (const attr of attrs) {
      const [traitType, traits] = attr.split(':')
      res[traitType] = traits.split(';;')
    }

    return res
  })

  const formatAttributes = (attributes) => {
    let res = ''
    let i = 0

    for (const traitType in attributes) {
      const traits = attributes[traitType]

      if (traits.length === 0) {
        continue
      }

      if (i === 0) {
        res = `${traitType}:`
      } else if (i + 1 <= Object.keys(attributes).length) {
        res += `,${traitType}:`
      }

      res += traits.join(';;')

      i++
    }

    return res
  }

  const changeAttribute = (traitType, traitValue, isEnabled = false) => {
    // const isChecked = event.srcElement.checked
    const attrs = attributes.value
    let attr = attrs[traitType]

    if (!Array.isArray(attr)) {
      attr = []
    }

    if (isEnabled) {
      attr.push(traitValue)
    } else {
      const index = attr.findIndex((val) => val === traitValue)
      attr.splice(index, 1)
    }

    // update attribute
    attrs[traitType] = attr

    // update route query
    routeQueryAttributes.value = formatAttributes(attrs)
  }

  const clearAttributes = () => {
    routeQueryAttributes.value = ''
    localStorage.removeItem('selectedAttributes')
  }

  return {
    attributes,
    changeAttribute,
    clearAttributes,
  }
}
