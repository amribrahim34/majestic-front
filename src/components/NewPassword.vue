<template>
  <div
    class="flex items-center justify-center min-h-screen bg-cover bg-no-repeat bg-center"
    style="background-image: url('/path-to-your-background-image.jpg')"
  >
    <div class="bg-white p-8 rounded shadow-md w-full max-w-md">
      <h2 class="text-3xl font-bold mb-2 text-center">Reset Password</h2>
      <p class="text-sm text-gray-600 text-center mb-8">Enter your details to restore password</p>
      <form @submit.prevent="resetPassword">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="verificationCode">
            Enter verification code
          </label>
          <input
            v-model="verificationCode"
            type="text"
            id="verificationCode"
            placeholder="Enter Your verification code"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="newPassword">
            Enter your new password
          </label>
          <input
            v-model="newPassword"
            type="password"
            id="newPassword"
            placeholder="********"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div class="flex items-center justify-between mb-6">
          <label class="inline-flex items-center">
            <input type="checkbox" v-model="rememberMe" class="form-checkbox" />
            <span class="ml-2">Remember me</span>
          </label>
          <a href="#" class="text-sm text-blue-500 hover:text-blue-800"
            >Check your email for the code</a
          >
        </div>
        <div class="mb-6">
          <button
            type="submit"
            class="w-full bg-black text-white font-bold py-2 px-4 rounded hover:bg-opacity-90 focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </div>
        <div class="flex items-center justify-center mb-6">
          <span class="mx-auto">or</span>
        </div>
        <div class="grid grid-cols-3 gap-4 mb-6">
          <!-- Social Media Buttons -->
          <button
            class="bg-gray-300 hover:bg-blue-500 text-gray-800 font-bold py-2 px-4 rounded transition-colors duration-300"
          >
            G
          </button>
          <button
            class="bg-gray-300 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
          >
            F
          </button>
          <button
            class="bg-gray-300 hover:bg-sky-400 text-gray-800 font-bold py-2 px-4 rounded transition-colors duration-300"
          >
            T
          </button>
        </div>
        <div class="text-center text-sm text-gray-600">
          I don't have an account. <a href="#" class="text-blue-500 hover:text-blue-800">Sign up</a>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'NewPassword',
  data() {
    return {
      verificationCode: '',
      newPassword: '',
      rememberMe: false
    }
  },
  methods: {
    resetPassword() {
      // Implementation for resetting the password
      console.log('Verification Code:', this.verificationCode)
      console.log('New Password:', this.newPassword)
      // You would typically interact with an API to reset the password here
    }
  }
}
</script>

<style scoped>
/* Add additional styles if necessary */
</style>
