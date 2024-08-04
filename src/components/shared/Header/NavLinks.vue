<template>
  <nav class="flex items-center space-x-6">
    <router-link
      v-for="link in navLinks"
      :key="link.path"
      :to="link.path"
      class="text-gray-600 hover:text-primary-600 transition-colors duration-200"
    >
      {{ $t(link.label) }}
    </router-link>
  </nav>
</template>

<script setup lang="ts">
const navLinks = [
  { path: '/books', label: 'header.nav.books' }
  //   { path: '/authors', label: 'header.nav.authors' },
  //   { path: '/categories', label: 'header.nav.categories' }
]
</script>
