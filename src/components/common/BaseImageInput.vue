<template>
  <div class="flex flex-column justify-content-center align-items-center">
    <label v-if="label" class="space-v">{{label}}</label>
    <FileUpload
      :disabled="disabled"
      :showUploadButton="false"
      accept="image/jpg, image/jpeg, image/png"
      :maxFileSize="20000000"
      :fileLimit="1"
      :customUpload="true"
      @uploader="uploader"
      @select="add"
      @remove="remove"
      @clear="remove"
      chooseLabel="انتخاب"
      cancelLabel="انصراف"
    />
    <div v-if="note" class="note">
      <small>{{note}}</small>
    </div>
    <div v-if="maxFileSizeErrorMessage" class="error">
      <b>{{maxFileSizeErrorMessage}}</b>
    </div>
    <div v-if="maxFileLimitErrorMessage" class="error">
      <b>{{maxFileLimitErrorMessage}}</b>
    </div>
    <div v-if="editable && image && !showPreview" class="space-2-v">
      <base-image-cropper
        :image="image"
        :stencilProps="stencilProps"
        :stencilSize="stencilSize"
        @change="change"
      />
      <Button
        v-if="!showPreview"
        @click="cropImage"
        class="space-2-v p-button-sm p-button-success"
        :disabled="!image">
          <vue-feather type="image"></vue-feather>
          <span class="space-h">ثبت عکس</span>
      </Button>
    </div>
    <div v-if="editable && image && showPreview" class="space-2-v">
      <img :src="result" style="width: 19rem; height: 19rem;" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { dataURItoBlob } from '@/utils/dataURItoBlob';
import BaseImageCropper from './BaseImageCropper.vue';

export default defineComponent({
  components: { BaseImageCropper },
  name: 'base-image-input',
  emits: ['change', 'cropped'],
  props: {
    label: String,
    disabled: Boolean,
    note: String,
    maxSize: Number,
    fileLimit: Number,
    maxFileSizeErrorMessage: String,
    maxFileLimitErrorMessage: String,
    editable: Boolean,
    stencilProps: Object,
    stencilSize: Object,
  },
  data() {
    return {
      image: '',
      result: '',
      showPreview: false,
    };
  },
  methods: {
    add(event: any) {
      this.image = event.files[0].objectURL;
    },
    remove(event: any) {
      this.image = '';
      this.showPreview = false;
    },
    change(dataURL: string) {
      this.$emit('change', dataURL);
      this.result = dataURL;
    },
    cropImage() {
      this.showPreview = true;
      this.$emit('cropped', dataURItoBlob(this.result));
    },
  },
});
</script>
