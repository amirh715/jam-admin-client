<template>
  <div v-if="!editMode">
    <div class="grid">
      <div class="col">
        <div class="flex flex-column justify-content-right">
          <div class="space-v flex">
            <vue-feather type="hash"></vue-feather>
            <b class="space-h">عنوان:</b>
            <span>{{notification.title}}</span>
          </div>
          <div class="space-v flex">
            <vue-feather type="send"></vue-feather>
            <b class="space-h">وضعیت ارسال:</b>
            <notification-is-sent-tag :isSent="notification.isSent" />
          </div>
          <div class="space-v flex">
            <vue-feather type="clock"></vue-feather>
            <b class="space-h">زمان ارسال:</b>
            <date-time-displayer :datetime="notification.scheduledOn" />
          </div>
          <div class="space-v flex">
            <vue-feather type="user"></vue-feather>
            <b class="space-h">ارسال کننده:</b>
            <span>{{notification.senderName}}</span>
          </div>
          <div class="space-v flex">
            <vue-feather type="link"></vue-feather>
            <b class="space-h">لینک:</b>
            <span>{{notification.route || '( بدون لینک )'}}</span>
          </div>
          <div class="space-v flex">
            <vue-feather type="clock"></vue-feather>
            <b class="space-h">زمان ایجاد:</b>
            <date-time-displayer :datetime="notification.createdAt" />
          </div>
          <div class="space-v flex">
            <vue-feather type="clock"></vue-feather>
            <b class="space-h">زمان آخرین تغییر:</b>
            <date-time-displayer :datetime="notification.lastModifiedAt" />
          </div>
        </div>
      </div>
      <div class="col">
        <div class="space-v flex">
          <vue-feather type="message-circle"></vue-feather>
          <b class="space-h">پیام:</b>
          <span>{{notification.message || '( بدون پیام )'}}</span>
        </div>
      </div>
    </div>
    <div><hr/></div>
    <div>
      <DataTable :value="notification.recipients" stripedRows
        scrollHeight="flex" class="virtual-scroll">
          <template #header>
            <div class="flex justify-content-around">
              <b>تعداد مخاطبان: <number-displayer :value="notification.recipientsCount" /></b>
              <b>تعداد دریافت شده ها: <number-displayer :value="notification.deliveryCount" /></b>
            </div>
          </template>
          <Column header="مخاطب" field="name" bodyStyle="text-align: right">
          </Column>
          <Column header="دریافت شده؟" bodyStyle="text-align: right">
            <template #body="slotProps">
              <vue-feather
                :type="slotProps.data.isDelivered ? 'check-circle' : 'circle'"></vue-feather>
            </template>
          </Column>
          <Column header="تاریخ و زمان دریافت" field="deliveredAt" bodyStyle="text-align: right">
          </Column>
      </DataTable>
    </div>
    <div><hr/></div>
    <div>
      <div v-if="!notification.isSent"
        class="flex justify-content-around" style="padding-top: 1rem;">
          <Button
            @click="editMode = true"
            class="p-button-sm p-button-outlined">
              <vue-feather type="edit"></vue-feather>
              <span class="space-h">تغییر نوتیفیکیشن</span>
          </Button>
          <Button
            v-if="!notification.isSent"
            @dblclick="deleteNotification"
            class="p-button-sm p-button-outlined p-button-danger">
              <vue-feather type="trash-2"></vue-feather>
              <span class="space-h">حذف نوتیفیکیشن</span>
          </Button>
      </div>
      <div v-else class="flex justify-content-center">
        <b class="space-2-v">پس از ارسال امکان اصلاح یا حذف نوتیفیکیشن وجود ندارد.</b>
      </div>
    </div>
  </div>
  <div v-else>
    <edit-notification-form :notification="notification" @submit="editMode=false" />
  </div>
</template>

<style scoped>
.virtual-scroll {
  height: 10rem;
  overflow-y: scroll;
}
</style>

<script lang="ts">
import { defineComponent } from 'vue';
import { NotificationDetails } from '@/classes/Notification/DTOs/queries/NotificationDetails';
import NotificationIsSentTag from './NotificationIsSentTag.vue';
import EditNotificationForm from './EditNotificationForm.vue';
import { NotificationService } from '@/services/NotificationService';
import { RemoveNotificationRequest } from '@/classes/Notification/DTOs/commands/RemoveNotificationRequest';
import NumberDisplayer from '../common/NumberDisplayer.vue';

export default defineComponent({
  name: 'notification-details',
  emits: ['deleteNotification'],
  components: {
    NotificationIsSentTag,
    EditNotificationForm,
    NumberDisplayer,
  },
  props: {
    notification: NotificationDetails,
  },
  data() {
    return {
      editMode: false,
    };
  },
  methods: {
    deleteNotification() {
      this.$confirm.require({
        header: 'حذف نوتیفیکیشن',
        message: 'آیا از حذف نوتیفیکیشن مطمئن هستید؟',
        acceptLabel: 'آره پاک کن',
        rejectLabel: 'بیخیال',
        defaultFocus: 'reject',
        accept: () => {
          const dto = new RemoveNotificationRequest(this.notification.id);
          NotificationService.removeNotification(dto)
            .then(() => {
              this.$toast.add({
                severity: 'success',
                detail: 'نوتیفیکیشن پاک شد.',
                life: 4000,
              });
              this.$router.push({ name: 'Home' });
            })
            .catch((err) => {
              this.$toast.add({
                severity: 'error',
                detail: err.message,
                life: 4000,
              });
            });
        },
      });
    },
  },
});
</script>
