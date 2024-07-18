<!-- ShippingForm.vue -->
<template>
  <div class="flex-1 bg-black text-white p-5 rounded-lg">
    <h3 class="text-xl font-bold mb-4">Shipping Info</h3>
    <form @submit.prevent="submitForm" class="space-y-4">
      <div>
        <!-- <label for="name" class="block mb-1">Name</label> -->
        <input
          type="text"
          id="name"
          v-model="form.name"
          required
          class="w-full border-b border-gray-500 p-2 appearance-none bg-transparent text-white"
          placeholder="Name"
          aria-label="Full name"
        />
      </div>
      <div>
        <!-- <label for="institution" class="block mb-1">Institution</label> -->
        <input
          type="text"
          id="institution"
          v-model="form.institution"
          required
          class="w-full border-b border-gray-500 p-2 appearance-none bg-transparent text-white"
          placeholder="Institution"
        />
      </div>
      <div>
        <!-- <label for="email" class="block mb-1">E-mail</label> -->
        <input
          type="email"
          id="email"
          v-model="form.email"
          required
          class="w-full border-b border-gray-500 p-2 appearance-none bg-transparent text-white"
          placeholder="E-mail"
        />
      </div>
      <div>
        <!-- <label for="phone" class="block mb-1">Phone Number</label> -->
        <input
          type="tel"
          id="phone"
          v-model="form.phone"
          required
          class="w-full border-b border-gray-500 p-2 appearance-none bg-transparent text-white"
          placeholder="Phone Number"
        />
      </div>
      <div>
        <!-- <label for="address" class="block mb-1">Address</label> -->
        <input
          type="text"
          id="address"
          v-model="form.address"
          required
          class="w-full border-b border-gray-500 p-2 appearance-none bg-transparent text-white"
          placeholder="Address"
        />
      </div>
      <div class="flex gap-4">
        <div class="flex-1">
          <!-- <label for="zip" class="block mb-1">ZIP/ Postal code</label> -->
          <input
            type="text"
            id="zip"
            v-model="form.zip"
            required
            class="w-full border-b border-gray-500 p-2 appearance-none bg-transparent text-white"
            placeholder="ZIP/ Postal code"
          />
        </div>
        <div class="flex-1">
          <!-- <label for="country" class="block mb-1">Country</label> -->
          <select
            id="country"
            v-model="form.country"
            required
            class="w-full border-b border-gray-500 p-2 appearance-none bg-transparent text-white"
            placeholder="Country"
          >
            <option value="United States">United States</option>
            <!-- Add more country options -->
          </select>
        </div>
      </div>
      <div class="flex items-center">
        <input
          type="checkbox"
          id="useBillingAddress"
          v-model="form.useBillingAddress"
          class="mr-2"
        />
        <label for="useBillingAddress">Use as billing address</label>
      </div>
      <button
        type="submit"
        class="w-full bg-white text-black py-2 px-4 rounded hover:bg-gray-200 transition-colors"
      >
        Continue to Payment &gt;
      </button>
    </form>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const form = reactive({
  name: '',
  institution: '',
  email: '',
  phone: '',
  address: '',
  zip: '',
  country: 'United States',
  useBillingAddress: false
})

const submitForm = () => {
  // Emit the form data to the parent component
  emit('submit', form)
}

const emit = defineEmits(['submit'])
</script>
