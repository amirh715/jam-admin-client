<template>
  <div class="flex flex-column justify-content-center align-items-center">
    <label v-if="label" class="space-v">{{label}}</label>
    <FileUpload
      :disabled="disabled"
      :showUploadButton="false"
      accept="audio/mpeg"
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
    <div>
      <div v-if="note" class="note">
        <small>{{note}}</small>
      </div>
    </div>
    <div v-if="showPreview" class="space-v">
      <audio controls>
        <source :src="audio" type="audio/mpeg">
      </audio>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { dataURItoBlob } from '@/utils/dataURItoBlob';

export default defineComponent({
  name: 'base-audio-input',
  emits: ['change'],
  props: {
    label: String,
    note: String,
    disabled: Boolean,
    maxSize: Number,
    fileLimit: Number,
  },
  data() {
    return {
      audio: null,
      showPreview: false,
    };
  },
  methods: {
    add(event: any) {
      const reader = new FileReader();
      reader.readAsDataURL(event.files[0]);
      reader.onloadend = () => {
        this.audio = reader.result;
        this.$emit('change', dataURItoBlob(this.audio));
        this.showPreview = true;
      };
    },
    remove(event: any) {
      this.audio = null;
      this.showPreview = false;
    },
  },
});
</script>
