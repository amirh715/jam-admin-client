<template>
  <div class="flex flex-column justify-content-center">
    <h3 class="text-center">نوتیفیکیشن جدید</h3>
    <div><hr/></div>
    <div class="grid flex justify-content-around">
      <div class="col-5">
        <div class="flex flex-column justify-content-right">
          <base-input-text
            label="عنوان"
            v-model="title"
            @change="v$.title.$touch"
            :errors="v$.title.$errors"
          />
          <div>
            <base-multi-select-input
              label="نوع نوتیفیکیشن"
              v-model="type"
              optionLabel="valueForDisplay"
              :options="notificationTypes"
              :selectionLimit="1"
            />
          </div>
          <base-input-text
            label="لینک"
            v-model="route"
            @change="v$.route.$touch"
            :errors="v$.route.$errors"
          />
          <span class="space">زمان ارسال</span>
          <base-datetime-picker
            type="datetime"
            v-model="scheduledOn"
            @change="test(e)"
            :min="minScheduledOn"
            :max="maxScheduledOn"
          />
        </div>
      </div>
      <div class="col-6">
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
          <span>تعداد مخاطبان:‌ {{recipients && recipients.length}}</span>
          <span>{{recipients}}</span>
        </div>
      </div>
    </div>
    <div class="space-2-v"><hr/></div>
    <div class="flex justify-content-center space-v">
      <Button class="p-button-sm" @click="submit" :disabled="v$.$invalid">
        <vue-feather type="check"></vue-feather>
        <span class="space-h">ایجاد</span>
      </Button>
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>

<script lang="ts">
import { defineComponent } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import * as _ from 'lodash';
import { helpers, required } from '@vuelidate/validators';
import { notification } from '@/validators';
import { NotificationService } from '@/services/NotificationService';
import { CreateNotificationRequest } from '@/classes/Notification/DTOs/commands/CreateNotificationRequest';
import { SenderType } from '@/classes/Notification/Types/SenderType';

export default defineComponent({
  setup() {
    return { v$: useVuelidate() };
  },
  emits: ['submit'],
  name: 'new-notification-form',
  data() {
    return {
      type: null,
      title: null,
      message: null,
      route: null,
      scheduledOn: null,
      recipients: [],
      notificationTypes: [
        {
          value: 'SMS',
          valueForDisplay: 'پیامک',
        },
        {
          value: 'FCM',
          valueForDisplay: 'FCM',
        },
        {
          value: 'EMAIL',
          valueForDisplay: 'ایمیل',
        },
      ],
      minScheduledOn: new Date(new Date().setMinutes(new Date().getMinutes() + 5)),
      maxScheduledOn: new Date(new Date().setDate(new Date().getDate() + 7)),
    };
  },
  validations() {
    const {
      title,
      message,
      route,
      recipients,
    } = notification;
    return {
      type: { required },
      title: { title: helpers.withMessage(() => 'عنوان ضروری ست و باید بین یک تا پنجاه کاراکتر باشد.', title) },
      message: { message: helpers.withMessage(() => 'متن باید بین یک تا هزار کاراکتر باشد.', message) },
      route: { route: helpers.withMessage(() => '', route) },
      scheduledOn: { },
      recipients: { recipients: helpers.withMessage(() => 'تعداد مخاطبان باید بین یک تا پنج هزار باشد.', recipients) },
    };
  },
  methods: {
    submit() {
      const dto = new CreateNotificationRequest(
        this.type[0] && this.type[0].value,
        this.title,
        this.message,
        this.route,
        SenderType.USER,
        this.scheduledOn,
        this.recipients,
        null,
      );
      NotificationService.createNewNotification(dto)
        .then(() => {
          this.$toast.add({
            severity: 'success',
            detail: 'نوتیفیکیشن با موفقیت ایجاد شد.',
            life: 4000,
          });
          // poor idea
          this.$router.push({ name: 'Home' });
          this.$router.push({ name: 'NotificationListing' });
          // #####
          this.$emit('submit');
        })
        .catch((err) => {
          this.$toast.add({
            severity: 'error',
            detail: err,
            life: 4000,
          });
        });
    },
    recipientsFileChanged(event) {
      const reader = new FileReader();
      reader.readAsText(event.files[0]);
      reader.onloadend = () => {
        const raw = reader.result as string;
        this.recipients = _.split(raw, /\r?\n|\r/);
        this.recipients.pop();
      };
    },
  },
});
</script>
