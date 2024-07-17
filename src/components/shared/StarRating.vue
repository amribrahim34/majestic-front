<!-- src/components/shared/StarRating.vue -->
<template>
  <div class="star-rating">
    <!-- Implement star rating display here -->
    {{ rating }} stars
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'StarRating',
  props: {
    rating: {
      type: Number,
      required: true
    }
  }
})
</script>

<style scoped>
.star-rating {
  /* Add your styling here */
}
</style>
