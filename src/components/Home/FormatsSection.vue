<template>
  <section class="bg-white py-12 md:py-20">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div class="text-center">
          <img
            src="@/assets/home/audioBook.jpeg"
            alt="Audio Books"
            class="mx-auto mb-4 w-24 h-24 object-cover rounded-full"
          />
          <h3 class="text-lg font-semibold mb-2">Audio Books</h3>
          <p class="text-sm text-gray-600">Explore our collection of audiobooks</p>
        </div>
        <div class="text-center">
          <img
            src="@/assets/home/hardcopyBook.jpeg"
            alt="Hardcopy Books"
            class="mx-auto mb-4 w-24 h-24 object-cover rounded-full"
          />
          <h3 class="text-lg font-semibold mb-2">Hardcopy Books</h3>
          <p class="text-sm text-gray-600">Discover our selection of printed books</p>
        </div>
        <div class="text-center">
          <img
            src="@/assets/home/pdf.png"
            alt="PDF Books"
            class="mx-auto mb-4 w-24 h-24 object-cover rounded-full"
          />
          <h3 class="text-lg font-semibold mb-2">PDF Books</h3>
          <p class="text-sm text-gray-600">Find books available in PDF format</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'FormatsSection'
})
</script>

<style scoped>
.text-gray-600 {
  color: #718096;
}
</style>
