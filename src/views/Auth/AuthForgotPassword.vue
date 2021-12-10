<template>
  <auth-forgot-password-form />
  <Button
    class="p-button-link p-button-sm"
    @click="goToLogin">
    بازگشت به قسمت ورود
  </Button>
</template>

<style lang="scss" scoped>

</style>

<script lang="ts">
import { defineComponent } from 'vue';
import AuthForgotPasswordForm from '../../components/Auth/AuthForgotPasswordForm.vue';

export default defineComponent({
  components: {
    AuthForgotPasswordForm,
  },
  setup() {
    return {
    };
  },
  methods: {
    goToLogin() {
      this.$router.push({ name: 'Login' });
    },
  },
});
</script>
