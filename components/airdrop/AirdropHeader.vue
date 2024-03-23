<template>
  <section class="relative">
    <div class="absolute inset-0">
      <img
        src="~/assets/images/backgrounds/mask-radial-header-home-page.svg"
        alt="mask-radial-header-home-page"
        class="w-full object-cover"
      />
    </div>
    <div
      v-if="isLgSize"
      class="drop-box container absolute -top-32 left-0 right-0 bottom-12 flex w-full overflow-hidden pt-5"
    >
      <div class="relative -top-24 w-full">
        <div v-for="i in [...Array(5).keys()]" :key="i" :class="`box-${i + 1}`">
          <div
            :class="[(i + 1) % 2 === 0 ? 'icon-drop' : 'icon-drop-reverse']"
          ></div>
        </div>
      </div>
    </div>
    <div class="container w-full pt-7 md:pt-16">
      <div class="relative">
        <div class="w-full lg:absolute">
          <IconFarClaim
            class="relative -top-2 mx-auto max-h-16 dark:text-white md:top-0"
          ></IconFarClaim>
        </div>
        <img
          v-if="isLgSize"
          class="animate-vibrate-slowly relative top-20 mx-auto md:pb-28"
          :src="isDark ? IconHouseDark : IconHouse"
          alt="Few and Far illustration"
        />
        <img
          v-else
          class="relative top-2 mx-auto scale-125 transform pb-12 sm:pb-20"
          :src="isDark ? IconHouseAirdropDark : IconHouseAirdrop"
          alt="Few and Far illustration"
        />
      </div>
    </div>
  </section>
</template>
<script>
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import { defineComponent, useDark } from '#imports'
import IconFarClaim from '~/assets/images/icons/fnf/logo-fnf-claim.svg?component'
import IconHouse from '~/assets/images/backgrounds/house-claim-empty-airdrop.png'
import IconHouseAirdrop from '~/assets/images/backgrounds/house-claim-mobile.png'
import IconHouseDark from '~/assets/images/backgrounds/house-claim-empty-airdrop-dark.png'
import IconHouseAirdropDark from '~/assets/images/backgrounds/house-claim-mobile-dark.png'
export default defineComponent({
  components: {
    IconFarClaim,
  },
  setup() {
    const breakpoints = useBreakpoints(breakpointsTailwind)
    const isLgSize = breakpoints.greater('lg')
    const { isDark } = useDark()

    return {
      isLgSize,
      IconHouse,
      IconHouseAirdrop,
      IconHouseDark,
      IconHouseAirdropDark,
      isDark,
    }
  },
})
</script>
<style lang="sass">
$box-top-1: -35px
$box-left-1: 12%

$box-top-2: 80px
$box-left-2: 20%

$box-top-3: 30px
$box-left-3: 31%

$box-top-4: 150px
$box-right-4: 190px

$box-top-5: -30px
$box-right-5: 80px

$limit-bottom: 430px

@media only screen and (max-width: 1280px)
  $limit-bottom: 230px

.box-1, .box-2, .box-3, .box-4, .box-5
  position: absolute
  animation-direction: linear
  animation-fill-mode: forwards
  display: inline-block
  z-index:10

.box-1
  left: $box-left-1
  width: 84px
  height: 140px
  animation-name: drop-one
  animation-duration: 10s

.box-2
  left: $box-left-2
  width: 50px
  height: 80px
  animation-name: drop-two
  animation-duration: 5s

.box-3
  left: $box-left-3
  width: 70px
  height: 115px
  animation-name: drop-three
  animation-duration: 15s

.box-4
  right: $box-right-4
  width: 50px
  height: 75px
  animation-name: drop-four
  animation-duration: 8s

.box-5
  right: $box-right-5
  width: 70px
  height: 115px
  animation-name: drop-five
  animation-duration: 12s

.icon-drop, .icon-drop-reverse
  background-image: url('~/assets/images/icons/fnf/drop.svg')
  background-repeat: no-repeat
  background-size: contain
  height: 100%
  width: 100%

.icon-drop
  animation: check 5s linear infinite alternate

.icon-drop-reverse
  animation: checkReverse 5s linear infinite alternate

@keyframes drop-one
  0%
    top: $box-top-1
  100%
    top: $limit-bottom - $box-top-1

@keyframes drop-two
  0%
    top: $box-top-2
  100%
    top: $limit-bottom - $box-top-2

@keyframes drop-three
  0%
    top: $box-top-3
  100%
    top: $limit-bottom - $box-top-3

@keyframes drop-four
  0%
    top: $box-top-4
  100%
    top: $limit-bottom - $box-top-4

@keyframes drop-five
  0%
    top: $box-top-5
  100%
    top: $limit-bottom - $box-top-5

@keyframes check
  from
    transform: rotate(-10deg)
  to
    transform: rotate(10deg)

@keyframes checkReverse
  from
    transform: rotate(10deg)
  to
    transform: rotate(-10deg)
</style>
