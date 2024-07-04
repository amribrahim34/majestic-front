<template>
  <div class="container mx-auto">
    <HeaderComponent />
    <div class="w-full">
      <!-- Main content grid -->
      <div class="p-5 mx-10">
        <div class="gap-3 flex justify-between flex-wrap">
          <DetailsComponent :product="product" />
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
import DetailsComponent from '@/components/ProductDetails/DetailsComponent.vue' // Ensure this path is correct
import HeaderComponent from '@/components/Header.vue'
import FooterComponent from '@/components/FooterComponent.vue'

export default {
  name: 'ProductSearchView',
  components: {
    DetailsComponent,
    HeaderComponent,
    FooterComponent
  },
  data() {
    return {
      // This would be your data fetched from an API or similar
      items: [],
      product: {
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
      }
    }
  }
}
</script>

<style scoped>
/* You can add more styles if needed */
</style>
