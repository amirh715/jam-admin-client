<template>
  <Panel toggleable>
    <template #header>
      <div class="flex align-items-center">
        <vue-feather type="filter"></vue-feather>
        <b class="space-h">فیلتر ها</b>
      </div>
    </template>
    <div class="grid">
      <!-- col #1 -->
      <div class="col">
        <div class="flex justify-content-right">
          <base-input-text
            label="جستجو"
            v-model="searchTerm"
            @change="changed"
          />
        </div>
        <div class="flex justify-content-around">
          <base-multi-select-input
            label="نوع نوتیفیکیشن"
            v-model="type"
            :options="notificationTypeOptions"
            optionLabel="displayValue"
            :selectionLimit="1"
            @change="changed"
          />
          <base-multi-select-input
            label="نوع ارسال کننده"
            v-model="senderType"
            :options="notificationSenderTypeOptions"
            optionLabel="displayValue"
            :selectionLimit="1"
            @change="changed"
          />
        </div>
      </div>
      <!-- col #2 -->
      <div class="col">
        <div class="space-v flex justify-content-right">
          <TriStateCheckbox
            v-model="isSent"
            @change="changed"
          />
          <span v-if="isSent === true" class="space-h">ارسال شده</span>
          <span v-else-if="isSent === false" class="space-h">ارسال نشده</span>
          <span v-else class="space-h">ارسال شده / ارسال نشده</span>
        </div>
        <div class="space-2-v flex justify-content-right">
          <div>
            <TriStateCheckbox
              v-model="hasDeliveries"
              @change="changed"
            />
            <span v-if="hasDeliveries === true" class="space-h">دریافت شده</span>
            <span v-else-if="hasDeliveries === false" class="space-h">دریافت نشده</span>
            <span v-else class="space-h">دریافت شده / دریافت نشده</span>
          </div>
        </div>
        <div class="flex justify-content-right">
          <div>
            <p>زمان ارسال</p>
            <div class="flex justify-content-center">
              <base-datetime-picker
                type="datetime"
                v-model="scheduledOn"
                @change="changed"
                range
                clearable
              />
            </div>
          </div>
        </div>
      </div>
      <!-- col #3 -->
      <div class="col">
        <div class="flex justify-content-right">
          <div>
            <p>زمان ایجاد</p>
            <div class="flex justify-content-center">
              <base-datetime-picker
                type="datetime"
                v-model="createdAt"
                @change="changed"
                range
                clearable
              />
            </div>
          </div>
        </div>
        <div class="flex justify-content-right">
          <div>
            <p>زمان آخرین بروز رسانی</p>
            <div class="flex justify-content-center">
              <base-datetime-picker
                type="datetime"
                v-model="lastModifiedAt"
                @change="changed"
                range
                clearable
              />
            </div>
          </div>
        </div>
      </div>
      <!-- col #4 -->
      <div class="col">
        <div class="flex justify-content-center">
          <Button class="p-button-link" @click="reset">
            <vue-feather type="trash-2"></vue-feather>
          </Button>
        </div>
      </div>
    </div>
  </Panel>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { GetNotificationsByFiltersRequest } from '@/classes/Notification/DTOs/commands/GetNotificationsByFiltersRequest';

export default defineComponent({
  name: 'notification-listing-filter-panel',
  emits: ['change'],
  data() {
    return {
      searchTerm: null,
      type: null,
      senderType: null,
      isSent: null,
      hasDeliveries: null,
      createdAt: [],
      lastModifiedAt: [],
      scheduledOn: [],
      notificationTypeOptions: [
        {
          value: 'SMS',
          displayValue: 'SMS',
        },
        {
          value: 'FCM',
          displayValue: 'FCM',
        },
        {
          value: 'EMAIL',
          displayValue: 'ایمیل',
        },
      ],
      notificationSenderTypeOptions: [
        {
          value: 'USER',
          displayValue: 'کاربر',
        },
        {
          value: 'SYS',
          displayValue: 'سیستمی',
        },
      ],
    };
  },
  methods: {
    changed() {
      console.log(this.createdAt);
      console.log(this.lastModifiedAt);
      console.log(this.scheduledOn);
      const filters = new GetNotificationsByFiltersRequest(
        this.searchTerm,
        this.createdAt[0],
        this.createdAt[1],
        this.lastModifiedAt[0],
        this.lastModifiedAt[1],
        this.scheduledOn[0],
        this.scheduledOn[1],
        this.type && this.type[0].value,
        this.isSent,
        this.withUndeliveredRecipients,
        this.senderType && this.senderType[0].value,
      );
      this.$emit('change', filters);
    },
    reset() {
      this.searchTerm = null;
      this.type = null;
      this.senderType = null;
      this.isSent = null;
      this.hasDeliveries = null;
      this.sentAt = null;
      this.createdAt = [];
      this.lastModifiedAt = [];
      this.scheduledOn = [];
      this.changed();
    },
  },
});
</script>
