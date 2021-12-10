<template>
  <Tag :severity="severity" style="font-size: 0.9rem">
    {{displayValue}}
  </Tag>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { UserRole } from '@/classes/User/Types/UserRole';

export default defineComponent({
  name: 'user-role-tag',
  props: {
    role: {
      type: Object as PropType<UserRole> || String,
    },
  },
  computed: {
    severity() {
      return 'primary';
    },
    displayValue() {
      if (this.$props.role === UserRole.ADMIN.toString()) {
        return 'مدیر سیستم';
      }
      if (this.$props.role === UserRole.LIBRARY_MANAGER.toString()) {
        return 'مدیر مجموعه';
      }
      if (this.$props.role === UserRole.SUBSCRIBER.toString()) {
        return 'مشترک';
      }
      return 'N/A';
    },
  },
});
</script>
