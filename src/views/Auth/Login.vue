<template>
  <div class="container">
    <login-form />
    <Button
      class="p-button-link p-button-sm"
      @click="goToForgotPassword"
      >رمزم را فراموش کرده ام</Button>
  </div>
</template>

<style lang="scss" scoped>
.container {
  width: 30rem;
  height: 100%;
  margin: auto;
}
</style>

<script>
import LoginForm from '../../components/Auth/AuthLoginForm.vue';

export default {
  components: { LoginForm },
  data() {
    return {};
  },
  methods: {
    goToForgotPassword() {
      this.$router.push({ name: 'ForgotPassword' });
    },
  },
};
</script>
