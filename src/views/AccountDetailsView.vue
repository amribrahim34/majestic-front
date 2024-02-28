<script lang="ts">
import FooterComponent from '../components/FooterComponent.vue'
import HeaderComponent from '../components/Header.vue'

export default {
  name: 'AccountDetailsView',
  components: {
    HeaderComponent,
    FooterComponent
  },
  data() {
    return {}
  }
}
</script>

<template>
  <HeaderComponent />
  <div class="mx-auto p-6 bg-white shadow-md rounded w-full m-20">
    <h1 class="text-2xl font-bold mb-4 flex justify-center">Account details</h1>
    <p class="mb-16 flex justify-center text-gray-500">Update your account details</p>
    <div class="space-y-4">
      <div class="flex justify-between items-center">
        <span class="font-medium">Full name</span>
        <div class="flex items-center">
          <span class="mr-2 text-gray-500">Lara Smith</span>
        </div>
        <button class="text-blue-600 hover:text-blue-800">Edit</button>
      </div>
      <div class="flex justify-between items-center">
        <span class="font-medium">University</span>
        <div class="flex items-center">
          <span class="mr-2 text-gray-500">Harvard, USA</span>
        </div>
        <button class="text-blue-600 hover:text-blue-800">Edit</button>
      </div>
      <div class="flex justify-between items-center">
        <span class="font-medium">Email</span>
        <div class="flex items-center">
          <span class="mr-2 text-gray-500">lara@smith.edu</span>
        </div>
        <button class="text-blue-600 hover:text-blue-800">Edit</button>
      </div>
      <div class="flex justify-between items-center">
        <span class="font-medium">Field of study</span>
        <div class="flex items-center">
          <span class="mr-2 text-gray-500">Literature</span>
        </div>
        <button class="text-blue-600 hover:text-blue-800">Edit</button>
      </div>
      <div class="flex justify-between items-center">
        <span class="font-medium">Date of birth</span>
        <div class="flex items-center">
          <span class="mr-2 text-gray-500">10/25/1990</span>
        </div>
        <button class="text-blue-600 hover:text-blue-800">Edit</button>
      </div>
    </div>
  </div>
  <FooterComponent />
</template>
<style scoped>
/* This applies the style directly to the <body> element, affecting the entire page */
</style>
