<template>
  <div class="star-rating flex items-center">
    <n-rate
      v-model:value="displayRating"
      :count="5"
      :readonly="readonly"
      @update:value="updateRating"
    />
    <span v-if="showValue" class="ml-2 text-sm text-gray-600"> {{ displayRating ?? 0 }} </span>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, computed } from 'vue'
import { NRate } from 'naive-ui'
import { useRatingStore } from '@/stores/ratingStore'
import { storeToRefs } from 'pinia'

const props = defineProps({
  bookId: {
    type: Number,
    required: true
  },
  readonly: {
    type: Boolean,
    default: false
  },
  showValue: {
    type: Boolean,
    default: true
  },
  rating: {
    type: Number,
    default: 0
  }
})

const ratingStore = useRatingStore()
const { state } = storeToRefs(ratingStore)

const displayRating = ref(props.rating)

const isLoading = computed(() => state.value.loading)

watch(
  () => props.rating,
  (newRating) => {
    displayRating.value = newRating
  }
)

watch(
  () => state.value.userRating,
  (newRating) => {
    if (newRating !== null && !props.readonly) {
      displayRating.value = newRating
    }
  }
)

const updateRating = async (value: number) => {
  if (!props.readonly && !isLoading.value) {
    await ratingStore.rateBook(props.bookId, value)
  }
}
</script>

<style scoped></style>
