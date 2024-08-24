<template>
  <n-card class="max-w-md mx-auto mt-10">
    <n-space vertical>
      <n-h2 class="text-center">Processing Login</n-h2>
      <n-spin size="large" />
      <n-text v-if="error" type="error" class="text-center">
        {{ error }}
      </n-text>
    </n-space>
  </n-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useLoginStore } from '@/stores/auth'
import { useMessage } from 'naive-ui'

const router = useRouter()
const loginStore = useLoginStore()
const message = useMessage()

const error = ref('')

const processAuth = async () => {
  console.log('Processing auth callback')
  const params = new URLSearchParams(window.location.search)

  const token = params.get('token')
  const userJson = params.get('user')

  console.log('Token:', token)
  console.log('User JSON:', userJson)

  if (token && userJson) {
    try {
      const success = await loginStore.handleSocialLoginCallback(params.toString())
      console.log('Social login callback result:', success)

      if (success) {
        console.log('Redirecting to /books')
        message.success('Login successful!')
        await router.push('/books')
      } else {
        throw new Error('Login failed')
      }
    } catch (err) {
      console.error('Authentication failed:', err)
      error.value = 'Authentication failed. Please try again.'
      message.error('Authentication failed')
      setTimeout(() => router.push('/login'), 3000)
    }
  } else {
    console.error('Missing token or user data')
    error.value = 'Missing login information. Redirecting to login page...'
    message.error('Missing login information')
    setTimeout(() => router.push('/login'), 3000)
  }
}

onMounted(() => {
  processAuth()
})
</script>
