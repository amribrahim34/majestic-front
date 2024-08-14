<template>
  <n-config-provider :theme="theme">
    <n-layout-footer
      class="bg-white px-6 py-4 shadow-md shadow-top w-full"
      :style="{ direction: direction }"
    >
      <div class="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <!-- Branding and CTA -->
        <div :class="{ 'md:text-left': isLTR, 'md:text-right': !isLTR }">
          <n-button
            text
            tag="a"
            :to="{ name: 'home' }"
            class="flex items-center mb-4"
            :class="{ 'md:justify-start': isLTR, 'md:justify-end': !isLTR }"
          >
            <img
              src="../assets/LOGO MAJESTICMIND PNG-07.png"
              alt="MajesticMinds Logo"
              class="h-6 md:h-8 mr-2 md:mr-3"
              loading="lazy"
            />
            <span class="text-xl font-semibold text-gray-800 ml-2">{{
              t('footer.brandName')
            }}</span>
          </n-button>
          <n-text class="text-gray-600 text-sm mb-4">{{ t('footer.tagline') }}</n-text>
          <n-button text tag="a" :to="{ name: 'requestBook' }" class="text-gray-800">
            {{ t('footer.requestBook') }}
          </n-button>
          <!-- Social Media Icons -->
          <div class="flex mt-4" :class="{ 'md:justify-start': isLTR, 'md:justify-end': !isLTR }">
            <n-button
              v-for="social in socialMedia"
              :key="social.name"
              text
              tag="a"
              :href="social.url"
              target="_blank"
              class="mr-4"
            >
              <n-icon :component="social.icon" />
            </n-button>
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
          <n-text class="text-sm font-semibold text-gray-700 mb-2">{{
            t('footer.needHelp')
          }}</n-text>
          <n-text class="text-gray-600 text-sm mb-2">{{ t('footer.supportAvailability') }}</n-text>
          <div
            class="flex items-center justify-center md:justify-end text-gray-700 mb-2"
            :class="{ 'md:flex-row-reverse': !isLTR }"
          >
            <n-icon :component="PhoneIcon" />
            <n-text :class="{ 'mr-2': isLTR, 'ml-2': !isLTR }">{{
              t('footer.phoneNumber')
            }}</n-text>
          </div>
          <div
            class="flex items-center justify-center md:justify-end text-gray-700"
            :class="{ 'md:flex-row-reverse': !isLTR }"
          >
            <n-icon :component="MailIcon" />
            <n-button
              text
              tag="a"
              href="mailto:majesticminds.net@gmail.com"
              :class="{ 'mr-2': isLTR, 'ml-2': !isLTR }"
            >
              majesticminds.net@gmail.com
            </n-button>
          </div>
        </div>
      </div>
    </n-layout-footer>
  </n-config-provider>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { NConfigProvider, NLayoutFooter, NButton, NAvatar, NText, NIcon } from 'naive-ui'
import {
  LogoInstagram,
  LogoFacebook,
  LogoTwitter,
  Call as PhoneIcon,
  Mail as MailIcon
} from '@vicons/ionicons5'
import { darkTheme, type Theme } from 'naive-ui'

const { t, locale } = useI18n()

const direction = computed(() => (locale.value === 'ar' ? 'rtl' : 'ltr'))
const isLTR = computed(() => direction.value === 'ltr')

const logoSrc = ref('../assets/LOGO MAJESTICMIND PNG-07.png')

const theme = ref<Theme | null>(null)

const socialMedia = [
  { name: 'Instagram', url: 'https://instagram.com', icon: LogoInstagram },
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/people/Majestic-Minds-bookstore/61562953574648/',
    icon: LogoFacebook
  },
  { name: 'Twitter', url: 'https://twitter.com', icon: LogoTwitter }
]

// Function to toggle theme (you can call this function when needed)
const toggleTheme = () => {
  theme.value = theme.value === null ? darkTheme : null
}
</script>

<style scoped>
.shadow-top {
  box-shadow:
    0 -4px 6px -1px rgba(0, 0, 0, 0.1),
    0 -2px 4px -1px rgba(0, 0, 0, 0.06);
}
</style>
