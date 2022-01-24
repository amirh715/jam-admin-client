<template>
  <div class="flex flex-column">
    <h3 class="text-center">تغییر پروفایل</h3>
    <div class="grid">
      <div class="col">
        <div>
          <base-input-text
            label="نام"
            v-model="userName"
            @change="v$.userName.$touch"
            :errors="v$.userName.$errors"
          />
        </div>
        <div class="flex flex-column">
          <base-input-text
            label="ایمیل"
            v-model="email"
            :disabled="removeEmail"
            @change="v$.email.$touch"
            :errors="v$.email.$errors"
          />
        </div>
      </div>
      <div class="col">
        <base-image-input
          label="عکس پروفایل"
          v-model="profileImage"
          :disabled="removeProfileImage"
          :editable="true"
          :stencilProps="{aspectRatio: 1/1}"
          @cropped="imageCropped"
        />
        <div class="flex justify-content-center space">
          <span class="space-h">حذف عکس پروفایل</span>
          <InputSwitch
            v-model="removeProfileImage"
          />
        </div>
      </div>
    </div>
    <div class="flex justify-content-center space-2-v">
      <Button :disabled="v$.$invalid" @click="submit">
        <vue-feather type="check"></vue-feather>
        <span class="space-h">ثبت</span>
      </Button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { helpers, required } from '@vuelidate/validators';
import { user } from '@/validators';
import { UserDetails } from '@/classes/User/DTOs/queries/UserDetails';
import { UserService } from '@/services/UserService';
import { EditUserProfileRequest } from '@/classes/User/DTOs/commands/EditUserProfileRequest';

export default defineComponent({
  setup() {
    return { v$: useVuelidate() };
  },
  props: {
    user: Object as PropType<UserDetails>,
  },
  emits: ['userChanged'],
  validations() {
    const {
      userName,
      email,
    } = user;
    return {
      userName: { userName: helpers.withMessage(() => 'نام باید حداقل یک کاراکتر باشد.', userName) },
      email: { email: helpers.withMessage(() => 'ایمیل درست نیست.', email) },
    };
  },
  data() {
    return {
      userName: this.user['name'],
      email: this.user['email'] || '',
      role: null,
      profileImage: null,
      removeProfileImage: false,
    };
  },
  methods: {
    submit() {
      const dto = new EditUserProfileRequest(
        this.user.id,
        this.userName,
        this.email,
        null,
        this.role,
        this.profileImage,
        this.removeProfileImage,
      );
      UserService.editUser(dto)
        .then(() => {
          this.$toast.add({
            severity: 'success',
            detail: 'پروفایل با موفقیت تغییر کرد.',
            life: 4000,
          });
          this.$emit('userChanged');
        })
        .catch((err) => {
          this.$toast.add({
            severity: 'error',
            detail: err.message,
            life: 4000,
          });
        });
    },
    imageCropped(image: Blob) {
      this.profileImage = image;
    },
  },
});
</script>
