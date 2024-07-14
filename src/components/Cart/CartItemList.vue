<template>
  <div class="cart-item-list">
    <table class="w-full">
      <thead>
        <tr class="border-b">
          <th class="text-left py-2">Book Title</th>
          <th class="text-left py-2">ISBN</th>
          <th class="text-left py-2">Quantity</th>
          <th class="text-right py-2">Total price</th>
          <th class="py-2"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id" class="border-b">
          <td class="py-4">
            <div class="flex items-center">
              <img
                :src="item.book.image"
                :alt="item.book.title"
                class="w-16 h-20 object-cover mr-4"
              />
              <div>
                <h3 class="font-semibold">{{ item.book.title }}</h3>
                <p class="text-sm text-gray-500">{{ item.book.category }}</p>
              </div>
            </div>
          </td>
          <td>{{ item.book.isbn10 }}</td>
          <td>
            <div class="flex items-center">
              <button @click="decreaseQuantity(item)" class="px-2 py-1 bg-gray-200 rounded-l">
                -
              </button>
              <span class="px-4 py-1 bg-gray-100">{{ item.quantity }}</span>
              <button @click="increaseQuantity(item)" class="px-2 py-1 bg-gray-200 rounded-r">
                +
              </button>
            </div>
          </td>
          <td class="text-right">{{ formatPrice(item.book.price * item.quantity) }}</td>
          <td class="text-right">
            <button @click="removeItem(item)" class="text-red-500 hover:text-red-700">
              <span class="sr-only">Remove</span>
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import type { CartItem } from '@/types/CartItem'

export default defineComponent({
  name: 'CartItemList',
  props: {
    items: {
      type: Array as PropType<CartItem[]>,
      required: true
    }
  },
  methods: {
    formatPrice(price: number): string {
      return `$${price.toFixed(2)}`
    },
    increaseQuantity(item: CartItem): void {
      this.$emit('update-quantity', item.id, item.quantity + 1)
    },
    decreaseQuantity(item: CartItem): void {
      if (item.quantity > 1) {
        this.$emit('update-quantity', item.id, item.quantity - 1)
      }
    },
    removeItem(item: CartItem): void {
      this.$emit('remove-item', item.id)
    }
  }
})
</script>

<style scoped>
/* Add any additional styles here */
</style>
