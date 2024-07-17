// BookOrderCard.vue
<template>
  <div class="bg-white shadow-md rounded-lg p-4">
    <h2 class="text-xl font-semibold mb-2">Order #{{ order.id }}</h2>
    <p class="mb-1">Book: {{ order.book }}</p>
    <p v-if="order.status !== 'Delivered'" class="mb-1">Status: {{ order.status }}</p>
    <p v-if="order.estimatedDelivery" class="mb-2">
      Estimated Delivery: {{ order.estimatedDelivery }}
    </p>
    <p v-if="order.deliveredOn" class="mb-2">Delivered on: {{ order.deliveredOn }}</p>
    <div class="flex justify-end space-x-2">
      <button
        v-if="order.status !== 'Delivered'"
        @click="$emit('cancel', order.id)"
        class="text-white bg-black px-4 py-2 rounded"
      >
        Cancel
      </button>
      <button @click="$emit('track', order.id)" class="text-white bg-black px-4 py-2 rounded">
        Track
      </button>
      <button
        v-if="order.status === 'Delivered'"
        @click="$emit('reorder', order.id)"
        class="text-white bg-black px-4 py-2 rounded"
      >
        Reorder
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { BookOrder } from '@/types'

defineProps<{
  order: BookOrder
}>()

defineEmits<{
  (event: 'cancel', orderId: string): void
  (event: 'track', orderId: string): void
  (event: 'reorder', orderId: string): void
}>()
</script>
