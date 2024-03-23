<template>
  <DialogModal :is-open="isOpen" :initial-focus="initialFocus" @close="close">
    <template #title-content>{{ $t('profile.settings') }}</template>
    <template #content>
      <form>
        <div class="mt-6 items-center">
          <label
            class="mb-1.5 block text-sm font-normal text-grey-200 dark:text-grey-light2"
            for="displayName"
          >
            Display Name
          </label>
          <input
            id="displayName"
            ref="userProfileForm"
            v-model="formData.displayName"
            type="text"
            name="displayName"
            class="dark-mode block w-full rounded-md border-grey-180 border-grey-180 p-3.5 text-sm font-bold font-semibold focus:border-grey-180 focus:border-purple focus:border-grey-180 focus:ring-purple dark:border-grey-300 md:py-3 md:text-base"
          />
        </div>

        <!-- TODO: Implement Email Verify Flow -->
        <!-- <div class="mt-6 items-center">
          <label
            class="mb-1.5 block text-sm font-normal text-grey-200 dark:text-grey-light2"
            for="email"
          >
            Email
          </label>
          <input
            id="email"
            ref="userProfileForm"
            v-model="formData.email"
            type="text"
            name="email"
            class="dark-mode block w-full rounded-md border-grey-180 border-grey-180 p-3.5 text-sm font-bold font-semibold focus:border-grey-180 focus:border-purple focus:border-grey-180 focus:ring-purple dark:border-grey-300 md:py-3 md:text-base"
          />
          <p
            class="mt-1 text-xs font-normal text-grey-300 dark:text-grey-light"
          >
            Connect your email to stay tuned for giveaways and collection drops!
          </p>
        </div> -->

        <div class="mt-6 items-center">
          <label
            class="mb-1.5 block text-sm font-normal text-grey-200 dark:text-grey-light2"
            for="bio"
          >
            Bio
          </label>
          <textarea
            id="bio"
            ref="userProfileForm"
            v-model="formData.bio"
            type="textArea"
            name="bio"
            class="dark-mode block w-full rounded-md border-grey-180 border-grey-180 p-3.5 text-sm font-bold font-semibold focus:border-grey-180 focus:border-purple focus:border-grey-180 focus:ring-purple dark:border-grey-300 md:py-3 md:text-base"
          />
        </div>
        <p
          v-if="formData.bio.length <= 140"
          class="mt-1 text-xs font-normal text-grey-300 dark:text-grey-light"
        >
          {{ formData.bio.length + '/140' }}
        </p>
        <p v-else class="mt-1 text-xs font-normal text-red">
          {{ formData.bio.length + '/140' }}
        </p>
      </form>

      <div class="mt-8 text-center">
        <BaseButton
          ref="initialFocus"
          border
          type="primary"
          class="w-full"
          @click="updateProfile"
        >
          <span> {{ $t('profile.update.action') }}</span>
        </BaseButton>
      </div>
    </template>
  </DialogModal>
</template>

<script>
import i18n from 'i18next'
import { ref } from '#imports'
import { useUser } from '~/stores/user'

export default {
  props: {
    isOpen: { type: Boolean, default: false },
  },

  emits: ['close', 'submit'],

  setup(_, { emit }) {
    const initialFocus = ref(null)
    const close = () => {
      emit('close')
    }

    const { displayToast } = useToast()

    const userStore = useUser()
    const userProfile = computed(() => userStore.profile ?? null)
    const userProfileForm = ref(null)

    const formData = ref({})
    const hasUserStoreLoaded = ref(false)

    const isUserProfileEmpty = computed(
      () =>
        userProfile.value.displayName === null &&
        userProfile.value.email === null &&
        userProfile.value.bio === null
    )
    const initFormData = () => {
      // load initial form data only once and after the userStore has been inited
      if (!hasUserStoreLoaded.value && !isUserProfileEmpty.value) {
        formData.value = {
          displayName: userProfile.value.displayName ?? '',
          email: userProfile.value.email ?? '',
          bio: userProfile.value.bio ?? '',
        }
        hasUserStoreLoaded.value = true
      }
    }
    watch(userProfile, initFormData)
    onMounted(initFormData)

    const updateProfile = async () => {
      try {
        await userStore.updateProfile(formData.value)
        displayToast({
          title: i18n.t('profile.update.success.title'),
          message: i18n.t('profile.update.success.message'),
          type: 'success',
        })
        close()
      } catch (err) {
        displayToast({
          title: i18n.t('profile.update.error.title'),
          message:
            err?.data?.message?.join(', ') ??
            i18n.t('profile.update.error.message'),
          type: 'error',
        })
        console.error(err)
      }
    }

    return {
      initialFocus,
      close,

      userProfileForm,
      formData,
      updateProfile,
    }
  },
}
</script>
