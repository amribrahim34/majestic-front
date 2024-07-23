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
        <span v-if="errors.email" class="text-red-500 text-sm">{{ errors.email }}</span>
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
        <span v-if="errors.phone" class="text-red-500 text-sm">{{ errors.phone }}</span>
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
          <select
            id="city"
            v-model="form.cityId"
            required
            @change="onCityChange"
            class="w-full border-b border-gray-500 p-2 appearance-none bg-transparent text-white"
          >
            <option value="">{{ t('shipping.selectCity') }}</option>
            <option v-for="city in bostaStore.cities" :key="city.id" :value="city.id">
              {{ city.name }}
            </option>
          </select>
        </div>
        <div class="flex-1">
          <select
            id="district"
            v-model="form.districtId"
            required
            class="w-full border-b border-gray-500 p-2 appearance-none bg-transparent text-white"
          >
            <option value="">{{ t('shipping.selectDistrict') }}</option>
            <option
              v-for="district in bostaStore.districts"
              :key="district.id"
              :value="district.id"
            >
              {{ district.name }}
            </option>
          </select>
        </div>
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
            <option value="Egypt">{{ t('countries.egypt') }}</option>
            <!-- Add more country options if needed -->
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
        :disabled="!isFormValid"
      >
        {{ t('shipping.continueToPayment') }} &gt;
      </button>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useBostaStore } from '@/stores/bostaStore'

const { t } = useI18n()
const bostaStore = useBostaStore()

const form = reactive({
  name: '',
  institution: '',
  email: '',
  phone: '',
  address: '',
  cityId: 0,
  districtId: '',
  zip: '',
  country: 'Egypt',
  useBillingAddress: false
})

const errors = reactive({
  email: '',
  phone: ''
})

const isFormValid = computed(() => {
  return (
    form.name &&
    form.email &&
    form.phone &&
    form.address &&
    form.cityId &&
    form.districtId &&
    form.zip &&
    form.country &&
    !errors.email &&
    !errors.phone
  )
})

const validateEmail = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(form.email)) {
    errors.email = t('validation.invalidEmail')
  } else {
    errors.email = ''
  }
}

const validatePhone = () => {
  const phoneRegex = /^\+?[0-9]{10,14}$/
  if (!phoneRegex.test(form.phone)) {
    errors.phone = t('validation.invalidPhone')
  } else {
    errors.phone = ''
  }
}

const onCityChange = () => {
  form.districtId = ''
  if (form.cityId) {
    bostaStore.fetchDistricts(form.cityId)
  }
}

const submitForm = () => {
  validateEmail()
  validatePhone()
  if (isFormValid.value) {
    emit('submit', form)
  }
}

onMounted(() => {
  bostaStore.fetchCities()
})

const emit = defineEmits(['submit'])
</script>
