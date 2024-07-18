// src/stores/blogStore.ts

import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import api from '@/api'
import type { BlogState } from '@/types/Blog'

export const useBlogStore = defineStore('blog', () => {
  // State
  const state = ref<BlogState>({
    posts: [],
    recentPosts: [],
    currentPost: null,
    loading: false,
    error: null
  })

  // Getters
  const getAllPosts = computed(() => state.value.posts)
  const getRecentPosts = computed(() => state.value.recentPosts)
  const getCurrentPost = computed(() => state.value.currentPost)
  const isLoading = computed(() => state.value.loading)
  const getError = computed(() => state.value.error)

  // Actions
  const fetchAllPosts = async () => {
    state.value.loading = true
    state.value.error = null
    try {
      const response = await api.get('/blog')
      state.value.posts = response.data.data
    } catch (error) {
      state.value.error = 'Failed to fetch blog posts'
      console.error('Error fetching blog posts:', error)
    } finally {
      state.value.loading = false
    }
  }

  const fetchRecentPosts = async (limit: number = 5) => {
    state.value.loading = true
    state.value.error = null
    try {
      const response = await api.get(`/blog/recent?limit=${limit}`)
      state.value.recentPosts = response.data.data
    } catch (error) {
      state.value.error = 'Failed to fetch recent posts'
      console.error('Error fetching recent posts:', error)
    } finally {
      state.value.loading = false
    }
  }

  const fetchPostBySlug = async (slug: string) => {
    state.value.loading = true
    state.value.error = null
    try {
      const response = await api.get(`/blog/${slug}`)
      state.value.currentPost = response.data.data
    } catch (error) {
      state.value.error = 'Failed to fetch blog post'
      console.error('Error fetching blog post:', error)
    } finally {
      state.value.loading = false
    }
  }

  const fetchPostsByTag = async (tagSlug: string) => {
    state.value.loading = true
    state.value.error = null
    try {
      const response = await api.get(`/blog/tag/${tagSlug}`)
      state.value.posts = response.data.data
    } catch (error) {
      state.value.error = 'Failed to fetch posts by tag'
      console.error('Error fetching posts by tag:', error)
    } finally {
      state.value.loading = false
    }
  }

  return {
    // State
    state,
    // Getters
    getAllPosts,
    getRecentPosts,
    getCurrentPost,
    isLoading,
    getError,
    // Actions
    fetchAllPosts,
    fetchRecentPosts,
    fetchPostBySlug,
    fetchPostsByTag
  }
})
