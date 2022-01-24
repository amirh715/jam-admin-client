<template>
  <div class="flex flex-column">
    <div class="flex flex-column justify-content-center align-items-center">
      <h3>آیتم جدید</h3>
    </div>
    <div class="space-v"><hr/></div>
    <div class="grid">
      <div class="col">
        <div class="flex">
          <base-input-text
            label="عنوان روی عکس"
            v-model="title"
            @change="v$.title.$touch"
            :errors="v$.title.$errors"
            note="عنوان با خط درشت بر روی عکس نوشته می شود."
          />
        </div>
        <div class="flex space-2-h">
          <base-textarea
            label="متن روی عکس"
            v-model="message"
            @change="v$.message.$touch"
            :errors="v$.message.$errors"
            note="متن با خط کوچک زیر عنوان نوشته می شود."
            style="width: 100%"
          />
        </div>
        <div class="flex space-v">
          <base-input-text
            label="لینک"
            v-model="route"
            @change="v$.route.$touch"
            :errors="v$.route.$errors"
            note="با کلیک کردن کاربر بر روی عکس به این لینک فرستاده می شود."
          />
        </div>
      </div>
      <div class="col">
        <div class="flex align-items-center">
          <span class="space-2-h">ترتیب</span>
          <InputNumber
            v-model="index"
            :min="1" :max="12"
            showButtons
            :allowEmpty="false"
            @change="v$.index.$touch"
            :errors="v$.index.$errors"
            buttonLayout="vertical"
            style="width: 3rem;"
          />
        </div>
        <div>
          <base-image-input
            label="عکس"
            v-model="image"
            @change="imageSelected"
            :editable="true"
            :stencilProps="{aspectRatio: 1/1}"
            @cropped="imageSelected"
          />
        </div>
      </div>
    </div>
    <div>
      <small class="text-right flex">
        <vue-feather type="info" class="space-h"></vue-feather>
        رنگ غالب عکس انتخابی باید تیره باشد زیرا رنگ متون روی عکس روشن خواهد بود.
      </small>
      <small class="text-right flex space-v">
        <vue-feather type="info" class="space-h"></vue-feather>
        آیتم ها قابل تغییر نیستند و برای تغییر آنها باید آیتم را حذف و دوباره ایجاد کرد.
      </small>
    </div>
    <div class="space-2-v"><hr/></div>
    <div class="flex justify-content-center">
      <Button :disabled="v$.$invalid" @click="submit">
        <vue-feather type="check"></vue-feather>
        <span class="space-h">برو</span>
      </Button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, url } from '@vuelidate/validators';
import { showcase } from '@/validators';
import { CreateShowcaseRequest } from '@/classes/Showcase/DTOs/commands/CreateShowcaseRequest';
import { ShowcaseService } from '@/services/ShowcaseService';

export default defineComponent({
  name: 'new-showcase',
  setup() {
    return { v$: useVuelidate() };
  },
  validations() {
    return {
      title: { title: showcase.title },
      index: { index: showcase.index },
      message: { message: showcase.message },
      route: { required, url },
      image: { required },
    };
  },
  data() {
    return {
      title: null,
      index: 1,
      message: null,
      route: null,
      image: null,
    };
  },
  methods: {
    submit() {
      const dto = new CreateShowcaseRequest({
        title: this.title,
        index: this.index,
        message: this.message,
        route: this.route,
        image: this.image,
      });
      let toastMessage = '';
      let toastSeverity = '';
      ShowcaseService.createShowcase(dto)
        .then(() => {
          this.$router.push({ name: 'Home' });
          toastMessage = 'آیتم جدید ویترین ایجاد شد.';
          toastSeverity = 'success';
        })
        .catch((err) => {
          console.log(err);
          toastMessage = err;
          toastSeverity = 'error';
        })
        .finally(() => {
          this.$toast.add({
            detail: toastMessage,
            severity: toastSeverity,
            life: 4000,
          });
        });
    },
    imageSelected(image: Blob) {
      this.image = image;
    },
  },
});
</script>
