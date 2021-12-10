<template>
  <div class="flex flex-column">
    <div class="flex align-items-center">
      <h1>{{entity.title}}</h1>
      <span class="space-2-h">( {{entityType}} )</span>
      <rating :cancel="false" :modelValue="entity.rate"/>
      <published-state-tag class="space-h" :published="entity.published" />
    </div>
    <div class="flex">
      <Chip dir="ltr" class="space-h" v-for="tag in entity.tags" :key="tag">#{{tag}}</Chip>
    </div>
    <div class="flex space-2-v">
      <Chip class="space-h" v-for="genre in entity.genres" :key="genre.id">{{genre.title}}</Chip>
    </div>
    <div class="flex">
      <div class="flex">
        <vue-feather type="play"></vue-feather>
        <span class="space-h">پخش ماهانه:‌ {{entity.monthlyPlayedCount}}</span>
      </div>
      <div class="flex space-4-h">
        <vue-feather type="play"></vue-feather>
        <span class="space-h">مجموع پخش:‌ {{entity.totalPlayedCount}}</span>
      </div>
    </div>
    <div>
      <p class="text-right">{{entity.description}}</p>
    </div>
    <div v-if="entity.flag" class="text-right flex align-items-center colorful">
      <vue-feather type="flag"></vue-feather>
      <p class="space-h">{{entity.flag}}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.colorful {
  color: var(--primary-color);
}
</style>

<script lang="ts">
import { defineComponent } from 'vue';
import { ArtistDetails as ArtistDetailsDTO } from '@/classes/Library/DTOs/queries/ArtistDetails';
import { AlbumDetails as AlbumDetailsDTO } from '@/classes/Library/DTOs/queries/AlbumDetails';
import { TrackDetails as TrackDetailsDTO } from '@/classes/Library/DTOs/queries/TrackDetails';

export default defineComponent({
  name: 'base-library-entity-details',
  props: {
    entity: ArtistDetailsDTO || AlbumDetailsDTO || TrackDetailsDTO,
  },
  computed: {
    entityType() {
      if (this.entity instanceof ArtistDetailsDTO) {
        return 'خواننده';
      }
      if (this.entity instanceof AlbumDetailsDTO) {
        return 'آلبوم';
      }
      if (this.entity instanceof TrackDetailsDTO) {
        return 'آهنگ';
      }
      return '';
    },
  },
});
</script>
