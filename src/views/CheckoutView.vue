<template>
  <div class="container mx-auto">
    <HeaderComponent />
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans">
      <div class="flex flex-col md:flex-row gap-8">
        <div class="flex-1 bg-white p-6 rounded-lg shadow-md">
          <h3 class="text-xl font-semibold mb-4">Shopping Cart</h3>
          <div v-if="cartStore.items.length > 0">
            <table class="w-full">
              <thead>
                <tr class="border-b">
                  <th class="text-left py-2">Book Title</th>
                  <th class="text-left py-2">Quantity</th>
                  <th class="text-left py-2">Total price</th>
                  <th class="text-left py-2"></th>
                </tr>
              </thead>
              <tbody>
                <CartItem
                  v-for="item in cartStore.items"
                  :key="item.id"
                  :item="item"
                  @remove="removeItem"
                />
              </tbody>
            </table>
            <CartSummary :subtotal="cartStore.total" :shipping="shipping" :total="total" />
            <button
              @click="continueShopping"
              class="bg-black text-white px-4 py-2 mt-4 rounded hover:bg-gray-800 transition-colors"
            >
              &lt; continue shopping
            </button>
          </div>
          <div v-else class="text-center py-8">
            <p class="text-xl mb-4">Your cart is empty</p>
            <button
              @click="continueShopping"
              class="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition-colors"
            >
              Start Shopping
            </button>
          </div>
        </div>

        <div v-if="cartStore.items.length > 0" class="flex-1 bg-black text-white p-6 rounded-lg">
          <h2 class="text-2xl font-bold mb-4">Shipping Info</h2>
          <ShippingForm @submit="submitShippingInfo" />
        </div>
      </div>
    </div>
    <FooterComponent />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import HeaderComponent from '@/components/Header.vue'
import FooterComponent from '@/components/FooterComponent.vue'
import CartItem from '@/components/Checkout/CartItem.vue'
import CartSummary from '@/components/Checkout/CartSummary.vue'
import ShippingForm from '@/components/Checkout/ShippingForm.vue'

const router = useRouter()
const cartStore = useCartStore()

const shipping = ref(2.0)

onMounted(() => {
  cartStore.fetchCart()
})

const removeItem = (itemId: number) => {
  cartStore.removeItem(itemId)
}

const continueShopping = () => {
  router.push('/books')
}

const submitShippingInfo = (info: any) => {
  console.log('Shipping info submitted:', info)
  // Here you might want to save the shipping info or proceed to the next step
}

// Computed property for total (including shipping)
const total = computed(() => cartStore.total + shipping.value)
</script>
