<template>
  <div class="bg-black text-white p-5 rounded-lg h-full">
    <form @submit.prevent="submitForm" class="space-y-4">
      <div>
        <input
          type="text"
          id="name"
          v-model="form.name"
          class="w-full border-b border-gray-500 p-2 appearance-none bg-transparent text-white"
          :placeholder="t('shipping.name')"
          :aria-label="t('shipping.name')"
        />
        <span v-if="errors.name" class="text-red-500 text-sm">{{ errors.name }}</span>
      </div>
      <div>
        <input
          type="number"
          id="phone"
          v-model="form.phone"
          class="w-full border-b border-gray-500 p-2 appearance-none bg-transparent text-white"
          :placeholder="t('shipping.phone')"
          :aria-label="t('shipping.phone')"
        />
        <span v-if="errors.phone" class="text-red-500 text-sm">{{ errors.phone }}</span>
      </div>
      <div class="flex gap-4">
        <div class="flex-1">
          <input
            type="text"
            id="address"
            v-model="form.address"
            class="w-full border-b border-gray-500 p-2 appearance-none bg-transparent text-white"
            :placeholder="t('shipping.address')"
          />
          <span v-if="errors.address" class="text-red-500 text-sm">{{ errors.address }}</span>
        </div>
        <div class="flex-1">
          <input
            type="text"
            id="special_mark"
            v-model="form.special_mark"
            class="w-full border-b border-gray-500 p-2 appearance-none bg-transparent text-white"
            :placeholder="t('shipping.specialMark')"
          />
          <span v-if="errors.special_mark" class="text-red-500 text-sm">{{
            errors.special_mark
          }}</span>
        </div>
      </div>
      <div class="flex gap-4">
        <div class="flex-1">
          <select
            id="city"
            v-model="form.cityId"
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
          <span v-if="errors.cityId" class="text-red-500 text-sm">{{ errors.cityId }}</span>
        </div>
        <div class="flex-1">
          <select
            id="district"
            v-model="form.districtId"
            :disabled="!form.cityId"
            @change="getShippingCost"
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
          <span v-if="errors.districtId" class="text-red-500 text-sm">{{ errors.districtId }}</span>
        </div>
      </div>
      <div>
        <input
          type="text"
          id="shippingCost"
          :value="bostaStore.shippingCost"
          class="w-full border-b border-gray-500 p-2 appearance-none bg-transparent text-white"
          :placeholder="t('shipping.shippingCost')"
          :aria-label="t('shipping.shippingCost')"
          disabled
        />
      </div>
      <!-- Payment Type -->
      <div>
        <select
          id="paymentType"
          v-model="form.paymentType"
          class="w-full border-b border-gray-500 p-2 appearance-none bg-transparent text-white"
        >
          <option value="" class="bg-black" disabled>{{ t('shipping.selectPaymentType') }}</option>
          <option value="cashOnDelivery" class="bg-black text-white" selected>
            {{ t('shipping.cashOnDelivery') }}
          </option>
          <!-- Add more payment options if needed -->
        </select>
        <!-- <span v-if="errors.paymentType" class="text-red-500 text-sm">{{ errors.paymentType }}</span> -->
      </div>
      <!-- Refund Policy Link -->
      <div>
        <a href="#" class="text-blue-400 hover:underline">{{ t('shipping.refundPolicy') }}</a>
      </div>
      <button
        type="submit"
        class="w-full bg-white text-black py-2 px-4 rounded hover:bg-gray-200 transition-colors"
      >
        {{ t('shipping.confirmOrder') }} &gt;
      </button>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useBostaStore } from '@/stores/bostaStore'
import { useLoginStore } from '@/stores/auth'
import { defineProps } from 'vue'
import { useFormValidation } from '@/Composables/Checkout/useFormValidation'
import { useOrderStore } from '@/stores/orderStore'

const props = defineProps<{
  total: number
}>()

const { form, errors, validateForm } = useFormValidation()

const { t, locale } = useI18n()
const bostaStore = useBostaStore()
const loginStore = useLoginStore()

const currentLocale = computed(() => locale.value)

const onCityChange = () => {
  form.districtId = ''
  if (form.cityId) {
    const selectedCity = bostaStore.cities.find((city) => city._id === form.cityId)
    form.city = selectedCity?.name || ''
    bostaStore.fetchDistricts(form.cityId)
  } else {
    form.city = ''
  }
}

const submitForm = () => {
  if (validateForm()) {
    emit('submit', form)
    sendOrderRequest()
  }
}

const getShippingCost = async () => {
  if (form.city && props.total) {
    await bostaStore.calculateShipment(props.total, form.city)
  }
}

const sendOrderRequest = async () => {
  const orderStore = useOrderStore()
  try {
    const createdOrder = await orderStore.createOrder(form)
    if (createdOrder) {
      console.log('Order submitted successfully')
    } else {
      console.error('Failed to submit order')
    }
  } catch (error) {
    console.error('Error submitting order:', error)
  }
}

onMounted(() => {
  bostaStore.fetchCities()
})

watch(
  () => loginStore.userData,
  (userData) => {
    if (userData) {
      form.name = userData.user_name || ''
      form.email = userData.email || ''
      form.phone = userData.mobile || ''
      form.address = userData?.address?.address || ''
      form.cityId = userData.address?.city || ''
      form.districtId = userData.address?.state || ''
    }
  },
  { immediate: true }
)

watch(
  () => props.total,
  (newTotal) => {
    if (form.city && newTotal) {
      getShippingCost()
    }
  }
)

const emit = defineEmits(['submit'])
</script>
