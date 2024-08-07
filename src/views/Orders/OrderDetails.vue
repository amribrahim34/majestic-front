<template>
  <div class="flex flex-col min-h-screen">
    <HeaderComponent />
    <main class="flex-grow container mx-auto px-4 py-8 w-5/6">
      <n-spin :show="loading">
        <template v-if="currentOrder">
          <div class="mb-8">
            <h1 class="text-3xl font-bold mb-2">{{ t('orderDetails.orderDetails') }}</h1>
            <p class="text-gray-600">
              {{ t('orderDetails.orderNumber', { id: currentOrder.id }) }}
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="bg-white p-6 rounded-lg shadow">
              <h2 class="text-xl font-semibold mb-4">{{ t('orderDetails.orderSummary') }}</h2>
              <div class="space-y-2">
                <p>
                  <span class="font-medium">{{ t('orderDetails.orderDate') }}:</span>
                  {{ formatDate(currentOrder.order_date) }}
                </p>
                <p>
                  <span class="font-medium">{{ t('orderDetails.status') }}:</span>
                  {{ getOrderStatus(currentOrder.status) }}
                </p>
                <p>
                  <span class="font-medium">{{ t('orderDetails.total') }}:</span>
                  {{ formatCurrency(currentOrder.total_amount) }}
                </p>
              </div>
            </div>

            <div class="bg-white p-6 rounded-lg shadow">
              <h2 class="text-xl font-semibold mb-4">{{ t('orderDetails.shippingDetails') }}</h2>
              <div class="space-y-2">
                <p>
                  <span class="font-medium">{{ t('orderDetails.address') }}:</span>
                  {{ currentOrder.shipping_address }}
                </p>
                <p>
                  <span class="font-medium">{{ t('orderDetails.city') }}:</span>
                  {{ currentOrder.city }}
                </p>
                <p>
                  <span class="font-medium">{{ t('orderDetails.country') }}:</span>
                  {{ currentOrder.country }}
                </p>
                <p v-if="currentOrder.shipment_tracking_number">
                  <span class="font-medium">{{ t('orderDetails.trackingNumber') }}:</span>
                  {{ currentOrder.shipment_tracking_number }}
                </p>
              </div>
            </div>
          </div>

          <div class="mt-8 bg-white p-6 rounded-lg shadow">
            <h2 class="text-xl font-semibold mb-4">{{ t('orderDetails.orderItems') }}</h2>
            <n-data-table :columns="columns" :data="currentOrder.items" :bordered="false" />
          </div>

          <div class="mt-8 flex justify-end space-x-4">
            <n-button @click="trackOrder" :disabled="!currentOrder.shipment_tracking_number">
              {{ t('orderDetails.trackOrder') }}
            </n-button>
            <n-button @click="cancelOrder" :disabled="!canCancelOrder">
              {{ t('orderDetails.cancelOrder') }}
            </n-button>
            <n-button @click="requestRefund" :disabled="!canRequestRefund">
              {{ t('orderDetails.requestRefund') }}
            </n-button>
          </div>
        </template>
        <n-result
          v-else
          status="404"
          :title="t('orderDetails.orderNotFound')"
          :description="t('orderDetails.orderNotFoundDescription')"
        />
      </n-spin>
    </main>
    <FooterComponent />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { NSpin, NDataTable, NButton, NResult } from 'naive-ui'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import HeaderComponent from '@/components/Header.vue'
import FooterComponent from '@/components/FooterComponent.vue'
import { useOrderStore } from '@/stores/orderStore'
import { formatDate, formatCurrency } from '@/utils/formatters'

const { t } = useI18n()
const route = useRoute()
const orderStore = useOrderStore()
const { currentOrder, loading } = storeToRefs(orderStore)
const {
  fetchOrder,
  getOrderStatus,
  traceOrder,
  cancelOrder: storeCancelOrder,
  refundOrder
} = orderStore

const orderId = computed(() => Number(route.params.id))

onMounted(async () => {
  await fetchOrder(orderId.value)
})

const columns = [
  {
    title: t('orderDetails.book'),
    key: 'title',
    render: (row) => `${row.title} (${row.isbn13})`
  },
  {
    title: t('orderDetails.quantity'),
    key: 'quantity'
  },
  {
    title: t('orderDetails.price'),
    key: 'price',
    render: (row) => row.price
  },
  {
    title: t('orderDetails.total'),
    key: 'total',
    render: (row) => Number(row.price) * row.quantity
  }
]

const canCancelOrder = computed(() => {
  return currentOrder.value && ['pending', 'processing'].includes(currentOrder.value.status)
})

const canRequestRefund = computed(() => {
  return currentOrder.value && ['shipped', 'delivered'].includes(currentOrder.value.status)
})

const trackOrder = async () => {
  if (currentOrder.value) {
    const trackingInfo = await traceOrder(currentOrder.value.id)
    // Handle tracking info display (e.g., show in a modal)
    console.log(trackingInfo)
  }
}

const cancelOrder = async () => {
  if (currentOrder.value) {
    await storeCancelOrder(currentOrder.value.id)
    // Handle cancellation success (e.g., show a message, redirect)
  }
}

const requestRefund = async () => {
  if (currentOrder.value) {
    const result = await refundOrder(currentOrder.value.id)
    // Handle refund request result (e.g., show a message)
    console.log(result)
  }
}
</script>
