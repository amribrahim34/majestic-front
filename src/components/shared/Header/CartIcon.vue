<template>
  <div class="relative">
    <button @click="toggleCartPreview" class="relative p-2">
      <font-awesome-icon icon="shopping-cart" class="text-gray-700 text-xl" />
      <span
        v-if="cartItemCount > 0"
        class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
      >
        {{ cartItemCount }}
      </span>
    </button>
    <div
      v-if="showCartPreview"
      class="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg py-4 px-6 z-50"
    >
      <h3 class="font-bold text-lg mb-3">Your Cart</h3>
      <div v-if="cartItemCount > 0">
        <!-- Cart items would go here -->
        <p class="text-gray-600">{{ cartItemCount }} items in your cart</p>
        <div class="mt-4 pt-4 border-t border-gray-200">
          <p class="font-semibold">Total: $XX.XX</p>
        </div>
        <button
          @click="goToCheckout"
          class="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
        >
          Checkout
        </button>
      </div>
      <div v-else>
        <p class="text-gray-600">Your cart is empty</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useCartStore } from '@/stores/cart'
import { useRouter } from 'vue-router'

const router = useRouter()
const cartStore = useCartStore()
const { cartItemCount } = storeToRefs(cartStore)
const showCartPreview = ref(false)

const toggleCartPreview = () => {
  showCartPreview.value = !showCartPreview.value
}

const goToCheckout = () => {
  router.push('/checkout')
  showCartPreview.value = false
}
</script>
