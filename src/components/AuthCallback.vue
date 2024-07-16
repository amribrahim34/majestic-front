<template>
  <div>Processing login...</div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useLoginStore } from '@/stores/auth'

const router = useRouter()
const loginStore = useLoginStore()

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
        await router.push('/books')
      } else {
        throw new Error('Login failed')
      }
    } catch (error) {
      console.error('Authentication failed:', error)
      router.push('/login')
    }
  } else {
    console.error('Missing token or user data')
    router.push('/login')
  }
}

onMounted(() => {
  processAuth()
})
</script>
