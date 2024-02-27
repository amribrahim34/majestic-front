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
    <section class="py-12">
      <h2 class="text-3xl font-bold text-center mb-8">Team</h2>
      <div class="grid grid-cols-3 gap-4">
        <!-- Team Member Card -->
        <div class="text-center">
          <img
            src="../assets/about-us/hannah.jpeg"
            alt="Hannah Mika"
            class="rounded-full w-24 h-24 mx-auto mb-4"
          />
          <h3 class="font-bold">Hannah Mika</h3>
          <p>CEO</p>
        </div>
        <div class="text-center">
          <img
            src="../assets/about-us/hannah.jpeg"
            alt="Hannah Mika"
            class="rounded-full w-24 h-24 mx-auto mb-4"
          />
          <h3 class="font-bold">Daniel Beter</h3>
          <p>CTO</p>
        </div>
        <div class="text-center">
          <img
            src="../assets/about-us/hannah.jpeg"
            alt="Hannah Mika"
            class="rounded-full w-24 h-24 mx-auto mb-4"
          />
          <h3 class="font-bold">Lars Mikkel</h3>
          <p>Head of Operations</p>
        </div>
        <!-- Repeat for other team members -->
      </div>
    </section>

    <!-- CTA Section -->
    <section class="text-center py-12 bg-gray-100">
      <h2 class="text-3xl font-bold mb-6">Start Your Reading Journey</h2>
      <router-link
        to="/signup"
        class="bg-black text-white font-bold py-2 px-4 rounded hover:bg-opacity-90"
        >Sign up now</router-link
      >
    </section>

    <!-- Footer -->
    <footer class="bg-white">
      <div class="container mx-auto px-6 py-4">
        <div class="flex justify-between items-center">
          <div class="flex items-center">
            <a href="#" class="text-xl font-bold text-indigo-600">MajesticMinds</a>
            <!-- Add social links here -->
          </div>
          <div class="flex items-center">
            <p class="text-sm text-gray-600">Need help? Our support is here for you 24/7</p>
            <p class="text-sm text-gray-600 ml-4">(+123) 000 111 222 333</p>
            <a href="mailto:support@majesticminds.com" class="text-sm text-gray-600 ml-4">
              support@majesticminds.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script lang="ts">
import HeaderComponent from '@/components/Header.vue'

export default {
  name: 'AboutUsPage',
  components: {
    HeaderComponent
  }
  // Data and methods would go here
}
</script>

<style scoped></style>
