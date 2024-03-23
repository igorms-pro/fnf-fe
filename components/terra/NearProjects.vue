<template>
  <h2
    class="mb-10 px-20 text-center text-3xl font-extrabold lg:mb-20 lg:text-5xl"
  >
    {{ $t('welcomeTerraLuna.projectTitle') }}
  </h2>
  <div class="flex flex-col justify-center lg:flex-row lg:px-28">
    <template v-for="{ id, name, media, accountId } in collections" :key="id">
      <div class="max-w-52 animate-up-hover mx-auto mb-9 block text-center">
        <img
          class="max-w-60 max-h-60 rounded-lg shadow-md"
          :src="media"
          :alt="name"
        />
        <p class="mt-2.5 truncate font-semibold">{{ name }}</p>
        <p
          class="my-1 flex justify-center space-x-1 text-sm font-semibold text-purple"
        >
          <span class="truncate">{{ accountId }}</span>
          <IconListing class="h-5 w-5 text-purple"></IconListing>
        </p>
      </div>
    </template>
  </div>
</template>

<script>
import IconListing from '~/assets/images/icons/verified-macaron.svg?component'

export default {
  components: {
    IconListing,
  },
  setup() {
    const collections = [
      {
        id: '1',
        name: 'Antisocial Ape Club',
        media: '/images/collections/asac.jpeg',
        accountId: 'asac.near',
      },
      {
        id: '2',
        name: 'Near Tinker Union',
        media: '/images/collections/ntu.jpeg',
        accountId: 'tinkerunion.near',
      },
      {
        id: '3',
        name: 'Grimms Army WL',
        media: '/images/collections/sss.jpeg',
        accountId: 'secretskelliessociety.near',
      },
    ]

    return {
      collections,
    }
  },
}
</script>
