<template>
  <div class="container mx-auto px-4">
    <!-- Header Section -->
    <HeaderComponent />
    <!-- About Section -->
    <section class="text-center py-12">
      <h1 class="text-4xl font-bold mb-3">About us</h1>
      <p class="mb-6">Discover and Share Book Reviews</p>
      <img src="../assets/about-us/mission.png" alt="About Us" class="mx-auto mb-6" />
      <p class="max-w-2xl mx-auto">
        At Academic Book Store, we are committed to providing excellent services to our customers
        and clients...
      </p>
    </section>

    <!-- Team Section -->
    <section class="bg-white py-12">
      <div class="container mx-auto px-4">
        <h2 class="text-center text-4xl font-extrabold mb-12">Team</h2>
        <p class="text-center text-lg mb-8">Meet the People Behind Our Magical Product</p>
        <div class="flex flex-wrap justify-center gap-10">
          <!-- Team Member Component -->
          <div class="w-40 text-center" v-for="member in teamMembers" :key="member.name">
            <img :src="member.image" :alt="member.name" class="w-24 h-24 rounded-full mx-auto" />
            <h3 class="font-bold text-lg mt-4">{{ member.name }}</h3>
            <p class="text-gray-600">{{ member.role }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="flex justify-between items-center bg-white p-12">
      <div class="flex-1">
        <h2 class="text-5xl font-bold mb-4">Start Your Reading Journey</h2>
        <p class="text-xl mb-8">Explore Different Genres</p>
        <router-link
          to="/signup"
          class="bg-black text-white py-3 px-6 rounded-lg text-lg font-medium hover:bg-opacity-90 transition-opacity"
          >Sign up now</router-link
        >
      </div>
      <div class="flex-1 hidden lg:block">
        <!-- Assuming the image on the right is a background image; otherwise, use an <img> tag -->
        <div class="w-2/3 h-2/3 bg-cover bg-no-repeat bg-center">
          <img src="../assets/about-us/journey.jpeg" alt="" />
        </div>
      </div>
    </section>
    <FooterComponent />
  </div>
</template>

<script lang="ts">
import HeaderComponent from '@/components/Header.vue'
import FooterComponent from '@/components/FooterComponent.vue'

export default {
  name: 'AboutUsPage',
  components: {
    HeaderComponent,
    FooterComponent
  },
  data() {
    return {
      teamMembers: [
        { name: 'Hannah Mika', role: 'CEO', image: 'src/assets/about-us/hannah.jpeg' },
        { name: 'Daniel Peter', role: 'CTO', image: 'src/assets/about-us/hannah.jpeg' },
        {
          name: 'Lars Mikkel',
          role: 'Head of Operations',
          image: 'src/assets/about-us/hannah.jpeg'
        }
        // Add the rest of your team members here
      ]
    }
  }
  // Data and methods would go here
}
</script>

<style scoped></style>
