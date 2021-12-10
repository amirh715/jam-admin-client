<template>
  <div class="flex flex-row justify-content-center align-items-center"
    v-if="!$store.state.isOnline">
    <vue-feather type="wifi-off" size="2.2rem" stroke="tomato"></vue-feather>
    <h4 style="color: tomato" class="space-2">به اینترنت دسترسی ندارید</h4>
  </div>
</template>

<style lang="scss" scoped>

</style>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'app-offline-notice',
});
</script>
