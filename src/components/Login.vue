<template>
  <div class="flex items-center justify-center align-middle min-h-screen background">
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
            :class="{ 'border-red-500': errors.email }"
            id="email"
            type="email"
            v-model="email"
            placeholder="example@example.com"
          />
          <p v-if="errors.email" class="text-red-500 text-xs italic">{{ errors.email }}</p>
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
            Enter your password
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            :class="{ 'border-red-500': errors.password }"
            id="password"
            type="password"
            v-model="password"
            placeholder="******************"
          />
          <p v-if="errors.password" class="text-red-500 text-xs italic">{{ errors.password }}</p>
        </div>
        <div class="flex items-center justify-between mb-6">
          <label class="inline-flex items-center">
            <input type="checkbox" class="form-checkbox text-indigo-600" />
            <span class="ml-2 text-sm text-gray-700">Remember me</span>
          </label>
          <p class="text-xs italic text-right text-blue-500 hover:text-blue-800 cursor-pointer">
            Forgot your password?
          </p>
        </div>
        <div>
          <button
            type="submit"
            class="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Log in
          </button>
        </div>
        <div class="flex items-center justify-center my-6">
          <span class="mx-auto">or</span>
        </div>

        <!-- Social login buttons -->
        <div class="flex justify-between space-x-4 mb-6">
          <button
            @click.prevent="loginWithProvider('google')"
            class="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded inline-flex items-center justify-center"
          >
            <font-awesome-icon :icon="['fab', 'google']" />
          </button>
          <button
            @click.prevent="loginWithProvider('facebook')"
            class="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center justify-center"
          >
            <font-awesome-icon :icon="['fab', 'facebook']" />
          </button>
          <button
            @click.prevent="loginWithProvider('twitter')"
            class="flex-1 bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded inline-flex items-center justify-center"
          >
            <font-awesome-icon :icon="['fab', 'twitter']" />
          </button>
        </div>

        <div class="text-center text-sm text-gray-600">
          Don't have an account yet?
          <router-link to="/signup" class="text-blue-500 hover:text-blue-800 cursor-pointer">
            Sign up
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { useLoginStore } from '@/stores/auth'
import { mapState, mapActions } from 'pinia'
import axios from 'axios'
import api from '@/api'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

export default defineComponent({
  name: 'Login',
  components: {
    FontAwesomeIcon
  },
  data() {
    return {
      email: '',
      password: '',
      errors: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    ...mapActions(useLoginStore, ['handleLogin']),
    validateForm() {
      let isValid = true
      this.errors = { email: '', password: '' }

      if (!this.email) {
        this.errors.email = 'Email is required'
        isValid = false
      } else if (!/\S+@\S+\.\S+/.test(this.email)) {
        this.errors.email = 'Email is invalid'
        isValid = false
      }

      if (!this.password) {
        this.errors.password = 'Password is required'
        isValid = false
      } else if (this.password.length < 6) {
        this.errors.password = 'Password must be at least 6 characters'
        isValid = false
      }

      return isValid
    },
    login() {
      if (this.validateForm()) {
        try {
          this.handleLogin(this.email, this.password)
          console.log('Logged in successfully', this.userData)
          // Handle successful login
        } catch (error) {
          console.error('Login failed', error)
          // Handle login error
        }
      }
    },
    async loginWithProvider(provider: string) {
      try {
        const response = await api.get(`/auth/${provider}`)
        if (response.data.url) {
          window.location.href = response.data.url
        }
      } catch (error) {
        console.error(`Error logging in with ${provider}:`, error)
        // Handle social login error
      }
    }
  },
  computed: {
    ...mapState(useLoginStore, ['userData'])
  }
})
</script>

<style scoped>
.background {
  background-image: url('@/assets/login-background.png');
  background-size: cover;
  background-position: center;
}
</style>
