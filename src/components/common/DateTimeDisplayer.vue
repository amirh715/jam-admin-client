<template>
  <span v-if="datetime">{{displayValue}}</span>
  <span v-else>N/A</span>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { JalaliDateTime } from 'jalali-date-time';

export default defineComponent({
  name: 'datetime-displayer',
  props: {
    datetime: Date || String,
    options: Object,
  },
  computed: {
    displayValue() {
      return this.datetime instanceof Date ?
        JalaliDateTime(this.options).toFullText(this.datetime)
        : JalaliDateTime(this.options).toFullText(new Date(this.datetime));
    },
  },
});
</script>
