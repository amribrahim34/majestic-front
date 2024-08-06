<template>
  <div class="flex flex-col min-h-screen">
    <HeaderComponent />
    <main class="flex-grow container mx-auto px-4 py-8 w-5/6">
      <h1 class="text-3xl font-bold mb-8">{{ t('yourOrders') }}</h1>
      <n-spin :show="loading">
        <div v-if="orders?.length" class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BookOrderCard
            v-for="order in orders"
            :key="order?.id"
            :order="order"
            @cancel="cancelOrder"
            @track="trackOrder"
            @reorder="reorderBook"
            @view="viewOrderDetails"
          />
        </div>
        <n-empty v-else :description="t('noOrders')" />
      </n-spin>
    </main>
    <FooterComponent />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { NSpin, NEmpty } from 'naive-ui'
import HeaderComponent from '@/components/Header.vue'
import FooterComponent from '@/components/FooterComponent.vue'
import BookOrderCard from '@/components/Orders/BookOrderCard.vue'
import { useOrderStore } from '@/stores/orderStore'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

const { t } = useI18n()

const orderStore = useOrderStore()
const { orders } = storeToRefs(orderStore)

const loading = ref(true)
const router = useRouter()

const { fetchOrders, cancelOrder, traceOrder } = orderStore

onMounted(async () => {
  try {
    await fetchOrders()
  } catch (error) {
    console.error('Failed to fetch orders:', error)
  } finally {
    loading.value = false
  }
})

const trackOrder = async (orderId: number) => {
  const trackingInfo = await traceOrder(orderId)
  // Handle tracking info display (e.g., show in a modal)
}

const viewOrderDetails = (orderId: number) => {
  // Navigate to the single order view or open a modal with order details
  // For example, using vue-router:
  router.push({ name: 'OrderDetails', params: { id: orderId } })
}

const reorderBook = async (orderId: number) => {
  // const orderToReorder = orders.value.find((order) => order.id === orderId)
  // if (orderToReorder) {
  //   await createOrder({ ...orderToReorder, id: undefined })
  // You might want to show a success message or redirect
  // }
}
</script>
