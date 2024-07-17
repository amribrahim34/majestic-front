<template>
  <div class="container mx-auto">
    <HeaderComponent />
    <div class="book-display">
      <product-info :book="book" />
      <!-- <related-products :products="relatedProducts" /> -->
      <!-- <rating-reviews :rating="book.rating" :reviews="book.reviews" /> -->
    </div>
    <FooterComponent />
  </div>
</template>

<script lang="ts">
import HeaderComponent from '@/components/Header.vue'
import ProductInfo from '@/components/ProductDetails/ProductInfo.vue'
// import RelatedProducts from '@/components/ProductDetails/RelatedProducts.vue'
// import RatingReviews from '@/components/ProductDetails/RatingReviews.vue'
import FooterComponent from '@/components/FooterComponent.vue'
import { defineComponent, ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useBookStore } from '@/stores/bookStore'

export default defineComponent({
  name: 'BookDetailsView',
  components: {
    ProductInfo,
    // RelatedProducts,
    // RatingReviews,
    HeaderComponent,
    FooterComponent
  },

  setup() {
    const relatedProducts = ref([])
    const route = useRoute()
    const bookStore = useBookStore()
    const book = computed(() => bookStore.currentBook)

    const fetchBook = async () => {
      const id = route.params.id as string
      await bookStore.fetchBookById(id)
    }

    onMounted(fetchBook)

    return {
      book,
      relatedProducts
    }
  }
})
</script>

<style scoped>
/* You can add more styles if needed */
</style>
