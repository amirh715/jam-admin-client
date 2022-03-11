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
            <base-library-entity-details :entity="album" />
            <div class="flex space-2-v">
              <div class="flex">
                <vue-feather type="calendar"></vue-feather>
                <div class="space-h">
                  <date-time-displayer
                    v-if="album.releaseDate"
                    :datetime="album.releaseDate"
                    :options="{fullTextFormat: 'N Y'}"
                  />
                    <span v-else class="space-h">تاریخ انتشار ندارد</span>
                </div>
              </div>
              <div class="flex space-2-h">
                <vue-feather type="disc"></vue-feather>
                <span class="space-h">{{album.recordLabel || 'رکورد لیبل ندارد'}}</span>
              </div>
              <div class="flex">
                <vue-feather type="user"></vue-feather>
                <span class="space-h">{{album.producer || 'تهیه کننده ندارد'}}</span>
              </div>
              <div class="flex space-h">
                <vue-feather type="user"></vue-feather>
                <span class="space-h">هنرمند:</span>
                <Button @click="goToAlbumArtist" class="p-button-sm p-button-link">
                  <span class="space-h">{{album.artist && album.artist.title}}</span>
                </Button>
              </div>
            </div>
            <div class="flex space-3-v">
              <library-sensitive-options-card
                :value="album"
                @deleteEntity="deleteAlbum"
                @publish="publish"
                @archive="archive"
              />
            </div>
            <div class="flex">
              <div class="space-h">
                <Button @click="newAlbumTrack" class="p-button-sm">
                  <vue-feather type="plus"></vue-feather>
                  <span class="space-h">آهنگ جدید</span>
                </Button>
              </div>
              <div class="space-h">
                <Button @click="editArtworkDialogVisible = true" class="p-button-sm">
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
      <library-listing-table :items="album.tracks" />
    </div>
  </div>
  <Dialog v-model:visible="editArtworkDialogVisible" style="width: 40%">
    <edit-artwork :artwork="album" />
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
import { AlbumDetails as AlbumDetailsDTO } from '@/classes/Library/DTOs/queries/AlbumDetails';
import BaseLibraryEntityDetails from './BaseLibraryEntityDetails.vue';
import LibraryListingTable from './LibraryListingTable.vue';
import LibrarySensitiveOptionsCard from './LibrarySensitiveOptionsCard.vue';
import EditArtwork from './EditArtwork.vue';
import { LibraryService } from '@/services/LibraryService';

export default defineComponent({
  name: 'album-details',
  components: {
    BaseLibraryEntityDetails,
    LibraryListingTable,
    LibrarySensitiveOptionsCard,
    EditArtwork,
  },
  props: {
    album: AlbumDetailsDTO,
  },
  data() {
    return {
      editArtworkDialogVisible: false,
      imageLoading: false,
      imageSrc: null,
    };
  },
  methods: {
    goToAlbumArtist() {
      this.$router.push({ name: 'LibraryEntityDetails', query: { id: this.album.artist.id } });
    },
    newAlbumTrack() {
      this.$router.push({ name: 'NewTrack', query: { albumId: this.album.id, albumTitle: this.album.title } });
    },
    publish() {
      LibraryService.publish(this.album.id)
        .then(() => {
          this.$router.push({ name: 'LibraryListing' });
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
      LibraryService.archive(this.album.id)
        .then(() => {
          this.$router.push({ name: 'LibraryListing' });
        })
        .catch((err) => {
          this.$toast.add({
            severity: 'error',
            detail: err.message,
            life: 4000,
          });
        });
    },
    deleteAlbum() {
      LibraryService.remove(this.album.id)
        .then(() => {
          this.$router.push({ name: 'LibraryListing' });
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
    LibraryService.getImageById(this.album.id)
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
