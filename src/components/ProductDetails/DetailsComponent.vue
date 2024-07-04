<template>
  <div class="flex p-6 bg-white">
    <div class="flex-none w-48 relative">
      <img :src="product.img" alt="The Chronicles of Narnia" class="object-cover rounded-lg" />
    </div>
    <div class="flex-auto p-6">
      <div class="flex flex-wrap items-start justify-between">
        <h1 class="flex-auto text-xl font-semibold text-slate-900">
          {{ product.title }}
        </h1>
        <div class="text-xl text-slate-500 line-through">
          {{ product.originalPrice }}
        </div>
        <div class="text-3xl text-slate-900">
          {{ product.currentPrice }}
        </div>
        <div class="text-sm font-medium text-slate-700">
          {{ product.rating }} / 5 ({{ product.reviews }} Reviews)
        </div>
      </div>
      <div class="flex items-baseline my-4">
        <div class="text-slate-700">
          Type:
          <select v-model="selectedType" class="ml-2 border rounded p-1">
            <option v-for="type in product.types" :key="type">{{ type }}</option>
          </select>
        </div>
        <div class="ml-auto">
          Size:
          <select v-model="selectedSize" class="border rounded p-1">
            <option v-for="size in product.sizes" :key="size">{{ size }}</option>
          </select>
        </div>
      </div>
      <div class="flex space-x-4 my-4">
        <label class="flex items-center space-x-2">
          <span>Qty:</span>
          <input
            type="number"
            v-model.number="quantity"
            min="1"
            class="border rounded p-1 w-16 text-center"
          />
        </label>
        <button @click="addToCart" class="h-10 px-6 text-white bg-black rounded-md">
          Add to cart
        </button>
        <button @click="addToWishlist" class="p-2 rounded-full bg-gray-200">
          <svg class="w-6 h-6" fill="none" stroke="currentColor">
            <!-- Heart icon SVG -->
          </svg>
        </button>
      </div>
      <p class="text-sm text-slate-700">
        {{ product.description }}
      </p>
      <a href="#" class="text-sm text-blue-600 hover:underline">Read more</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductDisplay',
  data() {
    return {
      product: {
        img: '/src/assets/book-imgs/1.jpeg',
        title: 'Narnia',
        rating: 4.8,
        reviews: 12,
        originalPrice: '$28.49',
        currentPrice: '$15.49',
        description:
          'An all-encompassing academic book that explores a wide range of subjects, providing in-depth analysis and research discoveries.',
        types: ['PDF', 'Hard Copy'],
        sizes: ['XS', 'S', 'M', 'L', 'XL']
      },
      selectedType: 'PDF',
      selectedSize: 'S',
      quantity: 1
    }
  },
  methods: {
    addToCart() {
      // Implement add to cart functionality
      alert(
        `Added ${this.quantity} of ${this.product.title} (${this.selectedType}, ${this.selectedSize}) to cart.`
      )
    },
    addToWishlist() {
      // Implement add to wishlist functionality
      alert(`Added ${this.product.title} to wishlist.`)
    }
  }
}
</script>

<style scoped>
/* Your global styles that won't be handled by Tailwind here */
</style>
