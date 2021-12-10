<template>
  <div style="margin: 1rem 0">
    <b style="color: var(--primary-color)">داده ای یافت نشد</b><br>
    <small style="color: whitesmoke">بهتر است فیلتر ها را تغییر دهید.</small>
  </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue';

export default defineComponent({
  name: 'no-data-notice',
});
</script>
