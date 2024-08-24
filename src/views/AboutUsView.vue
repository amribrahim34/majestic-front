<template>
  <div class="container mx-auto px-4" :dir="direction">
    <!-- Header Section -->
    <HeaderComponent />

    <!-- About Section -->
    <section class="text-center py-12">
      <h1 class="text-4xl font-bold mb-3">{{ t('aboutUs.title') }}</h1>
      <p class="mb-6">{{ t('aboutUs.subtitle') }}</p>
      <img
        src="../assets/about-us/mission.png"
        :alt="t('aboutUs.imageAlt')"
        class="mx-auto mb-6"
        loading="lazy"
      />
      <p class="max-w-2xl mx-auto">{{ t('aboutUs.description') }}</p>
    </section>

    <!-- Team Section -->
    <!-- <section class="bg-white py-12">
      <div class="container mx-auto px-4">
        <h2 class="text-center text-4xl font-extrabold mb-12">{{ t('team.title') }}</h2>
        <p class="text-center text-lg mb-8">{{ t('team.subtitle') }}</p>
        <div class="flex flex-wrap justify-center gap-10">
          <div class="w-40 text-center" v-for="member in teamMembers" :key="member.name">
            <img
              :src="member.image"
              :alt="member.name"
              class="w-24 h-24 rounded-full mx-auto"
              loading="lazy"
            />
            <h3 class="font-bold text-lg mt-4">{{ member.name }}</h3>
            <p class="text-gray-600">{{ t(`team.roles.${member.role}`) }}</p>
          </div>
        </div>
      </div>
    </section> -->

    <!-- CTA Section -->
    <section
      class="flex flex-col lg:flex-row justify-between items-center bg-white p-12"
      :class="{ 'lg:flex-row-reverse': !isLTR }"
    >
      <div class="flex-1 text-center lg:text-left" :class="{ 'lg:text-right': !isLTR }">
        <h2 class="text-5xl font-bold mb-4">{{ t('cta.title') }}</h2>
        <p class="text-xl mb-8">{{ t('cta.subtitle') }}</p>
        <router-link
          to="/signup"
          class="bg-black text-white py-3 px-6 rounded-lg text-lg font-medium hover:bg-opacity-90 transition-opacity"
          >{{ t('cta.buttonText') }}</router-link
        >
      </div>
      <div class="flex-1 hidden lg:block">
        <div class="w-2/3 h-2/3 bg-cover bg-no-repeat bg-center">
          <img src="../assets/about-us/journey.jpeg" :alt="t('cta.imageAlt')" loading="lazy" />
        </div>
      </div>
    </section>

    <FooterComponent />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import HeaderComponent from '@/components/Header.vue'
import FooterComponent from '@/components/FooterComponent.vue'

const { t, locale } = useI18n()

const direction = computed(() => (locale.value === 'ar' ? 'rtl' : 'ltr'))
const isLTR = computed(() => direction.value === 'ltr')

const teamMembers = ref([
  { name: 'Hannah Mika', role: 'CEO', image: 'src/assets/about-us/hannah.jpeg' },
  { name: 'Daniel Peter', role: 'CTO', image: 'src/assets/about-us/hannah.jpeg' },
  { name: 'Lars Mikkel', role: 'HeadOfOperations', image: 'src/assets/about-us/hannah.jpeg' }
  // Add the rest of your team members here
])
</script>

<style scoped>
/* Add any scoped styles here if needed */
</style>
