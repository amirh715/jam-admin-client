<template>
  <div>
    <div>
      <h3 class="text-center">ایجاد کاربر جدید</h3>
    </div>
    <div class="space-2-v"><hr/></div>
    <div class="grid">
      <div class="col">
        <div class="space-v">
          <base-input-text
            label="نام"
            v-model="name"
            @change="v$.name.$touch"
            :errors="v$.name.$errors"
          />
        </div>
        <div class="space-v">
          <base-input-text
            label="موبایل"
            v-model="mobile"
            @change="v$.mobile.$touch"
            :errors="v$.mobile.$errors"
          />
        </div>
        <div class="space-v">
          <base-input-text
            label="ایمیل"
            v-model="email"
            @change="v$.email.$touch"
            :errors="v$.email.$errors"
          />
        </div>
        <div class="space-v">
          <base-input-text
            label="رمز"
            type="password"
            v-model="password"
            @change="v$.password.$touch"
            :errors="v$.password.$errors"
          />
        </div>
        <div class="space-v">
          <base-input-text
            label="تکرار رمز"
            type="password"
            v-model="passwordAgain"
            @change="v$.passwordAgain.$touch"
            :errors="v$.passwordAgain.$errors"
          />
        </div>
      </div>
      <div class="col">
        <base-image-input
          label="انتخاب عکس پروفایل"
          v-model="image"
          @cropped="imageCropped"
          :editable="true"
          :stencilProps="{aspectRatio: 1/1}"
        />
      </div>
    </div>
    <div class="space-2-v"><hr/></div>
    <div class="space-v flex justify-content-center">
      <Button @click="submit" :disabled="v$.$invalid || waiting" class="p-button-sm">
        <div class="flex" v-if="!waiting">
          <vue-feather type="check"></vue-feather>
          <span class="space-h">ایجاد</span>
        </div>
        <div class="flex" v-else>
          <vue-feather type="loader"></vue-feather>
          <span class="space-h">منتظر باشید...</span>
        </div>
      </Button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { helpers, sameAs } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';
import { user } from '@/validators';
import { UserService } from '@/services/UserService';
import { CreateNewUserRequest } from '@/classes/User/DTOs/commands/CreateNewUserRequest';
import { UserRole } from '@/classes/User/Types/UserRole';

export default defineComponent({
  setup() {
    return { v$: useVuelidate() };
  },
  emit: ['successfulSubmit'],
  name: 'new-user-form',
  data() {
    return {
      name: null,
      mobile: null,
      email: null,
      password: null,
      passwordAgain: null,
      image: null,
      waiting: false,
    };
  },
  validations() {
    const {
      userName,
      mobile,
      email,
      password,
    } = user;
    return {
      name: { name: helpers.withMessage(() => 'نام کاربر باید بین یک تا هشتاد کاراکتر باشد.', userName) },
      mobile: { mobile: helpers.withMessage(() => 'شماره موبایل درست نیست', mobile) },
      email: { email: helpers.withMessage(() => 'آدرس ایمیل درست نیست.', email) },
      password: { password: helpers.withMessage(() => 'رمز باید حداقل ۸ کاراکتر باشد.', password) },
      passwordAgain: { passwordAgain: helpers.withMessage(() => 'رمز با تکرار رمز یکی نیست.', sameAs(this.password)) },
    };
  },
  methods: {
    submit() {
      this.waiting = true;
      const dto = new CreateNewUserRequest(
        this.name,
        this.mobile,
        this.password,
        this.email,
        UserRole.SUBSCRIBER,
        this.image,
      );
      UserService.createNewUser(dto)
        .then(() => {
          this.$emit('successfulSubmit');
          this.$toast.add({
            severity: 'success',
            detail: 'کاربر جدید با موفقیت ایجاد شد.',
            life: 4000,
          });
        })
        .catch((err) => {
          this.$toast.add({
            severity: 'error',
            detail: err.message,
            life: 4000,
          });
        })
        .finally(() => {
          this.waiting = false;
        });
    },
    imageCropped(image: Blob) {
      this.image = image;
    },
  },
});
</script>
