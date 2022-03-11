<template>
  <div style="overflow-x: hidden;">
    <div class="grid">
      <div v-for="report in reports" :key="report.id" class="col-5">
        <report-card :report="report" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>

<script lang="ts">
import { defineComponent } from 'vue';
import * as _ from 'lodash';
import { useVuelidate } from '@vuelidate/core';
import { ReportsService } from '../../services/ReportsService';
import { ReportDetails } from '@/classes/Report/DTOs/queries/ReportDetails';
import ReportCard from '@/components/Report/ReportCard.vue';
import { ReportStatus } from '@/classes/Report/Types/ReportStatus';

export default defineComponent({
  setup() {
    return { v$: useVuelidate() };
  },
  components: {
    ReportCard,
  },
  data() {
    return {
      reports: [] as Array<ReportDetails>,
    };
  },
  methods: {
    init(reports: ReportDetails[]) {
      this.reports = _.orderBy(reports, ['status'], ['asc']);
    },
  },
  beforeRouteEnter(to, from, next) {
    const filters = null;
    ReportsService.getByFilters(filters)
      .then((reports) => {
        next((vm) => {
          if (reports.length === 0) {
            vm.$toast.add({
              severity: 'info',
              detail: 'گزارشی وجود ندارد.',
              life: 4000,
            });
            vm.$router.push({ name: 'Home' });
          } else {
            vm['init'](reports);
          }
        });
      })
      .catch((err) => {
        next((vm) => {
          vm.$toast.add({
            severity: 'error',
            detail: err.message,
            life: 4000,
          });
          vm.$router.push({ name: 'Home' });
        });
      });
  },
});
</script>
