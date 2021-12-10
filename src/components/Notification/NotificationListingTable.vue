<template>
  <div v-if="items.length > 0" class="space-2-v">
    <BlockUI :blocked="loading">
      <DataTable :value="items" stripedRows scrollHeight="flex"
        selectionMode="single" @rowSelect="onRowSelect" >
        <template #header>{{items.length}}</template>
        <Column field="title" header="عنوان" bodyStyle="text-align: right">
        </Column>
        <Column field="type" header="نوع" bodyStyle="text-align: right">
        </Column>
        <Column field="isSent" header="وضعیت ارسال" bodyStyle="text-align: right">
          <template #body="slotProps">
            <notification-is-sent-tag :isSent="slotProps.data.isSent" />
          </template>
        </Column>
        <Column field="recipientsCount" header="تعداد مخاطبان"
          bodyStyle="text-align: right"></Column>
        <Column field="deliveryCount" header="تعداد دریافت شده ها"
          bodyStyle="text-align: right"></Column>
        <Column field="scheduledOn" header="تاریخ و زمان ارسال"
          bodyStyle="text-align: right"></Column>
        <Column field="senderName" header="ارسال کننده" bodyStyle="text-align: right"></Column>
      </DataTable>
    </BlockUI>
    <Dialog v-model:visible="detailsDialogVisible" style="width: 45rem">
      <notification-details :notification="selectedNotification" />
    </Dialog>
  </div>
  <div v-else style="margin: 1rem 0">
    <b style="color: var(--primary-color)">داده ای یافت نشد</b><br>
    <small style="color: whitesmoke">بهتر است فیلتر ها را تغییر دهید.</small>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import NotificationIsSentTag from '@/components/Notification/NotificationIsSentTag.vue';
import NotificationDetails from './NotificationDetails.vue';

export default defineComponent({
  name: 'notification-listing-table',
  components: {
    NotificationIsSentTag,
    NotificationDetails,
  },
  props: {
    items: Array,
    loading: Boolean,
  },
  data() {
    return {
      detailsDialogVisible: false,
      selectedNotification: null,
    };
  },
  methods: {
    onRowSelect(event) {
      this.detailsDialogVisible = true;
      this.selectedNotification = event.data;
    },
  },
});
</script>
