<template>
  <div class="cart-content">
    <h2 class="text-2xl font-bold mb-4">{{ t('cart.title') }}</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div class="md:col-span-2">
        <CartItemList
          :items="cartItems"
          @update-quantity="updateItemQuantity"
          @remove-item="removeItem"
        />
      </div>
      <div class="md:col-span-1">
        <CartSummary :subtotal="subtotal" :shipping="shipping" :total="total" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { storeToRefs } from 'pinia'
import { useCartStore } from '@/stores/cart'
import CartItemList from './CartItemList.vue'
import CartSummary from './CartSummary.vue'
import type { CartItem } from '@/types/CartItem'

const { t } = useI18n()
const cartStore = useCartStore()

const { items, total } = storeToRefs(cartStore)
const { updateItemQuantity, removeItem } = cartStore

const cartItems = computed((): CartItem[] => items.value)

const subtotal = computed(() => {
  return items.value.reduce((acc, item) => acc + item.book.price * item.quantity, 0)
})

const shipping = computed(() => {
  // You can implement your shipping calculation logic here
  return 0
})
</script>

<style scoped>
.cart-content {
  @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8;
}
</style>
