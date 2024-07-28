<template>
  <div :class="{ 'flex flex-col items-center rtl': isRtl }">
    <n-space vertical>
      <n-slider
        v-model:value="localValue"
        range
        :marks="marks"
        :step="10"
        :min="minValue"
        :max="maxValue"
        @dragend="updateValue"
      />
      <n-space>
        <n-input-number
          v-model:value="localValue[0]"
          size="small"
          :min="minValue"
          :max="maxValue"
          @blur="updateValue"
        />
        <n-input-number
          v-model:value="localValue[1]"
          size="small"
          :min="minValue"
          :max="maxValue"
          @blur="updateValue"
        />
      </n-space>
    </n-space>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed, onMounted } from 'vue'
import { NSpace, NSlider, NInputNumber } from 'naive-ui'
import debounce from 'lodash/debounce'

const props = defineProps({
  modelValue: {
    type: Array as () => [number, number],
    required: true
  },
  min: { type: Number, default: 10 },
  max: { type: Number, default: 10000 },
  language: { type: String, default: 'en' }
})

const emit = defineEmits(['update:modelValue'])

const localValue = ref<[number, number]>([...props.modelValue])

const minValue = computed(() => props.min)
const maxValue = computed(() => props.max)

const marks = computed(() => ({
  [minValue.value]: minValue.value.toString(),
  [maxValue.value]: maxValue.value.toString()
}))

const isRtl = computed(() => props.language === 'ar')

const updateValue = debounce(() => {
  emit('update:modelValue', localValue.value)
}, 300)

watch(
  () => props.modelValue,
  (newValue) => {
    if (
      newValue &&
      newValue.length === 2 &&
      (newValue[0] !== localValue.value[0] || newValue[1] !== localValue.value[1])
    ) {
      localValue.value = [...newValue]
    }
  },
  { immediate: true, deep: true }
)

onMounted(() => {
  if (props.modelValue && props.modelValue.length === 2) {
    localValue.value = [...props.modelValue]
  }
})
</script>
