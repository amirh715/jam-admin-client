import { createStore } from 'vuex';
import { decode } from 'jsonwebtoken';
import { AuthService } from '@/services/AuthService';
import { COMMIT_TYPES } from './COMMIT_TYPES';
import { UserRole } from '@/classes/User/Types/UserRole';
import { player } from '@/store/modules/player';
import router from '@/router';
import { ACTION_TYPES } from './ACTION_TYPES';

export default createStore({
  state: {
    isOnline: false,
    subject: AuthService.isAuthenticated() ? AuthService.getSubjectId() : null,
    role: AuthService.isAuthenticated() ? AuthService.getRole() : null,
    isAuthenticated: AuthService.isAuthenticated(),
    userName: null,
    uploadProgressValue: 0,
  },
  mutations: {
    online(state) {
      state.isOnline = true;
    },
    offline(state) {
      state.isOnline = false;
    },
    [COMMIT_TYPES.LOGIN](state, payload: {subject: string, role: UserRole}) {
      state.isAuthenticated = true;
      state.subject = payload.subject;
      state.role = payload.role;
    },
    [COMMIT_TYPES.LOGOUT](state) {
      state.isAuthenticated = false;
      state.subject = null;
      state.role = null;
      state.userName = '';
    },
    [COMMIT_TYPES.UPLOADING](state, payload: {uploadProgressValue: number}) {
      state.uploadProgressValue = payload.uploadProgressValue;
    },
    [COMMIT_TYPES.NOT_UPLOADING](state) {
      state.uploadProgressValue = 0;
    },
  },
  actions: {
    async [ACTION_TYPES.LOGIN]({ commit }, args: { mobile: string, password: string }) {
      try {
        const token = await AuthService.login(args.mobile, args.password);
        const payload: any = decode(token);
        commit(COMMIT_TYPES.LOGIN, { subject: payload.sub, role: payload.role });
        router.push({ name: 'Home' });
        return Promise.resolve();
      } catch (err) {
        return Promise.reject(err);
      }
    },
    [ACTION_TYPES.LOGOUT]({ commit }) {
      AuthService.logout();
      commit(COMMIT_TYPES.LOGOUT);
      router.push({ name: 'Login' });
    },
  },
  modules: {
    player,
  },
});
