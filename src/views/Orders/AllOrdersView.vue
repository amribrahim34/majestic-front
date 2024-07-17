<template>
  <div class="flex flex-col min-h-screen">
    <HeaderComponent />
    <main class="flex-grow container mx-auto px-4 py-8 w-5/6">
      <h1 class="text-3xl font-bold mb-8">your Orders</h1>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <BookOrderCard
          v-for="order in orders"
          :key="order.id"
          :order="order"
          @cancel="cancelOrder"
          @track="trackOrder"
          @reorder="reorderBook"
        />
      </div>
    </main>
    <FooterComponent />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import HeaderComponent from '@/components/Header.vue'
import FooterComponent from '@/components/FooterComponent.vue'
import BookOrderCard from '@/components/Orders/BookOrderCard.vue'
import { BookOrder } from '@/types/BookOrder'

const orders = ref<BookOrder[]>([
  {
    id: '12345',
    book: 'Advanced Biology',
    estimatedDelivery: '3 days',
    status: 'Pending'
  },
  {
    id: '12346',
    book: 'Quantum Physics',
    estimatedDelivery: '5 days',
    status: 'Processing'
  },
  {
    id: '12347',
    book: 'Modern Literature',
    deliveredOn: '2 days ago',
    status: 'Delivered'
  }
])

const cancelOrder = (orderId: string) => {
  console.log('Cancelling order:', orderId)
  // Implement cancel logic here
}

const trackOrder = (orderId: string) => {
  console.log('Tracking order:', orderId)
  // Implement tracking logic here
}

const reorderBook = (orderId: string) => {
  console.log('Reordering book:', orderId)
  // Implement reorder logic here
}
</script>
