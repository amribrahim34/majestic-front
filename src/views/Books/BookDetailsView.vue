<template>
  <SEOMetaTags
    :title="
      currentBook.title ? `${currentBook.title} | MajesticMinds` : 'Book Details | MajesticMinds'
    "
    :description="currentBook.description || 'Book details page'"
    :image="currentBook.image || ''"
    :url="currentURL"
  />
  <div class="container mx-auto">
    <HeaderComponent />
    <main>
      <div v-if="loading" class="text-center py-8">
        <p>Loading book details...</p>
      </div>
      <div v-else-if="error" class="text-center py-8">
        <p class="text-red-500">{{ error }}</p>
      </div>
      <div v-else class="book-display">
        <Breadcrumb :items="breadcrumbItems" class="m-6" />
        <product-info :book="currentBook" />
        <related-products :books="relatedProducts" />
        <!-- <rating-reviews
          v-if="rating"
          :rating="Number(rating.average_rating)"
          :reviews-count="rating.ratings_count"
          :reviews="reviews"
          :bookId="book.id"
        /> -->
      </div>
    </main>
    <FooterComponent />
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed, ref } from 'vue'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'
import { useBookStore } from '@/stores/bookStore'
import { useMeta } from 'vue-meta'
import HeaderComponent from '@/components/Header.vue'
import ProductInfo from '@/components/ProductDetails/ProductInfo.vue'
import RelatedProducts from '@/components/ProductDetails/RelatedProducts.vue'
import FooterComponent from '@/components/FooterComponent.vue'
import Breadcrumb from '@/components/shared/Breadcrumb.vue'
import SEOMetaTags from '@/components/SEOMetaTags.vue'
// import RatingReviews from '@/components/ProductDetails/RatingReviews.vue'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const route = useRoute()
const bookStore = useBookStore()
const { currentBook, relatedProducts } = storeToRefs(bookStore)
// const rating = computed(() => bookStore.rating)
// const reviews = computed(() => bookStore.reviews || [])
const currentURL = computed(() => window.location.href)
const loading = ref(false)
const error = ref('')

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})
const author = computed(() => {
  return currentBook.value?.authors && currentBook.value.authors.length > 0
    ? currentBook.value.authors[0].name
    : 'Unknown Author'
})

computed(() => ({
  '@context': 'https://schema.org',
  '@type': 'Book',
  name: currentBook.value.title,
  author: author,
  isbn10: currentBook.value.isbn10,
  isbn13: currentBook.value.isbn13,
  numberOfPages: currentBook.value.num_pages,
  publisher: currentBook.value.publisher,
  datePublished: currentBook.value.publication_date,
  description: currentBook.value.description
}))

const fetchBook = async (bookId) => {
  loading.value = true
  error.value = ''
  let id = route.params.id as string
  try {
    if (bookId) {
      await bookStore.fetchBookById(bookId)
    } else {
      throw new Error('No book ID provided')
    }
  } catch (err) {
    console.error('Error fetching book:', err)
    error.value = 'Failed to load book details. Please try again later.'
  } finally {
    loading.value = false
  }
}

const bookId = props.id || route.params.id
onMounted(fetchBook(bookId))

onBeforeRouteUpdate(async (to) => {
  if (to.params.id !== route.params.id) {
    await fetchBook(to.params.id)
  }
})

// Use vue-meta to set meta tags and structured data
useMeta(() => ({
  title: `${currentBook.value.title} | MajesticMinds`,
  meta: [
    { name: 'description', content: currentBook.value.description },
    { property: 'og:title', content: `${currentBook.value.title} | MajesticMinds` },
    { property: 'og:description', content: currentBook.value.description },
    { property: 'og:image', content: currentBook.value.image },
    { property: 'og:url', content: window.location.href }
  ],
  script: [
    {
      type: 'application/ld+json',
      json: {
        '@context': 'https://schema.org',
        '@type': 'Book',
        name: currentBook.value.title,
        author: author,
        isbn10: currentBook.value.isbn10,
        isbn13: currentBook.value.isbn13,
        numberOfPages: currentBook.value.num_pages,
        publisher: currentBook.value.publisher,
        datePublished: currentBook.value.publication_date,
        description: currentBook.value.description
      }
    }
  ]
}))

const breadcrumbItems = computed(() => [
  { label: t('breadcrumb.home'), link: '/' },
  { label: t('breadcrumb.books'), link: '/books' },
  { label: currentBook.value.title }
])
</script>

<style scoped>
/* You can add more styles if needed */
</style>
