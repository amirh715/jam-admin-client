<template>
  <div class="flex flex-column">
    <div><hr/></div>
    <DataTable :value="recipient.notifications">
      <template #header>
        <b>{{recipient.notifications.length}}</b>
      </template>
      <Column header="عنوان"></Column>
      <Column header="نوع"></Column>
      <Column header="دریافت شده؟"></Column>
      <Column header="ارسال شده؟"></Column>
    </DataTable>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { RecipientDetails } from '@/classes/Notification/DTOs/queries/RecipientDetails';

export default defineComponent({
  name: 'recipient-details',
  props: {
    recipient: RecipientDetails,
  },
});
</script>
