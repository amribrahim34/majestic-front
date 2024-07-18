<template>
  <div class="">
    <HeaderComponent />
    <main class="m-10">
      <div class="cart-page container mx-auto py-8">
        <h1 class="text-3xl font-bold mb-6">Your Cart</h1>
        <div v-if="loading" class="text-center">
          <p>Loading cart...</p>
        </div>
        <div v-else-if="error" class="text-center text-red-500">
          <p>{{ error }}</p>
        </div>
        <div v-else-if="cartItems.length === 0" class="text-center">
          <p>Your cart is empty.</p>
          <router-link to="/books" class="text-blue-500 hover:underline">
            Continue shopping
          </router-link>
        </div>
        <div v-else>
          <div class="cart-items">
            <CartItem
              v-for="item in cartItems"
              :key="item.id"
              :item="item"
              @update-quantity="updateItemQuantity"
              @remove-item="removeItem"
            />
          </div>
          <div class="cart-summary mt-8">
            <h2 class="text-2xl font-semibold mb-4">Cart Summary</h2>
            <p class="text-xl">Total: {{ formatPrice(cartTotal) }}</p>
            <button
              @click="proceedToCheckout"
              class="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </main>
    <FooterComponent />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapState, mapActions } from 'pinia'
import { useCartStore } from '@/stores/cart'
import CartItem from '@/components/Cart/CartItem.vue'
import HeaderComponent from '@/components/Header.vue'
import FooterComponent from '@/components/FooterComponent.vue'

export default defineComponent({
  name: 'CartPage',
  components: {
    CartItem,
    HeaderComponent,
    FooterComponent
  },
  computed: {
    ...mapState(useCartStore, {
      cartItems: (state) => state.items,
      cartTotal: (state) => state.total,
      loading: (state) => state.loading,
      error: (state) => state.error
    })
  },
  methods: {
    ...mapActions(useCartStore, ['fetchCart', 'updateItemQuantity', 'removeItem']),
    formatPrice(price: number): string {
      return `LE ${price.toFixed(2)}`
    },
    proceedToCheckout() {
      // Implement checkout logic or navigation
      this.$router.push('/checkout')
    }
  },
  mounted() {
    this.fetchCart()
  }
})
</script>
