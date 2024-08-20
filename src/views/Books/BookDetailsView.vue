<template>
  <SEOMetaTags
    :title="book.title ? `${book.title} | MajesticMinds` : 'Book Details | MajesticMinds'"
    :description="book.description || 'Book details page'"
    :image="book.image || ''"
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
        <product-info :book="book" />
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
import { useRoute } from 'vue-router'
import { useBookStore } from '@/stores/bookStore'
import { useMeta } from 'vue-meta'
import HeaderComponent from '@/components/Header.vue'
import ProductInfo from '@/components/ProductDetails/ProductInfo.vue'
import RelatedProducts from '@/components/ProductDetails/RelatedProducts.vue'
import FooterComponent from '@/components/FooterComponent.vue'
import Breadcrumb from '@/components/shared/Breadcrumb.vue'
import SEOMetaTags from '@/components/SEOMetaTags.vue'
import RatingReviews from '@/components/ProductDetails/RatingReviews.vue'

const route = useRoute()
const bookStore = useBookStore()
const book = computed(() => bookStore.currentBook)
const rating = computed(() => bookStore.rating)
const relatedProducts = computed(() => bookStore.relatedProducts)
const reviews = computed(() => bookStore.reviews || [])
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
  return book.value?.authors && book.value.authors.length > 0
    ? book.value.authors[0].name
    : 'Unknown Author'
})

computed(() => ({
  '@context': 'https://schema.org',
  '@type': 'Book',
  name: book.value.title,
  author: author,
  isbn10: book.value.isbn10,
  isbn13: book.value.isbn13,
  numberOfPages: book.value.num_pages,
  publisher: book.value.publisher,
  datePublished: book.value.publication_date,
  description: book.value.description
}))

const fetchBook = async () => {
  loading.value = true
  error.value = ''
  try {
    const id = props.id || (route.params.id as string)
    if (id) {
      await bookStore.fetchBookById(id)
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

onMounted(fetchBook)

// Use vue-meta to set meta tags and structured data
useMeta(() => ({
  title: `${book.value.title} | MajesticMinds`,
  meta: [
    { name: 'description', content: book.value.description },
    { property: 'og:title', content: `${book.value.title} | MajesticMinds` },
    { property: 'og:description', content: book.value.description },
    { property: 'og:image', content: book.value.image },
    { property: 'og:url', content: window.location.href }
  ],
  script: [
    {
      type: 'application/ld+json',
      json: {
        '@context': 'https://schema.org',
        '@type': 'Book',
        name: book.value.title,
        author: author,
        isbn10: book.value.isbn10,
        isbn13: book.value.isbn13,
        numberOfPages: book.value.num_pages,
        publisher: book.value.publisher,
        datePublished: book.value.publication_date,
        description: book.value.description
      }
    }
  ]
}))

const breadcrumbItems = computed(() => [
  { label: 'Home', link: '/' },
  { label: 'Books', link: '/books' },
  { label: book.value.title }
])
</script>

<style scoped>
/* You can add more styles if needed */
</style>
