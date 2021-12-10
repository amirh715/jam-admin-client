<template>
  <BlockUI :blocked="waiting" style="width: 40rem; margin: auto;">
    <Card>
      <template #content>
        <div v-if="requestStep" class="flex justify-content-center">
          <h3>شماره موبایل تان را وارد کنید</h3>
          <form class="flex flex-column" style="width: 50%; margin: auto;">
            <base-input-text
              label="موبایل"
              v-model="mobile"
            />
            <div style="margin: 1rem">
              <Button
              @click="submitRequest"
              class="p-button-rounded"
              >برو</Button>
            </div>
          </form>
        </div>
        <div v-else class="flex">
          <h3>کد تایید و رمز جدیدتان را وارد کنید</h3>
          <form class="flex flex-column" style="width: 80%; margin: auto;">
            <base-input-text
              label="کد تایید"
              v-model="resetCode"
            />
            <base-input-text
              label="رمز جدید"
              type="password"
              v-model="newPassword"
            />
            <base-input-text
              label="تکرار رمز جدید"
              type="password"
              v-model="newPasswordAgain"
            />
            <div style="margin: 0.5rem 0">
              <Button
                class="p-button-rounded"
                style="margin: 10px"
                @click="submitReset"
              >برو</Button>
            </div>
            <div style="margin: 1rem 0">
              <Button @click="requestStep = true"
              class="p-button-rounded p-button-link p-button-sm"
                >شماره موبایلم {{mobile}} نیست
              </Button>
            </div>
          </form>
        </div>
      </template>
    </Card>
  </BlockUI>
</template>

<style lang="scss" scoped>

</style>

<script lang="ts">
import { AuthService } from '@/services/AuthService';
import BaseInputText from '../common/BaseInputText.vue';
import { IBusinessError } from '../../classes/common/IBusinessError';

export default {
  components: { BaseInputText },
  data() {
    return {
      requestStep: true,
      waiting: false,
      mobile: null,
      resetCode: null,
      newPassword: null,
      newPasswordAgain: null,
    };
  },
  methods: {
    submitRequest() {
      this.waiting = true;
      AuthService.requestPasswordReset(this.mobile)
        .then(() => {
          this.$toast.add({
            severity: 'success',
            detail: 'پیامکی حاوی کد تایید برای شما ارسال شد.',
            life: 4000,
          });
          this.requestStep = false;
        })
        .catch((error: IBusinessError) => {
          this.$toast.add({
            severity: 'error',
            detail: error.message,
            life: 4000,
          });
        })
        .finally(() => { this.waiting = false; });
    },
    submitReset() {
      this.waiting = true;
      AuthService.resetPassword(
        this.mobile,
        this.resetCode,
        this.newPassword,
      )
        .then(() => {
          this.$toast.add({
            severity: 'success',
            detail: 'رمز اکانت شما ریست شد. لطفا وارد شوید.',
            life: 4000,
          });
          this.$router.push({ name: 'Login' });
        })
        .catch((error: IBusinessError) => {
          this.resetCode = null;
          this.$toast.add({
            severity: 'error',
            detail: error.message,
            life: 4000,
          });
        })
        .finally(() => { this.waiting = false; });
    },
    arePasswordsIdentical() {
      return this.$data.newPassword === this.$data.newPasswordAgain;
    },
  },
};
</script>
