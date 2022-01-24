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
        <span class="space-h">پخش ماهانه:‌
          <number-displayer :value="entity.monthlyPlayedCount" />
        </span>
      </div>
      <div class="flex space-4-h">
        <vue-feather type="play"></vue-feather>
        <span class="space-h">مجموع پخش:‌
          <number-displayer :value="entity.totalPlayedCount" />
        </span>
      </div>
    </div>
    <div class="flex space-2-v">
      <div class="flex">
        <vue-feather type="user"></vue-feather>
        <span class="space-h">ایجاد کننده:</span>
        <span>{{entity.creatorName}}</span>
      </div>
      <div class="flex space-4-h">
        <vue-feather type="clock"></vue-feather>
        <span class="space-h">تاریخ و زمان ایجاد:</span>
        <date-time-displayer :datetime="entity.createdAt" /><br/>
      </div>
    </div>
    <div class="flex">
      <div class="flex">
        <vue-feather type="user"></vue-feather>
        <span class="space-h">آخرین بروزرسانی کننده:</span>
        <span>{{entity.updaterName}}</span>
      </div>
      <div class="flex space-4-h">
        <vue-feather type="clock"></vue-feather>
        <span class="space-h">تاریخ و زمان آخرین بروزرسانی:</span>
        <date-time-displayer :datetime="entity.lastModifiedAt" />
      </div>
    </div>
    <div>
      <p class="text-right">{{entity.description}}</p>
    </div>
    <div v-if="entity.flagNote" class="text-right flex align-items-center colorful space-v">
      <vue-feather type="flag"></vue-feather>
      <b class="space-h">{{entity.flagNote}}</b>
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
import PublishedStateTag from '@/components/Library/PublishedStateTag.vue';
import DateTimeDisplayer from '../common/DateTimeDisplayer.vue';

export default defineComponent({
  name: 'base-library-entity-details',
  components: {
    PublishedStateTag,
    DateTimeDisplayer,
  },
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
