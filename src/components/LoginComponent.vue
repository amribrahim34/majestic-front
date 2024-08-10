<template>
  <div class="flex items-center justify-center align-middle min-h-screen background">
    <div class="bg-white p-8 rounded shadow-md w-96">
      <div v-if="successMessage" class="text-green-500 text-sm text-center mb-4">
        {{ successMessage }}
      </div>
      <div v-if="errorMessage" class="text-red-500 text-sm text-center mb-4">
        {{ errorMessage }}
      </div>

      <h2 class="text-3xl font-bold mb-2 text-center text-black">{{ $t('login.title') }}</h2>
      <div class="text-sm text-gray-600 text-center mb-8">
        {{ $t('login.subtitle') }}
      </div>
      <form @submit.prevent="login">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
            {{ $t('login.emailLabel') }}
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
            {{ $t('login.passwordLabel') }}
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            :class="{ 'border-red-500': errors.password }"
            id="password"
            type="password"
            v-model="password"
            :placeholder="$t('login.passwordPlaceholder')"
          />
          <p v-if="errors.password" class="text-red-500 text-xs italic">{{ errors.password }}</p>
        </div>
        <div class="flex items-center justify-between mb-6">
          <label class="inline-flex items-center">
            <input type="checkbox" class="form-checkbox text-indigo-600" v-model="rememberMe" />
            <span class="ml-2 text-sm text-gray-700">{{ $t('login.rememberMe') }}</span>
          </label>
          <p class="text-xs italic text-right text-blue-500 hover:text-blue-800 cursor-pointer">
            {{ $t('login.forgotPassword') }}
          </p>
        </div>
        <div>
          <button
            type="submit"
            class="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {{ $t('login.loginButton') }}
          </button>
        </div>
        <div class="flex items-center justify-center my-2">
          <span class="mx-auto">{{ $t('login.or') }}</span>
        </div>

        <!-- Social login buttons -->
        <div class="flex justify-between space-x-4 mb-6">
          <button
            @click.prevent="loginWithProvider('google')"
            class="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded inline-flex items-center justify-center"
          >
            <font-awesome-icon :icon="['fab', 'google']" />
          </button>
        </div>

        <div class="text-center text-sm text-gray-600">
          {{ $t('login.noAccount') }}
          <router-link to="/signup" class="text-blue-500 hover:text-blue-800 cursor-pointer">
            {{ $t('login.signUp') }}
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useLoginStore } from '@/stores/auth'
import { useI18n } from 'vue-i18n'
import api from '@/api'

const router = useRouter()
const loginStore = useLoginStore()
const { t } = useI18n()

const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const errors = reactive({
  email: '',
  password: '',
  general: ''
})

const successMessage = computed(() => loginStore.successMessage)
const errorMessage = computed(() => loginStore.errorMessage)
// const errors = ref({ email: null, password: null })

const validateForm = () => {
  let isValid = true
  errors.email = ''
  errors.password = ''
  errors.general = ''

  if (!email.value) {
    errors.email = t('login.errors.emailRequired')
    isValid = false
  } else if (!/\S+@\S+\.\S+/.test(email.value)) {
    errors.email = t('login.errors.emailInvalid')
    isValid = false
  }

  if (!password.value) {
    errors.password = t('login.errors.passwordRequired')
    isValid = false
  } else if (password.value.length < 6) {
    errors.password = t('login.errors.passwordLength')
    isValid = false
  }

  return isValid
}

const login = async () => {
  if (validateForm()) {
    try {
      await loginStore.handleLogin(email.value, password.value)
      console.log('Logged in successfully', loginStore.userData)
      router.push('/dashboard')
    } catch (error) {
      console.error('Login failed', error)
      errors.general = t('login.errors.invalidCredentials')
    }
  }
}

const loginWithProvider = async (provider: string) => {
  try {
    const response = await api.get(`/auth/${provider}`)
    if (response.data.url) {
      window.location.href = response.data.url
    }
  } catch (error) {
    console.error(`Error logging in with ${provider}:`, error)
    errors.general = t('login.errors.socialLoginFailed', { provider })
  }
}
</script>

<style scoped>
.background {
  background-image: url('@/assets/login-background.png');
  background-size: cover;
  background-position: center;
}
</style>
