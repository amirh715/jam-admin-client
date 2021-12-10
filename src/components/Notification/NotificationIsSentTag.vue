<template>
  <Tag :severity="severity" style="font-size: 0.9rem">
    <vue-feather :type="isSent ? 'check' : 'clock'"></vue-feather>
    <span class="space-h">{{displayValue}}</span>
  </Tag>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'notification-is-sent-tag',
  props: {
    isSent: Boolean,
  },
  computed: {
    severity() {
      return this.$props.isSent ? 'success' : 'info';
    },
    displayValue() {
      return this.$props.isSent ? 'ارسال شده' : 'ارسال نشده';
    },
  },
});
</script>
