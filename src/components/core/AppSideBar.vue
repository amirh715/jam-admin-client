<template>
  <PanelMenu
    :model="items"
  />
</template>

<script>
import { defineComponent } from 'vue';
import router from '../../router';

export default defineComponent({
  data() {
    return {
      items: [
        {
          label: 'مجموعه',
          items: [
            {
              label: 'هنرمند جدید',
              command() { router.push({ name: 'NewArtist' }); },
            },
            {
              label: 'لیست آثار و هنرمندان',
              command() { router.push({ name: 'LibraryListing' }); },
            },
            {
              label: 'سبک ها',
              command() { router.push({ name: 'GenreListing' }); },
            },
          ],
        },
        {
          label: 'ویترین',
        },
        {
          label: 'کاربران',
          command() { router.push({ name: 'User' }); },
        },
        {
          label: 'نوتیفیکیشن',
          command() { router.push({ name: 'NotificationListing' }); },
        },
        {
          label: 'گزارش ها',
          command() { router.push({ name: 'ReportsListing' }); },
        },
      ],
    };
  },
});
</script>
