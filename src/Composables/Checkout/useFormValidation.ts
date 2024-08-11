// src/composables/useFormValidation.ts
import { reactive, computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

export function useFormValidation() {
  const { t } = useI18n()
  const touched = ref<Record<string, boolean>>({})

  const form = reactive({
    name: '',
    email: '',
    phone: '',
    address: '',
    cityId: '',
    city: '',
    cityName: '',
    districtId: '',
    special_mark: '',
    latitude: '',
    paymentType: '',
    longitude: '',
    is_default: true,
    shippingCost: ''
  })

  const errors = reactive({
    name: '',
    email: '',
    phone: '',
    address: '',
    cityId: '',
    districtId: '',
    paymentType: '',
    special_mark: ''
  })

  const isFormValid = computed(() => {
    return (
      Object.values(errors).every((error) => error === '') &&
      Object.entries(form).every(
        ([key, value]) =>
          ['latitude', 'longitude', 'is_default', 'shippingCost', 'cityName'].includes(key) ||
          value !== ''
      )
    )
  })

  const validateForm = () => {
    Object.keys(form).forEach((key) => {
      if (key in errors) {
        touched.value[key] = true
        validateField(key as keyof typeof errors)
      }
    })
    return isFormValid.value
  }

  const validateField = (field: keyof typeof errors) => {
    if (!touched.value[field]) return

    switch (field) {
      case 'email':
        validateEmail()
        break
      case 'phone':
        validatePhone()
        break
      default:
        validateRequired(field)
    }
  }

  const validateRequired = (field: keyof typeof errors) => {
    errors[field] = form[field as keyof typeof form] ? '' : t('validation.required')
  }

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    errors.email = form.email
      ? emailRegex.test(form.email)
        ? ''
        : t('validation.invalidEmail')
      : t('validation.required')
  }

  const validatePhone = () => {
    const phoneRegex = /^\+?[0-9]{10,14}$/
    errors.phone = form.phone
      ? phoneRegex.test(form.phone)
        ? ''
        : t('validation.invalidPhone')
      : t('validation.required')
  }

  const touchField = (field: keyof typeof errors) => {
    touched.value[field] = true
    validateField(field)
  }

  return {
    form,
    errors,
    isFormValid,
    validateForm,
    validateField,
    touchField
  }
}
