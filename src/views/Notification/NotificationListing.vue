<template>
  <div>
    <notification-listing-filter-panel @change="filtersChanged" />
    <notification-listing-table :items="items" :loading="loading" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import NotificationListingFilterPanel from '@/components/Notification/NotificationListingFilterPanel.vue';
import NotificationListingTable from '@/components/Notification/NotificationListingTable.vue';
import { NotificationService } from '@/services/NotificationService';
import { NotificationDetails } from '@/classes/Notification/DTOs/queries/NotificationDetails';
import { GetNotificationsByFiltersRequest } from '@/classes/Notification/DTOs/commands/GetNotificationsByFiltersRequest';

export default defineComponent({
  components: {
    NotificationListingFilterPanel,
    NotificationListingTable,
  },
  data() {
    return {
      items: [],
      waiting: false,
      waitingTimer: null,
      loading: false,
    };
  },
  methods: {
    setData(items: NotificationDetails[]) {
      this.items = items;
    },
    filtersChanged(filters: GetNotificationsByFiltersRequest) {
      if (this.waiting) {
        clearTimeout(this.waitingTimer);
      } else {
        this.waiting = true;
      }
      this.waitingTimer = setTimeout(() => {
        this.waiting = false;
        this.fetch(filters);
      }, 1000);
    },
    fetch(filters: GetNotificationsByFiltersRequest) {
      this.loading = true;
      NotificationService.getNotificationsByFilters(filters)
        .then((notifications) => {
          this.items = notifications;
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
  },
  beforeRouteEnter(to, from, next) {
    NotificationService.getNotificationsByFilters(null)
      .then((notifications) => {
        next((vm) => vm['setData'](notifications));
      })
      .catch((err) => {
        next((vm) => vm.$toast.add({
          severity: 'error',
          detail: err.message,
          life: 4000,
        }));
      });
  },
});
</script>
