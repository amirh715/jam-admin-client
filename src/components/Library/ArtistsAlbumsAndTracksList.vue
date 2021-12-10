<template>
  <TabView>
    <TabPanel header="آلبوم ها">
      <library-listing-table :items="albums" />
    </TabPanel>
    <TabPanel header="تک آهنگ ها">
      <library-listing-table :items="tracks" />
    </TabPanel>
  </TabView>
</template>

<style lang="scss" scoped>

</style>

<script lang="ts">
import { defineComponent } from 'vue';
import LibraryListingTable from './LibraryListingTable.vue';

export default defineComponent({
  components: { LibraryListingTable },
  props: {
    tracks: [],
    albums: [],
  },
  name: 'library-artists-albums-and-tracks-list',
});
</script>
