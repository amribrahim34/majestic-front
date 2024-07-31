<template>
  <div
    class="flex items-center justify-center min-h-screen bg-cover bg-no-repeat bg-center background"
  >
    <div class="bg-white rounded-lg shadow-lg w-full max-w-md px-8 pb-2">
      <h2 class="text-3xl font-bold mb-4 text-center mt-5">{{ $t('signup.title') }}</h2>
      <p class="text-sm text-gray-600 text-center mb-2">{{ $t('signup.subtitle') }}</p>
      <form @submit.prevent="register">
        <div class="mb-1">
          <label for="fullName" class="block text-gray-700 text-sm font-bold mb-2">
            {{ $t('signup.fullName') }}
          </label>
          <input
            v-model="formData.fullName"
            type="text"
            id="fullName"
            :placeholder="$t('signup.fullNamePlaceholder')"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div class="mb-1">
          <label for="email" class="block text-gray-700 text-sm font-bold mb-2">
            {{ $t('signup.email') }}
          </label>
          <input
            v-model="formData.email"
            type="email"
            id="email"
            :placeholder="$t('signup.emailPlaceholder')"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div class="mb-1">
          <label for="mobileNumber" class="block text-gray-700 text-sm font-bold mb-2">
            {{ $t('signup.mobileNumber') }}
          </label>
          <input
            v-model="formData.mobileNumber"
            type="tel"
            id="mobileNumber"
            :placeholder="$t('signup.mobileNumberPlaceholder')"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div class="mb-1">
          <label for="password" class="block text-gray-700 text-sm font-bold mb-2">
            {{ $t('signup.password') }}
          </label>
          <input
            v-model="formData.password"
            type="password"
            id="password"
            :placeholder="$t('signup.passwordPlaceholder')"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div class="mb-1">
          <label for="confirmPassword" class="block text-gray-700 text-sm font-bold mb-2">
            {{ $t('signup.confirmPassword') }}
          </label>
          <input
            v-model="formData.confirmPassword"
            type="password"
            id="confirmPassword"
            :placeholder="$t('signup.confirmPasswordPlaceholder')"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div class="mb-6">
          <input
            type="checkbox"
            id="terms"
            v-model="formData.termsAccepted"
            class="mr-2 leading-tight"
          />
          <label
            for="terms"
            class="text-xs text-gray-700"
            v-html="$t('signup.termsAgreement')"
          ></label>
        </div>
        <div class="mb-6">
          <button
            type="submit"
            class="w-full bg-black text-white font-bold py-2 px-4 rounded hover:bg-opacity-90 focus:outline-none focus:shadow-outline"
          >
            {{ $t('signup.signupButton') }}
          </button>
        </div>
        <div class="mb-6">
          <button
            @click.prevent="loginStore.loginWithProvider('google')"
            class="w-full bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600 focus:outline-none focus:shadow-outline flex items-center justify-center"
          >
            <font-awesome-icon :icon="['fab', 'google']" class="mr-2" />
            {{ $t('signup.signupWithGoogle') }}
          </button>
        </div>
        <div class="text-center text-sm text-gray-600">
          {{ $t('signup.alreadyHaveAccount') }}
          <router-link to="/login" class="text-blue-500 hover:text-blue-800 cursor-pointer">
            {{ $t('signup.login') }}
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useLoginStore } from '@/stores/auth'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const { t } = useI18n()
const router = useRouter()
const loginStore = useLoginStore()

const formData = reactive({
  fullName: '',
  email: '',
  mobileNumber: '',
  password: '',
  confirmPassword: '',
  termsAccepted: false
})

const register = async () => {
  if (!formData.termsAccepted) {
    alert(t('signup.errors.acceptTerms'))
    return
  }

  if (formData.password !== formData.confirmPassword) {
    alert(t('signup.errors.passwordMismatch'))
    return
  }

  try {
    await loginStore.handleSignup({
      user_name: formData.fullName,
      email: formData.email,
      mobileNumber: formData.mobileNumber,
      password: formData.password,
      password_confirmation: formData.confirmPassword
    })
    router.push('/books')
  } catch (error) {
    console.error('Registration failed:', error)
    alert(t('signup.errors.registrationFailed'))
  }
}

// const loginWithProvider = async (provider: string) => {
//   try {
//     const response = await api.get(`/auth/${provider}`)
//     if (response.data.url) {
//       window.location.href = response.data.url
//     }
//   } catch (error) {
//     console.error(`Error logging in with ${provider}:`, error)
//     errors.general = t('login.errors.socialLoginFailed', { provider })
//   }
// }
</script>

<style scoped>
.background {
  background-image: url('@/assets/signup-background.png');
  background-size: cover;
  background-position: center;
}
</style>
