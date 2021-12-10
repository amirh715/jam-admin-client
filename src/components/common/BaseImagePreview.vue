<template>
  <div id="test"></div>
</template>

<style lang="scss" scoped>
#test {
  border: 1px solid whitesmoke;
  border-radius: 2px;
  width: 20rem;
  height: 20rem;
  background-image: url('../../../public/img/Fadaei.jpg');
  background-size: contain;
}
</style>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'base-image-preview',
});
</script>
