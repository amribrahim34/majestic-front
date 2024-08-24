<template>
  <n-card class="max-w-md mx-auto mt-10">
    <n-space vertical>
      <n-h2 class="text-center">Processing Login</n-h2>
      <n-spin size="large" v-if="isProcessing" />
      <n-alert v-if="error" type="error" :title="error" />
    </n-space>
  </n-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useLoginStore } from '@/stores/auth'
import { NCard, NSpace, NH2, NSpin, NAlert } from 'naive-ui'

const router = useRouter()
const route = useRoute()
const loginStore = useLoginStore()

const error = ref('')
const isProcessing = ref(true)

const processAuth = async () => {
  console.log('Processing auth callback')
  const token = route.query.token as string
  const user = route.query.user as string

  console.log('Token:', token)
  console.log('User:', user)

  if (token && user) {
    try {
      const success = await loginStore.handleSocialLoginCallback(
        new URLSearchParams(route.query as Record<string, string>).toString()
      )
      console.log('Social login callback result:', success)

      if (success) {
        console.log('Redirecting to /books')
        await router.push('/books')
      } else {
        throw new Error('Login failed')
      }
    } catch (err) {
      console.error('Authentication failed:', err)
      error.value = 'Authentication failed. Please try again.'
      setTimeout(() => router.push('/login'), 3000)
    }
  } else {
    console.error('Missing token or user data')
    error.value = 'Missing login information. Redirecting to login page...'
    setTimeout(() => router.push('/login'), 3000)
  }
  isProcessing.value = false
}

onMounted(() => {
  processAuth()
})
</script>
