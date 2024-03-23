<template>
  <section class="container relative z-10 mb-14 mt-5 md:mb-16 md:mt-0">
    <div
      v-if="!formSuccess"
      class="border-few-and-far-color dark:border-few-and-far-color-dark rounded-lg border-2 py-9 px-6 lg:py-14 lg:px-56"
    >
      <h3 class="text-center text-base font-bold md:text-2xl">
        {{ $t('claim.farm.title') }}
      </h3>
      <div class="group mt-6 flex md:mx-auto md:mt-10 md:w-96">
        <div
          :class="[
            discordSuccess ? 'translate-y-2.5' : 'translate-y-3',
            'mr-4 w-7 md:mr-7',
          ]"
        >
          <div
            :class="[
              discordSuccess
                ? 'mr-px border-transparent'
                : 'h-7 w-7 border-3 border-purple',
              'flex items-center justify-center rounded-full',
            ]"
          >
            <div
              v-if="!discordSuccess"
              class="h-3 w-3 rounded-full bg-purple"
            ></div>
            <div v-else class="mb-0.5 h-7 w-7">
              <IconCheck class="relative -bottom-px -left-px text-green" />
            </div>
          </div>
          <div
            class="ml-3 h-10 w-px border border-dashed border-grey-light"
          ></div>
          <div
            :class="[
              accountIdIsValidated
                ? 'mr-px border-transparent'
                : discordSuccess
                ? 'h-7 w-7 border-3 border-purple'
                : 'h-7 w-7 border-3 border-grey-light',
              'flex items-center justify-center rounded-full',
            ]"
          >
            <div
              v-if="!accountIdIsValidated"
              :class="[
                discordSuccess ? 'bg-purple' : 'bg-white dark:bg-transparent',
                'h-3 w-3 rounded-full',
              ]"
            ></div>
            <div v-else class="mt-0.5 h-7 w-7">
              <IconCheck class="relative -top-px -left-px text-green" />
            </div>
          </div>
        </div>
        <div class="flex w-full flex-col space-y-5">
          <button
            :class="[
              discordSuccess
                ? 'border-green text-green hover:border-green hover:text-green'
                : 'border-grey-light hover:border-purple hover:text-purple dark:border-grey-300',
              'flex w-full items-center justify-between rounded-md border py-2.5 px-3.5 hover:rounded-md ',
            ]"
            @click="discordSuccess = !discordSuccess"
          >
            <span class="text-base font-semibold md:text-lg">
              {{ $t('claim.farm.form.discord') }}
            </span>
            <IconDiscord :class="{ 'dark:text-green': discordSuccess }" />
          </button>
          <FormKit
            ref="formSubmit"
            v-model="formData"
            type="form"
            :actions="false"
          >
            <FormKit
              type="text"
              name="accountId"
              :placeholder="$t('claim.farm.form.wallet')"
              autocomplete="off"
              validation="required|account_id"
              message-class="hidden"
              :validation-rules="{
                account_id: availableAccountId,
              }"
              :classes="{
                outer: 'items-center space-x-1',
                input: isValidated,
                message: 'text-xs text-red',
              }"
            />
            <p
              v-if="!accountIdIsValidated && formData?.accountId === ''"
              class="text-sm text-red"
            >
              {{ $t('claim.farm.form.error') }}
            </p>
            <button
              class="btn btn-primary btn-border-primary btn-border-b-primary btn-border-b btn-xl mt-8 hidden w-full font-bold md:block"
              :disabled="!accountIdIsValidated"
              @click.prevent="submitForm"
            >
              {{ $t('claim.farm.form.submit') }}
            </button>
          </FormKit>
        </div>
      </div>
      <button
        class="btn btn-primary btn-border-primary btn-border-b-primary btn-border-b btn-xl mt-8 w-full font-bold md:hidden"
        :disabled="!accountIdIsValidated"
        @click.prevent="submitForm"
      >
        {{ $t('claim.farm.form.submit') }}
      </button>
    </div>
    <div
      v-else
      class="border-few-and-far-color dark:border-few-and-far-color-dark rounded-lg border-2 py-9 px-6 lg:py-14 lg:px-52"
    >
      <div class="dark-mode flex flex-col items-center justify-center bg-white">
        <div class="success-checkmark">
          <div class="check-icon">
            <span class="icon-line line-tip"></span>
            <span class="icon-line line-long"></span>
            <div class="icon-circle"></div>
            <div class="icon-fix"></div>
          </div>
        </div>
      </div>
      <p class="mt-4 text-center text-base font-bold md:text-2xl">
        {{ $t('claim.farm.congrats') }}
      </p>
    </div>
    <div class="md:px-10">
      <div class="mt-11 flex space-x-4 md:mt-14">
        <div
          class="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-purple"
        >
          <IconLogo class="text-white" />
        </div>
        <div class="flex w-28 flex-auto flex-col">
          <p class="text-grey-300 dark:text-grey-light2">
            {{ $t('claim.farm.verifSmart') }}
          </p>
          <div class="flex items-center">
            <p class="truncate text-lg font-bold">
              {{ $t('claim.farm.verifAddress') }}
            </p>
            <a href="#" class="ml-2">
              <IconExternLink class="text-purple" />
            </a>
          </div>
        </div>
      </div>
      <ul
        class="mt-9 list-outside list-disc pl-8 text-grey-300 dark:text-grey-light2 md:pl-3"
      >
        <li
          v-for="item in $t('claim.farm.list', { returnObjects: true })"
          :key="item"
          class="whitespace-normal"
        >
          {{ item }}
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import { ref } from '#imports'
import IconDiscord from '~/assets/images/icons/socials/discord.svg?component'
import IconCheck from '~/assets/images/icons/check.svg?component'
import IconLogo from '~/assets/images/icons/fnf/logo-solid.svg?component'
import IconExternLink from '~/assets/images/icons/external.svg?component'

export default {
  components: {
    IconDiscord,
    IconCheck,
    IconLogo,
    IconExternLink,
  },
  setup() {
    const formData = ref()
    const formSubmit = ref(null)
    const formSuccess = ref(false)
    const discordSuccess = ref(false)
    const accountIdIsValidated = ref(false)

    const { regexNearWallet } = useAccountIdFormat()

    const isValidated = computed(() => {
      return accountIdIsValidated.value
        ? 'border-green text-green dark:text-green dark:bg-dark font-semibold focus:border-green block w-full rounded-md p-3.5 text-base focus:outline-none focus:ring-0 md:py-3 md:text-lg'
        : 'border-grey-180 font-semibold focus:border-grey-180 block w-full rounded-md p-3.5 text-base focus:outline-none focus:ring-0 md:py-3 md:text-lg dark-mode dark:border-grey-300'
    })

    return {
      formData,
      formSubmit,
      formSuccess,
      discordSuccess,
      accountIdIsValidated,
      isValidated,

      availableAccountId({ value }) {
        accountIdIsValidated.value = regexNearWallet(value)
      },
      submitForm() {
        if (formData.value.accountId) {
          formSuccess.value = true
        }
      },
    }
  },
}
</script>
<style lang="postcss">
.success-checkmark {
  @apply m-auto h-[115px] w-20;
}
.success-checkmark .check-icon {
  @apply relative box-content h-20 w-20 rounded-[50%] border-4 border-green;
}
.success-checkmark .check-icon::before {
  @apply top-[3px] -left-0.5 w-[30px] rounded-t-full;
  transform-origin: 100% 50%;
}
.success-checkmark .check-icon::after {
  @apply top-0 left-[30px] w-[60px] origin-center rounded-r-full rounded-l-full;
  animation: rotate-circle 4.25s ease-in;
}
.success-checkmark .check-icon::before,
.success-checkmark .check-icon::after {
  @apply absolute h-[100px] rotate-45 bg-transparent;
  content: '';
}
.success-checkmark .check-icon .icon-line {
  @apply absolute  z-10 block h-[5px]  bg-green;
}
.success-checkmark .check-icon .icon-line.line-tip {
  @apply top-[46px]  left-[14px] w-[25px] rotate-45;
  animation: icon-line-tip 0.75s;
}
.success-checkmark .check-icon .icon-line.line-long {
  @apply top-[38px] right-[8px]  w-[47px] -rotate-45;
  animation: icon-line-long 0.75s;
}
.success-checkmark .check-icon .icon-circle {
  @apply absolute -top-1 -left-1 z-10 box-content h-20 w-20 rounded-full border-4 border-green;
}
.success-checkmark .check-icon .icon-fix {
  @apply absolute top-2 left-[26px] h-[85px] w-[5px] -rotate-45 bg-transparent;
}
@keyframes rotate-circle {
  0% {
    transform: rotate(-45deg);
  }
  5% {
    transform: rotate(-45deg);
  }
  12% {
    transform: rotate(-405deg);
  }
  100% {
    transform: rotate(-405deg);
  }
}
@keyframes icon-line-tip {
  0% {
    width: 0;
    left: 1px;
    top: 19px;
  }
  54% {
    width: 0;
    left: 1px;
    top: 19px;
  }
  70% {
    width: 50px;
    left: -8px;
    top: 37px;
  }
  84% {
    width: 17px;
    left: 21px;
    top: 48px;
  }
  100% {
    width: 25px;
    left: 14px;
    top: 45px;
  }
}
@keyframes icon-line-long {
  0% {
    width: 0;
    right: 46px;
    top: 54px;
  }
  65% {
    width: 0;
    right: 46px;
    top: 54px;
  }
  84% {
    width: 55px;
    right: 0px;
    top: 35px;
  }
  100% {
    width: 47px;
    right: 8px;
    top: 38px;
  }
}
</style>
