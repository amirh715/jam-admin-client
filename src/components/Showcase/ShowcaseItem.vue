<template>
  <div class="space" :style="
    {
      width: '17rem', height: '17rem', border: '1px solid red', borderRadius: '2px',
      backgroundImage: 'url(' + value.imageSrc + ')', backgroundSize: 'cover'
    }
  ">
  <h1 class="text-right space-2">{{value.title}}</h1>
  <p class="text-right">{{value.message}}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ShowcaseDetails } from '@/classes/Showcase/DTOs/queries/ShowcaseDetails';

export default defineComponent({
  name: 'showcase-item',
  props: {
    value: ShowcaseDetails,
  },
});
</script>
