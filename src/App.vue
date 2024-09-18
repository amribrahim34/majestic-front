<script setup lang="ts">
import { RouterView } from 'vue-router'
import { NConfigProvider, NMessageProvider, NIcon } from 'naive-ui'
import { SocialChat } from 'vue-social-chat'
import { LogoFacebook, LogoWhatsapp } from '@vicons/ionicons5'

const attendants = [
  {
    app: 'whatsapp',
    label: 'خدمة عمملاء',
    name: 'عمرو ابراهيم',
    number: '201061016045',
    avatar: {
      src: 'https://avatars0.githubusercontent.com/u/8084606?s=460&u=20b6499a416cf7129a18e5c168cf387e159edb1a&v=4',
      alt: 'عمرو ابراهيم'
    }
  }
  // ...
]
</script>

<template>
  <n-config-provider>
    <n-message-provider>
      <router-view></router-view>
    </n-message-provider>
  </n-config-provider>
  <div class="layout">
    <!-- ommited -->
    <SocialChat icon :attendants="attendants" class="bg-white">
      <template #header>
        <p>Click on one of our attendants below to chat on WhatsApp.</p>
      </template>
      <template #button>
        <n-icon :component="LogoWhatsapp" />
      </template>
      <template #footer>
        <small>Opening hours: 8am to 6pm</small>
      </template>
    </SocialChat>
  </div>
</template>

<style scoped></style>
