<script lang="ts">
import Signup from '../components/Signup.vue'

export default {
  name: 'SignupView',
  components: {
    Signup
  },
  data() {
    return {
      count: 0
    }
  }
}
</script>

<template>
  <Signup />
</template>
<style>
/* This applies the style directly to the <body> element, affecting the entire page */
body {
  background-image: url('@/assets/signup-background.png');
  background-size: cover; /* Cover the entire page */
  background-position: center; /* Center the background image */
}
</style>
