<template>
  <div>
    <h3 class="font-bold mb-2">Categories</h3>
    <n-divider />
    <n-tree
      block-line
      :data="treeData"
      :default-expanded-keys="defaultExpandedKeys"
      expand-on-click
      checkable
      :checked-keys="selectedOptions"
      @update:checked-keys="updateModelValue"
    />
    <n-button v-if="hasMoreCategories" @click="loadMore" class="mt-4"> Load More </n-button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { NTree, NButton, NDivider } from 'naive-ui'
import type { TreeOption } from 'naive-ui'
import { useBookStore } from '@/stores/bookStore'
import { storeToRefs } from 'pinia'

const bookStore = useBookStore()
const { categories } = storeToRefs(bookStore)

const props = defineProps<{
  modelValue: Array<string | number>
  displayLimit: number
}>()

const emit = defineEmits(['update:modelValue', 'loadMore'])

const selectedOptions = ref(props.modelValue)
const currentDisplayLimit = ref(props.displayLimit)

const treeData = computed<TreeOption[]>(() => {
  return categories.value.slice(0, currentDisplayLimit.value).map((category) => ({
    key: String(category.id),
    label: `${category.category_name} (${category.books_count || 0})`,
    children: undefined
  }))
})

const defaultExpandedKeys = ref<string[]>([])

const hasMoreCategories = computed(() => {
  return currentDisplayLimit.value < categories.value.length
})

const updateModelValue = (checkedKeys: string[]) => {
  selectedOptions.value = checkedKeys
  emit('update:modelValue', checkedKeys)
}

const loadMore = () => {
  emit('loadMore')
  currentDisplayLimit.value += props.displayLimit
}

watch(
  () => props.modelValue,
  (newSelected) => {
    selectedOptions.value = newSelected
  },
  { deep: true }
)

onMounted(() => {
  if (categories.value.length === 0) {
    bookStore.fetchCategories()
  }
})
</script>
