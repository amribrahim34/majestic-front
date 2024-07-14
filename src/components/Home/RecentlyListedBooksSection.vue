<template>
  <section class="bg-white py-20">
    <div class="container mx-auto text-center">
      <h2 class="text-3xl font-bold mb-8">Recently Listed Books</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        <div v-for="book in books" :key="book.id" class="p-4 bg-gray-100 rounded-lg shadow-lg">
          <img
            :src="book.image"
            :alt="book.title"
            class="mb-4 w-full h-40 object-cover rounded-lg"
          />
          <h3 class="text-lg font-bold mb-2">{{ book.title }}</h3>
          <p class="text-gray-600 mb-2">{{ book.price }}</p>
          <button class="mt-2 bg-black text-white py-1 px-4">View Details</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
export default {
  name: 'RecentlyListedBooksSection',
  data() {
    return {
      books: [
        {
          id: 1,
          title: 'Introduction to Sociology',
          price: '$10',
          image: '@/assets/book-imgs/sociology.jpg'
        },
        {
          id: 2,
          title: 'Biology Textbook',
          price: '$120',
          image: '@/assets/book-imgs/biology.jpg'
        },
        {
          id: 3,
          title: 'Chemical Engineering',
          price: '$29',
          image: '@/assets/book-imgs/chemical-engineering.jpg'
        },
        {
          id: 4,
          title: 'Economics Book',
          price: '$200',
          image: '@/assets/book-imgs/economics.jpg'
        },
        {
          id: 5,
          title: 'Physics Textbook',
          price: '$30',
          image: '@/assets/book-imgs/physics.jpg'
        },
        {
          id: 6,
          title: 'Computer Science',
          price: '$105',
          image: '@/assets/book-imgs/computer-science.jpg'
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
.text-gray-600 {
  color: #718096;
}
.text-white {
  color: #ffffff;
}
</style>
