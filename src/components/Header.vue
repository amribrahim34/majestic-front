<template>
  <n-layout-header bordered class="bg-white px-4 py-2 md:px-6 md:py-4 shadow-md">
    <div class="flex items-center justify-between">
      <!-- Logo -->
      <router-link to="/" class="flex items-center">
        <img
          src="../assets/LOGO MAJESTICMIND PNG-07.png"
          alt="MajesticMinds Logo"
          class="h-6 md:h-8 mr-2 md:mr-3"
          loading="lazy"
        />
        <span class="text-lg md:text-xl font-semibold text-gray-800">MajesticMinds</span>
      </router-link>

      <!-- Mobile Menu Button -->
      <n-button class="md:hidden" @click="toggleMobileMenu">
        <template #icon>
          <n-icon><menu-outline /></n-icon>
        </template>
      </n-button>

      <!-- Desktop Navigation -->
      <div class="hidden md:flex flex-1 items-center justify-end space-x-5">
        <!-- Search Bar -->
        <div class="flex-1 mx-6">
          <n-input
            v-model:value="searchQuery"
            @keyup.enter="performSearch"
            type="text"
            :placeholder="$t('header.search.placeholder')"
          />
        </div>

        <!-- Navigation Links -->
        <nav class="flex items-center space-x-5">
          <router-link to="/books">{{ $t('header.nav.books') }}</router-link>
          <cart-icon />
          <user-menu />
          <language-switcher />
        </nav>
      </div>
    </div>

    <!-- Mobile Menu -->
    <n-drawer v-model:show="showMobileMenu" placement="right" width="250">
      <n-drawer-content>
        <div class="flex flex-col space-y-4">
          <n-input
            v-model:value="searchQuery"
            @keyup.enter="performSearch"
            type="text"
            :placeholder="$t('header.search.placeholder')"
          />
          <router-link to="/books" @click="showMobileMenu = false">{{
            $t('header.nav.books')
          }}</router-link>
          <cart-icon @click="showMobileMenu = false" />
          <user-menu @click="showMobileMenu = false" />
          <language-switcher @click="showMobileMenu = false" />
        </div>
      </n-drawer-content>
    </n-drawer>
  </n-layout-header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useBookStore } from '@/stores/bookStore'
import CartIcon from '@/components/shared/Header/CartIcon.vue'
import UserMenu from '@/components/shared/Header/UserMenu.vue'
import LanguageSwitcher from '@/components/shared/Header/LanguageSwitcher.vue'
import { NLayoutHeader, NButton, NIcon, NDrawer, NDrawerContent, NInput } from 'naive-ui'
import { MenuOutline } from '@vicons/ionicons5'

const router = useRouter()
const bookStore = useBookStore()

const searchQuery = ref('')
const showMobileMenu = ref(false)

const performSearch = () => {
  if (searchQuery.value.trim()) {
    bookStore.setSearchQuery(searchQuery.value)
    router.push({ path: '/books', query: { search: searchQuery.value } })
    showMobileMenu.value = false
  }
}

const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value
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
