<template>
  <section class="bg-white py-12 md:py-20" :dir="direction">
    <div
      class="container mx-auto px-4 flex flex-col lg:flex-row items-center justify-between md:px-8 lg:px-16"
    >
      <div class="w-full lg:w-1/2 mb-10 lg:mb-0" :class="imageOrder">
        <img
          src="@/assets/home/welcome.jpeg"
          :alt="t('home.welcomeSection.imageAlt')"
          class="w-full rounded-lg shadow-lg"
          loading="lazy"
        />
      </div>
      <div class="w-full lg:w-1/2" :class="textOrder">
        <h1 class="text-4xl font-bold text-gray-800 mb-6">
          {{ t('home.welcomeSection.title') }}
        </h1>
        <p class="text-lg text-gray-600 mb-6">
          {{ t('home.welcomeSection.description') }}
        </p>
        <router-link
          to="/books"
          class="bg-black text-white py-2 px-4 inline-block font-medium hover:bg-gray-800 transition duration-300"
        >
          {{ t('home.welcomeSection.shopNow') }}
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

const direction = computed(() => (locale.value === 'ar' ? 'rtl' : 'ltr'))
const imageOrder = computed(() => (locale.value === 'ar' ? 'lg:order-2' : 'lg:order-1'))
const textOrder = computed(() =>
  locale.value === 'ar' ? 'lg:order-1 lg:pr-20' : 'lg:order-2 lg:pl-20'
)
</script>

<style scoped>
a {
  @apply no-underline uppercase tracking-wider;
}
</style>
