<template>
  <header class="bg-white shadow">
    <nav class="container mx-auto px-4 py-4 flex justify-between items-center">
      <!-- Logo -->
      <router-link to="/" class="flex items-center">
        <img src="../assets/LOGO MAJESTICMIND PNG-07.png" alt="MajesticMinds Logo" class="h-12" />
      </router-link>
      <!-- Search Bar -->
      <div class="flex-1 flex justify-center lg:ml-6 lg:justify-start">
        <div class="w-full px-6 py-2 lg:max-w-lg">
          <label for="search" class="sr-only">Search</label>
          <div class="relative text-gray-400 focus-within:text-gray-600">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <!-- Search Icon -->
            </div>
            <input
              id="search"
              name="search"
              class="block w-full bg-white text-gray-900 pl-10 pr-3 py-2 border rounded-md leading-5 placeholder-gray-500 focus:outline-none focus:bg-gray-200 focus:border-gray-300 focus:ring-0 sm:text-sm"
              placeholder="Search for a book, author or category"
              type="search"
            />
          </div>
        </div>
      </div>

      <!-- Navigation Links -->
      <div class="hidden md:flex space-x-1">
        <router-link
          to="/papers"
          class="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100"
          >Papers</router-link
        >
        <router-link
          to="/books"
          class="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100"
          >Books</router-link
        >
        <router-link
          to="/bulk-order"
          class="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100"
          >Bulk Order</router-link
        >
      </div>

      <!-- Account Links -->
      <div class="flex items-center space-x-4">
        <router-link to="/login" class="text-sm font-medium text-gray-700 hover:underline"
          >Log in</router-link
        >
        <router-link
          to="/signup"
          class="whitespace-nowrap text-sm font-medium text-gray-700 hover:underline"
          >Sign up</router-link
        >
      </div>
    </nav>
  </header>
</template>

<script lang="ts">
export default {
  name: 'HeaderComponent',
  data() {
    return {}
  },
  methods: {}
}
</script>

<style scoped>
@media (min-width: 768px) {
  /* Tailwind's md: breakpoint */
  .header-nav-links {
    display: flex;
  }
}
</style>
