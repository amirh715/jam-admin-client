<template>
  <div class="space-2-v">
    <audio :src="src" controls></audio>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'player',
  props: {
    src: String,
  },
});
</script>
