<template>
  <aside class="bg-white p-4 w-64">
    <h2 class="font-bold mb-4">category</h2>
    <!-- Repeat for each filter category -->
    <div class="mb-4">
      <h3 class="font-bold mb-2">Book format</h3>
      <div class="flex flex-col">
        <label class="inline-flex items-center mt-3">
          <input type="checkbox" class="form-checkbox h-5 w-5" checked /><span
            class="ml-2 text-gray-700"
            >audiobook</span
          >
        </label>
        <label class="inline-flex items-center mt-3">
          <input type="checkbox" class="form-checkbox h-5 w-5" /><span class="ml-2 text-gray-700"
            >Paperback</span
          >
        </label>
        <label class="inline-flex items-center mt-3">
          <input type="checkbox" class="form-checkbox h-5 w-5" /><span class="ml-2 text-gray-700"
            >eBook</span
          >
        </label>
      </div>
    </div>
    <!-- ... Additional filters ... -->
  </aside>
</template>

<script>
export default {
  name: 'SidebarFilters'
  // You might want to use props or vuex to handle the state of the filters
}
</script>

<style scoped>
/* Add any additional styles for your sidebar here */
</style>
