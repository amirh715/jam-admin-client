<template>
  <Tag :severity="severity" style="font-size: 0.9rem">
    {{displayValue}}
  </Tag>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { UserState } from '@/classes/User/Types/UserState';

export default defineComponent({
  name: 'user-state-tag',
  props: {
    state: {
      type: String,
    },
  },
  computed: {
    severity() {
      if (this.$props.state === UserState.ACTIVE.toString()) {
        return 'success';
      }
      if (this.$props.state === UserState.BLOCKED.toString()) {
        return 'danger';
      }
      if (this.$props.state === UserState.NOT_VERIFIED.toString()) {
        return 'warning';
      }
      return 'warning';
    },
    displayValue() {
      if (this.$props.state === UserState.ACTIVE.toString()) {
        return 'فعال';
      }
      if (this.$props.state === UserState.BLOCKED.toString()) {
        return 'مسدود';
      }
      if (this.$props.state === UserState.NOT_VERIFIED.toString()) {
        return 'تایید نشده';
      }
      return 'N/A';
    },
  },
});
</script>
