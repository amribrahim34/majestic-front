<template>
  <SEOMetaTags
    :title="$t('termsAndConditions.seoTitle') + ' | MajesticMinds'"
    :description="$t('termsAndConditions.seoDescription')"
    :url="currentURL"
  />
  <div class="container mx-auto">
    <HeaderComponent />
    <main>
      <div class="terms-and-conditions-content">
        <!-- <Breadcrumb :items="breadcrumbItems" class="m-6" /> -->
        <n-card>
          <template #header>
            <h1 class="text-2xl font-bold">{{ $t('termsAndConditions.title') }}</h1>
          </template>
          <div class="space-y-4">
            <section v-for="(_section, index) in sections" :key="index">
              <h2 class="text-xl font-semibold mb-2">
                {{ $t(`termsAndConditions.sections.${index}.title`) }}
              </h2>
              <p>{{ $t(`termsAndConditions.sections.${index}.content`) }}</p>
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
//   { text: t('termsAndConditions.title'), href: '/terms-and-conditions' }
// ])

const sections = ref([
  { title: 'acceptance', content: 'acceptanceContent' },
  { title: 'changes', content: 'changesContent' },
  { title: 'access', content: 'accessContent' },
  { title: 'intellectualProperty', content: 'intellectualPropertyContent' },
  { title: 'userContent', content: 'userContentContent' },
  { title: 'prohibitedUses', content: 'prohibitedUsesContent' },
  { title: 'termination', content: 'terminationContent' },
  { title: 'disclaimers', content: 'disclaimersContent' },
  { title: 'limitationOfLiability', content: 'limitationOfLiabilityContent' },
  { title: 'governingLaw', content: 'governingLawContent' }
])
</script>

<style scoped>
.terms-and-conditions-content {
  padding: 2rem 0;
}
</style>
