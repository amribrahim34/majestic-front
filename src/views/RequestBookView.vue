<script lang="ts">
import HeaderComponent from '../components/Header.vue'
import FooterComponent from '../components/FooterComponent.vue'

export default {
  name: 'RequestBookView',
  components: {
    HeaderComponent,
    FooterComponent
  },
  data() {
    return {
      bookRequest: {
        bookTitle: '',
        edition: '',
        authorName: '',
        dateOfPublication: '',
        publisher: ''
      }
    }
  },
  methods: {
    submitRequest() {
      console.log('Submitting book request:', this.bookRequest)
      // Process form submission here, e.g., send to an API endpoint
    }
  }
}
</script>

<template>
  <HeaderComponent />
  <div class="container mx-auto px-4 py-8">
    <h2 class="text-2xl font-bold mb-6 text-center">Request a book</h2>
    <form @submit.prevent="submitRequest" class="max-w-4xl mx-auto">
      <div class="flex flex-wrap -mx-2 mb-4">
        <div class="w-full md:w-1/2 px-2 mb-4 md:mb-0">
          <label for="bookTitle" class="block text-gray-700 text-sm font-bold mb-2"
            >Book Title</label
          >
          <input
            type="text"
            id="bookTitle"
            v-model="bookRequest.bookTitle"
            placeholder="Book Title"
            class="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div class="w-full md:w-1/2 px-2">
          <label for="edition" class="block text-gray-700 text-sm font-bold mb-2">Edition</label>
          <input
            type="text"
            id="edition"
            v-model="bookRequest.edition"
            placeholder="Edition Number"
            class="w-full px-3 py-2 border rounded"
            required
          />
        </div>
      </div>

      <div class="flex flex-wrap -mx-2 mb-4">
        <div class="w-full md:w-1/2 px-2 mb-4 md:mb-0">
          <label for="authorName" class="block text-gray-700 text-sm font-bold mb-2"
            >Author Name</label
          >
          <input
            type="text"
            id="authorName"
            v-model="bookRequest.authorName"
            placeholder="Author's Full Name"
            class="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div class="w-full md:w-1/2 px-2">
          <label for="dateOfPublication" class="block text-gray-700 text-sm font-bold mb-2"
            >Date of Publication</label
          >
          <input
            type="date"
            id="dateOfPublication"
            v-model="bookRequest.dateOfPublication"
            class="w-full px-3 py-2 border rounded"
            required
          />
        </div>
      </div>

      <div class="mb-4">
        <label for="publisher" class="block text-gray-700 text-sm font-bold mb-2">Publisher</label>
        <input
          type="text"
          id="publisher"
          v-model="bookRequest.publisher"
          placeholder="the publisher name"
          class="w-full px-3 py-2 border rounded"
          required
        />
      </div>

      <div class="flex justify-center">
        <button
          type="submit"
          class="bg-black text-white font-bold py-2 px-4 rounded hover:bg-opacity-90"
        >
          Submit
        </button>
      </div>
    </form>
  </div>
  <FooterComponent />
</template>
<style scoped>
/* This applies the style directly to the <body> element, affecting the entire page */
body {
  background-image: url('@/assets/new-password-background.png');
  background-size: cover; /* Cover the entire page */
  background-position: center; /* Center the background image */
}
</style>
