<template>
  <span class="space">
    <Tag :severity="severity">{{displayValue}}</Tag>
  </span>
</template>

<style lang="scss" scoped>

</style>

<script lang="ts">
import { defineComponent } from 'vue';
import { ReportStatus } from '../../classes/Report/Types/ReportStatus';

export default defineComponent({
  name: 'report-status-tag',
  props: ['status'],
  computed: {
    displayValue() {
      let value: string;
      switch (this.$props.status) {
        case ReportStatus.PENDING_ASSIGNMENT:
          value = 'ثبت شده';
          break;
        case ReportStatus.ASSIGNED:
          value = 'در انتظار پردازش';
          break;
        case ReportStatus.PROCESSED:
          value = 'پردازش شده';
          break;
        case ReportStatus.ARCHIVED:
          value = 'آرشیو شده';
          break;
        default:
          value = 'N/A';
      }
      return value;
    },
    severity() {
      let value: string;
      switch (this.$props.status) {
        case ReportStatus.PENDING_ASSIGNMENT:
          value = 'info';
          break;
        case ReportStatus.ASSIGNED:
          value = 'danger';
          break;
        case ReportStatus.PROCESSED:
          value = 'success';
          break;
        case ReportStatus.ARCHIVED:
          value = 'success';
          break;
        default:
          value = 'info';
      }
      return value;
    },
  },
});
</script>
