<template>
  <section class="m-8 lg:m-32 shadow-lg">
    <div
      v-if="book"
      class="flex flex-col md:flex-row justify-between items-start w-full max-w-6xl mx-auto"
    >
      <div class="product-image w-full md:w-2/5 mb-8 md:mb-0 h-96">
        <!-- <img
          :src="book.image"
          :alt="book.title"
          class="w-full h-full object-contain rounded-lg"
          loading="lazy"
        /> -->

        <n-image
          class="w-full h-full object-contain rounded-lg"
          :src="book.image"
          :alt="book.title"
          fallback-src="/public/default.png"
          preview-disabled
        />
      </div>
      <div class="product-details w-full md:w-1/2">
        <h1 class="text-3xl font-bold mb-4">{{ book.title }}</h1>
        <div class="rating flex items-center mb-4">
          <!-- <StarRating
            :book-id="book.id"
            :readonly="isAuthenticated()"
            :rating="book.average_rating"
          /> -->
          <StarRating v-if="book.id" :book-id="book.id" :rating="book.average_rating" />
          <span class="ml-2 text-gray-600">
            {{ $t('productInfo.reviews', { count: book.reviewCount }) }}
          </span>
        </div>
        <div class="price mb-4">
          <span class="current-price text-2xl font-bold">
            {{ $t('productInfo.currency', { price: book.price }) }}
          </span>
          <span class="original-price text-lg text-gray-500 line-through ml-2">
            {{ book.originalPrice }}
          </span>
        </div>
        <p class="description text-gray-700 mb-6">{{ book.description }}</p>
        <div class="product-type mb-4">
          <strong>{{ $t('productInfo.type') }}:</strong> {{ book.format }}
        </div>
        <div class="quantity flex items-center mb-6">
          <strong class="mr-4">{{ $t('productInfo.quantity') }}:</strong>
          <input type="number" v-model="quantity" min="1" class="w-16 p-2 border rounded" />
        </div>
        <div class="actions flex">
          <!-- <WishlistButton :book-id="book.id" :isWishlisted="book.is_wishlisted" /> -->
          <WishlistButton v-if="book.id" :book-id="book.id" :is-wishlisted="book.is_wishlisted" />
          <AddToCartButton v-if="book.id" :book-id="book.id" />

          <!-- <div v-if="cartItem" class="flex items-center space-x-2">
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
          </button> -->
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, PropType, onMounted } from 'vue'
import StarRating from '@/components/shared/StarRating.vue'
import { Book } from '@/types/Book'
import { useCartStore } from '@/stores/cart'
import { useWishlistStore } from '@/stores/wishlist'
import { storeToRefs } from 'pinia'

import WishlistButton from '@/components/shared/WishlistButton.vue'
import AddToCartButton from '@/components/shared/AddToCartButton.vue'
import { NImage } from 'naive-ui'

const props = defineProps({
  book: {
    type: Object as PropType<Book>,
    required: true
  }
})

const cartStore = useCartStore()
const wishlistStore = useWishlistStore()
const { items: cartItems } = storeToRefs(cartStore)
const quantity = ref(1)
const isAddingToCart = ref(false)

const cartItem = computed(() => cartItems.value.find((item) => item.book.id === props.book.id))
// const isWishlisted = computed(() => wishlistStore.isItemWishlisted(props.book.id))
// const isWishlistLoading = computed(() => wishlistStore.loading)

onMounted(() => {
  wishlistStore.fetchWishlist()
})

// const toggleWishlist = async () => {
//   await wishlistStore.toggleWishlistItem(props.book.id)
// }

const addToCart = async () => {
  if (isAddingToCart.value) return

  isAddingToCart.value = true
  try {
    await cartStore.addItem(props.book.id, quantity.value)
  } catch (error) {
    console.error('Failed to add item to cart:', error)
  } finally {
    isAddingToCart.value = false
  }
}

const increaseQuantity = async () => {
  if (cartItem.value) {
    await cartStore.updateItemQuantity(props.book.id, cartItem.value.quantity + 1)
  }
}

const decreaseQuantity = async () => {
  if (cartItem.value && cartItem.value.quantity > 1) {
    await cartStore.updateItemQuantity(props.book.id, cartItem.value.quantity - 1)
  } else if (cartItem.value && cartItem.value.quantity === 1) {
    await removeFromCart()
  }
}

const removeFromCart = async () => {
  await cartStore.removeItem(props.book.id)
}
</script>
