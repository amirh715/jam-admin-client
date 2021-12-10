<template>
  <BlockUI :blocked="waiting" style="width: 30rem; margin: auto;">
    <Card>
      <template #content>
        <div class="flex flex-column justify-content-center">
          <div class="space-v">
            <h3>کد تایید را وارد کنید</h3>
          </div>
          <div class="space-v">
            <base-input-text
              label="کد تایید"
              v-model="code"
              @keyup="changed($event.target.value)"
              :errors="v$.code.$errors"
            />
          </div>
        </div>
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
import { user } from '../../validators';
import { IBusinessError } from '@/classes/common/IBusinessError';
import { AuthService } from '../../services/AuthService';

export default defineComponent({
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      mobile: this.$route.query.mobile,
      code: null,
      waiting: false,
    };
  },
  validations() {
    const { mobile } = user;
    return {
      mobile: { mobile: helpers.withMessage(() => 'شماره موبایل درست نیست', mobile) },
      code: {},
    };
  },
  methods: {
    submit() {
      this.waiting = true;
      AuthService.verifyUser(this.mobile, this.code)
        .then(() => this.$router.push({ name: 'Login' }))
        .then(() => {
          this.$toast.add({
            severity: 'success',
            detail: 'اکانت شما فعال شد. لطفا وارد شوید.',
            life: 4000,
          });
        })
        .catch((err: IBusinessError) => {
          this.$toast.add({
            severity: 'error',
            detail: err.message,
            life: 4000,
          });
        })
        .finally(() => { this.waiting = false; });
    },
    changed(value: string) {
      if (value.length < 4) return;
      console.log(this.code);
      this.submit();
    },
  },
  mounted() {
    this.waiting = true;
    AuthService.requestVerification(this.mobile)
      .then(() => {
        this.$toast.add({
          severity: 'success',
          detail: 'پیامکی حاوی کد تایید برای شما ارسال شد.',
          life: 4000,
        });
      })
      .catch((err: IBusinessError) => {
        this.$toast.add({
          severity: 'warn',
          detail: err.message,
          life: 4000,
        });
      })
      .finally(() => { this.waiting = false; });
    this.waiting = false;
  },
});
</script>
