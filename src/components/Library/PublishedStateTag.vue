<template>
  <Tag :severity="severity" style="font-size: 0.9rem">
    {{displayValue}}
  </Tag>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    published: Boolean,
  },
  computed: {
    severity() {
      return this.$props.published ? 'success' : 'danger';
    },
    displayValue() {
      return this.$props.published ? 'انتشار' : 'آرشیو';
    },
  },
});
</script>
