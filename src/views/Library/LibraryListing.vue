<template>
  <div>
    <library-filters-panel @change="filtersChanged" />
    <library-listing-table :items="items" :loading="loading" @loadMore="loadMoreClicked" />
  </div>
</template>

<style lang="scss" scoped>

</style>

<script lang="ts">
import { defineComponent } from 'vue';
import { LibraryService } from '@/services/LibraryService';
import LibraryListingTable from '../../components/Library/LibraryListingTable.vue';
import LibraryFiltersPanel from '@/components/Library/LibraryListingFiltersPanel.vue';
import { GetLibraryEntitiesByFiltersRequest } from '@/classes/Library/DTOs/commands/GetLibraryEntitiesByFiltersRequest';

export default defineComponent({
  components: { LibraryListingTable, LibraryFiltersPanel },
  data() {
    return {
      items: [],
      filters: null,
      loading: false,
      waiting: false,
      waitingTimer: null,
      limit: 30,
      offset: 0,
    };
  },
  methods: {
    fetch() {
      this.loading = true;
      LibraryService.getByFilters(this.filters)
        .then((items) => {
          this.items = items;
          this.loadImages();
        })
        .catch((err) => {
          this.$toast.add({
            severity: 'error',
            detail: err.message,
            life: 4000,
          });
        })
        .finally(() => {
          this.loading = false;
        });
    },
    async loadImages() {
      for (const entity of this.items) {
        try {
          const image = await LibraryService.getImageById(entity.id);
          const reader = new FileReader();
          reader.readAsDataURL(image);
          reader.onload = () => {
            entity.imageSrc = reader.result;
          };
        } catch (err) {
          console.log(err);
        }
      }
    },
    loadMoreClicked() {
      this.filters.offset += this.filters.limit;
    },
    filtersChanged(filters: GetLibraryEntitiesByFiltersRequest) {
      if (this.waiting) {
        clearTimeout(this.waitingTimer);
      } else {
        this.waiting = true;
      }
      this.waitingTimer = setTimeout(() => {
        this.waiting = false;
        this.filters = filters;
        this.fetch();
      }, 1000);
    },
  },
  created() {
    this.fetch();
  },
});
</script>
