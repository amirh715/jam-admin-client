<template>
  <div>
    <Card>
      <template #content>
        <div class="grid">
          <div class="col-3">
            <div class="image">
              <Skeleton v-if="imageLoading" width="100%" height="100%"/>
              <img v-else :src="imageSrc" style="width: 100%; height: 100%;"/>
            </div>
          </div>
          <div class="col-9">
            <base-library-entity-details :entity="artist" />
            <div class="flex space-v">
              <Button v-if="artist.instagramId" @click="goToInstagramPage"
                class="p-button-sm p-button-outlined">
                  <vue-feather type="instagram"></vue-feather>
                  <span class="space-h" style="direction: ltr">@{{artist.instagramId}}</span>
              </Button>
              <div v-else class="flex">
                <vue-feather type="instagram"></vue-feather>
                <span class="space-h">اینستاگرام ندارد</span>
              </div>
            </div>
            <div class="flex space-2-v">
              <library-sensitive-options-card
                :value="artist"
                @deleteEntity="deleteArtist"
                @publish="publish"
                @archive="archive"
              />
            </div>
            <div class="flex">
              <div class="space-h">
                <Button @click="newAlbum" class="p-button-sm">
                  <vue-feather type="plus"></vue-feather>
                  <span class="space-h">آلبوم جدید</span>
                </Button>
              </div>
              <div class="space-2-h">
                <Button @click="newTrack" class="p-button-sm">
                  <vue-feather type="plus"></vue-feather>
                  <span class="space-h">تک آهنگ جدید</span>
                </Button>
              </div>
              <div class="space-h">
                <Button @click="editArtistDialogVisible = true" class="p-button-sm">
                  <vue-feather type="edit"></vue-feather>
                  <span class="space-h">تغییر</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </template>
    </Card>
    <div class="space-2-v">
      <artists-albums-and-tracks-list :tracks="singles" :albums="albums" />
    </div>
  </div>
  <Dialog v-model:visible="editArtistDialogVisible" style="width: 40%">
    <edit-artist :artist="artist" />
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
import * as _ from 'lodash';
import { defineComponent } from 'vue';
import { ArtistDetails as ArtistDetailsDTO } from '@/classes/Library/DTOs/queries/ArtistDetails';
import ArtistsAlbumsAndTracksList from './ArtistsAlbumsAndTracksList.vue';
import LibrarySensitiveOptionsCard from './LibrarySensitiveOptionsCard.vue';
import BaseLibraryEntityDetails from './BaseLibraryEntityDetails.vue';
import { LibraryService } from '@/services/LibraryService';
import { GetLibraryEntitiesByFiltersRequest } from '@/classes/Library/DTOs/commands/GetLibraryEntitiesByFiltersRequest';
import { TrackDetails } from '@/classes/Library/DTOs/queries/TrackDetails';
import EditArtist from '@/components/Library/EditArtist.vue';
import { AlbumDetails } from '@/classes/Library/DTOs/queries/AlbumDetails';

export default defineComponent({
  name: 'artist-details',
  components: {
    BaseLibraryEntityDetails,
    ArtistsAlbumsAndTracksList,
    LibrarySensitiveOptionsCard,
    EditArtist,
  },
  props: {
    artist: ArtistDetailsDTO,
  },
  data() {
    return {
      imageLoading: false,
      imageSrc: null,
      singles: [],
      albums: [],
      editArtistDialogVisible: false,
    };
  },
  methods: {
    fetchArtworks() {
      const artworksFilter = new GetLibraryEntitiesByFiltersRequest();
      artworksFilter.artistId = this.artist.id;
      LibraryService.getByFilters(artworksFilter)
        .then((entityDetails: TrackDetails[] | AlbumDetails[]) => {
          this.singles = _.filter(entityDetails, (track) =>
            track instanceof TrackDetails && !track.isAlbumTrack());
          this.albums = _.filter(entityDetails, (album) =>
            album instanceof AlbumDetails);
          this.loadArtworksImages();
        })
        .catch((err) => {
          this.$toast.add({
            severity: 'error',
            details: err.message,
            life: 4000,
          });
        });
    },
    async loadArtworksImages() {
      const reader = new FileReader();
      for (const single of this.singles) {
        const image = await LibraryService.getImageById(single.id);
        reader.readAsDataURL(image);
        reader.onload = () => {
          single.imageSrc = reader.result;
        };
      }
      for (const album of this.albums) {
        const image = await LibraryService.getImageById(album.id);
        reader.readAsDataURL(image);
        reader.onload = () => {
          album.imageSrc = reader.result;
        };
      }
    },
    goToInstagramPage() {
      window.open(`https://instagram.com/${this.artist.instagramId}`);
    },
    newAlbum() {
      this.$router.push({ name: 'NewAlbum', query: { artistId: this.artist.id, artistTitle: this.artist.title } });
    },
    newTrack() {
      this.$router.push({ name: 'NewTrack', query: { artistId: this.artist.id, artistTitle: this.artist.title } });
    },
    deleteArtist() {
      LibraryService.remove(this.artist.id)
        .then(() => {
          this.$router.push({ name: 'LibraryListing' });
          this.$toast.add({
            severity: 'success',
            detail: 'هنرمند با موفقیت حذف شد.',
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
    publish(cascadeArtistPublishCommandToArtworks: boolean) {
      LibraryService.publish(this.artist.id, cascadeArtistPublishCommandToArtworks)
        .then(() => {
          this.$router.push({ name: 'LibraryListing' });
          this.$toast.add({
            severity: 'success',
            detail: 'هنرمند با موفقیت منتشر شد.',
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
    archive() {
      LibraryService.archive(this.artist.id)
        .then(() => {
          this.$router.go();
          this.$toast.add({
            severity: 'success',
            detail: 'هنرمند با موفقیت آرشیو شد.',
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
  },
  mounted() {
    this.imageLoading = true;
    this.fetchArtworks();
    LibraryService.getImageById(this.artist.id)
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
