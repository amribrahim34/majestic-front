<template>
  <div class="relative">
    <button @click="toggleCartPreview" class="relative px-3 py-2" ref="cartButton">
      <font-awesome-icon icon="shopping-cart" class="text-gray-700 text-xl" />
      <span
        v-if="cartItemCount > 0"
        class="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center"
      >
        {{ cartItemCount }}
      </span>
    </button>
    <div
      v-if="showCartPreview"
      class="absolute right-0 mt-2 w-96 bg-white rounded-md shadow-lg py-4 px-6 z-50"
      ref="cartPreview"
      @click.stop
    >
      <h3 class="font-bold text-xl mb-4">{{ t('header.yourCart') }}</h3>
      <div v-if="cartItemCount > 0">
        <ul v-if="!loading" class="divide-y divide-gray-200">
          <n-scrollbar style="max-height: 200px">
            <li v-for="item in items" :key="item.id" class="py-4 flex">
              <img :src="item.book.image" alt="Book cover" class="h-24 w-16 object-cover mr-4" />
              <div class="flex-1">
                <h4 class="font-semibold">{{ item.book.title }}</h4>
                <p class="text-gray-600">
                  {{ t('cart.itemPrice') }} {{ formatPrice(item.book.price * item.quantity) }}
                  {{ t('cart.currency') }}
                </p>
                <div class="flex items-center mt-2 gap-1">
                  <button
                    @click="decreaseQuantity(item.book.id)"
                    class="bg-black text-white px-2 py-1 hover:bg-red-700"
                  >
                    -
                  </button>
                  <span class="bg-gray-100 px-3 py-1">{{ item.quantity }}</span>
                  <button
                    @click="increaseQuantity(item.book.id)"
                    class="bg-black text-white px-2 py-1 hover:bg-green-700"
                  >
                    +
                  </button>
                  <button
                    @click="removeFromCart(item.book.id)"
                    class="ml-4 bg-red-500 text-white px-2 py-1 hover:bg-red-700"
                  >
                    <font-awesome-icon icon="trash-alt" />
                  </button>
                </div>
              </div>
            </li>
          </n-scrollbar>
        </ul>
        <div class="mt-4 border-t pt-4">
          <p class="font-semibold text-lg">
            {{ t('header.total', { amount: cartTotal.toFixed(2) }) }}
          </p>
        </div>
        <div class="mt-4 flex space-x-4">
          <button
            @click="goToCart"
            class="flex-1 bg-gray-200 text-gray-800 px-4 py-2 hover:bg-gray-300"
          >
            Go to Cart
          </button>
          <button
            @click="goToCheckout"
            class="flex-1 bg-black text-white px-4 py-2 hover:bg-green-700"
          >
            {{ t('header.checkout') }}
          </button>
        </div>
      </div>
      <div v-else>
        <p>{{ t('header.emptyCart') }}</p>
      </div>
      <p v-if="loading">Loading cart...</p>
      <p v-if="error" class="text-red-700">{{ error }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useCartStore } from '@/stores/cart'
import { useRouter } from 'vue-router'
import { useTypedI18n } from '@/i18n'
import { NScrollbar } from 'naive-ui'
const router = useRouter()
const cartStore = useCartStore()
const { cartItemCount, loading, items, cartTotal, error } = storeToRefs(cartStore)
const showCartPreview = ref(false)
const { t } = useTypedI18n()

const toggleCartPreview = () => {
  showCartPreview.value = !showCartPreview.value
}

const goToCheckout = () => {
  router.push('/checkout')
  showCartPreview.value = false
}

// toggleUserMenu() {
//       this.showUserMenu = !this.showUserMenu
//     },

//     handleOutsideClick(event: MouseEvent) {
//       const cartPreview = this.$refs.cartPreview as HTMLElement | undefined
//       const cartButton = this.$refs.cartButton as HTMLElement | undefined
//       if (
//         this.showCartPreview &&
//         cartPreview &&
//         cartButton &&
//         !cartPreview.contains(event.target as Node) &&
//         !cartButton.contains(event.target as Node)
//       ) {
//         this.showCartPreview = false
//       }
//     },

// const addToCart = (bookId: number) => {
//   // Logic for adding item (assuming `addItem` is defined elsewhere)
//   cartStore.addItem(bookId, 1)
// }

const removeFromCart = (bookId: number) => {
  // Logic for removing item (assuming `removeItem` is defined elsewhere)
  cartStore.removeItem(bookId)
}

const decreaseQuantity = (bookId: number) => {
  const item = items.value.find((item) => item.book.id === bookId)
  if (item && item.quantity > 1) {
    cartStore.updateItemQuantity(bookId, item.quantity - 1)
  } else if (item && item.quantity === 1) {
    removeFromCart(bookId)
  }
}

const increaseQuantity = (bookId: number) => {
  const item = items.value.find((item) => item.book.id === bookId)
  if (item) {
    cartStore.updateItemQuantity(bookId, item.quantity + 1)
  }
}

const formatPrice = (price: number) => {
  const numPrice = typeof price === 'string' ? parseFloat(price) : price
  return isNaN(numPrice) ? '0.00' : numPrice.toFixed(2)
}

const goToCart = () => {
  router.push('/cart')
  showCartPreview.value = false
}
onMounted(cartStore.fetchCart)
</script>
