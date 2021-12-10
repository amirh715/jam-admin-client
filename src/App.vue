<template>
  <div v-if="$store.state.isAuthenticated" class="flex flex-column" id="app">
    <div>
      <navbar></navbar>
    </div>
    <div class="flex align-items-start" id="main">
      <div id="panel-menu" style="position: relative">
        <side-menu></side-menu>
        <app-offline-notice />
      </div>
      <div id="router-view">
        <router-view/>
      </div>
    </div>
  </div>
  <div v-else>
    <router-view />
  </div>
  <ConfirmDialog></ConfirmDialog>
  <Toast position="bottom-left" />
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  #main {
    #panel-menu {
      width: 19%;
      height: 100%;
      margin: 0.5rem 0;
    }
    #router-view {
      width: 80%;
      height: 100%;
      margin: 0.5rem;
      overflow-y: auto;
    }
  }
}
.p-menubar {
  justify-content: space-between;
  .p-menubar-end {
    margin-left: 0;
    .avatar-to-the-left {
      float: left;
    }
  }
}
.p-rating-icon.pi-star-fill::before {
  content: '\e937';
}
</style>

<script lang="ts">
import SideMenu from './components/core/AppSideBar.vue';
import Navbar from './components/core/AppNavbar.vue';
import { AuthService } from './services/AuthService';

export default {
  components: { SideMenu, Navbar },
  data(): any {
    return {};
  },
  watch: {
    // '$route'(to : any, from : any) {
    //   const toDepth = to.path.split('/').length;
    //   const fromDepth = from.path.split('/').length;
    //   this.transition = toDepth < fromDepth ? 'slide-right' : 'slide-left';
    // },
  },
};
</script>
