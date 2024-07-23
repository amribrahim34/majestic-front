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
        const response = await api.get<City[]>('http://app.bosta.co/api/v2/cities')
        this.cities = response.data
      } catch (error) {
        console.error('Error fetching cities:', error)
        this.error = 'Failed to fetch cities'
      } finally {
        this.loading = false
      }
    },

    async fetchDistricts(cityId: number) {
      this.loading = true
      this.error = null
      try {
        const response = await axios.get<District[]>(
          `https://api.bosta.co/cities/${cityId}/districts`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_BOSTA_API_KEY}`
            }
          }
        )
        this.districts = response.data
      } catch (error) {
        console.error('Error fetching districts:', error)
        this.error = 'Failed to fetch districts'
      } finally {
        this.loading = false
      }
    }
  },

  getters: {
    getCityById: (state) => (id: number) => state.cities.find((city) => city.id === id),
    getDistrictById: (state) => (id: number) =>
      state.districts.find((district) => district.id === id)
  }
})
