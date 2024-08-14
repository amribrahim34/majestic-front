<template>
  <SEOMetaTags
    :title="$t('privacyPolicy.seoTitle') + ' | MajesticMinds'"
    :description="$t('privacyPolicy.seoDescription')"
    :url="currentURL"
  />
  <div class="container mx-auto">
    <HeaderComponent />
    <main>
      <div class="privacy-policy-content">
        <!-- <Breadcrumb :items="breadcrumbItems" class="m-6" /> -->
        <n-card>
          <template #header>
            <h1 class="text-2xl font-bold">{{ $t('privacyPolicy.title') }}</h1>
          </template>
          <div class="space-y-4">
            <section v-for="(_section, index) in sections" :key="index">
              <h2 class="text-xl font-semibold mb-2">
                {{ $t(`privacyPolicy.sections.${index}.title`) }}
              </h2>
              <p>{{ $t(`privacyPolicy.sections.${index}.content`) }}</p>
            </section>
          </div>
        </n-card>
      </div>
    </main>
    <FooterComponent />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
// import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { NCard } from 'naive-ui'
import SEOMetaTags from '@/components/SEOMetaTags.vue'
import HeaderComponent from '@/components/Header.vue'
import FooterComponent from '@/components/FooterComponent.vue'
// import Breadcrumb from '@/components/shared/Breadcrumb.vue'

// const { t } = useI18n()
const route = useRoute()

const currentURL = computed(() => {
  return `${window.location.origin}${route.path}`
})

// const breadcrumbItems = ref([
//   { text: t('common.home'), href: '/' },
//   { text: t('privacyPolicy.title'), href: '/privacy-policy' }
// ])

const sections = ref([
  { title: 'informationCollection', content: 'informationCollectionContent' },
  { title: 'useOfInformation', content: 'useOfInformationContent' },
  { title: 'informationSharing', content: 'informationSharingContent' },
  { title: 'dataSecurity', content: 'dataSecurityContent' },
  { title: 'cookiesAndTracking', content: 'cookiesAndTrackingContent' },
  { title: 'thirdPartyLinks', content: 'thirdPartyLinksContent' },
  { title: 'childrensPrivacy', content: 'childrensPrivacyContent' },
  { title: 'changestoPolicy', content: 'changesToPolicyContent' },
  { title: 'contactUs', content: 'contactUsContent' }
])
</script>

<style scoped>
.privacy-policy-content {
  padding: 2rem 0;
}
</style>
