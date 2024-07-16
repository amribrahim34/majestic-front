<!-- Pagination.vue -->
<template>
  <div class="flex justify-center mt-8">
    <button
      @click="$emit('pageChange', 1)"
      :disabled="currentPage === 1"
      class="mx-1 px-3 py-2 rounded"
      :class="
        currentPage === 1 ? 'bg-gray-200 cursor-not-allowed' : 'bg-gray-200 hover:bg-gray-300'
      "
    >
      First
    </button>
    <button
      @click="$emit('pageChange', currentPage - 1)"
      :disabled="currentPage === 1"
      class="mx-1 px-3 py-2 rounded"
      :class="
        currentPage === 1 ? 'bg-gray-200 cursor-not-allowed' : 'bg-gray-200 hover:bg-gray-300'
      "
    >
      &lt;
    </button>
    <button
      v-for="page in visiblePages"
      :key="page"
      @click="$emit('pageChange', page)"
      :class="[
        'mx-1 px-3 py-2 rounded',
        currentPage === page ? 'bg-black text-white' : 'bg-gray-200 hover:bg-gray-300'
      ]"
    >
      {{ page }}
    </button>
    <button
      @click="$emit('pageChange', currentPage + 1)"
      :disabled="currentPage === lastPage"
      class="mx-1 px-3 py-2 rounded"
      :class="
        currentPage === lastPage
          ? 'bg-gray-200 cursor-not-allowed'
          : 'bg-gray-200 hover:bg-gray-300'
      "
    >
      &gt;
    </button>
    <button
      @click="$emit('pageChange', lastPage)"
      :disabled="currentPage === lastPage"
      class="mx-1 px-3 py-2 rounded"
      :class="
        currentPage === lastPage
          ? 'bg-gray-200 cursor-not-allowed'
          : 'bg-gray-200 hover:bg-gray-300'
      "
    >
      Last
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  currentPage: number
  lastPage: number
}>()

const emit = defineEmits(['pageChange'])

const visiblePages = computed(() => {
  const delta = 3 // Number of pages to show on each side of the current page
  const range = []
  let rangeWithDots = []
  let l

  for (
    let i = Math.max(2, props.currentPage - delta);
    i <= Math.min(props.lastPage - 1, props.currentPage + delta);
    i++
  ) {
    range.push(i)
  }

  if (props.currentPage - delta > 2) {
    range.unshift('...')
  }
  if (props.currentPage + delta < props.lastPage - 1) {
    range.push('...')
  }

  range.unshift(1)
  if (props.lastPage !== 1) {
    range.push(props.lastPage)
  }

  return range
})
</script>
