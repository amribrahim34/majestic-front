<template>
  <div class="rounded shadow-lg w-96 mb-16">
    <div class="">
      <img class="w-full object-cover h-56" :src="book.image" :alt="book.title" />
    </div>
    <div class="px-5 pb-5">
      <div class="">
        <a href="#">
          <h5 class="text-xl font-semibold tracking-tight text-gray-900">
            {{ book.title }}
          </h5>
        </a>
        <p>by</p>
        <p v-for="author in book.authors" :key="author.id">{{ author.name }}</p>
      </div>

      <div class="flex items-center mt-2.5 mb-5">
        <div class="flex items-center space-x-1 rtl:space-x-reverse">
          <!-- Star rating SVGs here (you might want to make this dynamic based on a rating property) -->
        </div>
        <span
          class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3"
        >
          {{ book.category?.category_name || 'Uncategorized' }}
        </span>
      </div>
      <div class="flex items-center justify-between">
        <span class="text-xl font-bold text-gray-900">
          {{ formatPrice(book.price) }}
        </span>
        <div class="flex space-x-2">
          <button
            @click="toggleWishlist"
            class="p-2.5 bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            <svg
              class="w-5 h-5"
              :class="{ 'text-red-500 fill-current': isWishlisted, 'text-gray-600': !isWishlisted }"
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
          <div v-if="cartItem" class="flex items-center space-x-2">
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
            {{ isAddingToCart ? 'Adding...' : 'Add to cart' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import type { Book } from '@/types/Book'
import { useCartStore } from '@/stores/cart'
import { mapState, mapActions } from 'pinia'

export default defineComponent({
  name: 'ProductCard',
  props: {
    book: {
      type: Object as PropType<Book>,
      required: true
    }
  },
  data() {
    return {
      isWishlisted: false,
      isAddingToCart: false
    }
  },
  computed: {
    ...mapState(useCartStore, ['items']),
    cartItem() {
      return this.items.find((item) => item.book.id === this.book.id)
    }
  },
  methods: {
    ...mapActions(useCartStore, ['addItem', 'updateItemQuantity', 'removeItem']),
    toggleWishlist() {
      this.isWishlisted = !this.isWishlisted
      // Here you would typically also update the wishlist status on the server
    },
    async addToCart() {
      if (this.isAddingToCart) return

      this.isAddingToCart = true
      try {
        await this.addItem(this.book.id, 1)
        // Optionally, you can show a success message here
      } catch (error) {
        console.error('Failed to add item to cart:', error)
        // Optionally, you can show an error message here
      } finally {
        this.isAddingToCart = false
      }
    },
    async increaseQuantity() {
      if (this.cartItem) {
        await this.updateItemQuantity(this.book.id, this.cartItem.quantity + 1)
      }
    },
    async decreaseQuantity() {
      if (this.cartItem && this.cartItem.quantity > 1) {
        await this.updateItemQuantity(this.book.id, this.cartItem.quantity - 1)
      } else if (this.cartItem && this.cartItem.quantity === 1) {
        await this.removeFromCart()
      }
    },
    async removeFromCart() {
      await this.removeItem(this.book.id)
    },
    formatPrice(price: number | string | undefined): string {
      if (typeof price === 'number') {
        return `LE ${price.toFixed(2)}`
      } else if (typeof price === 'string') {
        const numPrice = parseFloat(price)
        if (!isNaN(numPrice)) {
          return `LE ${numPrice.toFixed(2)}`
        }
      }
      return 'Price not available'
    }
  }
})
</script>

<style scoped>
/* Tailwind CSS does most of the styling. Add any additional custom styles here. */
</style>
