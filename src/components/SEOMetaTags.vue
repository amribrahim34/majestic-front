<!-- SEOMetaTags.vue -->
<script setup lang="ts">
import { useMeta } from 'vue-meta'

const props = defineProps({
  title: String,
  description: String,
  image: String,
  url: String
})

useMeta(() => ({
  title: props.title,
  description: props.description,
  meta: [
    { property: 'og:title', content: props.title },
    { property: 'og:description', content: props.description },
    { property: 'og:image', content: props.image },
    { property: 'og:url', content: props.url }
  ]
}))
</script>

<template>
  <!-- This component doesn't need to render anything -->
</template>
