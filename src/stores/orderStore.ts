// src/stores/orderStore.ts

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '@/api'

interface Order {
  id: number
  // Add other order properties here
}

interface OrderState {
  orders: Order[]
  currentOrder: Order | null
  loading: boolean
  error: string | null
}

export const useOrderStore = defineStore('order', () => {
  const state = ref<OrderState>({
    orders: [],
    currentOrder: null,
    loading: false,
    error: null
  })

  const getOrders = computed(() => state.value.orders)
  const getCurrentOrder = computed(() => state.value.currentOrder)
  const getLoading = computed(() => state.value.loading)
  const getError = computed(() => state.value.error)

  async function fetchOrders() {
    state.value.loading = true
    try {
      const response = await api.get('/orders')
      state.value.orders = response.data.data
    } catch (error) {
      state.value.error = 'Failed to fetch orders'
      console.error(error)
    } finally {
      state.value.loading = false
    }
  }

  async function fetchOrder(orderId: number) {
    state.value.loading = true
    try {
      const response = await api.get(`/orders/${orderId}`)
      state.value.currentOrder = response.data.data
    } catch (error) {
      state.value.error = 'Failed to fetch order'
      console.error(error)
    } finally {
      state.value.loading = false
    }
  }

  async function createOrder(orderData: Partial<Order>) {
    state.value.loading = true
    try {
      const response = await api.post('/orders', orderData)
      state.value.orders.push(response.data.data)
      return response.data.data
    } catch (error) {
      state.value.error = 'Failed to create order'
      console.error(error)
    } finally {
      state.value.loading = false
    }
  }

  async function updateOrder(orderId: number, orderData: Partial<Order>) {
    state.value.loading = true
    try {
      const response = await api.put(`/orders/${orderId}`, orderData)
      const index = state.value.orders.findIndex((order) => order.id === orderId)
      if (index !== -1) {
        state.value.orders[index] = response.data.data
      }
      return response.data.data
    } catch (error) {
      state.value.error = 'Failed to update order'
      console.error(error)
    } finally {
      state.value.loading = false
    }
  }

  async function cancelOrder(orderId: number) {
    state.value.loading = true
    try {
      await api.delete(`/orders/${orderId}`)
      state.value.orders = state.value.orders.filter((order) => order.id !== orderId)
    } catch (error) {
      state.value.error = 'Failed to cancel order'
      console.error(error)
    } finally {
      state.value.loading = false
    }
  }

  async function traceOrder(orderId: number) {
    state.value.loading = true
    try {
      const response = await api.get(`/orders/${orderId}/trace`)
      return response.data.data
    } catch (error) {
      state.value.error = 'Failed to trace order'
      console.error(error)
    } finally {
      state.value.loading = false
    }
  }

  async function refundOrder(orderId: number) {
    state.value.loading = true
    try {
      const response = await api.post(`/orders/${orderId}/refund`)
      return response.data.message
    } catch (error) {
      state.value.error = 'Failed to refund order'
      console.error(error)
    } finally {
      state.value.loading = false
    }
  }

  return {
    getOrders,
    getCurrentOrder,
    getLoading,
    getError,
    fetchOrders,
    fetchOrder,
    createOrder,
    updateOrder,
    cancelOrder,
    traceOrder,
    refundOrder
  }
})
