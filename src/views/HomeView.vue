<template>
  <div>
    <HeaderComponent />
    <WelcomeSection class="mb-8 md:mb-12" />
    <!-- <SectionSeparator /> -->
    <!-- <FeaturesSection class="" /> -->
    <!-- <SectionSeparator /> -->
    <!-- <OtherSections /> -->
    <!-- <FormatsSection class="mb-8 md:mb-12" /> -->
    <SectionSeparator />
    <FeaturedBooksSection />
    <SectionSeparator />
    <RecentlyListedBooksSection />
    <SectionSeparator />
    <BooksYouMayEnjoySection />
    <SectionSeparator />
    <FeaturesOfOurAcademicBookApp />
    <!-- <SectionSeparator /> -->
    <!-- <ReadOurBlogSection /> -->

    <FooterComponent />
  </div>
</template>

<script lang="ts">
import HeaderComponent from '@/components/Header.vue'
import WelcomeSection from '@/components/Home/WelcomeSection.vue'
import FeaturesSection from '@/components/Home/FeaturesSection.vue'
import FormatsSection from '@/components/Home/FormatsSection.vue'
import FeaturedBooksSection from '@/components/Home/FeaturedBooksSection.vue'
import RecentlyListedBooksSection from '@/components/Home/RecentlyListedBooksSection.vue'
import BooksYouMayEnjoySection from '@/components/Home/BooksYouMayEnjoySection.vue'
import FeaturesOfOurAcademicBookApp from '@/components/Home/FeaturesOfOurAcademicBookApp.vue'
import ReadOurBlogSection from '@/components/Home/ReadOurBlogSection.vue'
import SectionSeparator from '@/components/Home/SectionSeparator.vue'

import FooterComponent from '@/components/FooterComponent.vue'

export default {
  components: {
    HeaderComponent,
    WelcomeSection,
    FeaturesSection,
    FormatsSection,
    FeaturedBooksSection,
    RecentlyListedBooksSection,

    BooksYouMayEnjoySection,
    FeaturesOfOurAcademicBookApp,
    ReadOurBlogSection,
    SectionSeparator,
    FooterComponent
  }
}
</script>
