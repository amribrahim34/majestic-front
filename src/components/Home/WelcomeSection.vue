<template>
  <section class="bg-white py-12 md:py-20">
    <div
      class="container mx-auto px-4 flex flex-col lg:flex-row items-center justify-between md:px-8 lg:px-16"
    >
      <div class="w-full lg:w-1/2 mb-10 lg:mb-0">
        <img
          src="@/assets/home/welcome.jpeg"
          alt="Reading books"
          class="w-full rounded-lg shadow-lg"
        />
      </div>
      <div class="w-full lg:w-1/2 lg:pl-20">
        <h1 class="text-4xl font-bold text-gray-800 mb-6">Welcome to our Book Store!</h1>
        <p class="text-lg text-gray-600 mb-6">
          At our shop, we believe in the power of knowledge and the importance of academic books.
          That's why we've carefully selected a wide range of academic books from various
          disciplines. From medical textbooks to commerce guides, we have books for every field of
          study.
        </p>

        <a
          href="/shop"
          class="bg-black text-white py-2 px-4 inline-block font-medium hover:bg-gray-800 transition duration-300"
        >
          Shop now
        </a>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'WelcomeSection'
})
</script>

<style scoped>
a {
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.bg-white {
  background-color: #ffffff;
}
.text-gray-800 {
  color: #2d3748;
}
.text-gray-600 {
  color: #718096;
}
</style>
