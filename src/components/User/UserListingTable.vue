<template>
  <div v-if="items.length > 0">
    <BlockUI :blocked="loading">
      <DataTable :value="items" selectionMode="single" scrollHeight="flex"
        @rowSelect="onRowSelect">
          <template #header>
            <number-displayer :value="items.length" />
          </template>
          <Column header="عکس پروفایل" bodyStyle="text-align: right">
            <template #body="slotProps">
              <Avatar
                :image="slotProps.data.profileImageSrc"
                :label="!slotProps.data.profileImageSrc && slotProps.data.name[0].toUpperCase()"
                shape="circle"/>
            </template>
          </Column>
          <Column field="name" header="نام" bodyStyle="text-align: right"></Column>
          <Column field="mobile" header="موبایل" bodyStyle="text-align: right; direction: ltr">
            <template #body="slotProps">
              <number-displayer :value="slotProps.data.mobile" />
            </template>
          </Column>
          <Column field="state" header="وضعیت اکانت" bodyStyle="text-align: right">
            <template #body="slotProps">
              <user-state-tag :state="slotProps.data.state" />
            </template>
          </Column>
          <Column field="createdAt" header="تاریخ ایجاد" bodyStyle="text-align: right">
            <template #body="slotProps">
              <date-time-displayer :datetime="new Date(slotProps.data.createdAt)" />
            </template>
          </Column>
          <Column field="role" header="نقش" bodyStyle="text-align: right">
            <template #body="slotProps">
              <user-role-tag :role="slotProps.data.role" />
            </template>
          </Column>
          <template #footer>
            <Button @click="$emit('loadMore')" class="p-button-sm p-button-link">
              <span>
                <vue-feather type="loader"></vue-feather>
              </span>
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
import { defineComponent, PropType } from 'vue';
import { UserDetails as UserDetailsDTO } from '@/classes/User/DTOs/queries/UserDetails';
import UserStateTag from '@/components/User/UserStateTag.vue';
import UserRoleTag from '@/components/User/UserRoleTag.vue';

export default defineComponent({
  name: 'user-listing-table',
  emits: ['rowSelected', 'loadMore'],
  components: {
    UserStateTag,
    UserRoleTag,
  },
  props: {
    items: {
      type: Object as PropType<UserDetailsDTO[]>,
    },
    loading: Boolean,
  },
  methods: {
    onRowSelect(event) {
      this.$emit('rowSelected', event.data);
    },
  },
});
</script>
