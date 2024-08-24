<!-- OrderDetails.vue -->
<template>
  <n-card v-if="order">
    <div class="space-y-4">
      <img
        :src="order.bookImage"
        alt="Book image"
        class="w-full h-48 object-cover rounded-lg"
        loading="lazy"
      />
      <!-- <h2 class="text-xl font-semibold">{{ order.bookType }}</h2> -->
      <!-- <p class="text-gray-600">{{ order.bookDescription }}</p> -->
      <n-descriptions bordered>
        <n-descriptions-item label="Confirmed">
          {{ order.order_date }}
        </n-descriptions-item>
        <n-descriptions-item label="Estimated Delivery">
          {{ estimatedDeliveryDate }}
        </n-descriptions-item>
        <n-descriptions-item label="Location">
          {{ order.location }}
        </n-descriptions-item>
        <n-descriptions-item label="Payment Method">
          {{ order.paymentMethod }}
        </n-descriptions-item>
      </n-descriptions>
    </div>
  </n-card>
</template>

<script lang="ts" setup>
import { NCard, NDescriptions, NDescriptionsItem } from 'naive-ui'
import { useOrderStore } from '@/stores/orderStore'

const orderStore = useOrderStore()

const estimatedDeliveryDate = computed(() => {
  // Calculate estimated delivery date based on order_date
  // This is just a placeholder implementation
  const orderDate = new Date(props.order.order_date)
  const deliveryDate = new Date(orderDate.getTime() + 7 * 24 * 60 * 60 * 1000) // 7 days later
  return deliveryDate.toLocaleDateString()
})
const order = orderStore.currentOrder
</script>
