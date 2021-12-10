<template>
  <div class="space-2-v flex justify-content-between">
    <Button class="p-button-sm" @click="visible = true"
      :disabled="!$store.state.isOnline">
        <div v-if="$store.state.isOnline" class="flex justify-content-center">
          <vue-feather type="plus"></vue-feather>
          <span class="space-h">نوتیفیکیشن جدید</span>
        </div>
        <div v-else class="flex justify-content-center">
          <vue-feather type="wifi-off"></vue-feather>
          <span class="space-h">به اینترنت دسترسی ندارید</span>
        </div>
    </Button>
    <Button class="p-button-sm" @click="$router.push({ name: 'Home' })"
      :disabled="true">
        <div v-if="$store.state.isOnline" class="flex justify-content-center">
          <vue-feather type="frown"></vue-feather>
          <span class="space-h"><strike>لیست مخاطبان</strike></span>
        </div>
    </Button>
    <Dialog v-model:visible="visible" :style="{width: '40vw'}">
      <new-notification-form />
    </Dialog>
  </div>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import NewNotificationForm from '@/components/Notification/NewNotificationForm.vue';

export default defineComponent({
  components: {
    NewNotificationForm,
  },
  data() {
    return {
      visible: false,
    };
  },
});
</script>
