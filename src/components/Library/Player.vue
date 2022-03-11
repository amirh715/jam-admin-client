<template>
  <Card>
    <template #content>
      <BlockUI :blocked="waiting" class="wrapper">
        <div class="space-2-v" style="color: whitesmoke">
          <div class="flex flex-column justify-content-center align-items-center">
            <div
              @click="$router.push({ name: 'LibraryEntityDetails', query: { id: trackId } })"
              style="cursor: pointer"
              class="flex justify-content-center align-items-center">
                <h2>{{trackTitle}}</h2>
            </div>
            <div class="flex align-items-center">
              <!-- slider -->
              <number-displayer class="space-2-h" :value="totalDurationDisplayValue" />
              <Slider style="width: 10rem"
                :modelValue="currentSeekPosition"
                :min="0"
                :max="100"
                :disabled="disabled"
                @change="seekEnded"
              />
              <!-- #### -->
              <number-displayer class="space-2-h" :value="currentDurationDisplayValue" />
            </div>
            <div class="flex justify-content-center align-items-center">
              <Button
                @click="playButtonClicked"
                :disabled="disabled"
                class="p-button-sm p-button-link space-2-h" >
                  <vue-feather :type="playing ? 'pause' : 'play'" size="2.5rem"></vue-feather>
              </Button>
            </div>
          </div>
        </div>
      </BlockUI>
    </template>
  </Card>
</template>

<style lang="scss" scoped>
.wrapper {
  width: 20rem;
  padding: 1rem;
}
</style>

<script lang="ts">
import { defineComponent } from 'vue';
import { AudioManager } from '@/services/AudioManager';
import NumberDisplayer from '../common/NumberDisplayer.vue';

export default defineComponent({
  components: { NumberDisplayer },
  name: 'player',
  emits: [
    'play',
    'pause',
    'seek',
    'skipForward',
    'skipBack',
    'shuffle',
    'repeat',
  ],
  props: {
    trackId: String,
    trackTitle: String,
    currentDuration: Number,
    totalDuration: Number,
    playing: Boolean,
    waiting: Boolean,
    shuffleOn: Boolean,
    shuffleDisabled: Boolean,
    repeatOn: Boolean,
    repeatDisabled: Boolean,
    seekDisabled: Boolean,
    skipBackDisabled: Boolean,
    skipForwardDisabled: Boolean,
    disabled: Boolean,
  },
  computed: {
    currentSeekPosition() {
      return (this.currentDuration * 100) / this.totalDuration;
    },
    currentDurationDisplayValue() {
      return AudioManager.getDurationForDisplay(this.currentDuration);
    },
    totalDurationDisplayValue() {
      return AudioManager.getDurationForDisplay(this.totalDuration);
    },
  },
  methods: {
    playButtonClicked() {
      this.$emit(this.playing ? 'pause' : 'play');
    },
    seekEnded(seekPosition: number) {
      this.$emit('seek', seekPosition);
    },
  },
});
</script>
