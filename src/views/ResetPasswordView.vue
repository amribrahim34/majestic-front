<script lang="ts">
import ResetPassword from '../components/ResetPassword.vue'

export default {
  name: 'ResetPasswordView',
  components: {
    ResetPassword
  },
  data() {
    return {
      count: 0
    }
  }
}
</script>

<template>
  <ResetPassword />
</template>
<style scoped>
/* This applies the style directly to the <body> element, affecting the entire page */
body {
  background-image: url('@/assets/reset-password-background.png');
  background-size: cover; /* Cover the entire page */
  background-position: center; /* Center the background image */
}
</style>
