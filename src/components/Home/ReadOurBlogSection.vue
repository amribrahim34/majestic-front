<template>
  <section class="py-20 bg-gray-100">
    <div class="container mx-auto text-center">
      <h2 class="text-3xl font-bold mb-8">{{ t('home.blog.title') }}</h2>
      <div v-if="isLoading" class="text-xl">{{ t('common.loading') }}</div>
      <div v-else-if="error" class="text-xl text-red-500">{{ error }}</div>
      <div
        v-else-if="recentPosts.length === 0"
        class="flex flex-col items-center justify-center min-h-[300px]"
      >
        <p class="text-xl mb-4">{{ t('home.blog.emptyMessage') }}</p>
        <p class="text-lg mb-6">{{ t('home.blog.checkBackSoon') }}</p>
        <button
          @click="refreshPosts"
          class="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          {{ t('common.refresh') }}
        </button>
      </div>
      <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div v-for="post in recentPosts" :key="post.id" class="bg-white p-6 rounded-lg shadow-lg">
          <img
            :src="post.img"
            :alt="post.title"
            class="mb-4 w-full h-48 object-cover rounded-lg"
            loading="lazy"
          />
          <h3 class="text-xl font-semibold mb-2">{{ post.title }}</h3>
          <p class="mb-4">{{ truncateContent(post.content, 100) }}</p>
          <router-link
            :to="{ name: 'BlogPost', params: { slug: post.slug } }"
            class="text-blue-500 hover:text-blue-600"
            >{{ t('home.blog.readMore') }}</router-link
          >
          <div class="mt-4 flex items-center justify-center">
            <div>
              <p class="text-gray-500 text-xs">{{ formatDate(post.created_at) }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useBlogStore } from '@/stores/blogStore'

const { t, d } = useI18n()
const blogStore = useBlogStore()

const recentPosts = computed(() => blogStore.getRecentPosts || [])
const isLoading = computed(() => blogStore.isLoading)
const error = computed(() => blogStore.getError)

const postsPerPage = ref(3)

onMounted(async () => {
  await fetchPosts()
})

const fetchPosts = async () => {
  await blogStore.fetchRecentPosts(postsPerPage.value)
}

const refreshPosts = async () => {
  await fetchPosts()
}

const truncateContent = (content: string, maxLength: number): string => {
  if (content.length <= maxLength) return content
  return content.slice(0, maxLength) + '...'
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return d(date, 'long')
}
</script>
