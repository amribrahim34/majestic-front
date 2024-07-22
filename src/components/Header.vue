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
          v-model="searchQuery"
          @keyup.enter="performSearch"
          type="search"
          :placeholder="$t('header.search.placeholder')"
          class="w-full px-4 py-2 border rounded-md text-gray-700 focus:ring focus:ring-opacity-50"
        />
      </div>

      <!-- Navigation Links -->
      <nav class="flex items-center space-x-4">
        <router-link to="/books">{{ $t('header.nav.books') }}</router-link>
        <cart-icon />
        <user-menu />
        <language-switcher />
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useBookStore } from '@/stores/bookStore'
import CartIcon from '@/components/shared/Header/CartIcon.vue'
import UserMenu from '@/components/shared/Header/UserMenu.vue'
import LanguageSwitcher from '@/components/shared/Header/LanguageSwitcher.vue'

const router = useRouter()
const bookStore = useBookStore()

const searchQuery = ref('')

const performSearch = () => {
  if (searchQuery.value.trim()) {
    bookStore.setSearchQuery(searchQuery.value)
    router.push({ path: '/books', query: { search: searchQuery.value } })
  }
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
