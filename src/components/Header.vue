<template>
  <header class="bg-white px-6 py-4 shadow-md">
    <div class="flex items-center justify-between">
      <!-- Logo -->
      <router-link to="/" class="flex items-center">
        <img
          src="../assets/LOGO MAJESTICMIND PNG-07.png"
          alt="MajesticMinds Logo"
          class="h-8 mr-3"
        />
        <span class="text-xl font-semibold text-gray-800">MajesticMinds</span>
      </router-link>

      <!-- Search Bar -->
      <div class="flex-1 mx-6">
        <input
          type="search"
          placeholder="Search for a book, author or category"
          class="w-full px-4 py-2 border rounded-md text-gray-700 focus:ring focus:ring-opacity-50"
        />
      </div>

      <!-- Navigation Links -->
      <div class="flex items-center">
        <router-link
          to="/papers"
          class="text-gray-700 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100"
          >papers</router-link
        >
        <router-link
          to="/books"
          class="text-gray-700 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100"
          >books</router-link
        >
        <router-link
          to="/bulk-order"
          class="text-gray-700 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100"
          >bulk order</router-link
        >
        <router-link
          to="/login"
          class="text-gray-700 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100"
          >Log in</router-link
        >
        <router-link
          to="/signup"
          class="bg-black text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-opacity-90"
          >sign up</router-link
        >
      </div>
    </div>
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
