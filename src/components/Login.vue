<template>
  <div class="flex items-center justify-center align-middle min-h-screen">
    <div class="bg-white p-8 rounded shadow-md w-96">
      <h2 class="text-3xl font-bold mb-2 text-center text-black">Log in</h2>
      <div class="text-sm text-gray-600 text-center mb-8">
        Enter your login credentials to access your account
      </div>
      <form @submit.prevent="login">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
            Enter your email address
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="example@example.com"
          />
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
            Enter your password
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="******************"
          />
          <p class="text-xs italic text-right text-blue-500 hover:text-blue-800 cursor-pointer">
            Forgot your password?
          </p>
        </div>
        <div class="flex items-center justify-between mb-6">
          <label class="inline-flex items-center">
            <input type="checkbox" class="form-checkbox text-indigo-600" />
            <span class="ml-2 text-sm text-gray-700">Remember me</span>
          </label>
          <button
            class="bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Log in
          </button>
        </div>
        <div class="flex items-center justify-center mb-6">
          <span class="mx-auto">or</span>
        </div>
        <div class="flex items-center justify-between mb-6">
          <button
            class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
          >
            <span>G</span>
          </button>
          <button
            class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
          >
            <span>f</span>
          </button>
          <button
            class="bg-light-blue-300 hover:bg-light-blue-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
          >
            <span>t</span>
          </button>
        </div>
        <div class="text-center text-sm text-gray-600">
          Don’t have an account yet?
          <span class="text-blue-500 hover:text-blue-800 cursor-pointer">Sign up</span>
        </div>
      </form>
    </div>
  </div>
</template>

<style>
/* Tailwind CSS is being used for styling. Ensure you have Tailwind CSS installed and configured in your project. */
</style>

<script lang="ts">
export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login() {
      // Here, you would usually send a request to your backend to authenticate the user.
      console.log('Email:', this.email, 'Password:', this.password)
      // Add your authentication logic here
    }
  }
}
</script>

<style scoped>
/* Add your CSS styles here */
</style>
