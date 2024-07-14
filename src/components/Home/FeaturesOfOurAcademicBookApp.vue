<template>
  <section class="bg-white py-8 md:py-12">
    <div class="container mx-auto text-center px-4">
      <h2 class="text-3xl font-bold mb-8">Features of our Academic Book App</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div
          v-for="feature in features"
          :key="feature.id"
          class="p-6 bg-white rounded-lg shadow-lg"
        >
          <img :src="feature.image" :alt="feature.title" class="mb-4 w-24 h-24 mx-auto" />
          <h3 class="text-xl font-semibold mb-2">{{ feature.title }}</h3>
          <p class="mb-4">{{ feature.description }}</p>
          <a :href="feature.link" class="bg-black text-white py-2 px-4">Explore Now</a>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import personalizedImage from '@/assets/home/personalized.png'
import bookRequestImage from '@/assets/home/book-request.png'
import bookReviewsImage from '@/assets/home/book-reviews.png'

interface Feature {
  id: number
  title: string
  description: string
  image: string
  link: string
}

export default defineComponent({
  name: 'FeaturesOfOurAcademicBookApp',
  data() {
    return {
      features: [
        {
          id: 1,
          title: 'Personalized',
          description:
            'Discover the best academic books recommended just for you based on your interests and studies.',
          image: personalizedImage,
          link: '#'
        },
        {
          id: 2,
          title: 'Book Request',
          description:
            "Request a book that you can't find in our collection. We'll do our best to fulfill your request.",
          image: bookRequestImage,
          link: '#'
        },
        {
          id: 3,
          title: 'Book Reviews',
          description:
            'Read and share book reviews to help other students make informed decisions about their academic book choices.',
          image: bookReviewsImage,
          link: '#'
        }
      ] as Feature[]
    }
  }
})
</script>

<style scoped>
.bg-blue-500 {
  background-color: #4299e1;
}
.text-white {
  color: #ffffff;
}

.button {
  background-color: black;
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
  text-align: center;
  display: inline-block;
  font-family: sans-serif;
  text-decoration: none;
  width: 150px; /* or whatever consistent width you prefer */
}
</style>
