<template>
  <div class="cart-content">
    <h2 class="text-2xl font-bold mb-4">Shopping Cart</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div class="md:col-span-2">
        <CartItemList
          :items="cartItems"
          @update-quantity="updateItemQuantity"
          @remove-item="removeItem"
        />
      </div>
      <div class="md:col-span-1">
        <CartSummary :subtotal="0" :shipping="0" :total="total" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapState, mapActions } from 'pinia'
import { useCartStore } from '@/stores/cart'
import CartItemList from './CartItemList.vue'
import CartSummary from './CartSummary.vue'
import type { CartItem } from '@/types/CartItem'

export default defineComponent({
  name: 'CartContent',
  components: {
    CartItemList,
    CartSummary
  },
  computed: {
    ...mapState(useCartStore, ['items', 'total']),
    cartItems(): CartItem[] {
      return this.items
    }
  },
  methods: {
    ...mapActions(useCartStore, ['updateItemQuantity', 'removeItem'])
  }
})
</script>

<style scoped>
.cart-content {
  @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8;
}
</style>
