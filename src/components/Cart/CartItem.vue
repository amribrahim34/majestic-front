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
      <button @click="removeItem" class="ml-4 text-red-500 hover:text-red-700">
        {{ t('cart.remove') }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import { useI18n } from 'vue-i18n'
import type { CartItem } from '@/types/CartItem'

const { t } = useI18n()

const props = defineProps<{
  item: CartItem
}>()

const emit = defineEmits<{
  (e: 'update-quantity', id: number, quantity: number): void
  (e: 'remove-item', id: number): void
}>()

const formatPrice = (price: number | string): string => {
  const numPrice = typeof price === 'string' ? parseFloat(price) : price
  return isNaN(numPrice) ? '0.00' : numPrice.toFixed(2)
}

const updateQuantity = (newQuantity: number) => {
  if (newQuantity > 0) {
    emit('update-quantity', props.item.book.id, newQuantity)
  }
}

const removeItem = () => {
  emit('remove-item', props.item.book.id)
}
</script>
