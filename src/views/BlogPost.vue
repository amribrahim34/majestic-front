<template>
  <div v-if="isLoading" class="text-xl">Loading...</div>
  <div v-else-if="error" class="text-xl text-red-500">{{ error }}</div>
  <div v-else-if="!currentPost" class="container mx-auto py-10 text-center">
    <h1 class="text-3xl font-bold mb-4">Oops! Blog Post Not Found</h1>
    <p class="mb-6">The blog post you're looking for doesn't seem to exist.</p>
    <router-link
      to="/blog"
      class="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
    >
      Back to Blog
    </router-link>
  </div>
  <article v-else class="container mx-auto py-10">
    <h1 class="text-4xl font-bold mb-4">{{ currentPost.title }}</h1>
    <img
      :src="currentPost.img"
      :alt="currentPost.title"
      class="w-full h-64 object-cover mb-6 rounded-lg"
    />
    <div class="prose lg:prose-xl" v-html="currentPost.content"></div>
    <div class="mt-6">
      <h3 class="font-semibold">Tags:</h3>
      <div class="flex flex-wrap gap-2 mt-2">
        <span
          v-for="tag in currentPost.tags"
          :key="tag.id"
          class="bg-gray-200 px-2 py-1 rounded-full text-sm"
        >
          {{ tag.name }}
        </span>
      </div>
    </div>
    <p class="mt-6 text-gray-600">Published on {{ formatDate(currentPost.created_at) }}</p>
  </article>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useBlogStore } from '@/stores/blogStore'

const route = useRoute()
const blogStore = useBlogStore()

const currentPost = computed(() => blogStore.getCurrentPost)
const isLoading = computed(() => blogStore.isLoading)
const error = computed(() => blogStore.getError)

onMounted(async () => {
  const slug = route.params.slug as string
  await blogStore.fetchPostBySlug(slug)
})

const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}
</script>
