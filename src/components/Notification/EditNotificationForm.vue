<template>
  <div>
    <form @submit="submit">
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
          />
          <div style="width: 80%; margin: auto;">
            <p class="space">زمان ارسال</p>
            <datetime-picker />
          </div>
        </div>
        <div class="col">
          <base-textarea
            label="متن"
            v-model="message"
            @change="v$.message.$touch"
            :errors="v$.message.$errors"
          />
        </div>
      </div>
      <div><hr/></div>
      <div class="flex justify-content-center space-2-v">
        <Button class="p-button-sm">
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
import { NotificationDetails } from '@/classes/Notification/DTOs/queries/NotificationDetails';
import { notification } from '@/validators';

export default defineComponent({
  setup() {
    return { v$: useVuelidate() };
  },
  name: 'edit-notification-form',
  props: {
    notification: NotificationDetails,
  },
  data() {
    return {
      title: this.$props.notification['title'],
      message: this.$props.notification['message'],
      route: this.$props.notification['route'],
      scheduledOn: this.$props.notification['scheduledOn'],
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
});
</script>
