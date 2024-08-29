<template>
  <div class="rounded shadow-lg w-80 mb-16">
    <div class="h-64 overflow-hidden">
      <router-link :to="{ name: 'BookDetails', params: { id: book.id } }" :id="book.id">
        <n-image
          class="w-full h-full object-cover object-center"
          :src="book.image"
          :alt="book.title"
          preview-disabled
        />
      </router-link>
    </div>
    <div class="px-5 pb-5">
      <div>
        <router-link
          :to="{ name: 'BookDetails', params: { id: book.id } }"
          :id="book.id"
          class="text-xl font-semibold tracking-tight text-gray-900"
        >
          {{ book.title }}
        </router-link>
        <p>
          {{ t('common.by') }}
          <span v-for="author in book.authors" :key="author.id">{{ author.name }}</span>
        </p>
      </div>

      <div class="flex items-center mt-2.5 mb-5">
        <div class="flex items-center space-x-1 rtl:space-x-reverse">
          <StarRating :book-id="book.id" :readonly="true" :rating="book.average_rating" />
        </div>
        <span
          class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3"
        >
          {{ book.category?.category_name || t('common.uncategorized') }}
        </span>
      </div>
      <div
        class="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4 rtl:space-x-reverse"
      >
        <span class="text-xl font-bold text-gray-900">
          {{ formatPrice(book.price) }}
        </span>
        <div
          class="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2 rtl:space-x-reverse"
        >
          <button
            @click="toggleWishlist"
            class="p-2.5 bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
            v-if="isAuthenticated()"
          >
            <svg
              class="w-5 h-5"
              :class="{
                'text-red-500 fill-current': book.is_wishlisted,
                'text-gray-600': !book.is_wishlisted
              }"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
          <div v-if="cartItem" class="flex items-center space-x-2 rtl:space-x-reverse">
            <button
              @click="decreaseQuantity"
              class="px-2 py-1 bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              -
            </button>
            <span class="text-lg font-semibold">{{ cartItem.quantity }}</span>
            <button
              @click="increaseQuantity"
              class="px-2 py-1 bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              +
            </button>
            <button
              @click="removeFromCart"
              class="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              <font-awesome-icon icon="trash-alt" />
            </button>
          </div>
          <button
            v-else
            @click="addToCart"
            class="text-white bg-black hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            :disabled="isAddingToCart"
          >
            {{ isAddingToCart ? t('common.adding') : t('common.addToCart') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useCartStore } from '@/stores/cart'
import { useWishlistStore } from '@/stores/wishlist'
import type { Book } from '@/types/Book'
import { isAuthenticated } from '@/utils/auth'
import StarRating from '@/components/shared/StarRating.vue'
import { NImage } from 'naive-ui'

const props = defineProps<{
  book: Book
}>()

const { t } = useI18n()
const cartStore = useCartStore()
const wishlistStore = useWishlistStore()

const isAddingToCart = ref(false)

const cartItem = computed(() => cartStore.items.find((item) => item.book.id === props.book.id))

const toggleWishlist = async () => {
  await wishlistStore.toggleWishlistItem(props.book.id)
  props.book.is_wishlisted = !props.book.is_wishlisted
}

const addToCart = async () => {
  if (isAddingToCart.value) return

  isAddingToCart.value = true
  try {
    await cartStore.addItem(props.book.id, 1)
    // Optionally, you can show a success message here
  } catch (error) {
    console.error('Failed to add item to cart:', error)
    // Optionally, you can show an error message here
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

const formatPrice = (price: number | string | undefined): string => {
  if (typeof price === 'number') {
    return t('common.price', { price: price.toFixed(2) })
  } else if (typeof price === 'string') {
    const numPrice = parseFloat(price)
    if (!isNaN(numPrice)) {
      return t('common.price', { price: numPrice.toFixed(2) })
    }
  }
  return t('common.priceNotAvailable')
}
</script>
<style scoped>
.n-image {
  display: block; /* Ensures the image behaves as a block element */
}
</style>
