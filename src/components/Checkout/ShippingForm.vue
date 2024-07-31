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
          type="tel"
          id="phone"
          v-model="form.phone"
          required
          class="w-full border-b border-gray-500 p-2 appearance-none bg-transparent text-white"
          :placeholder="t('shipping.phone')"
          :aria-label="t('shipping.phone')"
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
        <button
          type="button"
          @click="getGeolocation"
          class="mt-2 bg-gray-700 text-white py-1 px-2 rounded text-sm"
        >
          {{ t('shipping.useMyLocation') }}
        </button>
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
            <option value="" class="bg-black">{{ t('shipping.selectCity') }}</option>
            <option
              v-for="city in bostaStore.cities"
              :key="city._id"
              :value="city._id"
              class="bg-black"
            >
              {{ currentLocale === 'ar' ? city.nameAr : city.name }}
            </option>
          </select>
        </div>
        <div class="flex-1">
          <select
            id="district"
            v-model="form.districtId"
            required
            :disabled="!form.cityId"
            class="w-full border-b border-gray-500 p-2 appearance-none bg-transparent text-white"
          >
            <option value="" class="bg-black">{{ t('shipping.selectDistrict') }}</option>
            <option
              v-for="district in bostaStore.districts"
              :key="district.districtId"
              :value="district.districtId"
              class="bg-black"
            >
              {{ currentLocale === 'ar' ? district.districtName : district.districtOtherName }}
            </option>
          </select>
        </div>
      </div>
      <div>
        <input
          type="text"
          id="shippingCost"
          v-model="form.shippingCost"
          required
          class="w-full border-b border-gray-500 p-2 appearance-none bg-transparent text-white"
          :placeholder="t('shipping.shippingCost')"
          :aria-label="t('shipping.shippingCost')"
        />
      </div>
      <button
        type="submit"
        class="w-full bg-white text-black py-2 px-4 rounded hover:bg-gray-200 transition-colors"
        :disabled="!isFormValid"
      >
        {{ t('shipping.confirmOrder') }} &gt;
      </button>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, computed, onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useBostaStore } from '@/stores/bostaStore'
import { useLoginStore } from '@/stores/auth'

const { t, locale } = useI18n()
const bostaStore = useBostaStore()
const loginStore = useLoginStore()

const currentLocale = computed(() => locale.value)

const form = reactive({
  name: '',
  institution: '',
  email: '',
  phone: '',
  address: '',
  cityId: '',
  districtId: '',
  zip: '',
  country: 'Egypt',
  useBillingAddress: false,
  shippingCost: ''
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
    form.shippingCost &&
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
    sendOrderRequest()
  }
}

const sendOrderRequest = async () => {
  try {
    const response = await fetch('/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    })

    if (response.ok) {
      console.log('Order submitted successfully')
      // You can add additional success handling here
    } else {
      console.error('Failed to submit order')
      // Handle error response here
    }
  } catch (error) {
    console.error('Error submitting order:', error)
  }
}

const getGeolocation = () => {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        form.address = `Lat: ${latitude}, Lon: ${longitude}`
      },
      (error) => {
        console.error('Error getting location:', error.message)
      }
    )
  } else {
    console.error('Geolocation is not supported by this browser.')
  }
}

onMounted(() => {
  bostaStore.fetchCities()
})

// Populate form with user data when available
watch(
  () => loginStore.userData,
  (userData) => {
    if (userData) {
      form.name = userData.user_name || ''
      form.email = userData.email || ''
      form.phone = userData.mobile || ''
      form.address = userData.address || ''
      form.cityId = userData.city || ''
      form.country = userData.country || 'Egypt'
    }
  },
  { immediate: true }
)

const emit = defineEmits(['submit'])
</script>
