<template>
  <div
    class="flex items-center justify-center min-h-screen bg-cover bg-no-repeat bg-center background"
  >
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 class="text-3xl font-bold mb-4 text-center">Sign up</h2>
      <p class="text-sm text-gray-600 text-center mb-8">Join our academic community!</p>
      <form @submit.prevent="register">
        <div class="mb-4">
          <label for="fullName" class="block text-gray-700 text-sm font-bold mb-2">
            Full name
          </label>
          <input
            v-model="fullName"
            type="text"
            id="fullName"
            placeholder="First Last"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div class="mb-4">
          <label for="email" class="block text-gray-700 text-sm font-bold mb-2"> Email </label>
          <input
            v-model="email"
            type="email"
            id="email"
            placeholder="Enter your email"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div class="mb-4">
          <label for="mobileNumber" class="block text-gray-700 text-sm font-bold mb-2">
            Mobile number
          </label>
          <input
            v-model="mobileNumber"
            type="tel"
            id="mobileNumber"
            placeholder="Enter your mobile number"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div class="mb-4">
          <label for="password" class="block text-gray-700 text-sm font-bold mb-2">
            Create your password
          </label>
          <input
            v-model="password"
            type="password"
            id="password"
            placeholder="Create your password"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div class="mb-4">
          <label for="confirmPassword" class="block text-gray-700 text-sm font-bold mb-2">
            Confirm password
          </label>
          <input
            v-model="confirmPassword"
            type="password"
            id="confirmPassword"
            placeholder="Confirm password"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div class="mb-6">
          <input type="checkbox" id="terms" v-model="termsAccepted" class="mr-2 leading-tight" />
          <label for="terms" class="text-xs text-gray-700">
            By signing up, you agree to our
            <a href="#" class="text-blue-500 hover:text-blue-800">Terms</a> and
            <a href="#" class="text-blue-500 hover:text-blue-800">Privacy Policy</a>.
          </label>
        </div>
        <div class="mb-6">
          <button
            type="submit"
            class="w-full bg-black text-white font-bold py-2 px-4 rounded hover:bg-opacity-90 focus:outline-none focus:shadow-outline"
          >
            Sign up
          </button>
        </div>
        <div class="text-center text-sm text-gray-600">
          Already have an account?
          <router-link to="/login" class="text-blue-500 hover:text-blue-800 cursor-pointer"
            >Log in</router-link
          >
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Signup',
  data() {
    return {
      fullName: '',
      email: '',
      mobileNumber: '',
      password: '',
      confirmPassword: '',
      termsAccepted: false
    }
  },
  methods: {
    register() {
      if (!this.termsAccepted) {
        alert('Please accept the terms and privacy policy.')
        return
      }
      // Here you would handle the registration logic
      console.log('Registering:', this.fullName, this.email, this.mobileNumber, this.password)
      // You would typically send this data to a backend service
    }
  }
}
</script>

<style scoped>
.background {
  background-image: url('@/assets/signup-background.png');
  background-size: cover; /* Cover the entire page */
  background-position: center; /* Center the background image */
}
</style>
