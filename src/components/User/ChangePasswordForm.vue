<template>
  <div class="flex flex-column">
    <h3 class="space-2-v text-center">تغییر رمز</h3>
    <div><hr/></div>
    <form @submit="submit" class="flex flex-column">
      <div>
        <base-input-text
          label="رمز جدید"
          type="password"
          v-model="newPassword"
          @change="v$.newPassword.$touch"
          :errors="v$.newPassword.$errors"
        />
      </div>
      <div>
        <base-input-text
          label="تکرار رمز جدید"
          type="password"
          v-model="newPasswordAgain"
          @change="v$.newPasswordAgain.$touch"
          :errors="v$.newPasswordAgain.$errors"
        />
      </div>
      <div><hr/></div>
      <div class="space-2-v flex justify-content-center">
        <Button :disabled="v$.$invalid" type="submit" class="p-button-sm">
          <vue-feather type="check"></vue-feather>
          <span class="space-h">برو</span>
        </Button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { helpers, sameAs } from '@vuelidate/validators';
import { user } from '@/validators';
import { UserService } from '@/services/UserService';
import { ChangePasswordRequest } from '@/classes/User/DTOs/commands/ChangePasswordRequest';
import { UserDetails } from '@/classes/User/DTOs/queries/UserDetails';

export default defineComponent({
  setup() {
    return { v$: useVuelidate() };
  },
  emits: ['submit'],
  props: {
    user: UserDetails,
  },
  data() {
    return {
      newPassword: null,
      newPasswordAgain: null,
    };
  },
  validations() {
    const {
      password,
    } = user;
    return {
      newPassword: { newPassword: helpers.withMessage(() => 'رمز باید حداقل ۸ کاراکتر باشد.', password) },
      newPasswordAgain: { newPasswordAgain: helpers.withMessage(() => 'رمز جدید با تکرار آن یکی نیست.', sameAs(this.newPassword)) },
    };
  },
  methods: {
    submit() {
      const dto = new ChangePasswordRequest(
        this.user.id,
        this.newPassword,
      );
      UserService.changePassword(dto)
        .then(() => {
          this.$emit('submit');
          this.$toast.add({
            severity: 'success',
            detail: 'رمز اکانت با موفقیت تغییر کرد.',
            life: 4000,
          });
        })
        .catch((err) => {
          this.$toast.add({
            severity: 'error',
            detail: err.message,
            life: 4000,
          });
        });
    },
  },
});
</script>
