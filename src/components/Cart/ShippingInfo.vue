<template>
  <div class="shipping-info bg-black text-white p-6 rounded-lg">
    <h2 class="text-xl font-bold mb-4">{{ t('checkout.step', { step: 1, total: 2 }) }}</h2>
    <h3 class="text-2xl font-bold mb-6">{{ t('checkout.shippingInfo') }}</h3>

    <form @submit.prevent="submitShippingInfo">
      <div class="grid grid-cols-2 gap-4">
        <div class="col-span-2 sm:col-span-1">
          <label for="name" class="block mb-1">{{ t('checkout.name') }}</label>
          <input
            v-model="shippingInfo.name"
            type="text"
            id="name"
            class="w-full p-2 text-black rounded"
            required
          />
        </div>
        <div class="col-span-2 sm:col-span-1">
          <label for="contact" class="block mb-1">{{ t('checkout.contact') }}</label>
          <input
            v-model="shippingInfo.contact"
            type="text"
            id="contact"
            class="w-full p-2 text-black rounded"
            required
          />
        </div>
        <div class="col-span-2">
          <label for="institution" class="block mb-1">{{ t('checkout.institution') }}</label>
          <input
            v-model="shippingInfo.institution"
            type="text"
            id="institution"
            class="w-full p-2 text-black rounded"
            required
          />
        </div>
        <div class="col-span-2">
          <label for="email" class="block mb-1">{{ t('checkout.email') }}</label>
          <input
            v-model="shippingInfo.email"
            type="email"
            id="email"
            class="w-full p-2 text-black rounded"
            required
          />
        </div>
        <div class="col-span-2">
          <label for="phoneNumber" class="block mb-1">{{ t('checkout.phoneNumber') }}</label>
          <input
            v-model="shippingInfo.phoneNumber"
            type="tel"
            id="phoneNumber"
            class="w-full p-2 text-black rounded"
            required
          />
        </div>
        <div class="col-span-2">
          <label for="address" class="block mb-1">{{ t('checkout.address') }}</label>
          <textarea
            v-model="shippingInfo.address"
            id="address"
            rows="3"
            class="w-full p-2 text-black rounded"
            required
          ></textarea>
        </div>
        <div class="col-span-2 sm:col-span-1">
          <label for="zipCode" class="block mb-1">{{ t('checkout.zipCode') }}</label>
          <input
            v-model="shippingInfo.zipCode"
            type="text"
            id="zipCode"
            class="w-full p-2 text-black rounded"
            required
          />
        </div>
        <div class="col-span-2 sm:col-span-1">
          <label for="country" class="block mb-1">{{ t('checkout.country') }}</label>
          <select
            v-model="shippingInfo.country"
            id="country"
            class="w-full p-2 text-black rounded"
            required
          >
            <option value="United States">{{ t('countries.unitedStates') }}</option>
            <!-- Add more country options as needed -->
          </select>
        </div>
      </div>

      <div class="mt-4">
        <label class="flex items-center">
          <input v-model="shippingInfo.useAsBillingAddress" type="checkbox" class="mr-2" />
          <span>{{ t('checkout.useAsBillingAddress') }}</span>
        </label>
      </div>

      <button
        type="submit"
        class="mt-6 w-full bg-white text-black py-2 px-4 rounded hover:bg-gray-200 transition duration-300"
      >
        {{ t('checkout.continueToPayment') }}
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import type { ShippingInfo } from '@/types/ShippingInfo'

const { t } = useI18n()

const emit = defineEmits<{
  (e: 'shipping-info-submitted', shippingInfo: ShippingInfo): void
}>()

const shippingInfo = ref<ShippingInfo>({
  name: '',
  contact: '',
  institution: '',
  email: '',
  phoneNumber: '',
  address: '',
  zipCode: '',
  country: 'United States',
  useAsBillingAddress: false
})

const submitShippingInfo = () => {
  console.log('Shipping Info:', shippingInfo.value)
  emit('shipping-info-submitted', shippingInfo.value)
}
</script>

<style scoped>
/* Add any additional styles here */
</style>
