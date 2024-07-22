<!-- ShippingForm.vue -->
<template>
  <div class="flex-1 bg-black text-white p-5 rounded-lg">
    <h3 class="text-xl font-bold mb-4">{{ t('shipping.title') }}</h3>
    <form @submit.prevent="submitForm" class="space-y-4">
      <div>
        <input
          type="text"
          id="name"
          v-model="form.name"
          required
          class="w-full border-b border-gray-500 p-2 appearance-none bg-transparent text-white"
          :placeholder="t('shipping.name')"
          :aria-label="t('shipping.name')"
        />
      </div>
      <div>
        <input
          type="text"
          id="institution"
          v-model="form.institution"
          required
          class="w-full border-b border-gray-500 p-2 appearance-none bg-transparent text-white"
          :placeholder="t('shipping.institution')"
        />
      </div>
      <div>
        <input
          type="email"
          id="email"
          v-model="form.email"
          required
          class="w-full border-b border-gray-500 p-2 appearance-none bg-transparent text-white"
          :placeholder="t('shipping.email')"
        />
      </div>
      <div>
        <input
          type="tel"
          id="phone"
          v-model="form.phone"
          required
          class="w-full border-b border-gray-500 p-2 appearance-none bg-transparent text-white"
          :placeholder="t('shipping.phone')"
        />
      </div>
      <div>
        <input
          type="text"
          id="address"
          v-model="form.address"
          required
          class="w-full border-b border-gray-500 p-2 appearance-none bg-transparent text-white"
          :placeholder="t('shipping.address')"
        />
      </div>
      <div class="flex gap-4">
        <div class="flex-1">
          <input
            type="text"
            id="zip"
            v-model="form.zip"
            required
            class="w-full border-b border-gray-500 p-2 appearance-none bg-transparent text-white"
            :placeholder="t('shipping.zip')"
          />
        </div>
        <div class="flex-1">
          <select
            id="country"
            v-model="form.country"
            required
            class="w-full border-b border-gray-500 p-2 appearance-none bg-transparent text-white"
            :placeholder="t('shipping.country')"
          >
            <option value="United States">{{ t('countries.unitedStates') }}</option>
            <!-- Add more country options -->
          </select>
        </div>
      </div>
      <div class="flex items-center">
        <input
          type="checkbox"
          id="useBillingAddress"
          v-model="form.useBillingAddress"
          class="mr-2"
        />
        <label for="useBillingAddress">{{ t('shipping.useBillingAddress') }}</label>
      </div>
      <button
        type="submit"
        class="w-full bg-white text-black py-2 px-4 rounded hover:bg-gray-200 transition-colors"
      >
        {{ t('shipping.continueToPayment') }} &gt;
      </button>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const form = reactive({
  name: '',
  institution: '',
  email: '',
  phone: '',
  address: '',
  zip: '',
  country: 'United States',
  useBillingAddress: false
})

const submitForm = () => {
  // Emit the form data to the parent component
  emit('submit', form)
}

const emit = defineEmits(['submit'])
</script>
