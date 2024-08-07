<template>
  <section class="bg-white py-8 md:py-12">
    <div class="container mx-auto text-center px-4">
      <h2 class="text-3xl font-bold mb-8">{{ t('home.features.title') }}</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div
          v-for="feature in features"
          :key="feature.id"
          class="p-6 bg-white rounded-lg shadow-lg"
        >
          <img
            :src="feature.image"
            :alt="t(feature.titleKey)"
            class="mb-4 w-24 h-24 mx-auto"
            loading="lazy"
          />
          <h3 class="text-xl font-semibold mb-2">{{ t(feature.titleKey) }}</h3>
          <p class="mb-4">{{ t(feature.descriptionKey) }}</p>
          <a :href="feature.link" class="bg-black text-white py-2 px-4 inline-block w-40">
            {{ t('home.features.exploreNow') }}
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import personalizedImage from '@/assets/home/personalized.png'
import bookRequestImage from '@/assets/home/book-request.png'
import bookReviewsImage from '@/assets/home/book-reviews.png'

const { t } = useI18n()

interface Feature {
  id: number
  titleKey: string
  descriptionKey: string
  image: string
  link: string
}

const features = ref<Feature[]>([
  {
    id: 1,
    titleKey: 'home.features.personalized.title',
    descriptionKey: 'home.features.personalized.description',
    image: personalizedImage,
    link: '#'
  },
  {
    id: 2,
    titleKey: 'home.features.bookRequest.title',
    descriptionKey: 'home.features.bookRequest.description',
    image: bookRequestImage,
    link: '#'
  },
  {
    id: 3,
    titleKey: 'home.features.bookReviews.title',
    descriptionKey: 'home.features.bookReviews.description',
    image: bookReviewsImage,
    link: '#'
  }
])
</script>
