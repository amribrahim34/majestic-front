// stores/bostaStore.ts
import { defineStore } from 'pinia'
import axios, { AxiosInstance } from 'axios'
import { BostaState } from '@/types/bosta/BostaState'
import { City } from '@/types/bosta/City'
import { District } from '@/types/bosta/District'

const api: AxiosInstance = axios.create({
  timeout: 10000, // Optional: sets timeout to 10 seconds
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    Authorization: `Bearer ${import.meta.env.VITE_BOSTA_API_KEY}`,
    Accept: 'application/json'
  }
})

interface BostaResponse<T> {
  success: boolean
  message: string
  data: T
}

export const useBostaStore = defineStore('bosta', {
  state: (): BostaState => ({
    cities: [],
    districts: [],
    loading: false,
    error: null
  }),

  actions: {
    async fetchCities() {
      this.loading = true
      this.error = null
      try {
        const response = await api.get<BostaResponse<{ list: City[] }>>(
          'https://app.bosta.co/api/v2/cities'
        )
        this.cities = response.data.data.list
      } catch (error) {
        console.error('Error fetching cities:', error)
        this.error = 'Failed to fetch cities'
      } finally {
        this.loading = false
      }
    },

    async fetchDistricts(cityId: string) {
      this.loading = true
      this.error = null
      try {
        const response = await api.get<BostaResponse<District[]>>(
          `https://app.bosta.co/api/v2/cities/${cityId}/districts`
        )
        this.districts = response.data.data
      } catch (error) {
        console.error('Error fetching districts:', error)
        this.error = 'Failed to fetch districts'
      } finally {
        this.loading = false
      }
    }
  },

  getters: {
    getCityById: (state) => (id: string) => state.cities.find((city) => city._id === id),
    getDistrictById: (state) => (id: string) =>
      state.districts.find((district) => district.districtId === id)
  }
})
