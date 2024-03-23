<template>
  <div class="relative lg:my-40">
    <img
      :src="farCoin"
      alt="logo few and far"
      class="block lg:absolute lg:right-0 lg:-top-44 lg:w-100"
    />
    <div class="text-center lg:w-2/5 lg:text-left">
      <h2 class="px-10 text-3xl font-extrabold lg:px-0 lg:text-5xl">
        {{ $t('welcomeTerraLuna.partenersTitle') }}
      </h2>
      <p class="mt-6 mb-12 px-5 text-base lg:mt-10 lg:px-0">
        {{ $t('welcomeTerraLuna.partenersDescription') }}
      </p>
    </div>
    <div class="grid grid-cols-2 gap-8 lg:mt-32 lg:grid-cols-4 lg:gap-28">
      <div
        v-for="(partener, index) in parteners"
        :key="index"
        class="flex items-center justify-center"
      >
        <img :src="partener" alt="logo partener" class="w-3/4" />
      </div>
    </div>
  </div>
</template>
<script>
import farCoin from '~/assets/images/icons/fnf/earn-up.svg'
import hobi from '~/assets/images/terra-luna/huobi.png'
import hypersphere from '~/assets/images/terra-luna/hypersphere.png'
import meta from '~/assets/images/terra-luna/meta.png'
import ark from '~/assets/images/terra-luna/ark.png'
import pantera from '~/assets/images/terra-luna/pantera.png'
import ftx from '~/assets/images/terra-luna/ftx.png'
import near from '~/assets/images/terra-luna/near.png'

export default {
  setup() {
    return {
      farCoin,
      parteners: [ftx, near, ark, meta, pantera, hobi, hypersphere],
    }
  },
}
</script>
