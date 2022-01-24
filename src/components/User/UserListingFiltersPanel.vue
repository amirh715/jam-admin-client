<template>
  <Panel toggleable>
    <template #header>
      <div class="flex align-items-center">
        <vue-feather type="filter"></vue-feather>
        <b class="space-h">فیلتر ها</b>
      </div>
    </template>
    <div class="grid">
      <div class="col" style="width: 80%">
        <div class="space-2-v">
          <base-input-text
            label="جستجو"
            v-model="searchTerm"
            @change="changed"
          />
        </div>
        <div class="space-2-v flex justify-content-around">
          <label>وضعیت اکانت</label>
          <base-multi-select-input
            :options="userStateOptions"
            optionLabel="title"
            optionValue="value"
            :selectionLimit="1"
            v-model="userState"
            @update:modelValue="changed"
          />
        </div>
        <div class="space-2-v flex justify-content-around">
          <label>نقش</label>
          <base-multi-select-input
            :options="userRoleOptions"
            optionLabel="title"
            optionValue="value"
            :selectionLimit="1"
            v-model="userRole"
            @update:modelValue="changed"
          />
        </div>
      </div>
      <div class="col">
        <div class="space-2-v flex">
          <label class="space-h">ایجاد شده توسط من</label>
          <InputSwitch
            class="space-2-h"
            v-model="createdByMe"
            :trueValue="true"
            :falseValue="null"
            @change="changed"
          />
        </div>
        <div class="space-2-v flex">
          <label class="space-h">آخرین بروزرسانی توسط من</label>
          <InputSwitch
            class="space-2-h"
            v-model="lastModifiedByMe"
            :trueValue="true"
            :falseValue="null"
            @change="changed"
          />
        </div>
        <div class="space-2-v flex">
          <TriStateCheckbox
            class="space-2-h"
            v-model="hasImage"
            @change="changed"
          />
          <span v-if="hasImage === true">با عکس پروفایل</span>
          <span v-else-if="hasImage === false">بدون عکس پروفایل</span>
          <span v-else>با عکس پروفایل / بدون عکس پروفایل</span>
        </div>
        <div class="space-2-v flex">
          <TriStateCheckbox
            class="space-2-h"
            v-model="hasEmail"
            @change="changed"
          />
          <span v-if="hasEmail === true">با ایمیل</span>
          <span v-else-if="hasEmail === false">بدون ایمیل</span>
          <span v-else>با ایمیل / بدون ایمیل</span>
        </div>
      </div>
      <div class="col">
        <div class="space-2-v flex justify-content-around align-items-center">
          <!-- <datetime-picker
            type="datetime"
            v-model="createdAt"
            @change="changed"
            format="YYYY-MM-DDTHH:mm:ss"
            display-format="dddd jDD jMMMM jYYYY HH:mm"
            range
            clearable
          /> -->
          <base-datetime-picker
            type="datetime"
            label="تاریخ ایجاد"
            v-model="createdAt"
            @change="changed"
            range
            clearable
          />
        </div>
        <div class="space-2-v flex justify-content-around align-items-center">
          <!-- <datetime-picker
            type="datetime"
            v-model="lastModifiedAt"
            @change="changed"
            format="YYYY-MM-DDTHH:mm:ss"
            display-format="dddd jDD jMMMM jYYYY HH:mm"
            range
            clearable
          /> -->
          <base-datetime-picker
            type="datetime"
            label="تاریخ آخرین بروزرسانی"
            v-model="lastModifiedAt"
            @change="changed"
            range
            clearable
          />
        </div>
      </div>
      <div class="col">
        <div class="space-2-v">
          <Button @click="reset"
            class="p-button-sm p-button-link">
              <vue-feather type="trash-2"></vue-feather>
          </Button>
        </div>
      </div>
    </div>
  </Panel>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { GetUsersByFiltersRequest } from '@/classes/User/DTOs/commands/GetUsersByFiltersRequest';
import { AuthService } from '@/services/AuthService';
import { UserState } from '@/classes/User/Types/UserState';
import { UserRole } from '@/classes/User/Types/UserRole';

export default defineComponent({
  emits: ['change'],
  name: 'user-listing-filters-panel',
  data() {
    return {
      searchTerm: null,
      userState: [],
      userRole: [],
      createdByMe: false,
      lastModifiedByMe: false,
      hasImage: null,
      hasEmail: null,
      createdAt: [],
      lastModifiedAt: [],
      userStateOptions: [
        {
          title: 'فعال',
          value: UserState.ACTIVE,
        },
        {
          title: 'مسدود',
          value: UserState.BLOCKED,
        },
        {
          title: 'تایید نشده',
          value: UserState.NOT_VERIFIED,
        },
      ],
      userRoleOptions: [
        {
          title: 'مدیر سیستم',
          value: UserRole.ADMIN,
        },
        {
          title: 'مدیر مجموعه',
          value: UserRole.LIBRARY_MANAGER,
        },
        {
          title: 'مشترک',
          value: UserRole.SUBSCRIBER,
        },
      ],
    };
  },
  methods: {
    changed() {
      const filters = new GetUsersByFiltersRequest(
        {
          searchTerm: this.searchTerm,
          createdAtFrom: this.createdAt[0],
          createdAtTill: this.createdAt[1],
          lastModifiedAtFrom: this.lastModifiedAt[0],
          lastModifiedAtTill: this.lastModifiedAt[1],
          hasImage: this.hasImage,
          hasEmail: this.hasEmail,
          state: this.userState[0],
          role: this.userRole[0],
          creatorId: this.createdByMe ? AuthService.getSubjectId() : null,
          updaterId: this.lastModifiedByMe ? AuthService.getSubjectId() : null,
          limit: 30,
          offset: 0,
        },
      );
      this.$emit('change', filters);
    },
    reset() {
      this.searchTerm = null;
      this.userState = [];
      this.userRole = [];
      this.createdByMe = false;
      this.lastModifiedByMe = false;
      this.hasImage = null;
      this.hasEmail = null;
      this.createdAt = [];
      this.lastModifiedAt = [];
      this.$emit('change');
    },
  },
});
</script>
