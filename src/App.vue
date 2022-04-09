<template>
  <div v-if="$store.state.isAuthenticated" class="flex flex-column" id="app">
    <div>
      <navbar></navbar>
    </div>
    <div class="flex justify-content-center align-items-start" id="main">
      <div id="panel-menu" style="position: relative">
        <side-menu></side-menu>
        <app-offline-notice />
        <transition name="slide-fade" class="space-v">
          <player
            v-if="!$store.state.player.isStopped"
            :trackId="$store.state.player.currentTrack.id"
            :trackTitle="$store.state.player.currentTrack.title"
            :currentDuration="$store.state.player.currentDuration"
            :totalDuration="$store.state.player.totalDuration"
            :playing="$store.state.player.isPlaying"
            :shuffleOn="$store.state.player.shuffleOn"
            :repeatOn="$store.state.player.repeatOn"
            :skipForwardDisabled="$store.state.player.playQueue.length ===
              $store.state.player.playQueueIndex + 1"
            @play="$store.state.player.isStopped ?
              $store.dispatch('PLAY', { track }) :
              $store.dispatch('RESUME')"
            @pause="$store.dispatch('PAUSE')"
            @seek="seekToPosition"
            @skipForward="$store.dispatch('SKIP_FORWARD')"
            @skipBack="$store.dispatch('SKIP_BACK')"
            @shuffle="$store.dispatch('SHUFFLE')"
            @repeat="$store.dispatch('REPEAT')"
          />
        </transition>
        <div v-show="$store.state.uploadProgressValue" class="space-v">
          <ProgressBar :value="$store.state.uploadProgressValue" :showValue="false" />
        </div>
      </div>
      <div id="router-view">
        <router-view />
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
      margin: 0.5rem 0;
    }
    #router-view {
      width: 80%;
      // height: 200px;
      margin: 0.5rem;
      max-height: 93vh;
      overflow-y: scroll;
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

export default {
  components: { SideMenu, Navbar },
  data(): any {
    return {};
  },
  methods: {
    seekToPosition(seekPosition: number) {
      this.$store.dispatch('SEEK', seekPosition);
    },
  },
  // watch: {
  //   '$route'(to, from) {
  //     const toDepth = to.path.split('/').length;
  //     const fromDepth = from.path.split('/').length;
  //     this.transition = toDepth < fromDepth ? 'slide-right' : 'slide-left';
  //   },
  // },
};
</script>
