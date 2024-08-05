// src/composables/useShippingCost.ts

import { Ref, watch } from 'vue'

interface ShippingForm {
  cityName: string
}

interface BostaStore {
  calculateShipment: (total: number, cityName: string) => Promise<void>
}

export function useShippingCost(
  bostaStore: BostaStore,
  form: Ref<ShippingForm>,
  total: Ref<number>
) {
  const getShippingCost = async () => {
    if (form.value.cityName && total.value) {
      await bostaStore.calculateShipment(total.value, form.value.cityName)
    }
  }

  watch([() => form.value.cityName, total], ([newCityName, newTotal]) => {
    if (newCityName && newTotal) {
      getShippingCost()
    }
  })

  return {
    getShippingCost
  }
}
