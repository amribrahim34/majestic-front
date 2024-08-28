<template>
  <n-card class="related-products my-8">
    <template #header>
      <h2 class="text-2xl font-bold">{{ $t('productInfo.relatedProducts.title') }}</h2>
    </template>
    <n-spin :show="loading">
      <n-empty
        v-if="!loading && (!books || books.length === 0)"
        description="No related products found"
      >
        <template #extra>
          <n-button>{{ $t('productInfo.relatedProducts.browseMore') }}</n-button>
        </template>
      </n-empty>
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <n-card v-for="book in books" :key="book.id" class="book-card" hoverable>
          <template #cover>
            <router-link :to="{ name: 'BookDetails', params: { id: book.id } }" :id="book.id">
              <n-image
                class="w-full h-48 object-cover"
                :src="book.image"
                :alt="book.title"
                fallback-src="/default.png"
                preview-disabled
              />
            </router-link>
          </template>
          <n-space vertical>
            <router-link :to="{ name: 'BookDetails', params: { id: book.id } }" :id="book.id">
              <n-text class="text-lg font-semibold line-clamp-1">{{ book.title }}</n-text>
            </router-link>
            <n-text class="text-xl font-bold">
              {{ $t('productInfo.relatedProducts.price', { price: book.price }) }}
            </n-text>
            <n-space justify="space-between">
              <WishlistButton
                v-if="book.id"
                :book-id="book.id"
                :is-wishlisted="book.is_wishlisted"
              />
              <AddToCartButton v-if="book.id" :book-id="book.id" />
            </n-space>
          </n-space>
        </n-card>
      </div>
    </n-spin>
  </n-card>
</template>

<script setup lang="ts">
import { ref, PropType, onMounted } from 'vue'
import { NCard, NSpin, NEmpty, NButton, NSpace, NText } from 'naive-ui'
import { Book } from '@/types/Book'
import WishlistButton from '@/components/shared/WishlistButton.vue'
import AddToCartButton from '@/components/shared/AddToCartButton.vue'
import { NImage } from 'naive-ui'

const props = defineProps({
  books: {
    type: Array as PropType<Book[]>,
    default: () => []
  }
})

const loading = ref(true)

onMounted(() => {
  // Simulate loading
  setTimeout(() => {
    loading.value = false
  }, 1000)
})
</script>

<style scoped>
.book-card {
  transition: transform 0.2s ease-in-out;
}

.book-card:hover {
  transform: translateY(-5px);
}
</style>
