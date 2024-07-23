<template>
  <footer class="bg-white px-6 py-4 shadow-md shadow-top w-full" :dir="direction">
    <div class="container mx-auto flex flex-col md:flex-row justify-between items-center">
      <!-- Branding and CTA -->
      <div :class="{ 'md:text-left': isLTR, 'md:text-right': !isLTR }">
        <router-link
          to="/"
          class="flex items-center mb-4"
          :class="{ 'md:justify-start': isLTR, 'md:justify-end': !isLTR }"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            style="width: 24px; height: 24px; overflow: visible; fill: rgb(0, 0, 0)"
            viewBox="0 0 24 24"
          >
            <path d="M0 0h24v24H0z" fill="none"></path>
            <path
              d="m17.21 9-4.38-6.56a.993.993 0 0 0-.83-.42c-.32 0-.64.14-.83.43L6.79 9H2c-.55 0-1 .45-1 1 0 .09.01.18.04.27l2.54 9.27c.23.84 1 1.46 1.92 1.46h13c.92 0 1.69-.62 1.93-1.46l2.54-9.27L23 10c0-.55-.45-1-1-1h-4.79zM9 9l3-4.4L15 9H9zm3 8c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"
            ></path>
          </svg>
          <span class="text-xl font-semibold text-gray-800 ml-2">{{ t('footer.brandName') }}</span>
        </router-link>
        <p class="text-gray-600 text-sm mb-4">{{ t('footer.tagline') }}</p>
        <router-link to="/request-book" class="text-gray-800 underline">{{
          t('footer.requestBook')
        }}</router-link>
        <!-- Social Media Icons -->
        <div class="flex mt-4" :class="{ 'md:justify-start': isLTR, 'md:justify-end': !isLTR }">
          <a
            v-for="social in socialMedia"
            :key="social.name"
            :href="social.url"
            target="_blank"
            class="mr-4"
          >
            <component :is="social.icon" />
          </a>
        </div>
      </div>

      <!-- Contact Info -->
      <div
        :class="{
          'md:text-right': isLTR,
          'md:text-left': !isLTR,
          'text-center': true,
          'mt-6': true,
          'md:mt-0': true
        }"
      >
        <p class="text-sm font-semibold text-gray-700 mb-2">{{ t('footer.needHelp') }}</p>
        <p class="text-gray-600 text-sm mb-2">{{ t('footer.supportAvailability') }}</p>
        <p
          class="flex items-center justify-center md:justify-end text-gray-700 mb-2"
          :class="{ 'md:flex-row-reverse': !isLTR }"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            style="width: 24px; height: 24px; overflow: visible; fill: rgb(0, 0, 0)"
            viewBox="0 0 24 24"
          >
            <path d="M0 0h24v24H0z" fill="none"></path>
            <path
              d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"
            ></path>
          </svg>
          <span :class="{ 'mr-2': isLTR, 'ml-2': !isLTR }">{{ t('footer.phoneNumber') }}</span>
        </p>
        <p
          class="flex items-center justify-center md:justify-end text-gray-700"
          :class="{ 'md:flex-row-reverse': !isLTR }"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            style="width: 24px; height: 24px; overflow: visible; fill: rgb(0, 0, 0)"
            viewBox="0 0 24 24"
          >
            <path d="M0 0h24v24H0z" fill="none"></path>
            <path
              d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"
            ></path>
          </svg>
          <a href="mailto:support@majisticminds.net"
            ><span :class="{ 'mr-2': isLTR, 'ml-2': !isLTR }">support@majesticminds.net</span></a
          >
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

const direction = computed(() => (locale.value === 'ar' ? 'rtl' : 'ltr'))
const isLTR = computed(() => direction.value === 'ltr')

const socialMedia = [
  { name: 'Instagram', url: 'https://instagram.com', icon: 'InstagramIcon' },
  { name: 'Facebook', url: 'https://facebook.com', icon: 'FacebookIcon' },
  { name: 'Twitter', url: 'https://twitter.com', icon: 'TwitterIcon' }
]
</script>

<style scoped>
.shadow-top {
  box-shadow:
    0 -4px 6px -1px rgba(0, 0, 0, 0.1),
    0 -2px 4px -1px rgba(0, 0, 0, 0.06);
}
</style>
