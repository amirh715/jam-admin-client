<template>
  <div class="space-2-v flex justify-content-between">
    <Button @click="visible = true"
      class="p-button-sm">
        <vue-feather type="plus"></vue-feather>
        <span class="space-h">کاربر جدید</span>
    </Button>
  </div>
  <router-view></router-view>
  <Dialog v-model:visible="visible" style="width: 45vw;">
    <new-user-form @successfulSubmit="newUserCreated" />
  </Dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import NewUserForm from '@/components/User/NewUserForm.vue';

export default defineComponent({
  components: {
    NewUserForm,
  },
  data() {
    return {
      visible: false,
    };
  },
  methods: {
    newUserCreated() {
      this.visible = false;
      this.$router.push({ name: 'UserListing' });
    },
  },
});
</script>
