<template>
  <footer class="bg-white px-6 py-4 shadow-md w-full">
    <div class="container mx-auto flex justify-between items-center">
      <!-- Branding and CTA -->
      <div>
        <router-link to="/" class="flex items-center mb-4">
          <img src="../assets/book-icon.png" alt="MajesticMinds Icon" class="h-6 mr-2" />
          <span class="text-xl font-semibold text-gray-800">MajesticMinds</span>
        </router-link>
        <p class="text-gray-600 text-sm mb-4">Curated selection delivered to your doorstep!</p>
        <router-link to="/request" class="text-gray-800 underline">Request a book!</router-link>
        <!-- Social Media Icons -->
        <div class="flex mt-4">
          <!-- Replace with actual paths to your social media accounts -->
          <a href="https://instagram.com" target="_blank" class="mr-4">
            <img src="../assets/instagram-icon.png" alt="Instagram" class="h-6" />
          </a>
          <a href="https://facebook.com" target="_blank" class="mr-4">
            <img src="../assets/facebook-icon.png" alt="Facebook" class="h-6" />
          </a>
          <a href="https://twitter.com" target="_blank" class="mr-4">
            <img src="../assets/twitter-icon.png" alt="Twitter" class="h-6" />
          </a>
        </div>
      </div>

      <!-- Contact Info -->
      <div class="text-right">
        <p class="text-sm font-semibold text-gray-700 mb-2">Need help?</p>
        <p class="text-gray-600 text-sm mb-2">Our support is here for you 24/7</p>
        <p class="flex items-center justify-end text-gray-700 mb-2">
          <img src="../assets/phone-icon.png" alt="Phone" class="h-4 mr-2" />
          (+123) 000 111 222 333
        </p>
        <p class="flex items-center justify-end text-gray-700">
          <img src="../assets/email-icon.png" alt="Email" class="h-4 mr-2" />
          support@majesticminds.com
        </p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'FooterComponent'
  // Component logic goes here
}
</script>

<style scoped>
/* Additional styles if needed */
</style>
