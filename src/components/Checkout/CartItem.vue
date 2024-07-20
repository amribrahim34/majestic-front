<!-- CartItem.vue -->
<template>
  <tr class="border-b last:border-b-0">
    <td class="py-4">
      <div class="flex items-center space-x-3">
        <div class="w-24 h-32 flex-shrink-0">
          <!-- Fixed container size -->
          <img
            :src="item.book.image"
            :alt="item.book.title"
            class="w-full h-full object-cover object-center"
          />
        </div>
        <div>
          <h4 class="font-semibold">{{ item.book.title }}</h4>
          <p class="text-sm text-gray-600">{{ item.book.category?.category_name }}</p>
        </div>
      </div>
    </td>
    <td class="py-4">
      <div class="flex items-center">
        <button
          @click="decreaseQuantity"
          class="px-2 py-1 border border-gray-300 rounded-l"
          :disabled="item.quantity <= 1"
        >
          -
        </button>
        <input
          type="number"
          :value="item.quantity"
          @input="updateQuantity"
          class="w-12 text-center border-t border-b border-gray-300"
          min="1"
        />
        <button @click="increaseQuantity" class="px-2 py-1 border border-gray-300 rounded-r">
          +
        </button>
      </div>
    </td>
    <td class="py-4">${{ (item.book.price * item.quantity).toFixed(2) }}</td>
    <td class="py-4">
      <button
        @click="removeItem"
        class="text-gray-400 hover:text-gray-600 text-xl focus:outline-none"
      >
        ×
      </button>
    </td>
  </tr>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import { useCartStore } from '@/stores/cart'
import type { CartItem } from '@/types/CartItem'

const props = defineProps<{
  item: CartItem
}>()

const emit = defineEmits(['remove'])

const cartStore = useCartStore()

const updateQuantity = (event: Event) => {
  const target = event.target as HTMLInputElement
  const newQuantity = parseInt(target.value)
  if (newQuantity > 0) {
    cartStore.updateItemQuantity(props.item.book_id, newQuantity)
  }
}

const increaseQuantity = () => {
  cartStore.updateItemQuantity(props.item.book_id, props.item.quantity + 1)
}

const decreaseQuantity = () => {
  if (props.item.quantity > 1) {
    cartStore.updateItemQuantity(props.item.book_id, props.item.quantity - 1)
  }
}

const removeItem = () => {
  cartStore.removeItem(props.item.book_id)
  emit('remove', props.item.book_id)
}
</script>
