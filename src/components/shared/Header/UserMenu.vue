<template>
  <div class="relative">
    <template v-if="isLoggedIn">
      <button @click="toggleUserMenu" class="focus:outline-none">
        <font-awesome-icon icon="user-circle" class="text-gray-700 text-xl" />
      </button>
      <div
        v-if="showUserMenu"
        class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1"
      >
        <router-link
          to="/account-details"
          class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          {{ $t('header.user.account') }}
        </router-link>
        <router-link to="/orders" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
          {{ $t('header.user.orders') }}
        </router-link>
        <button
          @click="logout"
          class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          {{ $t('header.user.logout') }}
        </button>
      </div>
    </template>
    <template v-else>
      <router-link
        to="/login"
        class="text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-100"
      >
        {{ $t('header.nav.login') }}
      </router-link>
      <router-link
        to="/signup"
        class="bg-black text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-opacity-90"
      >
        {{ $t('header.nav.signup') }}
      </router-link>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useLoginStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'

const router = useRouter()
const loginStore = useLoginStore()
const { isLoggedIn } = storeToRefs(loginStore)
const showUserMenu = ref(false)

const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value
}

const logout = () => {
  loginStore.handleLogout()
  router.push('/')
  showUserMenu.value = false
}
</script>
