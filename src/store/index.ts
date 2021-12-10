import { createStore } from 'vuex';
import { decode } from 'jsonwebtoken';
import { AuthService } from '@/services/AuthService';
import { COMMIT_TYPES } from './COMMIT_TYPES';
import { UserRole } from '@/classes/User/Types/UserRole';

export default createStore({
  state: {
    isOnline: false,
    subject: AuthService.isAuthenticated() ? AuthService.getSubjectId() : null,
    role: AuthService.isAuthenticated() ? AuthService.getRole() : null,
    isAuthenticated: AuthService.isAuthenticated(),
    userName: null,
  },
  mutations: {
    online(state) {
      state.isOnline = true;
    },
    offline(state) {
      state.isOnline = false;
    },
    login(state, payload: {subject: string, role: UserRole}) {
      state.isAuthenticated = true;
      state.subject = payload.subject;
      state.role = payload.role;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.subject = null;
      state.role = null;
      state.userName = '';
    },
  },
  actions: {
    login({ commit }, args: { mobile: string, password: string, fcmToken: string }) {
      AuthService.login(args.mobile, args.password, args.fcmToken)
        .then((token) => {
          const payload: any = decode(token);
          commit(COMMIT_TYPES.LOGIN, { subject: payload.sub, role: payload.role });
        });
    },
    logout({ commit }) {
      commit('logout');
    },
  },
  modules: {
  },
});
