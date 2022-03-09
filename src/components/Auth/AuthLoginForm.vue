<template>
  <BlockUI :blocked="waiting">
    <Card>
      <template #content>
        <h2>ورود</h2>
        <form class="flex flex-column" style="margin: auto;">
          <base-input-text
            type="text"
            v-model="mobile"
            label="موبایل"
            @change="v$.mobile.$touch"
            :errors="v$.mobile.$errors"
          />
          <base-input-text
            type="password"
            v-model="password"
            label="رمز"
            @change="v$.password.$touch"
            :errors="v$.password.$errors"
          />
          <div style="margin: 1rem">
            <Button
              class="p-button-rounded"
              :disabled="v$.$invalid"
              @click="submit"
            >برو</Button>
          </div>
        </form>
      </template>
    </Card>
  </BlockUI>
</template>

<style lang="scss" scoped>
</style>

<script lang="ts">
import { defineComponent } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { helpers } from '@vuelidate/validators';
import { Errors } from '../../classes/common/Errors';
import {
  user,
} from '../../validators';
import { AuthService } from '../../services/AuthService';
import { IBusinessError } from '../../classes/common/IBusinessError';

export default defineComponent({
  setup() {
    return { v$: useVuelidate() };
  },
  name: 'login-form',
  data() {
    return {
      mobile: '',
      password: '',
      waiting: false,
    };
  },
  validations() {
    const { mobile, password } = user;
    return {
      mobile: { mobile: helpers.withMessage(() => 'شماره موبایل درست نیست', mobile) },
      password: { password: helpers.withMessage(() => 'رمز باید حداقل ۸ کاراکتر باشد', password) },
    };
  },
  methods: {
    submit() {
      if (this.v$.$error) return;
      this.waiting = true;
      this.v$.$touch();
      AuthService.login(this.mobile, this.password)
        .then(() => {
          this.$router.push({ name: 'Home' });
          this.$store.commit('login',
            { subject: AuthService.getSubjectId(), role: AuthService.getRole() });
        })
        .catch((err: IBusinessError) => {
          if (err.type === Errors.UserIsNotVerifiedError) {
            this.$router.push({ name: 'Verification', query: { mobile: this.mobile } });
          } else {
            this.$toast.add(
              {
                severity: 'error',
                summary: 'خطا',
                detail: err.message,
                life: 4000,
              },
            );
          }
        })
        .finally(() => { this.waiting = false; });
    },
  },
});
</script>
