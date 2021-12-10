<template>
  <Menubar :style="{border: !$store.state.isOnline ? '1px solid tomato' : ''}">
    <template #start>
      <b @click="goHome" style="cursor: pointer">اپلیکیشن جم</b>
    </template>
    <template #end>
      <div v-if="$store.state.isOnline">
        <Avatar
          class="avatar-to-the-left"
          @click="openDropbox"
          style="cursor: pointer"
          :image="profielImageSrc"
          :label="!profielImageSrc && $store.state.userName"
          shape="circle"
        />
        <Menu ref="menu" :model="items" :popup="true" />
      </div>
      <div v-else>
        <vue-feather type="wifi-off" stroke="tomato"></vue-feather>
      </div>
    </template>
  </Menubar>
</template>

<script>
import { ProfileService } from '@/services/ProfileService';
import router from '../../router';
import { AuthService } from '../../services/AuthService';

export default {
  data() {
    return {
      name: null,
      profielImageSrc: null,
      items: [
        {
          label: 'پروفایل',
          command() { router.push('/profile'); },
        },
        {
          label: 'راهنما',
          command() { router.push({ name: 'Guide' }); },
        },
        {
          label: 'خروج',
          command() {
            AuthService.logout();
            router.push({ name: 'Login' });
          },
        },
      ],
    };
  },
  methods: {
    goHome() {
      router.push({ name: 'Home' });
    },
    openDropbox(event) {
      this.$refs.menu.toggle(event);
    },
    getProfileImage() {
      ProfileService.getProfileImage()
        .then((profileImage) => {
          const reader = new FileReader();
          reader.readAsDataURL(profileImage);
          reader.onload = () => {
            this.profielImageSrc = reader.result;
          };
        });
    },
  },
  mounted() {
    this.getProfileImage();
  },
};
</script>
