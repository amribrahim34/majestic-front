<template>
  <div class="relative w-full max-w-md">
    <n-input
      v-model:value="searchQuery"
      type="text"
      :placeholder="$t('header.search.placeholder')"
      @keyup.enter="emitSearch"
    >
      <template #prefix>
        <n-icon><search-outline /></n-icon>
      </template>
    </n-input>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { NInput, NIcon } from 'naive-ui'
import { SearchOutline } from '@vicons/ionicons5'

const searchQuery = ref('')
const emit = defineEmits(['search'])

const emitSearch = () => {
  emit('search', searchQuery.value)
}
</script>
