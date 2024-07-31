<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useLoginStore } from '@/stores/auth'
import FooterComponent from '../components/FooterComponent.vue'
import HeaderComponent from '../components/Header.vue'
import { UserDetails, EditableField } from '@/types/user'

const { t } = useI18n()
const loginStore = useLoginStore()

const userDetails = computed<UserDetails>(() => loginStore.userData || {})
const editingFields = ref<Set<EditableField>>(new Set())

const fullName = ref(userDetails.value.user_name || '')
const email = ref(userDetails.value.email || '')
const mobile = ref(userDetails.value.mobile || '')
const address = ref(userDetails.value.address || '')
const birthday = ref(userDetails.value.birthday || '')

const toggleEdit = (field: EditableField) => {
  if (editingFields.value.has(field)) {
    editingFields.value.delete(field)
  } else {
    editingFields.value.add(field)
  }
}

const saveEdit = async (field: EditableField) => {
  try {
    let value: string = ''
    switch (field) {
      case 'user_name':
        value = fullName.value
        break
      case 'email':
        value = email.value
        break
      case 'mobile':
        value = mobile.value
        break
      case 'address':
        value = address.value
        break
      case 'birthday':
        value = birthday.value
        break
    }
    await loginStore.updateUserField(field, value)
    editingFields.value.delete(field)
  } catch (error) {
    console.error('Failed to update user field:', error)
    // Handle error (e.g., show error message to user)
  }
}

onMounted(async () => {
  if (!loginStore.isLoggedIn) {
    await loginStore.initializeAuth()
  }
})
</script>

<template>
  <HeaderComponent />
  <div class="p-6 bg-white m-20">
    <h1 class="text-2xl font-bold mb-4 text-center">{{ t('accountDetails.title') }}</h1>
    <p class="mb-16 text-center text-gray-500">{{ t('accountDetails.subtitle') }}</p>
    <div class="space-y-6">
      <!-- <div class="flex justify-between">
        <div class="w-1/5 font-bold">
          <span>{{ t('accountDetails.fields.user_name') }} :</span>
        </div>
        <div class="w-4/5">
          <n-input
            v-if="editingFields.has('user_name')"
            v-model="fullName"
            type="text"
            :placeholder="t('accountDetails.placeholders.fullName')"
            class="w-full"
          />

          <p class="w-full text-gray-600">{{ fullName }}</p>
        </div>
      </div> -->
      <div class="">
        <label class="font-medium mb-2">{{ t('accountDetails.fields.user_name') }}</label>
        <div class="flex items-center">
          <input
            v-if="editingFields.has('user_name')"
            v-model="fullName"
            type="text"
            :placeholder="t('accountDetails.placeholders.fullName')"
            class="flex-grow p-2 border mr-2"
          />
          <span v-else class="flex-grow p-2">{{ userDetails.user_name }}</span>
          <button
            @click="
              editingFields.has('user_name') ? saveEdit('user_name') : toggleEdit('user_name')
            "
            class="px-4 py-2 bg-black text-white hover:bg-blue-600"
          >
            {{ editingFields.has('user_name') ? t('common.save') : t('common.edit') }}
          </button>
        </div>
      </div>

      <div class="flex flex-col">
        <label class="font-medium mb-2">{{ t('accountDetails.fields.email') }}</label>
        <div class="flex items-center">
          <input
            v-if="editingFields.has('email')"
            v-model="email"
            type="email"
            :placeholder="t('accountDetails.placeholders.email')"
            class="flex-grow p-2 border mr-2"
          />
          <span v-else class="flex-grow p-2">{{ userDetails.email }}</span>
          <button
            @click="editingFields.has('email') ? saveEdit('email') : toggleEdit('email')"
            class="px-4 py-2 bg-black text-white hover:bg-blue-600"
          >
            {{ editingFields.has('email') ? t('common.save') : t('common.edit') }}
          </button>
        </div>
      </div>

      <div class="flex flex-col">
        <label class="font-medium mb-2">{{ t('accountDetails.fields.mobile') }}</label>
        <div class="flex items-center">
          <input
            v-if="editingFields.has('mobile')"
            v-model="mobile"
            type="tel"
            :placeholder="t('accountDetails.placeholders.mobile')"
            class="flex-grow p-2 border mr-2"
          />
          <span v-else class="flex-grow p-2">{{ userDetails.mobile }}</span>
          <button
            @click="editingFields.has('mobile') ? saveEdit('mobile') : toggleEdit('mobile')"
            class="px-4 py-2 bg-black text-white hover:bg-blue-600"
          >
            {{ editingFields.has('mobile') ? t('common.save') : t('common.edit') }}
          </button>
        </div>
      </div>

      <div class="flex flex-col">
        <label class="font-medium mb-2">{{ t('accountDetails.fields.address') }}</label>
        <div class="flex items-center">
          <textarea
            v-if="editingFields.has('address')"
            v-model="address"
            :placeholder="t('accountDetails.placeholders.address')"
            class="flex-grow p-2 border mr-2"
            rows="3"
          ></textarea>
          <span v-else class="flex-grow p-2">{{ userDetails.address }}</span>
          <button
            @click="editingFields.has('address') ? saveEdit('address') : toggleEdit('address')"
            class="px-4 py-2 bg-black text-white hover:bg-blue-600"
          >
            {{ editingFields.has('address') ? t('common.save') : t('common.edit') }}
          </button>
        </div>
      </div>

      <div class="flex flex-col">
        <label class="font-medium mb-2">{{ t('accountDetails.fields.birthday') }}</label>
        <div class="flex items-center">
          <input
            v-if="editingFields.has('birthday')"
            v-model="birthday"
            type="date"
            class="flex-grow p-2 border mr-2"
          />
          <span v-else class="flex-grow p-2">{{ userDetails.birthday }}</span>
          <button
            @click="editingFields.has('birthday') ? saveEdit('birthday') : toggleEdit('birthday')"
            class="px-4 py-2 bg-black text-white hover:bg-blue-600"
          >
            {{ editingFields.has('birthday') ? t('common.save') : t('common.edit') }}
          </button>
        </div>
      </div>
    </div>
  </div>
  <FooterComponent />
</template>
