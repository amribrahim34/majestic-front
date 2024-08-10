<script lang="ts">
import LoginComponent from '@/components/LoginComponent.vue'

export default {
  name: 'LoginView',
  components: {
    LoginComponent
  },
  data() {
    return {
      count: 0
    }
  }
}
</script>

<template>
  <LoginComponent />
</template>
