<template>
  <div class="rating-reviews">
    <div class="rating-summary">
      <h2>Rating</h2>
      <div class="average-rating">
        <span class="rating-number">{{ averageRating }}/5</span>
        <star-rating :rating="averageRating" />
        <span class="review-count">{{ reviews.length }} ratings</span>
      </div>
      <div class="rating-bars">
        <!-- Add rating bars here -->
      </div>
    </div>
    <div class="reviews">
      <h2>Reviews</h2>
      <div v-for="review in reviews" :key="review.id" class="review">
        <div class="review-header">
          <star-rating :rating="review.rating" />
          <span class="reviewer-name">{{ review.name }}</span>
        </div>
        <p class="review-title">{{ review.title }}</p>
        <p class="review-content">{{ review.content }}</p>
        <p class="review-date">{{ formatDate(review.date) }}</p>
      </div>
      <button class="load-more">Load more</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue'
import StarRating from '@/components/shared/StarRating.vue'
import { Review } from '@/types/Review'

export default defineComponent({
  name: 'RatingReviews',
  components: {
    StarRating
  },
  props: {
    rating: {
      type: Number,
      required: true
    },
    reviews: {
      type: Array as PropType<Review[]>,
      required: true
    }
  },
  setup(props) {
    const averageRating = computed(() => {
      return props.rating.toFixed(1)
    })

    const formatDate = (date: string) => {
      return new Date(date).toLocaleDateString()
    }

    return {
      averageRating,
      formatDate
    }
  }
})
</script>
