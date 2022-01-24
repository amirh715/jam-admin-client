<template>
  <div v-if="items.length > 0">
    <BlockUI :blocked="loading">
      <DataTable :value="items" scrollHeight="flex"
        @rowSelect="onRowSelect">
          <template #header>
            <number-displayer :value="items.length" />
          </template>
          <Column field="userName" header="نام کاربر (شماره موبایل)" bodyStyle="text-align: right;">
            <template #body="slotProps">
              {{slotProps.data.userName}}
              ( <number-displayer :value="slotProps.data.userMobile" /> )
            </template>
          </Column>
          <Column field="attemptedAt" header="تاریخ و زمان ورود" bodyStyle="text-align: right;">
            <template #body="slotProps">
              <date-time-displayer :datetime="new Date(slotProps.data.attemptedAt)" />
            </template>
          </Column>
          <Column field="wasSuccessful" header="وضعیت" bodyStyle="text-align: right;">
            <template #body="slotProps">
              <Tag :severity="slotProps.data.wasSuccessful ? 'success' : 'danger'">
                <vue-feather :type="slotProps.data.wasSuccessful ? 'check' : 'x-circle'">
                </vue-feather>
                <span class="space-h" style="font-size: 0.8rem">
                  <span v-if="slotProps.data.wasSuccessful === true">
                    موفق
                  </span>
                  <span v-else-if="slotProps.data.wasSuccessful === false">
                    ناموفق
                  </span>
                  <span v-else>
                    N/A
                  </span>
                </span>
              </Tag>
            </template>
          </Column>
          <Column field="failureReason" header="خطا" bodyStyle="text-align: right;">
            <template #body="slotProps">
              {{slotProps.data.failureReason}}
            </template>
          </Column>
          <Column field="platform" header="دستگاه" bodyStyle="text-align: right;">
            <template #body="slotProps">
              {{slotProps.data.platform}}
            </template>
          </Column>
          <Column field="os" header="سیستم عامل" bodyStyle="text-align: right;">
            <template #body="slotProps">
              {{slotProps.data.os}}
            </template>
          </Column>
          <Column field="ipAddress" header="آدرس آی پی" bodyStyle="text-align: right;">
            <template #body="slotProps">
              {{slotProps.data.ipAddress}}
            </template>
          </Column>
          <template #footer>
            <Button @click="loadMoreClicked" class="p-button-sm p-button-link">
              <vue-feather type="loader"></vue-feather>
            </Button>
          </template>
      </DataTable>
    </BlockUI>
  </div>
  <div v-else>
    <no-data-notice />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import DateTimeDisplayer from '../common/DateTimeDisplayer.vue';
import NumberDisplayer from '../common/NumberDisplayer.vue';

export default defineComponent({
  components: { DateTimeDisplayer, NumberDisplayer },
  emits: ['loadMore'],
  props: {
    items: Array,
  },
  methods: {
    loadMoreClicked() {
      this.$emit('loadMore');
    },
  },
});
</script>
