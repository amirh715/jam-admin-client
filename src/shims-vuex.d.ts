import { ComponentCustomProperties } from 'vue';
import { Store } from 'vuex';

declare module '@vue/runtime-core' {
  // Declare your own store states.
  interface State {
    isOnline: boolean,
    isOffline: boolean,
    subject: string,
    isAuthenticated: boolean,
  }

  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}
