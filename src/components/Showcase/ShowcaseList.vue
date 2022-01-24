<template>
  <div class="flex">
    <showcase-item
      v-for="item in items"
      :key="item.index"
      :value="item"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import  ShowcaseItem from './ShowcaseItem.vue';

export default defineComponent({
  components: { ShowcaseItem, },
  props: {
    items: String,
  },
});
</script>
