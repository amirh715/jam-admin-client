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
          <datetime-picker
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
        <base-multi-select-input
          label="مخاطبان"
          v-model="recipients"
          @change="v$.recipients.$touch"
          :errors="v$.recipients.$errors"
        />
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
import { helpers, required } from '@vuelidate/validators';
import { notification } from '@/validators';
import { NotificationService } from '@/services/NotificationService';
import BaseInputText from '../common/BaseInputText.vue';
import BaseTextarea from '../common/BaseTextarea.vue';
import { CreateNotificationRequest } from '@/classes/Notification/DTOs/commands/CreateNotificationRequest';
import { SenderType } from '@/classes/Notification/Types/SenderType';

export default defineComponent({
  setup() {
    return { v$: useVuelidate() };
  },
  components: { BaseInputText, BaseTextarea },
  name: 'new-notification-form',
  data() {
    return {
      type: null,
      title: null,
      message: null,
      route: null,
      scheduledOn: null,
      recipients: [],
      notificationTypes: ['FCM', 'SMS', 'ایمیل'],
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
        this.type,
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
        })
        .catch((err) => {
          this.$toast.add({
            severity: 'error',
            detail: err.message,
            life: 4000,
          });
        });
    },
    test(e) {
      console.log(this.scheduledOn);
      console.log(e);
    },
  },
});
</script>
