<template>
  <section class="py-20 bg-gray-100">
    <div class="container mx-auto text-center">
      <h2 class="text-3xl font-bold mb-8">Read our Blog</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div v-for="post in blogPosts" :key="post.id" class="bg-white p-6 rounded-lg shadow-lg">
          <img
            :src="post.image"
            :alt="post.title"
            class="mb-4 w-full h-48 object-cover rounded-lg"
          />
          <h3 class="text-xl font-semibold mb-2">{{ post.title }}</h3>
          <p class="mb-4">{{ post.excerpt }}</p>
          <a :href="post.link" class="text-blue-500">Read more</a>
          <div class="mt-4 flex items-center justify-center">
            <img :src="post.authorImage" :alt="post.author" class="w-10 h-10 rounded-full mr-2" />
            <div>
              <p class="text-gray-700 text-sm">{{ post.author }}</p>
              <p class="text-gray-500 text-xs">{{ post.date }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
export default {
  name: 'ReadOurBlogSection',
  data() {
    return {
      blogPosts: [
        {
          id: 1,
          title: '5 Tips for Academic Success',
          excerpt: 'In this article, we will give you some advice on how to excel academically.',
          image: '@/assets/blog/academic-success.jpg',
          link: '#',
          author: 'Dr. Smith',
          authorImage: '@/assets/authors/dr-smith.jpg',
          date: 'July 12, 2024'
        },
        {
          id: 2,
          title: 'Top 10 Must-Read Books',
          excerpt: 'Expand your knowledge with these must-read books recommended by experts.',
          image: '@/assets/blog/must-read-books.jpg',
          link: '#',
          author: 'Prof. X',
          authorImage: '@/assets/authors/prof-x.jpg',
          date: 'July 10, 2024'
        },
        {
          id: 3,
          title: 'Explore Different Genres',
          excerpt: 'Discover new genres and broaden your reading horizons.',
          image: '@/assets/blog/explore-genres.jpg',
          link: '#',
          author: 'Dr. Y',
          authorImage: '@/assets/authors/dr-y.jpg',
          date: 'July 8, 2024'
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
.bg-white {
  background-color: #ffffff;
}
.text-blue-500 {
  color: #4299e1;
}
</style>
