<template>
  <div v-if="items && items.length > 0" style="margin: 1rem 0; height: 80vh;">
    <BlockUI :blocked="loading">
      <DataTable :value="items" stripedRows scrollHeight="flex"
        selectionMode="single" @rowSelect="itemClickedOn">
        <template #header>{{items.length}}</template>
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
          </Column>
          <Column field="published" header="وضعیت انتشار" bodyStyle="text-align: right">
            <template #body="slotProps">
              <published-state-tag :published="slotProps.data.published" />
            </template>
          </Column>
          <Column field="creatorName" header="ایجاد کننده" bodyStyle="text-align: right">
          </Column>
          <Column field="flag" header="علامت گذاری" bodyStyle="text-align: right">
          </Column>
        <template #footer>
          <Button class="p-button-link">
            <vue-feather type="loader"></vue-feather>
          </Button>
        </template>
      </DataTable>
    </BlockUI>
  </div>
  <div v-else style="margin: 1rem 0">
    <b style="color: var(--primary-color)">داده ای یافت نشد</b><br>
    <small style="color: whitesmoke">بهتر است فیلتر ها را تغییر دهید.</small>
  </div>
</template>

<style lang="scss" scoped>
</style>

<script lang="ts">
import PublishedStateTag from '@/components/Library/PublishedStateTag.vue';

export default {
  components: {
    PublishedStateTag,
  },
  props: {
    items: Array,
    loading: Boolean,
  },
  methods: {
    itemClickedOn(e) {
      this.$router.push({ name: 'LibraryEntityDetails', params: { id: e.data.id } });
    },
  },
};
</script>
