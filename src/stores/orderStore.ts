import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/api'
import { useI18n } from 'vue-i18n'
import { Order } from '@/types/Order'

export const useOrderStore = defineStore('order', () => {
  const { t } = useI18n()

  const orders = ref<Order[]>([])
  const currentOrder = ref<Order | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const currentPage = ref(1)
  const lastPage = ref(1)
  const total = ref(1)
  const perPage = ref(10)

  async function fetchOrders() {
    loading.value = true
    try {
      const response = await api.get('/orders')
      orders.value = response.data.data
    } catch (err) {
      error.value = 'Failed to fetch orders'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  function getOrderStatus(status: string) {
    return t(`orderStatus.${status}`)
  }

  function getEstimatedDelivery(days: number) {
    return t('estimatedDelivery', { days })
  }

  async function fetchOrder(orderId: number) {
    loading.value = true
    try {
      const response = await api.get(`/orders/${orderId}`)
      currentOrder.value = response.data
    } catch (err) {
      error.value = 'Failed to fetch order'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  async function createOrder(orderData: Partial<Order>) {
    loading.value = true
    try {
      const response = await api.post('/orders', orderData)
      orders.value.push(response.data.data)
      return response.data.data
    } catch (err) {
      error.value = 'Failed to create order'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  async function updateOrder(orderId: number, orderData: Partial<Order>) {
    loading.value = true
    try {
      const response = await api.put(`/orders/${orderId}`, orderData)
      const index = orders.value.findIndex((order) => order.id === orderId)
      if (index !== -1) {
        orders.value[index] = response.data.data
      }
      return response.data.data
    } catch (err) {
      error.value = 'Failed to update order'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  async function cancelOrder(orderId: number) {
    loading.value = true
    try {
      await api.delete(`/orders/${orderId}`)
      orders.value = orders.value.filter((order) => order.id !== orderId)
    } catch (err) {
      error.value = 'Failed to cancel order'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  async function traceOrder(orderId: number) {
    loading.value = true
    try {
      const response = await api.get(`/orders/${orderId}/trace`)
      return response.data.data
    } catch (err) {
      error.value = 'Failed to trace order'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  async function refundOrder(orderId: number) {
    loading.value = true
    try {
      const response = await api.post(`/orders/${orderId}/refund`)
      return response.data.message
    } catch (err) {
      error.value = 'Failed to refund order'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  return {
    orders,
    currentOrder,
    loading,
    error,
    currentPage,
    lastPage,
    total,
    perPage,
    fetchOrders,
    fetchOrder,
    createOrder,
    updateOrder,
    cancelOrder,
    traceOrder,
    getOrderStatus,
    getEstimatedDelivery,
    refundOrder
  }
})
