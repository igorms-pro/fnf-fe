<template>
  <div
    v-show="isLoaded"
    class="relative z-10 h-full w-full animate-pulse rounded-lg bg-grey-light2 shadow-md dark:bg-darkSecondary"
    v-bind="$attrs"
  >
    <NoImg class="opacity-0" />
  </div>
  <img
    v-show="!isLoaded"
    :class="['max-h-[692px] object-cover', { 'rounded-lg': !isError }]"
    :srcset="createSrcSet(imgSet)"
    sizes="(max-width: 256px) 256px,
    (max-width: 512px) 512px,
    1024px"
    :src="!imgSet.length && media ? media : ''"
    :alt="alt"
    v-bind="$attrs"
    @load="isLoaded = false"
    @error="imageLoadError"
  />
</template>
<script>
import { defineComponent, ref, useDark } from '#imports'
import NoImg from '~/assets/images/no-item.svg?component'
import NonVisualImg from '~/assets/images/non-visual-nft.svg'
import NonVisualDarkImg from '~/assets/images/non-visual-nft-dark.svg'
import BrokenLinkImg from '~/assets/images/broken-link.svg'
import BrokenLinkDarkImg from '~/assets/images/broken-link-dark.svg'

export default defineComponent({
  components: {
    NoImg,
  },
  props: {
    media: {
      type: String,
      default: '',
    },
    alt: {
      type: String,
      default: '',
    },
    imgSet: {
      type: Array,
      default: () => [],
    },
  },
  setup(props) {
    const isLoaded = ref(true)
    const isError = ref(false)

    const { isDark } = useDark()

    const imageLoadError = (event) => {
      // TODO: Reload image when isDark is toggled
      // console.error(event)
      isError.value = true
      if (!props.media)
        event.target.src = isDark.value ? NonVisualDarkImg : NonVisualImg
      else event.target.src = isDark.value ? BrokenLinkDarkImg : BrokenLinkImg
    }

    const createSrcSet = (images) => {
      let srcSetStr = ''
      images.forEach((image, index) => {
        const { size, url } = image
        const comma = index === images.length - 1 ? '' : ',\n'
        srcSetStr += `${url} ${size}w${comma}`
      })
      return srcSetStr
    }

    return {
      isLoaded,
      isError,
      imageLoadError,
      createSrcSet,
    }
  },
})
</script>
