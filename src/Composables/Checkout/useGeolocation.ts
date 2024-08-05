// src/composables/useGeolocation.ts

import { Ref } from 'vue'

interface GeolocationForm {
  address: string
  latitude: string
  longitude: string
}

export function useGeolocation(form: Ref<GeolocationForm>) {
  const getGeolocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          form.value.latitude = latitude.toString()
          form.value.longitude = longitude.toString()
          form.value.address = `latitude: ${latitude}, longitude: ${longitude}`
        },
        (error) => {
          console.error('Error getting location:', error.message)
        }
      )
    } else {
      console.error('Geolocation is not supported by this browser.')
    }
  }

  return {
    getGeolocation
  }
}
