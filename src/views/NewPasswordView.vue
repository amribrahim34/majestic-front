<script lang="ts">
import NewPassword from '../components/NewPassword.vue'

export default {
  name: 'NewPasswordView',
  components: {
    NewPassword
  },
  data() {
    return {
      count: 0
    }
  }
}
</script>

<template>
  <NewPassword />
</template>
<style>
/* This applies the style directly to the <body> element, affecting the entire page */
body {
  background-image: url('@/assets/new-password-background.png');
  background-size: cover; /* Cover the entire page */
  background-position: center; /* Center the background image */
}
</style>
