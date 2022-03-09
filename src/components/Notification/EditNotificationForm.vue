<template>
  <div>
    <form>
      <div class="flex justify-content-center space-v">
        <h3>تغییر نوتیفیکیشن</h3>
      </div>
      <div class="space-v"><hr/></div>
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
            @change="v$.route.$touch"
            :errors="v$.route.$errors"
          />
          <div style="width: 80%; margin: auto;">
            <p class="space">زمان ارسال</p>
            <base-datetime-picker
              type="datetime"
              v-model="scheduledOn"
              format="YYYY-MM-DDTHH:mm:ss"
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
              @clear="recipients = []"
              @remove="recipients = []"
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
        <Button :disabled="v$.$invalid" @click="submit" class="p-button-sm">
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
      recipients,
    } = notification;
    return {
      title: { title: helpers.withMessage(() => 'عنوان باید حداقل یک کاراکتر باشد.', title) },
      message: { message: helpers.withMessage(() => 'پیام باید حداقل یک کاراکتر باشد.', message) },
      route: { route: helpers.withMessage(() => 'آدرس لینک درست نیست.', route) },
      scheduledOn: { scheduledOn: helpers.withMessage(() => '', scheduledOn) },
      recipients: { recipients },
    };
  },
  methods: {
    recipientsFileChanged(event) {
      if (event.files.length === 0) return;
      const reader = new FileReader();
      reader.readAsText(event.files[0]);
      reader.onloadend = () => {
        const raw = reader.result as string;
        this.recipients = _.split(raw, /\r?\n|\r/);
        this.recipients.pop();
        this.v$.recipients.$touch();
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
          // poor idea
          this.$router.go({ name: 'Home' });
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
