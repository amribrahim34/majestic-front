<template>
  <section class="rating-reviews max-w-4xl mx-auto p-6">
    <div class="rating-summary mb-8">
      <h2 class="text-2xl font-bold mb-4">{{ $t('ratingReviews.rating') }}</h2>
      <div class="average-rating flex items-center mb-4">
        <span class="rating-number text-3xl font-bold mr-4">{{ averageRating.toFixed(1) }}/5</span>
        <star-rating :rating="averageRating" class="mr-4" />
        <span class="review-count text-gray-600">
          {{ $t('ratingReviews.ratingsCount', { count: reviews.length }) }}
        </span>
      </div>
      <div class="rating-bars space-y-2">
        <div v-for="i in 5" :key="i" class="flex items-center">
          <span class="w-8 text-right mr-2">{{ 6 - i }}</span>
          <div class="flex-grow bg-gray-200 rounded-full h-2.5">
            <div
              class="bg-yellow-400 h-2.5 rounded-full"
              :style="{ width: `${getRatingPercentage(6 - i)}%` }"
            ></div>
          </div>
          <span class="w-12 text-right ml-2">{{ getRatingCount(6 - i) }}</span>
        </div>
      </div>
    </div>
    <div class="reviews">
      <h2 class="text-2xl font-bold mb-4">{{ $t('ratingReviews.reviews') }}</h2>
      <div v-for="review in paginatedReviews" :key="review.id" class="review mb-6 pb-6 border-b">
        <div class="review-header flex items-center mb-2">
          <star-rating :rating="review.rating" class="mr-4" />
          <span class="reviewer-name font-semibold">{{ review.name }}</span>
        </div>
        <p class="review-title text-lg font-semibold mb-2">{{ review.title }}</p>
        <p class="review-content text-gray-700 mb-2">{{ review.content }}</p>
        <p class="review-date text-sm text-gray-500">{{ formatDate(review.date) }}</p>
      </div>
      <button
        v-if="hasMoreReviews"
        @click="loadMore"
        class="load-more bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
      >
        {{ $t('ratingReviews.loadMore') }}
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import StarRating from '@/components/shared/StarRating.vue'
import type { Review } from '@/types/Review'

const props = defineProps({
  rating: {
    type: Number,
    required: true
  },
  reviews: {
    type: Array as () => Review[],
    required: true
  }
})

const { d } = useI18n()

const averageRating = computed(() => props.rating)
const reviewsPerPage = 5
const currentPage = ref(1)

const paginatedReviews = computed(() => {
  const start = 0
  const end = currentPage.value * reviewsPerPage
  return props.reviews.slice(start, end)
})

const hasMoreReviews = computed(() => paginatedReviews.value.length < props.reviews.length)

const loadMore = () => {
  currentPage.value++
}

const formatDate = (date: string) => {
  return d(new Date(date), 'long')
}

const getRatingCount = (rating: number) => {
  return props.reviews.filter((review) => review.rating === rating).length
}

const getRatingPercentage = (rating: number) => {
  const count = getRatingCount(rating)
  return (count / props.reviews.length) * 100
}
</script>
