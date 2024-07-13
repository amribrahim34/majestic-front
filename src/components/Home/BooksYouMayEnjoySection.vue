<template>
  <section class="bg-gray-100 py-20">
    <div class="container mx-auto text-center">
      <h2 class="text-3xl font-bold mb-8">Books You May Enjoy</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        <div v-for="book in books" :key="book.id" class="p-4 bg-white rounded-lg shadow-lg">
          <img
            :src="book.image"
            :alt="book.title"
            class="mb-4 w-full h-40 object-cover rounded-lg"
          />
          <h3 class="text-lg font-bold mb-2">{{ book.title }}</h3>
          <button class="mt-2 bg-blue-500 text-white py-1 px-4 rounded-lg">View Details</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'BooksYouMayEnjoySection',
  data() {
    return {
      books: [
        {
          id: 1,
          title: 'Classic Literature',
          image: '@/assets/books/classic-literature.jpg'
        },
        {
          id: 2,
          title: 'Art and Creativity',
          image: '@/assets/books/art-creativity.jpg'
        },
        {
          id: 3,
          title: 'Modern Fiction',
          image: '@/assets/books/modern-fiction.jpg'
        },
        {
          id: 4,
          title: 'Health and Fitness',
          image: '@/assets/books/health-fitness.jpg'
        },
        {
          id: 5,
          title: 'Science Fiction',
          image: '@/assets/books/science-fiction.jpg'
        },
        {
          id: 6,
          title: 'Biographies',
          image: '@/assets/books/biographies.jpg'
        }
      ]
    }
  }
}
</script>

<style scoped>
.bg-gray-100 {
  background-color: #f7fafc;
}
.bg-blue-500 {
  background-color: #4299e1;
}
.text-white {
  color: #ffffff;
}
</style>
