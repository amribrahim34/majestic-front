<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useLoginStore } from '@/stores/auth'
import FooterComponent from '../components/FooterComponent.vue'
import HeaderComponent from '../components/Header.vue'

const { t } = useI18n()
const loginStore = useLoginStore()

const editingField = ref<string | null>(null)
const tempEditValue = ref('')

const userDetails = computed(() => ({
  fullName: loginStore.userData?.user_name || '',
  university: loginStore.userData?.university || '',
  email: loginStore.userData?.email || '',
  fieldOfStudy: loginStore.userData?.fieldOfStudy || '',
  dateOfBirth: loginStore.userData?.dateOfBirth || ''
}))

const startEdit = (field: string) => {
  editingField.value = field
  tempEditValue.value = userDetails.value[field as keyof typeof userDetails.value]
}

const saveEdit = async () => {
  if (editingField.value) {
    try {
      await loginStore.updateUserField(editingField.value, tempEditValue.value)
      editingField.value = null
      tempEditValue.value = ''
    } catch (error) {
      console.error('Failed to update user field:', error)
      // Handle error (e.g., show error message to user)
    }
  }
}

const cancelEdit = () => {
  editingField.value = null
  tempEditValue.value = ''
}

onMounted(async () => {
  if (!loginStore.isLoggedIn) {
    await loginStore.initializeAuth()
  }
})
</script>

<template>
  <HeaderComponent />
  <div class="mx-auto p-6 bg-white shadow-md rounded w-full max-w-2xl m-20">
    <h1 class="text-2xl font-bold mb-4 text-center">{{ t('accountDetails.title') }}</h1>
    <p class="mb-16 text-center text-gray-500">{{ t('accountDetails.subtitle') }}</p>
    <div class="space-y-4">
      <div v-for="(value, key) in userDetails" :key="key" class="flex justify-between items-center">
        <span class="font-medium">{{ t(`accountDetails.fields.${key}`) }}</span>
        <div v-if="editingField === key" class="flex items-center">
          <input
            v-model="tempEditValue"
            :placeholder="t(`accountDetails.placeholders.${key}`)"
            class="mr-2 p-1 border rounded"
          />
          <button @click="saveEdit" class="text-green-600 hover:text-green-800 mr-2">
            {{ t('common.save') }}
          </button>
          <button @click="cancelEdit" class="text-red-600 hover:text-red-800">
            {{ t('common.cancel') }}
          </button>
        </div>
        <div v-else class="flex items-center">
          <span class="mr-2 text-gray-500">{{ value }}</span>
          <button @click="startEdit(key)" class="text-blue-600 hover:text-blue-800">
            {{ t('common.edit') }}
          </button>
        </div>
      </div>
    </div>
  </div>
  <FooterComponent />
</template>
