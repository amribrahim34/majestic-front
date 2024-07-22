<!-- CheckboxFilter.vue -->
<template>
  <div>
    <div v-for="option in displayedOptions" :key="option.value" class="flex items-center">
      <input
        type="checkbox"
        :id="String(option.value)"
        :value="option.value"
        v-model="selectedOptions"
        @change="updateModelValue"
      />
      <label :for="String(option.value)" class="ml-2">{{ option.label }}</label>
      <span> &nbsp; ({{ option.books_count || 0 }})</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

const props = defineProps<{
  filter: {
    options: Array<{ value: string | number; label: string; books_count: number }>
    selected: Array<string | number>
    displayLimit: number
  }
}>()

const emit = defineEmits(['update:modelValue'])

const selectedOptions = ref(props.filter.selected)

const displayedOptions = computed(() => {
  return props.filter.options.slice(0, props.filter.displayLimit)
})

const updateModelValue = () => {
  emit('update:modelValue', selectedOptions.value)
}

watch(
  () => props.filter.selected,
  (newSelected) => {
    selectedOptions.value = newSelected
  },
  { deep: true }
)
</script>
