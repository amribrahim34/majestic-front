<template>
  <section class="bg-gray-50 py-20">
    <div class="container mx-auto text-center">
      <h2 class="text-3xl font-bold mb-8">Featured Books</h2>
      <p class="text-gray-600 mb-10">
        Our books are carefully curated to provide the best reading experience.
      </p>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div v-for="book in books" :key="book.id" class="p-6 bg-white rounded-lg shadow-lg">
          <img
            :src="book.image"
            :alt="book.title"
            class="mx-auto mb-6 w-full h-48 object-cover rounded-lg"
          />
          <h3 class="text-xl font-bold mb-2">{{ book.title }}</h3>
          <p class="text-gray-600">{{ book.price }}</p>
          <button class="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg">Browse Top Picks</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'FeaturedBooksSection',
  data() {
    return {
      books: [
        {
          id: 1,
          title: 'Antique Book',
          price: '£150',
          image: '@/assets/home/antique-book.png'
        },
        {
          id: 2,
          title: 'Historical Book',
          price: '£70',
          image: '@/assets/home/historical-book.png'
        },
        {
          id: 3,
          title: 'PDF Book',
          price: '£50',
          image: '@/assets/home/pdf.png'
        }
      ]
    }
  }
}
</script>

<style scoped>
.bg-gray-50 {
  background-color: #f9fafb;
}
.bg-white {
  background-color: #ffffff;
}
.text-gray-600 {
  color: #718096;
}
.text-blue-500 {
  color: #4299e1;
}
</style>
