<template>
  <div v-if="entityType === 'Artist'">
    <artist-details :artist="entityDetails" />
  </div>
  <div v-else-if="entityType === 'Album'">
    <album-details :album="entityDetails" />
  </div>
  <div v-else-if="entityType === 'Track'">
    <track-details :track="entityDetails" @change="changed" />
  </div>
  <div v-else dir="ltr">
    <h1>There was a problem :(</h1>
    <b>Refresh the page</b>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ArtistDetails from '@/components/Library/ArtistDetails.vue';
import AlbumDetails from '@/components/Library/AlbumDetails.vue';
import TrackDetails from '@/components/Library/TrackDetails.vue';
import { ArtistDetails as ArtistDetailsDTO } from '@/classes/Library/DTOs/queries/ArtistDetails';
import { AlbumDetails as AlbumDetailsDTO } from '@/classes/Library/DTOs/queries/AlbumDetails';
import { TrackDetails as TrackDetailsDTO } from '@/classes/Library/DTOs/queries/TrackDetails';
import { LibraryService } from '@/services/LibraryService';
import { LibraryEntityDetails } from '@/classes/Library/DTOs/queries/LibraryEntityDetails';

export default defineComponent({
  components: {
    ArtistDetails,
    AlbumDetails,
    TrackDetails,
  },
  props: {
    entityId: String,
  },
  data() {
    return {
      entityDetails: ArtistDetailsDTO || AlbumDetailsDTO || TrackDetailsDTO,
    };
  },
  computed: {
    entityType() {
      if (this.entityDetails instanceof ArtistDetailsDTO) {
        return 'Artist';
      }
      if (this.entityDetails instanceof AlbumDetailsDTO) {
        return 'Album';
      }
      if (this.entityDetails instanceof TrackDetailsDTO) {
        return 'Track';
      }
      return 'N/A';
    },
  },
  methods: {
    setData(entityDetails: LibraryEntityDetails) {
      this.entityDetails = entityDetails;
    },
    changed() {
      const entityId = this.entityDetails.id;
      LibraryService.getById(entityId)
        .then((refetched) => {
          this.entityDetails = refetched;
        }).catch((err) => {
          this.$toast.add({
            severity: 'error',
            detail: err.message,
            life: 4000,
          });
        });
    },
  },
  beforeRouteEnter(to, from, next) {
    const entityId = to.query.id as string;
    LibraryService.getById(entityId)
      .then((entityDetails) => {
        next((vm) => {
          vm['setData'](entityDetails);
        });
      })
      .catch((err) => {
        next((vm) => {
          vm.$toast.add({
            severity: 'error',
            detail: err.message,
            life: 4000,
          });
        });
      });
  },
  beforeRouteUpdate(to, from, next) {
    const entityId = to.query.id as string;
    LibraryService.getById(entityId)
      .then((entityDetails) => {
        this.setData(entityDetails);
        next();
      })
      .catch((err) => {
        this.$toast.add({
          severity: 'error',
          detail: err.message,
          life: 4000,
        });
      });
  },
});
</script>
