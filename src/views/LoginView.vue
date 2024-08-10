<script lang="ts">
import Login from '@/components/Login.vue'

export default {
  name: 'LoginView',
  components: {
    Login
  },
  data() {
    return {
      count: 0
    }
  }
}
</script>

<template>
  <Login />
</template>
