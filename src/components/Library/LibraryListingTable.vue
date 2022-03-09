<template>
  <div v-if="items && items.length > 0" style="margin: 1rem 0; height: 80vh;">
    <BlockUI :blocked="loading">
      <DataTable :value="items" stripedRows scrollHeight="flex"
        selectionMode="single" @rowSelect="itemClickedOn">
        <template #header>
          <number-displayer :value="items.length" />
        </template>
          <Column field="image" header="تصویر" bodyStyle="text-align: right">
            <template #body="slotProps">
              <Avatar
                :image="slotProps.data.imageSrc"
                :label="!slotProps.data.imageSrc && slotProps.data.title[0].toUpperCase()"
                shape="circle" />
            </template>
          </Column>
          <Column field="title" header="عنوان" bodyStyle="text-align: right">
          </Column>
          <Column field="rate" header="امتیاز" bodyStyle="text-align: right">
            <template #body="slotProps">
              <rating v-model="slotProps.data.rate" :readonly="true" :cancel="false" />
            </template>
          </Column>
          <Column field="monthlyPlayedCount" header="پخش ماهانه" bodyStyle="text-align: right">
            <template #body="slotProps">
              <number-displayer :value="slotProps.data.monthlyPlayedCount" />
            </template>
          </Column>
          <Column field="published" header="وضعیت انتشار" bodyStyle="text-align: right">
            <template #body="slotProps">
              <published-state-tag :published="slotProps.data.published" />
            </template>
          </Column>
          <Column field="creatorName" header="ایجاد کننده" bodyStyle="text-align: right">
            <template #body="slotProps">
              <span>{{slotProps.data.creatorName}}</span>
            </template>
          </Column>
          <Column field="flag" header="علامت گذاری" bodyStyle="text-align: right">
            <template #body="slotProps">
              <vue-feather
                v-if="slotProps.data.flagNote"
                type="flag"
                animation="pulse"
                class="colorful"
              ></vue-feather>
            </template>
          </Column>
        <template #footer>
          <Button @click="$emit('loadMore')" class="p-button-link">
            <vue-feather type="loader"></vue-feather>
          </Button>
        </template>
      </DataTable>
    </BlockUI>
  </div>
  <div v-else style="margin: 1rem 0">
    <no-data-notice :note="note" />
  </div>
</template>

<style lang="scss" scoped>
.colorful {
  color: var(--primary-color);
}
</style>

<script lang="ts">
import PublishedStateTag from '@/components/Library/PublishedStateTag.vue';
import NumberDisplayer from '../common/NumberDisplayer.vue';

export default {
  components: {
    PublishedStateTag,
    NumberDisplayer,
  },
  props: {
    items: Array,
    loading: Boolean,
    note: String,
  },
  methods: {
    itemClickedOn(e) {
      this.$router.push({ name: 'LibraryEntityDetails', query: { id: e.data.id } });
    },
  },
};
</script>
