<template>
  <div style="width: 19rem; height: 19rem;">
    <cropper
      class="cropper"
      :src="image"
      :stencil-props="stencilProps"
      :stencil-size="stencilSize"
      :imageRestriction="imageRestriction"
      @change="change"
    />
  </div>
</template>

<style lang="scss" scoped>
.cropper {
  height: 100%;
  border: 1px solid whitesmoke;
  border-radius: 2px;
}
</style>

<script lang="ts">
import { defineComponent } from 'vue';
import { Cropper } from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';
import 'vue-advanced-cropper/dist/theme.bubble.css';

export default defineComponent({
  name: 'base-image-cropper',
  components: { Cropper },
  emits: ['change'],
  props: {
    image: String,
    stencilProps: Object,
    stencilSize: Object,
    imageRestriction: String,
  },
  data() {
    return {
      result: null,
    };
  },
  methods: {
    change(event: any) {
      const canvas = event.canvas;
      this.result = canvas.toDataURL();
      this.$emit('change', this.result);
    },
  },
});
</script>
