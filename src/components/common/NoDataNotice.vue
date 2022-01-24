<template>
  <div style="margin: 1rem 0">
    <b style="color: var(--primary-color)">داده ای یافت نشد</b><br>
    <small style="color: whitesmoke">{{note}}</small>
  </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue';

export default defineComponent({
  name: 'no-data-notice',
  props: {
    note: String,
  },
});
</script>
