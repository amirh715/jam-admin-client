<template>
  <Card>
    <template #content>
      <div class="flex flex-column">
        <!-- row #1 -->
        <div class="flex justify-content-around">
          <div class="flex flex-column text-right">
            <div class="space-v">
              <b class="space-h">وضعیت:</b>
              <report-status-tag :status="report.status" />
            </div>
            <div class="space-v">
              <b class="space-h">نوع گزارش:</b>
              <span>{{report.type === 'CONTENT' ? 'محتوایی' : 'فنی یا کلی'}}</span>
            </div>
          </div>
          <div class="flex flex-column text-right">
            <div class="space-v" v-if="report.reporterName">
              <b class="space-h">گزارش دهنده:</b>
              <span>{{report.reporterName}}</span>
            </div>
            <div class="space-v">
              <b class="space-h">تاریخ و زمان گزارش:</b>
              <span>{{report.createdAt}}</span>
            </div>
          </div>
        </div>
        <!-- row #1 ends -->
        <div class="space-2-v"><hr/></div>
        <!-- row #2 -->
        <div class="flex flex-column text-right">
          <div class="space-h">
            <b class="space-h">متن گزارش:</b>
            <p>{{report.message}}</p>
          </div>
          <div v-if="report.reportedEntityId">
            <Button
              class="p-button-sm p-button-link"
              @click="goToReportedLibraryEntity(report.reportedEntityId)"
              >
                <vue-feather type="link"></vue-feather>
                <span class="space-h">لینک هنرمند/اثر گزارش شده</span>
                <span>( {{report.reportedEntityTitle}} )</span>
              </Button>
          </div>
        </div>
        <!-- row #2 ends -->
        <div class="space-2-v"><hr/></div>
        <!-- row #3 -->
        <div>
          <div v-if="report.status == 'PROCESSED'" class="flex flex-column text-right">
            <div class="space-h">
              <b class="space-h">یادداشت پردازش کننده:</b>
              <p>{{report.processorNote}}</p>
            </div>
            <div class="space-2-v"><hr/></div>
          </div>
          <div v-else>
            <form>
              <base-textarea
                v-if="isSubjectTheProcessor"
                label="یادداشت پردازش کننده:"
                note="گزارش را بررسی کرده و پس از رفع ایراد نتیجه
                  را به صورت مختصر در قسمت << یادداشت پردازش کننده >> وارد کنید."
                v-model="processorNote"
                @change="v$.processorNote.$touch"
                :errors="v$.processorNote.$errors"
              />
              <div class="space-2-v">
                <Button
                  @click="submit"
                  :disabled="v$.$invalid || !isSubjectTheProcessor"
                  class="p-button-sm">
                    <span v-if="isSubjectTheProcessor">ثبت نتیجه</span>
                    <div v-else class="flex">
                      <vue-feather type="alert-circle"></vue-feather>
                      <span class="space-h">شما پردازنده این گزارش نیستید.</span>
                    </div>
                </Button>
              </div>
            </form>
          </div>
          <div class="flex justify-content-around">
            <div>
              <b class="space-h">پردازش کننده:</b>
              <span>{{report.processorName}}</span>
            </div>
            <div v-if="report.status == 'PROCESSED'">
              <b class="space-h">تاریخ و زمان پردازش:</b>
              <span>{{report.processedAt}}</span>
            </div>
          </div>
        </div>
        <!-- row #3 ends -->
      </div>
    </template>
  </Card>
</template>

<style lang="scss" scoped>

</style>

<script lang="ts">
import { defineComponent } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { report } from '../../validators';
import { ReportDetails } from '@/classes/Report/DTOs/queries/ReportDetails';
import ReportStatusTag from '@/components/Report/ReportStatusTag.vue';
import { ProcessReportRequest } from '@/classes/Report/DTOs/commands/ProcessReportRequest';
import { ReportsService } from '@/services/ReportsService';
import { AuthService } from '@/services/AuthService';

export default defineComponent({
  name: 'report-card',
  setup() {
    return { v$: useVuelidate() };
  },
  components: {
    ReportStatusTag,
  },
  props: {
    report: ReportDetails,
  },
  data() {
    return {
      processorNote: null,
    };
  },
  computed: {
    isSubjectTheProcessor() {
      return AuthService.getSubjectId() === this.$props.report.processorId;
    },
  },
  validations() {
    const { processorNote } = report;
    return {
      processorNote: { processorNote },
    };
  },
  methods: {
    submit() {
      if (this.v$.$invalid) return;
      const dto = new ProcessReportRequest(
        this.$props.report.id,
        this.processorNote,
      );
      ReportsService.processReport(dto)
        .then(() => {
          ReportsService.getById(this.$props.report.id);
          this.$toast.add({
            severity: 'success',
            detail: 'گزارش پردازش شد.',
            life: 4000,
          });
        })
        .catch((error) => {
          this.$toast.add({
            severity: 'error',
            detail: error.message,
            life: 4000,
          });
        });
    },
    goToReportedLibraryEntity(reportedEntityId: string) {
      this.$router.push({ name: 'Home' });
    },
  },
});
</script>
