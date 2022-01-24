<template>
  <div>
    <form>
      <div class="flex justify-content-center space-v">
        <h3>تغییر نوتیفیکیشن</h3>
      </div>
      <div class="grid">
        <div class="col">
          <base-input-text
            label="عنوان"
            v-model="title"
            @change="v$.title.$touch"
            :errors="v$.title.$errors"
          />
          <base-input-text
            label="لینک"
            v-model="route"
          />
          <div style="width: 80%; margin: auto;">
            <p class="space">زمان ارسال</p>
            <base-datetime-picker
              type="datetime"
              v-model="scheduledOn"
            />
          </div>
        </div>
        <div class="col">
          <base-textarea
            label="متن"
            v-model="message"
            @change="v$.message.$touch"
            :errors="v$.message.$errors"
          />
          <div class="space-v">
            <span class="space-v">فایل لیست مخاطبان (فایل csv)</span>
            <FileUpload
              @select="recipientsFileChanged"
              accept="text/csv"
              :fileLimit="1"
              :showUploadButton="false"
              chooseLabel="انتخاب"
              cancelLabel="انصراف"
            />
            <span>تعداد مخاطبان:‌</span>
            <number-displayer class="space" :value="recipients && recipients.length" />
          </div>
        </div>
      </div>
      <div><hr/></div>
      <div class="flex justify-content-center space-2-v">
        <Button @click="submit" class="p-button-sm">
          <vue-feather type="check"></vue-feather>
          <span class="space-h">ثبت</span>
        </Button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import useVuelidate from '@vuelidate/core';
import { helpers } from '@vuelidate/validators';
import * as _ from 'lodash';
import { NotificationDetails } from '@/classes/Notification/DTOs/queries/NotificationDetails';
import { notification } from '@/validators';
import { NotificationService } from '@/services/NotificationService';
import { EditNotificationRequest } from '@/classes/Notification/DTOs/commands/EditNotificationRequest';
import NumberDisplayer from '../common/NumberDisplayer.vue';

export default defineComponent({
  components: { NumberDisplayer },
  setup() {
    return { v$: useVuelidate() };
  },
  name: 'edit-notification-form',
  emits: ['submit'],
  props: {
    notification: NotificationDetails,
  },
  data() {
    return {
      title: this.$props.notification['title'],
      message: this.$props.notification['message'],
      route: this.$props.notification['route'],
      scheduledOn: this.$props.notification['scheduledOn'],
      recipients: [],
    };
  },
  validations() {
    const {
      title,
      message,
      route,
      scheduledOn,
    } = notification;
    return {
      title: { title: helpers.withMessage(() => '', title) },
      message: { message: helpers.withMessage(() => '', message) },
      route: { route: helpers.withMessage(() => '', route) },
      scheduledOn: { scheduledOn: helpers.withMessage(() => '', scheduledOn) },
    };
  },
  methods: {
    recipientsFileChanged(event) {
      const reader = new FileReader();
      reader.readAsText(event.files[0]);
      reader.onloadend = () => {
        const raw = reader.result as string;
        this.recipients = _.split(raw, /\r?\n|\r/);
        this.recipients.pop();
      };
    },
    submit() {
      const dto = new EditNotificationRequest(
        this.notification.id,
        null,
        this.title,
        this.message,
        this.route,
        this.scheduledOn,
        this.recipients,
      );
      NotificationService.editNotification(dto)
        .then(() => {
          this.$toast.add({
            severity: 'success',
            detail: 'نوتیفیکیشن با موفقیت تغییر کرد.',
            life: 4000,
          });
          this.$router.push({ name: 'Home' });
          this.$router.push({ name: 'NotificationListing' });
          this.$emit('submit');
        })
        .catch((err) => {
          this.$toast.add({
            severity: 'error',
            detail: err.message,
            life: 4000,
          });
        });
    },
  },
});
</script>
