<template>
  <div>Processing login...</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapActions } from 'pinia'
import { useLoginStore } from '@/stores/auth' // adjust the import path as needed

export default defineComponent({
  name: 'SocialLoginCallback',

  methods: {
    ...mapActions(useLoginStore, ['setUser', 'setToken']),

    processAuth() {
      const urlParams = new URLSearchParams(window.location.search)
      const token = urlParams.get('token')
      const user = JSON.parse(urlParams.get('user') || '{}')

      if (token && user) {
        this.setUser(user)
        this.setToken(token)
        // Store token in localStorage or secure cookie
        localStorage.setItem('auth_token', token)

        // Redirect to dashboard or home page
        this.$router.push('/dashboard')
      } else {
        // Handle error
        console.error('Authentication failed')
        this.$router.push('/login')
      }
    }
  },

  mounted() {
    this.processAuth()
  }
})
</script>
