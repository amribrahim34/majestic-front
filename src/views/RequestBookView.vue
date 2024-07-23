<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import { useBookStore } from '@/stores/bookStore' // Assume we have a book store
import HeaderComponent from '../components/Header.vue'
import FooterComponent from '../components/FooterComponent.vue'

const { t } = useI18n()
const bookStore = useBookStore()

const bookRequest = reactive({
  bookTitle: '',
  edition: '',
  authorName: '',
  dateOfPublication: '',
  publisher: ''
})

const isSubmitting = ref(false)
const submitError = ref('')

const submitRequest = async () => {
  isSubmitting.value = true
  submitError.value = ''

  try {
    await bookStore.submitBookRequest(bookRequest)
    // Reset form after successful submission
    Object.keys(bookRequest).forEach((key) => (bookRequest[key as keyof typeof bookRequest] = ''))
    alert(t('requestBook.successMessage'))
  } catch (error) {
    submitError.value = t('requestBook.errorMessage')
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <HeaderComponent />
  <div class="container mx-auto px-4 py-8">
    <h2 class="text-2xl font-bold mb-6 text-center">{{ t('requestBook.title') }}</h2>
    <form @submit.prevent="submitRequest" class="max-w-4xl mx-auto">
      <div class="flex flex-wrap -mx-2 mb-4">
        <div class="w-full md:w-1/2 px-2 mb-4 md:mb-0">
          <label for="bookTitle" class="block text-gray-700 text-sm font-bold mb-2">
            {{ t('requestBook.bookTitle') }}
          </label>
          <input
            type="text"
            id="bookTitle"
            v-model="bookRequest.bookTitle"
            :placeholder="t('requestBook.bookTitlePlaceholder')"
            class="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div class="w-full md:w-1/2 px-2">
          <label for="edition" class="block text-gray-700 text-sm font-bold mb-2">
            {{ t('requestBook.edition') }}
          </label>
          <input
            type="text"
            id="edition"
            v-model="bookRequest.edition"
            :placeholder="t('requestBook.editionPlaceholder')"
            class="w-full px-3 py-2 border rounded"
            required
          />
        </div>
      </div>

      <div class="flex flex-wrap -mx-2 mb-4">
        <div class="w-full md:w-1/2 px-2 mb-4 md:mb-0">
          <label for="authorName" class="block text-gray-700 text-sm font-bold mb-2">
            {{ t('requestBook.authorName') }}
          </label>
          <input
            type="text"
            id="authorName"
            v-model="bookRequest.authorName"
            :placeholder="t('requestBook.authorNamePlaceholder')"
            class="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div class="w-full md:w-1/2 px-2">
          <label for="dateOfPublication" class="block text-gray-700 text-sm font-bold mb-2">
            {{ t('requestBook.dateOfPublication') }}
          </label>
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
        <label for="publisher" class="block text-gray-700 text-sm font-bold mb-2">
          {{ t('requestBook.publisher') }}
        </label>
        <input
          type="text"
          id="publisher"
          v-model="bookRequest.publisher"
          :placeholder="t('requestBook.publisherPlaceholder')"
          class="w-full px-3 py-2 border rounded"
          required
        />
      </div>

      <div class="flex justify-center">
        <button
          type="submit"
          class="bg-black text-white font-bold py-2 px-4 rounded hover:bg-opacity-90 disabled:opacity-50"
          :disabled="isSubmitting"
        >
          {{ t('requestBook.submit') }}
        </button>
      </div>

      <p v-if="submitError" class="text-red-500 text-center mt-4">{{ submitError }}</p>
    </form>
  </div>
  <FooterComponent />
</template>

<style scoped>
body {
  background-image: url('@/assets/new-password-background.png');
  background-size: cover;
  background-position: center;
}
</style>
