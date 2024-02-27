<script lang="ts">
import Login from '../components/Login.vue'

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
<style scoped>
/* This applies the style directly to the <body> element, affecting the entire page */
body {
  background-image: url('@/assets/login-background.png');
  background-size: cover; /* Cover the entire page */
  background-position: center; /* Center the background image */
}
</style>
