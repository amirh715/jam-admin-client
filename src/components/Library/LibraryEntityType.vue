<template>
  <div>
    <span>{{displayValue}}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'library-entity-type',
  props: {
    type: String,
  },
  computed: {
    displayValue() {
      switch(this.type) {
        case 'S':
          return 'خواننده';
        case 'B':
          return 'گروه';
        case 'A':
          return 'آلبوم';
        case 'T':
          return 'آهنگ';
        default:
          return 'N/A';
      }
    },
  },
});
</script>
