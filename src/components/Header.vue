<template>
  <header class="bg-white px-6 py-4 shadow-md">
    <div class="flex items-center justify-between">
      <!-- Logo -->
      <router-link to="/" class="flex items-center">
        <img
          src="../assets/LOGO MAJESTICMIND PNG-07.png"
          alt="MajesticMinds Logo"
          class="h-8 mr-3"
        />
        <span class="text-xl font-semibold text-gray-800">MajesticMinds</span>
      </router-link>

      <!-- Search Bar -->
      <div class="flex-1 mx-6">
        <input
          type="search"
          placeholder="Search for a book, author or category"
          class="w-full px-4 py-2 border rounded-md text-gray-700 focus:ring focus:ring-opacity-50"
        />
      </div>

      <!-- Navigation Links -->
      <div class="flex items-center">
        <router-link
          to="/papers"
          class="text-gray-700 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100"
          >papers</router-link
        >
        <router-link
          to="/books"
          class="text-gray-700 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100"
          >books</router-link
        >
        <router-link
          to="/bulk-order"
          class="text-gray-700 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100"
          >bulk order</router-link
        >
        <!-- Cart Icon -->
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
            <h3 class="font-bold text-xl mb-4">Your Cart</h3>
            <div v-if="cartItemCount > 0">
              <ul v-if="!cartLoading" class="divide-y divide-gray-200">
                <li v-for="item in cartItems" :key="item.id" class="py-4 flex">
                  <img
                    :src="item.book.image"
                    alt="Book cover"
                    class="h-24 w-16 object-cover mr-4"
                  />
                  <div class="flex-1">
                    <h4 class="font-semibold">{{ item.book.title }}</h4>
                    <p class="text-gray-600">Price: LE {{ formatPrice(item.book.price) }}</p>
                    <div class="flex items-center mt-2">
                      <button
                        @click="decreaseQuantity(item.book.id)"
                        class="bg-gray-200 text-gray-700 px-2 py-1 rounded-l hover:bg-gray-300"
                      >
                        -
                      </button>
                      <span class="bg-gray-100 px-3 py-1">{{ item.quantity }}</span>
                      <button
                        @click="increaseQuantity(item.book.id)"
                        class="bg-gray-200 text-gray-700 px-2 py-1 rounded-r hover:bg-gray-300"
                      >
                        +
                      </button>
                      <button
                        @click="removeFromCart(item.book.id)"
                        class="ml-4 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                      >
                        <font-awesome-icon icon="trash-alt" />
                      </button>
                    </div>
                  </div>
                </li>
              </ul>
              <div class="mt-4 border-t pt-4">
                <p class="font-semibold text-lg">Cart Total: LE {{ cartTotal.toFixed(2) }}</p>
              </div>
              <div class="mt-4 flex space-x-4">
                <button
                  @click="goToCart"
                  class="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
                >
                  Go to Cart
                </button>
                <button
                  @click="goToCheckout"
                  class="flex-1 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Checkout
                </button>
              </div>
            </div>
            <div v-else>
              <p>Your cart is empty</p>
            </div>
            <p v-if="cartLoading">Loading cart...</p>
            <p v-if="cartError" class="text-red-500">{{ cartError }}</p>
          </div>
        </div>

        <!-- User Icon/Avatar -->
        <div class="relative px-3 py-2">
          <template v-if="isLoggedIn">
            <button @click="toggleUserMenu" class="focus:outline-none">
              <font-awesome-icon icon="user-circle" class="text-gray-700 text-xl" />
            </button>
            <!-- User Dropdown Menu -->
            <div
              v-if="showUserMenu"
              class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1"
            >
              <router-link
                to="/account"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >Account</router-link
              >
              <router-link
                to="/orders"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >Orders</router-link
              >
              <button
                @click="logout"
                class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Log out
              </button>
            </div>
          </template>
          <template v-else>
            <router-link
              to="/login"
              class="text-gray-700 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100"
              >Log in</router-link
            >
            <router-link
              to="/signup"
              class="bg-black text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-opacity-90"
              >Sign up</router-link
            >
          </template>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { mapState, mapActions } from 'pinia'
import { useLoginStore } from '@/stores/auth'
import { useCartStore } from '@/stores/cart'

export default defineComponent({
  name: 'HeaderComponent',
  data() {
    return {
      showUserMenu: false,
      showCartPreview: false
    }
  },
  computed: {
    ...mapState(useLoginStore, ['isLoggedIn']),
    ...mapState(useCartStore, ['cartItemCount', 'cartTotal', 'items', 'loading', 'error']),
    cartItems() {
      return this.items
    },
    cartLoading() {
      return this.loading
    },
    cartError() {
      return this.error
    }
  },
  methods: {
    ...mapActions(useLoginStore, ['handleLogout']),
    ...mapActions(useCartStore, ['addItem', 'removeItem', 'updateItemQuantity']),

    toggleUserMenu() {
      this.showUserMenu = !this.showUserMenu
    },

    toggleCartPreview(event: Event) {
      event.stopPropagation()
      this.showCartPreview = !this.showCartPreview
    },
    handleOutsideClick(event: MouseEvent) {
      const cartPreview = this.$refs.cartPreview as HTMLElement | undefined
      const cartButton = this.$refs.cartButton as HTMLElement | undefined
      if (
        this.showCartPreview &&
        cartPreview &&
        cartButton &&
        !cartPreview.contains(event.target as Node) &&
        !cartButton.contains(event.target as Node)
      ) {
        this.showCartPreview = false
      }
    },

    logout() {
      this.handleLogout()
      this.$router.push('/')
      this.showUserMenu = false
    },

    addToCart(bookId: number) {
      this.addItem(bookId, 1)
    },

    removeFromCart(bookId: number) {
      this.removeItem(bookId)
    },

    goToCheckout() {
      this.$router.push('/checkout')
      this.showCartPreview = false
    },
    decreaseQuantity(bookId: number) {
      const item = this.cartItems.find((item) => item.book.id === bookId)
      if (item && item.quantity > 1) {
        this.updateItemQuantity(bookId, item.quantity - 1)
      } else if (item && item.quantity === 1) {
        this.removeItem(bookId)
      }
    },
    increaseQuantity(bookId: number) {
      const item = this.cartItems.find((item) => item.book.id === bookId)
      if (item) {
        this.updateItemQuantity(bookId, item.quantity + 1)
      }
    },
    formatPrice(price: number | string): string {
      const numPrice = typeof price === 'string' ? parseFloat(price) : price
      return isNaN(numPrice) ? '0.00' : numPrice.toFixed(2)
    },
    goToCart() {
      this.$router.push('/cart')
      this.showCartPreview = false
    }
  },
  mounted() {
    // Fetch cart data when component is mounted
    const cartStore = useCartStore()
    cartStore.fetchCart()
    document.addEventListener('click', this.handleOutsideClick)
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleOutsideClick)
  },
  watch: {
    // Close cart preview when route changes
    $route() {
      this.showCartPreview = false
    }
  }
})
</script>
<style scoped>
@media (min-width: 768px) {
  /* Tailwind's md: breakpoint */
  .header-nav-links {
    display: flex;
  }
}
</style>
