<template>
  <div
    class="flex items-center justify-center min-h-screen bg-cover bg-no-repeat bg-center"
    style="background-image: url('/path-to-your-background-image.jpg')"
  >
    <div class="bg-white p-8 rounded shadow-md w-full max-w-md">
      <h2 class="text-3xl font-bold mb-2 text-center">Reset Password</h2>
      <p class="text-sm text-gray-600 text-center mb-8">
        Enter your details to reset your password
      </p>
      <form @submit.prevent="resetPassword">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
            Enter your registered email
          </label>
          <input
            v-model="email"
            type="email"
            id="email"
            placeholder="email@email.com"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center">
            <input
              v-model="rememberMe"
              type="checkbox"
              id="rememberMe"
              class="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
            />
            <label for="rememberMe" class="ml-2 block text-sm leading-5 text-gray-900">
              Remember me
            </label>
          </div>
          <div class="text-sm leading-5">
            <a
              href="#"
              class="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150"
            >
              Forgot your password?
            </a>
          </div>
        </div>
        <div class="mb-6">
          <button
            type="submit"
            class="w-full bg-black text-white font-bold py-2 px-4 rounded hover:bg-opacity-90 focus:outline-none focus:shadow-outline"
          >
            Restore
          </button>
        </div>
        <div class="flex items-center justify-center mb-6">
          <span class="mx-auto">or</span>
        </div>
        <!-- Social Media Buttons -->
        <div class="grid grid-cols-3 gap-4 mb-6">
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
          Don’t have an account yet?
          <router-link to="/signup" class="text-blue-500 hover:text-blue-800">Sign up</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'ResetPassword',
  data() {
    return {
      email: '',
      rememberMe: false
    }
  },
  methods: {
    resetPassword() {
      // Here, you would handle the password reset logic
      console.log('Reset password for:', this.email)
      // Typically, you would send a password reset link to the user's email
    }
  }
}
</script>

<style scoped>
/* Add your CSS styles here if needed */
</style>
