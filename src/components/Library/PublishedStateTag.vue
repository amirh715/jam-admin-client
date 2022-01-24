<template>
  <Tag :severity="severity" style="font-size: 0.9rem">
    <div class="flex justify-content-center align-items-center">
      <div v-if="withIcon" class="space-h">
        <vue-feather :type="icon"></vue-feather>
      </div>
      {{displayValue}}
    </div>
  </Tag>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'published-state-tag',
  props: {
    published: Boolean,
    withIcon: Boolean,
  },
  computed: {
    severity() {
      if (this.published === true) {
        return 'success';
      }
      if (this.published === false) {
        return 'danger';
      }
      return 'info';
    },
    displayValue() {
      if (this.published === true) {
        return 'انتشار';
      }
      if (this.published === false) {
        return 'آرشیو';
      }
      return 'N/A';
    },
    icon() {
      if (this.published === true) {
        return 'radio';
      }
      if (this.published === false) {
        return 'archive';
      }
      return 'meh';
    },
  },
});
</script>
