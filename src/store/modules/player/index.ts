import { Module } from 'vuex';
import { PLAYER_COMMIT_TYPES } from './PLAYER_COMMIT_TYPES';
import { PLAYER_ACTION_TYPES } from './PLAYER_ACTION_TYPES';
import { AudioManager } from '@/services/AudioManager';
// import { LibraryService } from '@/services/LibraryService';
import { TrackDetails } from '@/classes/Library/DTOs/queries/TrackDetails';

const player: Module<{
  currentTrack: TrackDetails,
  currentDuration: number,
  totalDuration: number,
  playQueue: TrackDetails[],
  playQueueIndex: number;
  isPlaying: boolean,
  isPaused: boolean,
  isStopped: boolean,
  shuffleOn: boolean,
  repeatOn: boolean,
  isWaiting: boolean,
}, {
  isOnline: boolean,
  subject: string,
  role: string,
  isAuthenticated: boolean,
  userName: string,
}> = {
  state: {
    currentTrack: null,
    currentDuration: 0,
    totalDuration: 0,
    playQueue: [],
    playQueueIndex: 0,
    isPlaying: false,
    isPaused: false,
    isStopped: true,
    shuffleOn: false,
    repeatOn: false,
    isWaiting: false,
  },
  mutations: {
    [PLAYER_COMMIT_TYPES.PLAYING](state, {
      currentTrack, currentDuration, totalDuration, playQueueIndex, playQueue,
    }) {
      state.currentTrack = currentTrack;
      state.currentDuration = currentDuration;
      state.totalDuration = totalDuration;
      state.playQueueIndex = playQueueIndex;
      state.playQueue = playQueue;
      state.isPlaying = true;
      state.isPaused = false;
      state.isStopped = false;
      state.isWaiting = false;
    },
    [PLAYER_COMMIT_TYPES.PAUSED](state) {
      state.isPlaying = false;
      state.isPaused = true;
      state.isStopped = false;
      state.isWaiting = false;
    },
    [PLAYER_COMMIT_TYPES.STOPPED](state) {
      state.isPlaying = false;
      state.isPaused = false;
      state.isStopped = true;
      state.currentDuration = 0;
    },
    [PLAYER_COMMIT_TYPES.CHANGE_CURRENT_DURATION](state, { currentDuration }) {
      state.currentDuration = currentDuration;
    },
    [PLAYER_COMMIT_TYPES.SHUFFLE](state, shuffleOn) {
      state.shuffleOn = shuffleOn;
    },
    [PLAYER_COMMIT_TYPES.REPEAT](state, repeatOn) {
      state.repeatOn = repeatOn;
    },
    [PLAYER_COMMIT_TYPES.WAITING](state) {
      state.isWaiting = true;
    },
    [PLAYER_COMMIT_TYPES.STOP_WAITING](state) {
      state.isWaiting = false;
    },
    [PLAYER_COMMIT_TYPES.SETUP](state, {
      currentTrack,
      currentDuration,
      totalDuration,
      shuffleOn,
      repeatOn,
    }) {
      state.currentTrack = currentTrack;
      state.currentDuration = currentDuration;
      state.totalDuration = totalDuration;
      state.shuffleOn = shuffleOn;
      state.repeatOn = repeatOn;
      state.isPlaying = false;
      state.isPaused = !state.isPlaying;
      state.isStopped = !state.isPlaying && !state.isPaused;
    },
  },
  actions: {
    async [PLAYER_ACTION_TYPES.PLAY]({ commit }, track?: TrackDetails) {
      try {
        AudioManager.fillInQueue([track]);
        await AudioManager.play();
        const currentTrack = AudioManager.getCurrentTrack();
        const currentDuration = 0;
        const totalDuration = AudioManager.getTotalDuration();
        const playQueueIndex = AudioManager.getCurrentPlayQueueIndex();
        const playQueue = AudioManager.getCurrentPlayQueue();
        commit(PLAYER_COMMIT_TYPES.PLAYING, {
          currentTrack, currentDuration, totalDuration, playQueueIndex, playQueue,
        });
        setInterval(() => {
          const currentDuration = AudioManager.getCurrentDuration();
          commit(PLAYER_COMMIT_TYPES.CHANGE_CURRENT_DURATION, { currentDuration });
        }, 1000);
        return Promise.resolve();
      } catch (err) {
        return Promise.reject(err);
      }
    },
    [PLAYER_ACTION_TYPES.RESUME]({ commit }) {
      const currentTrack = AudioManager.getCurrentTrack();
      const playQueueIndex = AudioManager.getCurrentPlayQueueIndex();
      const currentDuration = AudioManager.getCurrentDuration();
      const playQueue = AudioManager.getCurrentPlayQueue();
      const totalDuration = AudioManager.getTotalDuration();
      AudioManager.resume();
      commit(PLAYER_COMMIT_TYPES.PLAYING, {
        currentTrack, currentDuration, totalDuration, playQueueIndex, playQueue,
      });
    },
    [PLAYER_ACTION_TYPES.PAUSE]({ commit }) {
      AudioManager.pause();
      commit(PLAYER_COMMIT_TYPES.PAUSED);
    },
    [PLAYER_ACTION_TYPES.STOP]({ commit }) {
      AudioManager.stop();
      commit(PLAYER_COMMIT_TYPES.STOPPED);
    },
    [PLAYER_ACTION_TYPES.SEEK]({ state }, seekPosition) {
      const duration = (seekPosition * state.totalDuration) / 100;
      AudioManager.seek(duration);
    },
    [PLAYER_ACTION_TYPES.SKIP_BACK]() {
      AudioManager.skipBack();
    },
    [PLAYER_ACTION_TYPES.SKIP_FORWARD]() {
      AudioManager.skipForward();
    },
    [PLAYER_ACTION_TYPES.SHUFFLE]({ state, commit }) {
      AudioManager.shuffle(!state.shuffleOn);
      commit(PLAYER_COMMIT_TYPES.SHUFFLE, !state.shuffleOn);
    },
    [PLAYER_ACTION_TYPES.REPEAT]({ state, commit }) {
      AudioManager.repeat(!state.repeatOn);
      commit(PLAYER_COMMIT_TYPES.REPEAT, !state.repeatOn);
    },
    // [PLAYER_ACTION_TYPES.SETUP]({ state, commit }) {
    // },
  },
};

export {
  player,
};
