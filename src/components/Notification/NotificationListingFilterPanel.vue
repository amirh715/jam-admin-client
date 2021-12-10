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
            @change="changed"
          />
          <base-multi-select-input
            label="نوع ارسال کننده"
            v-model="senderType"
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
              <datetime-picker
                type="datetime"
                v-model="scheduledOn"
                @change="changed"
                format="YYYY-MM-DDTHH:mm:ss"
                display-format="dddd jDD jMMMM jYYYY HH:mm"
                range
                clearable
              />
              {{}}
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
              <datetime-picker
                type="datetime"
                v-model="createdAt"
                @change="changed"
                format="YYYY-MM-DDTHH:mm:ss"
                display-format="dddd jDD jMMMM jYYYY HH:mm"
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
              <datetime-picker
                type="datetime"
                v-model="lastModifiedAt"
                @change="changed"
                format="YYYY-MM-DDTHH:mm:ss"
                display-format="dddd jDD jMMMM jYYYY HH:mm"
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
  data() {
    return {
      searchTerm: null,
      type: null,
      senderType: null,
      isSent: null,
      hasDeliveries: null,
      sentAt: [],
      createdAt: [],
      lastModifiedAt: [],
      scheduledOn: [],
    };
  },
  methods: {
    changed() {
      const filters = new GetNotificationsByFiltersRequest(
        this.searchTerm,
        this.createdAt[0],
        this.createdAt[1],
        this.lastModifiedAt[0],
        this.lastModifiedAt[1],
        this.scheduledOn[0],
        this.scheduledOn[1],
        this.type,
        this.isSent,
        this.withUndeliveredRecipients,
        this.senderType,
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
