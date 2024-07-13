<template>
  <div class="shipping-info bg-black text-white p-6 rounded-lg">
    <h2 class="text-xl font-bold mb-4">Checkout: Step 1/2</h2>
    <h3 class="text-2xl font-bold mb-6">Shipping Info</h3>

    <form @submit.prevent="submitShippingInfo">
      <div class="grid grid-cols-2 gap-4">
        <div class="col-span-2 sm:col-span-1">
          <label for="name" class="block mb-1">Name</label>
          <input
            v-model="shippingInfo.name"
            type="text"
            id="name"
            class="w-full p-2 text-black rounded"
            required
          />
        </div>
        <div class="col-span-2 sm:col-span-1">
          <label for="contact" class="block mb-1">Contact</label>
          <input
            v-model="shippingInfo.contact"
            type="text"
            id="contact"
            class="w-full p-2 text-black rounded"
            required
          />
        </div>
        <div class="col-span-2">
          <label for="institution" class="block mb-1">Institution</label>
          <input
            v-model="shippingInfo.institution"
            type="text"
            id="institution"
            class="w-full p-2 text-black rounded"
            required
          />
        </div>
        <div class="col-span-2">
          <label for="email" class="block mb-1">E-mail</label>
          <input
            v-model="shippingInfo.email"
            type="email"
            id="email"
            class="w-full p-2 text-black rounded"
            required
          />
        </div>
        <div class="col-span-2">
          <label for="phoneNumber" class="block mb-1">Phone Number</label>
          <input
            v-model="shippingInfo.phoneNumber"
            type="tel"
            id="phoneNumber"
            class="w-full p-2 text-black rounded"
            required
          />
        </div>
        <div class="col-span-2">
          <label for="address" class="block mb-1">Address</label>
          <textarea
            v-model="shippingInfo.address"
            id="address"
            rows="3"
            class="w-full p-2 text-black rounded"
            required
          ></textarea>
        </div>
        <div class="col-span-2 sm:col-span-1">
          <label for="zipCode" class="block mb-1">ZIP/ Postal code</label>
          <input
            v-model="shippingInfo.zipCode"
            type="text"
            id="zipCode"
            class="w-full p-2 text-black rounded"
            required
          />
        </div>
        <div class="col-span-2 sm:col-span-1">
          <label for="country" class="block mb-1">Country</label>
          <select
            v-model="shippingInfo.country"
            id="country"
            class="w-full p-2 text-black rounded"
            required
          >
            <option value="United States">United States</option>
            <!-- Add more country options as needed -->
          </select>
        </div>
      </div>

      <div class="mt-4">
        <label class="flex items-center">
          <input v-model="shippingInfo.useAsBillingAddress" type="checkbox" class="mr-2" />
          <span>Use as billing address</span>
        </label>
      </div>

      <button
        type="submit"
        class="mt-6 w-full bg-white text-black py-2 px-4 rounded hover:bg-gray-200 transition duration-300"
      >
        Continue to Payment >
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import { ShippingInfo } from '@/types/ShippingInfo'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ShippingInfo',
  data() {
    return {
      shippingInfo: {
        name: '',
        contact: '',
        institution: '',
        email: '',
        phoneNumber: '',
        address: '',
        zipCode: '',
        country: 'United States',
        useAsBillingAddress: false
      } as ShippingInfo
    }
  },
  methods: {
    submitShippingInfo() {
      // Here you would typically dispatch an action to save the shipping info
      // For now, we'll just log it to the console
      console.log('Shipping Info:', this.shippingInfo)
      // You could emit an event here to notify the parent component
      this.$emit('shipping-info-submitted', this.shippingInfo)
    }
  }
})
</script>

<style scoped>
/* Add any additional styles here */
</style>
