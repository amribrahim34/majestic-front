<template>
  <div class="flex gap-4">
    <div class="flex-1">
      <select
        id="city"
        v-model="form.cityId"
        required
        @change="$emit('city-change')"
        class="w-full border-b border-gray-500 p-2 appearance-none bg-transparent text-white"
      >
        <option value="" class="bg-black">{{ t('shipping.selectCity') }}</option>
        <option
          v-for="city in bostaStore.cities"
          :key="city._id"
          :value="city._id"
          class="bg-black"
        >
          {{ currentLocale === 'ar' ? city.nameAr : city.name }}
        </option>
      </select>
    </div>
    <div class="flex-1">
      <select
        id="district"
        v-model="form.districtId"
        required
        :disabled="!form.cityId"
        @change="$emit('district-change')"
        class="w-full border-b border-gray-500 p-2 appearance-none bg-transparent text-white"
      >
        <option value="" class="bg-black">{{ t('shipping.selectDistrict') }}</option>
        <option
          v-for="district in bostaStore.districts"
          :key="district.districtId"
          :value="district.districtId"
          class="bg-black"
        >
          {{ currentLocale === 'ar' ? district.districtName : district.districtOtherName }}
        </option>
      </select>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { useBostaStore } from '@/stores/bostaStore'
import { computed } from 'vue'

const { t, locale } = useI18n()
const bostaStore = useBostaStore()

const currentLocale = computed(() => locale.value)

defineProps<{
  form: {
    cityId: string
    districtId: string
  }
}>()

defineEmits<{
  (e: 'city-change'): void
  (e: 'district-change'): void
}>()
</script>
