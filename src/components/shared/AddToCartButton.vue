<template>
  <div class="add-to-cart">
    <div v-if="cartItem" class="flex items-center space-x-2">
      <button
        @click="decreaseQuantity"
        class="px-2 py-1 bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
        :aria-label="$t('productInfo.decreaseQuantity')"
      >
        -
      </button>
      <span class="text-lg font-semibold">{{ cartItem.quantity }}</span>
      <button
        @click="increaseQuantity"
        class="px-2 py-1 bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
        :aria-label="$t('productInfo.increaseQuantity')"
      >
        +
      </button>
      <button
        @click="removeFromCart"
        class="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
        :aria-label="$t('productInfo.removeFromCart')"
      >
        <font-awesome-icon icon="trash-alt" />
      </button>
    </div>
    <button
      v-else
      @click="addToCart"
      class="bg-black text-white px-6 py-2 mr-4 hover:bg-blue-700 transition"
      :disabled="isAddingToCart"
    >
      {{ $t(isAddingToCart ? 'productInfo.adding' : 'productInfo.addToCart') }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useCartStore } from '@/stores/cart'
import { storeToRefs } from 'pinia'

const props = defineProps({
  bookId: {
    type: Number,
    required: true
  }
})

const cartStore = useCartStore()
const { items: cartItems } = storeToRefs(cartStore)
const quantity = ref(1)
const isAddingToCart = ref(false)

const cartItem = computed(() => cartItems.value.find((item) => item.book.id === props.bookId))

const addToCart = async () => {
  if (isAddingToCart.value) return

  isAddingToCart.value = true
  try {
    await cartStore.addItem(props.bookId, quantity.value)
  } catch (error) {
    console.error('Failed to add item to cart:', error)
  } finally {
    isAddingToCart.value = false
  }
}

const increaseQuantity = async () => {
  if (cartItem.value) {
    await cartStore.updateItemQuantity(props.bookId, cartItem.value.quantity + 1)
  }
}

const decreaseQuantity = async () => {
  if (cartItem.value && cartItem.value.quantity > 1) {
    await cartStore.updateItemQuantity(props.bookId, cartItem.value.quantity - 1)
  } else if (cartItem.value && cartItem.value.quantity === 1) {
    await removeFromCart()
  }
}

const removeFromCart = async () => {
  await cartStore.removeItem(props.bookId)
}
</script>
