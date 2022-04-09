<template>
  <div>
    <Card>
      <template #content>
        <div class="grid">
          <div class="col-3">
            <div class="image">
              <Skeleton v-if="imageLoading" width="100%" height="100%" />
              <img v-else :src="imageSrc" style="width: 100%; height: 100%;" />
            </div>
          </div>
          <div class="col-9">
            <base-library-entity-details :entity="track" />
            <div class="flex space-2-v">
              <div class="flex">
                <vue-feather type="calendar"></vue-feather>
                <div class="space-h">
                  <date-time-displayer
                    v-if="track.releaseDate"
                    :datetime="track.releaseDate"
                    :options="{fullTextFormat: 'N Y'}"
                  />
                  <span v-else>تاریخ انتشار ندارد</span>
                </div>
              </div>
              <div class="flex space-2-h">
                <vue-feather type="disc"></vue-feather>
                <span class="space-h">{{track.recordLabel || 'رکورد لیبل ندارد'}}</span>
              </div>
              <div class="flex">
                <vue-feather type="user"></vue-feather>
                <span class="space-h">{{track.producer || 'تهیه کننده ندارد'}}</span>
              </div>
              <div class="flex space-h">
                <vue-feather type="music"></vue-feather>
                <div class="space-h flex" v-if="isAlbumTrack">
                  <span class="space-h">آلبوم: </span>
                  <Button @click="goToTrackAlbum" class="p-button-sm p-button-link"
                    >{{track.album && track.album.title}}</Button>
                </div>
                <div v-else>
                  <span class="space-h">{{(track.album && track.album.title) || 'تک آهنگ'}}</span>
                </div>
              </div>
              <div class="flex space-h">
                <vue-feather type="user"></vue-feather>
                <span class="space-h">هنرمند:</span>
                <Button @click="goToTrackArtist" class="p-button-sm p-button-link">
                  <span class="space-h">{{track.artist && track.artist.title}}</span>
                </Button>
              </div>
            </div>
            <div class="flex">
              <div class="flex space-v">
                <vue-feather type="file"></vue-feather>
                <span class="space-h">فرمت فایل:‌ {{track.format}}</span>
              </div>
              <div class="flex space">
                <vue-feather type="cloud"></vue-feather>
                <span class="space-h">حجم فایل آهنگ:‌ {{track.audioSize}} کیلوبایت</span>
              </div>
            </div>
            <div class="flex align-items-center">
              <vue-feather type="file-text"></vue-feather>
              <div class="space-h">
                <p v-if="track.lyrics">{{track.lyrics}}</p>
                <p v-else>لیریک ندارد</p>
              </div>
            </div>
            <div class="flex space-2-v">
              <Button @click="playButtonClicked" class="p-button-link">
                <vue-feather
                  :type="
                    isThisTrackBeingPlayed &&
                    $store.state.player.isPlaying ? 'pause-circle' : 'play-circle'"
                  size="3rem"
                ></vue-feather>
              </Button>
            </div>
            <div class="space-2-v">
              <library-sensitive-options-card
                :value="track"
                @deleteEntity="deleteTrack"
                @publish="publish"
                @archive="archive"
              />
              <div class="space-2-v flex">
                <Button @click="editTrackDialogVisible = true" class="p-button-sm">
                  <vue-feather type="edit"></vue-feather>
                  <span class="space-h">تغییر</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </template>
    </Card>
  </div>
  <Dialog v-model:visible="editTrackDialogVisible" style="width: 40%">
    <edit-artwork :artwork="track" />
  </Dialog>
</template>

<style lang="scss" scoped>
.image {
  border: 1px solid wheat;
  width: 22rem;
  height: 22rem;
  border-radius: 4px;
}
</style>

<script lang="ts">
import { defineComponent } from 'vue';
import { TrackDetails as TrackDetailsDTO } from '@/classes/Library/DTOs/queries/TrackDetails';
import BaseLibraryEntityDetails from './BaseLibraryEntityDetails.vue';
import LibrarySensitiveOptionsCard from './LibrarySensitiveOptionsCard.vue';
import { LibraryService } from '@/services/LibraryService';
import EditArtwork from './EditArtwork.vue';
import DateTimeDisplayer from '../common/DateTimeDisplayer.vue';

export default defineComponent({
  name: 'track-details',
  emits: ['change'],
  components: {
    BaseLibraryEntityDetails,
    LibrarySensitiveOptionsCard,
    EditArtwork,
    DateTimeDisplayer,
  },
  props: {
    track: TrackDetailsDTO,
  },
  data() {
    return {
      imageLoading: false,
      imageSrc: null,
      audioSrc: null,
      editTrackDialogVisible: false,
    };
  },
  computed: {
    isAlbumTrack() {
      return this.track.album;
    },
    isThisTrackBeingPlayed() {
      return !this.$store.state.player.isStopped &&
        this.$store.state.player.currentTrack.id === this.track.id;
    },
  },
  methods: {
    goToTrackAlbum() {
      this.$router.push({ name: 'LibraryEntityDetails', query: { id: this.track.album.id } });
    },
    goToTrackArtist() {
      this.$router.push({ name: 'LibraryEntityDetails', query: { id: this.track.artist.id } });
    },
    playButtonClicked() {
      if (!this.isThisTrackBeingPlayed) {
        this.$store.dispatch('PLAY', this.track);
      } else if (this.isThisTrackBeingPlayed && this.$store.state.player.isPlaying) {
        this.$store.dispatch('PAUSE');
      } else {
        this.$store.dispatch('RESUME');
      }
    },
    deleteTrack() {
      LibraryService.remove(this.track.id)
        .then(() => {
          this.$router.push({ name: 'LibraryListing' });
          this.$toast.add({
            severity: 'success',
            detail: 'آهنگ با موفقیت حذف شد.',
            life: 4000,
          });
        })
        .catch((err) => {
          this.$toast.add({
            severity: 'error',
            detail: err.message,
            life: 4000,
          });
        });
    },
    publish() {
      LibraryService.publish(this.track.id)
        .then(() => {
          this.$toast.add({
            severity: 'success',
            detail: 'آهنگ با موفقیت منتشر شد.',
            life: 4000,
          });
          this.$emit('change');
        })
        .catch((err) => {
          this.$toast.add({
            severity: 'error',
            detail: err.message,
            life: 4000,
          });
        });
    },
    archive() {
      LibraryService.archive(this.track.id)
        .then(() => {
          this.$toast.add({
            severity: 'success',
            detail: 'آهنگ با موفقیت آرشیو شد.',
            life: 4000,
          });
          this.$emit('change');
        })
        .catch((err) => {
          this.$toast.add({
            severity: 'error',
            detail: err.message,
            life: 4000,
          });
        });
    },
  },
  mounted() {
    this.imageLoading = true;
    LibraryService.getImageById(this.track.id)
      .then((image) => {
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = () => {
          this.imageSrc = reader.result;
        };
      })
      .finally(() => {
        this.imageLoading = false;
      });
  },
});
</script>
