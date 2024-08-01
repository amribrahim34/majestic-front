<template>
  <div class="flex justify-center mt-8 flex-wrap">
    <button
      @click="changePage(1)"
      :disabled="currentPage === 1"
      :class="buttonClass(currentPage === 1)"
    >
      {{ t('common.first') }}
    </button>
    <button
      @click="changePage(currentPage - 1)"
      :disabled="currentPage === 1"
      :class="buttonClass(currentPage === 1)"
    >
      &lt;
    </button>
    <button
      v-for="page in visiblePages"
      :key="page"
      @click="changePage(typeof page === 'number' ? page : currentPage)"
      :class="[
        'mx-1 my-1 px-3 py-2 rounded',
        currentPage === page ? 'bg-black text-white' : 'bg-gray-200 hover:bg-gray-300'
      ]"
    >
      {{ page }}
    </button>
    <button
      @click="changePage(currentPage + 1)"
      :disabled="currentPage === lastPage"
      :class="buttonClass(currentPage === lastPage)"
    >
      &gt;
    </button>
    <button
      @click="changePage(lastPage)"
      :disabled="currentPage === lastPage"
      :class="buttonClass(currentPage === lastPage)"
    >
      {{ t('common.last') }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

interface Props {
  currentPage: number
  lastPage: number
}

const props = withDefaults(defineProps<Props>(), {
  currentPage: 1,
  lastPage: 1
})

const emit = defineEmits<{
  (e: 'pageChange', page: number): void
}>()

const { t } = useI18n()

const visiblePages = computed(() => {
  const delta = 3
  const range: (number | string)[] = []

  for (
    let i = Math.max(2, props.currentPage - delta);
    i <= Math.min(props.lastPage - 1, props.currentPage + delta);
    i++
  ) {
    range.push(i)
  }

  if (props.currentPage - delta > 2) range.unshift('...')
  if (props.currentPage + delta < props.lastPage - 1) range.push('...')

  range.unshift(1)
  if (props.lastPage !== 1) range.push(props.lastPage)

  return range
})

const buttonClass = (disabled: boolean) =>
  disabled
    ? 'mx-1 px-3 py-2 rounded bg-gray-200 cursor-not-allowed'
    : 'mx-1 px-3 py-2 rounded bg-gray-200 hover:bg-gray-300'

const changePage = (page: number) => {
  emit('pageChange', page)
}
</script>
