<template>
  <SEOMetaTags
    :title="book.title + ' | MajesticMinds'"
    :description="book.description"
    :image="book.image"
    :url="currentURL"
  />
  <div class="container mx-auto">
    <HeaderComponent />
    <main>
      <div class="book-display">
        <Breadcrumb :items="breadcrumbItems" class="m-6" />
        <product-info :book="book" />
        <!-- <related-products :products="relatedProducts" /> -->
        <!-- <rating-reviews :rating="book.rating" :reviews="book.reviews" /> -->
      </div>
    </main>

    <FooterComponent />
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useBookStore } from '@/stores/bookStore'
import { useMeta } from 'vue-meta'
import HeaderComponent from '@/components/Header.vue'
import ProductInfo from '@/components/ProductDetails/ProductInfo.vue'
import FooterComponent from '@/components/FooterComponent.vue'
import Breadcrumb from '@/components/shared/Breadcrumb.vue'
import SEOMetaTags from '@/components/SEOMetaTags.vue'

const route = useRoute()
const bookStore = useBookStore()
const book = computed(() => bookStore.currentBook)
const currentURL = computed(() => window.location.href)

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
  const id = route.params.id as string
  await bookStore.fetchBookById(id)
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
