<template>
  <div class="flex-1 bg-black text-white p-5 rounded-lg">
    <h3 class="text-xl font-bold mb-4">{{ t('shipping.title') }}</h3>
    <form @submit.prevent="submitForm" class="space-y-4">
      <PersonalInfoInputs v-model:form="form" :errors="errors" />
      <AddressInputs v-model:form="form" :errors="errors" @get-geolocation="getGeolocation" />
      <LocationSelects
        v-model:form="form"
        @city-change="onCityChange"
        @district-change="getShippingCost"
      />
      <ShippingCostDisplay :shipping-cost="bostaStore.shippingCost" />
      <SubmitButton :is-form-valid="isFormValid" />
    </form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, computed, onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useBostaStore } from '@/stores/bostaStore'
import { useLoginStore } from '@/stores/auth'
import { defineProps, defineEmits } from 'vue'
import PersonalInfoInputs from './PersonalInfoInputs.vue'
import AddressInputs from './AddressInputs.vue'
import LocationSelects from './LocationSelects.vue'
import ShippingCostDisplay from './ShippingCostDisplay.vue'
import SubmitButton from './SubmitButton.vue'
import { useFormValidation } from '@/Composables/Checkout/useFormValidation'
import { useGeolocation } from '@/Composables/Checkout/useGeolocation'
import { useShippingCost } from '@/Composables/Checkout/useShippingCost'
// import { useOrderSubmission } from '@/Composables/Checkout/useOrderSubmission'

const props = defineProps<{
  total: number
}>()

const { t, locale } = useI18n()
const bostaStore = useBostaStore()
const loginStore = useLoginStore()

const { form, errors, isFormValid, validateForm } = useFormValidation()
const { getGeolocation } = useGeolocation(form)
const { getShippingCost } = useShippingCost(bostaStore, form, props.total)
// const { submitOrder } = useOrderSubmission()

const onCityChange = () => {
  form.districtId = ''
  if (form.cityId) {
    const selectedCity = bostaStore.cities.find((city) => city._id === form.cityId)
    form.cityName = selectedCity?.name || ''
    bostaStore.fetchDistricts(form.cityId)
  } else {
    form.cityName = ''
  }
}

const submitForm = async () => {
  if (validateForm()) {
    // await submitOrder(form)
    emit('submit', form)
  }
}

onMounted(() => {
  bostaStore.fetchCities()
})

watch(
  () => loginStore.userData,
  (userData) => {
    if (userData) {
      Object.assign(form, {
        name: userData.user_name || '',
        email: userData.email || '',
        phone: userData.mobile || '',
        address: userData?.address?.address || '',
        cityId: userData.address?.city || '',
        districtId: userData.address?.state || ''
      })
    }
  },
  { immediate: true }
)

watch(
  () => props.total,
  (newTotal) => {
    if (form.cityName && newTotal) {
      getShippingCost()
    }
  }
)

const emit = defineEmits(['submit'])
</script>
