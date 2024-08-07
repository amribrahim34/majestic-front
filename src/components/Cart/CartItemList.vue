<template>
  <div class="cart-item-list">
    <table class="w-full">
      <thead>
        <tr class="border-b">
          <th class="text-left py-2">{{ t('cart.bookTitle') }}</th>
          <th class="text-left py-2">{{ t('cart.isbn') }}</th>
          <th class="text-left py-2">{{ t('cart.quantity') }}</th>
          <th class="text-right py-2">{{ t('cart.totalPrice') }}</th>
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
                loading="lazy"
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
              <span class="sr-only">{{ t('cart.remove') }}</span>
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

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import { useI18n } from 'vue-i18n'
import type { CartItem } from '@/types/CartItem'

const { t } = useI18n()

defineProps<{
  items: CartItem[]
}>()

const emit = defineEmits<{
  (e: 'update-quantity', id: number, quantity: number): void
  (e: 'remove-item', id: number): void
}>()

const formatPrice = (price: number): string => {
  return t('cart.currency', { price: price.toFixed(2) })
}

const increaseQuantity = (item: CartItem): void => {
  emit('update-quantity', item.id, item.quantity + 1)
}

const decreaseQuantity = (item: CartItem): void => {
  if (item.quantity > 1) {
    emit('update-quantity', item.id, item.quantity - 1)
  }
}

const removeItem = (item: CartItem): void => {
  emit('remove-item', item.id)
}
</script>

<style scoped>
/* Add any additional styles here */
</style>
