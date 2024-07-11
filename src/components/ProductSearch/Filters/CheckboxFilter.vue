<template>
  <div>
    <div v-for="option in filter.options" :key="option.value" class="flex justify-between pb-1">
      <label :for="option.value" class="text-base">{{ option.label }}</label>
      <input
        type="checkbox"
        :id="option.value"
        :value="option.value"
        v-model="selectedOptions"
        @change="updateValue"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'

export default defineComponent({
  name: 'CheckboxFilter',
  props: ['filter', 'modelValue'],
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const selectedOptions = ref(props.modelValue || [])

    const updateValue = () => {
      emit('update:modelValue', selectedOptions.value)
    }

    watch(
      () => props.modelValue,
      (newValue) => {
        selectedOptions.value = newValue
      }
    )

    return {
      selectedOptions,
      updateValue
    }
  }
})
</script>
