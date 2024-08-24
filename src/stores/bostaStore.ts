// stores/bostaStore.ts
import { defineStore } from 'pinia'
import axios, { AxiosInstance } from 'axios'
import { BostaState, BostaResponse } from '@/types/bosta/BostaState'
import { City } from '@/types/bosta/City'
import { District } from '@/types/bosta/District'
import { BOSTA_API_TOKEN } from '@/config'

const api: AxiosInstance = axios.create({
  timeout: 10000, // Optional: sets timeout to 10 seconds
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    Authorization: `Bearer ${BOSTA_API_TOKEN}`,
    Accept: 'application/json'
  }
})

export const useBostaStore = defineStore('bosta', {
  state: (): BostaState => ({
    cities: [],
    districts: [],
    shippingCost: 100,
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
    },

    async calculateShipment(cod: number, DOCity: string) {
      try {
        const response = await api.get('https://app.bosta.co/api/v2/pricing/shipment/calculator', {
          params: {
            cod: cod,
            dropOffCity: DOCity,
            pickupCity: 'Cairo',
            size: 'Normal'
          }
        })
        this.shippingCost = response.data.data.priceAfterVat
        return response.data.priceAfterVat
      } catch (error) {
        console.error('Error calculating shipment:', error)
        throw error
      }
    }
  },

  getters: {
    getCityById: (state) => (id: string) => state.cities.find((city) => city._id === id),
    getDistrictById: (state) => (id: string) =>
      state.districts.find((district) => district.districtId === id)
  }
})
