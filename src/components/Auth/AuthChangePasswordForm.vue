<template>
  <div class="flex flex-column justify-content-center">
    <h3 class="text-center">تغییر رمز</h3>
    <form>
      <base-input-text
        label="رمز فعلی"
        type="password"
        v-model="currentPassword"
        @change="v$.currentPassword.$touch"
        :errors="v$.currentPassword.$errors"
      />
      <base-input-text
        label="رمز جدید"
        type="password"
        v-model="newPassword"
        @change="v$.newPassword.$touch"
        :errors="v$.newPassword.$errors"
      />
      <base-input-text
        label="تکرار رمز جدید"
        type="password"
        v-model="newPasswordAgain"
        @change="v$.newPasswordAgain.$touch"
        :errors="v$.newPasswordAgain.$errors"
      />
      <div style="margin: auto">
        <Button @click="submit" :disabled="v$.$invalid" class="p-button-sm">
          برو
        </Button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import useVuelidate from '@vuelidate/core';
import { helpers, sameAs } from '@vuelidate/validators';
import { user } from '@/validators';
import { AuthService } from '@/services/AuthService';

export default {
  setup() {
    return { v$: useVuelidate() };
  },
  emits: ['change'],
  data() {
    return {
      currentPassword: null,
      newPassword: null,
      newPasswordAgain: null,
    };
  },
  validations() {
    const { password } = user;
    return {
      currentPassword: { currentPassword: helpers.withMessage(() => 'رمز باید حداقل ۸ کاراکتر باشد.', password) },
      newPassword: { newPassword: helpers.withMessage(() => 'رمز باید حداقل ۸ کاراکتر باشد.', password) },
      newPasswordAgain: { newPasswordAgain: helpers.withMessage(() => 'رمز جدید باید با تکرار رمز جدید یکسان باشد.', sameAs(this.newPassword)) },
    };
  },
  methods: {
    submit() {
      AuthService.changePassword(this.currentPassword, this.newPassword)
        .then(() => {
          this.$toast.add({
            severity: 'success',
            detail: 'رمز شما با موفقیت تغییر کرد.',
            life: 4000,
          });
        })
        .catch((error) => {
          this.$toast.add({
            severity: 'error',
            detail: error.message,
            life: 4000,
          });
        })
        .finally(() => {
          this.$emit('change');
        });
    },
  },
};
</script>
