<template>
  <div class="container mx-auto">
    <HeaderComponent />
    <div class="flex w-full my-20">
      <div class="filter-sidebar w-48 ml-7">
        <FilterSection />
      </div>
      <!-- Main content grid -->
      <div class="p-5 mx-10">
        <div class="mb-5">
          <p class="text-xl font-bold">Search results for “Branding”</p>
        </div>
        <div class="gap-3 flex justify-between flex-wrap">
          <ProductCard v-for="product in products" :key="product.id" :product="product" />
        </div>
      </div>
    </div>
    <!-- Load More Button -->
    <!-- <button class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded m-4">
      Load More
    </button> -->
    <FooterComponent />
  </div>
</template>

<script lang="ts">
import ProductCard from '@/components/ProductSearch/ProductCard.vue' // Ensure this path is correct
import FilterSection from '@/components/ProductSearch/FilterSection.vue' // Ensure this path is correct
import HeaderComponent from '@/components/Header.vue'
import FooterComponent from '@/components/FooterComponent.vue'

export default {
  name: 'ProductSearchView',
  components: {
    ProductCard,
    FilterSection,
    HeaderComponent,
    FooterComponent
  },
  data() {
    return {
      // This would be your data fetched from an API or similar
      items: [],
      products: [
        {
          id: 1,
          name: 'narnia',
          author: 'sharles dekins',
          publisher: 'ingram',
          price: 20,
          currency: '$',
          isFavorite: false,
          inCart: false,
          img: '/src/assets/book-imgs/1.jpeg',
          rating: 4.5
        },
        {
          id: 2,
          name: 'world economics',
          author: 'shinder',
          publisher: 'ingram',
          price: 20,
          currency: '$',
          isFavorite: true,
          inCart: false,
          img: '/src/assets/book-imgs/2.png',
          rating: 4.5
        },
        {
          id: 3,
          name: 'the basics of corporate finance',
          author: 'sharles',
          publisher: 'ingram',
          price: 20,
          currency: '$',
          isFavorite: false,
          inCart: false,
          rating: 4.5,
          img: '/src/assets/book-imgs/3.jpeg'
        },
        {
          id: 4,
          name: 'branding',
          author: 'dekins',
          publisher: 'ingram',
          price: 20,
          currency: '$',
          isFavorite: false,
          inCart: false,
          rating: 4.5,
          img: '/src/assets/book-imgs/4.png'
        }
      ]
    }
  }
}
</script>

<style scoped>
/* You can add more styles if needed */
</style>
