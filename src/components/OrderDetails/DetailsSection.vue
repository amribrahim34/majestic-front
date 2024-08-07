<!-- OrderDetails.vue -->
<template>
  <n-card>
    <div class="space-y-4">
      <img :src="order.bookImage" alt="Book image" class="w-full h-48 object-cover rounded-lg" />
      <h2 class="text-xl font-semibold">{{ order.bookType }}</h2>
      <p class="text-gray-600">{{ order.bookDescription }}</p>
      <n-descriptions bordered>
        <n-descriptions-item label="Confirmed">
          {{ order.confirmedDate }}
        </n-descriptions-item>
        <n-descriptions-item label="Estimated Delivery">
          {{ order.estimatedDelivery }}
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
const order = orderStore.currentOrder
</script>
