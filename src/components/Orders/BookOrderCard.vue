<!-- src/components/Orders/BookOrderCard.vue -->
<template>
  <n-card
    :title="t('order', { id: order.id })"
    class="bg-white border border-gray-200 shadow-md hover:shadow-xl transition-shadow duration-300"
    :bordered="false"
    size="small"
    @click="viewOrder"
  >
    <template #header-extra>
      <n-tag :type="getStatusType(order.status)" class="text-xs font-medium">
        {{ getOrderStatus(order.status) }}
      </n-tag>
    </template>

    <n-space vertical size="small">
      <n-list>
        <n-list-item v-for="item in order.items" :key="item.book_id" class="py-1">
          <n-thing>
            <template #avatar>
              <n-image
                :src="item?.coverImage"
                fallback-src="/placeholder-book.jpg"
                width="50"
                object-fit="cover"
                preview-disabled
                class="rounded-md shadow-sm"
              />
            </template>
            <template #header>
              <h3 class="text-base font-bold text-gray-900 leading-tight">{{ item.title }}</h3>
            </template>
            <template #description>
              <p class="text-xs text-gray-600">{{ t('author') }}: {{ item.author }}</p>
              <p class="text-xs text-gray-500">{{ t('quantity') }}: {{ item.quantity }}</p>
            </template>
          </n-thing>
        </n-list-item>
      </n-list>
    </n-space>

    <template #footer>
      <n-space justify="end" class="mt-2">
        <n-button
          v-if="order.status !== 'Delivered'"
          @click="$emit('cancel', order.id)"
          class="text-xs font-semibold bg-white text-black border border-gray-300 hover:bg-gray-100"
          secondary
          size="small"
        >
          {{ t('cancel') }}
        </n-button>
        <n-button
          @click="$emit('track', order.id)"
          @click.stop="$emit('cancel', order.id)"
          class="text-xs font-semibold bg-gray-800 text-white hover:bg-gray-700"
          size="small"
        >
          {{ t('track') }}
        </n-button>
        <n-button
          v-if="order.status === 'Delivered'"
          @click.stop="$emit('cancel', order.id)"
          @click="$emit('reorder', order.id)"
          class="text-xs font-semibold bg-black text-white hover:bg-gray-900"
          size="small"
        >
          {{ t('reorder') }}
        </n-button>
      </n-space>
    </template>
  </n-card>
</template>

<script lang="ts" setup>
import { NCard, NButton, NSpace, NList, NListItem, NThing, NTag, NImage } from 'naive-ui'
import { useI18n } from 'vue-i18n'
import { useOrderStore } from '@/stores/orderStore'
import { Order } from '@/types/Order'

const { t } = useI18n()
const orderStore = useOrderStore()

const props = defineProps<{
  order: Order
}>()

const emit = defineEmits<{
  (event: 'cancel', orderId: number): void
  (event: 'track', orderId: number): void
  (event: 'reorder', orderId: number): void
  (event: 'view', orderId: number): void
}>()

const viewOrder = () => {
  emit('view', props.order.id)
}

const { getOrderStatus } = orderStore

const getStatusType = (status: string) => {
  switch (status) {
    case 'Processing':
      return 'info'
    case 'Shipped':
      return 'success'
    case 'Cancelled':
      return 'error'
    default:
      return 'default'
  }
}
</script>

<style scoped>
.n-card {
  @apply rounded-lg;
}

.n-card-header {
  @apply pb-2;
}

.n-card-header-main {
  @apply text-lg font-extrabold text-gray-800;
}

.n-button {
  @apply px-3 py-1 transition-colors duration-300;
}

.n-thing-main {
  @apply flex-grow;
}

.n-thing-avatar {
  @apply mr-3;
}

.n-list-item:not(:last-child) {
  @apply border-b border-gray-100;
}
</style>
