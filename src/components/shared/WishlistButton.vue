<template>
  <button
    v-if="isAuthenticated()"
    @click="toggleWishlist"
    class="p-2.5 mx-3 bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
    :disabled="isLoading"
    :aria-label="$t(isWishlisted ? 'productInfo.removeFromWishlist' : 'productInfo.addToWishlist')"
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
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useWishlistStore } from '@/stores/wishlist'
import { storeToRefs } from 'pinia'
import { isAuthenticated } from '@/utils/auth'

// const props = defineProps<{
//   bookId: number
//   isWishlisted: boolean
// }>()

const props = withDefaults(
  defineProps<{
    bookId: number
    isWishlisted: boolean
  }>(),
  {
    bookId: 0,
    isWishlisted: false
  }
)

const wishlistStore = useWishlistStore()
const { loading } = storeToRefs(wishlistStore)

const isWishlisted = ref(props.isWishlisted)
const isLoading = computed(() => loading.value)

const toggleWishlist = async () => {
  isLoading.value = true
  try {
    await wishlistStore.toggleWishlistItem(props.bookId)
    isWishlisted.value = !isWishlisted.value
  } catch (error) {
    console.error('Error toggling wishlist item:', error)
  } finally {
    isLoading.value = false
  }
}
</script>
