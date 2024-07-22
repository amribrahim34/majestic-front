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
      <h3 class="font-bold text-lg mb-3">{{ t('header.yourCart') }}</h3>
      <div v-if="cartItemCount > 0">
        <p class="text-gray-600">
          {{ t('header.itemsInCart', { count: cartItemCount }) }}
        </p>
        <div class="mt-4 pt-4 border-t border-gray-200">
          <p class="font-semibold">{{ t('header.total', { amount: 'XX.XX' }) }}</p>
        </div>
        <button
          @click="goToCheckout"
          class="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
        >
          {{ t('header.checkout') }}
        </button>
      </div>
      <div v-else>
        <p class="text-gray-600">{{ t('header.emptyCart') }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useCartStore } from '@/stores/cart'
import { useRouter } from 'vue-router'
import { useTypedI18n } from '@/i18n'

const router = useRouter()
const cartStore = useCartStore()
const { cartItemCount } = storeToRefs(cartStore)
const showCartPreview = ref(false)
const { t } = useTypedI18n()

const toggleCartPreview = () => {
  showCartPreview.value = !showCartPreview.value
}

const goToCheckout = () => {
  router.push('/checkout')
  showCartPreview.value = false
}
</script>
