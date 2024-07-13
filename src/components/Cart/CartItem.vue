<template>
  <div class="cart-item flex items-center justify-between border-b py-4">
    <div class="flex items-center">
      <img :src="item.book.image" :alt="item.book.title" class="w-20 h-20 object-cover mr-4" />
      <div>
        <h3 class="font-semibold">{{ item.book.title }}</h3>
        <p>{{ formatPrice(item.book.price) }}</p>
      </div>
    </div>
    <div class="flex items-center">
      <button
        @click="updateQuantity(item.quantity - 1)"
        class="bg-gray-200 px-2 py-1 rounded-l"
        :disabled="item.quantity === 1"
      >
        -
      </button>
      <span class="px-4 py-1 bg-gray-100">{{ item.quantity }}</span>
      <button @click="updateQuantity(item.quantity + 1)" class="bg-gray-200 px-2 py-1 rounded-r">
        +
      </button>
      <button @click="removeItem" class="ml-4 text-red-500 hover:text-red-700">Remove</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { CartItem } from '@/types/CartItem'

export default defineComponent({
  name: 'CartItem',
  props: {
    item: {
      type: Object as PropType<CartItem>,
      required: true
    }
  },
  methods: {
    formatPrice(price: number | string): string {
      const numPrice = typeof price === 'string' ? parseFloat(price) : price
      return isNaN(numPrice) ? '0.00' : numPrice.toFixed(2)
    },
    updateQuantity(newQuantity: number) {
      if (newQuantity > 0) {
        this.$emit('update-quantity', this.item.book.id, newQuantity)
      }
    },
    removeItem() {
      this.$emit('remove-item', this.item.book.id)
    }
  }
})
</script>
