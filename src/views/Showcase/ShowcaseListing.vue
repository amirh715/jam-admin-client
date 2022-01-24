<template>
  <div class="flex">
    <div v-if="loading" class="flex">
      <Skeleton
        v-for="item in 5"
        :key="item"
        width="17rem" height="17rem"
        class="space-h"
      />
    </div>
    <div v-else-if="!loading && items.length > 0" class="flex">
      <showcase-item
        @click="selectedItem = item"
        v-for="item in items"
        :key="item.index"
        :value="item"
        style="cursor: pointer"
      />
    </div>
    <div>
      <h1>ویترین خالی ست :|</h1>
    </div>
  </div>
  <Dialog v-model:visible="selectedItem" style="width: 50rem">
    <div class="grid">
      <div class="col">
        <div class="flex">
          <vue-feather type="hash"></vue-feather>
          <b class="space-h">عنوان:</b>
          <span>
            {{selectedItem.title}}
          </span>
        </div>
        <div class="flex space-2-v">
          <vue-feather type="eye"></vue-feather>
          <span class="space-h">
            <number-displayer :value="selectedItem.interactionCount" class="space-h" />
            بار دیده شده
          </span>
        </div>
        <div class="flex">
          <vue-feather type="calendar"></vue-feather>
          <b class="space-h">تاریخ ایجاد:</b>
          <span>
            <date-time-displayer :datetime="selectedItem.createdAt" />
          </span>
        </div>
        <div class="flex space-2-v">
          <vue-feather type="message-circle"></vue-feather>
          <b class="space-h">متن:</b>
          <span>{{selectedItem.message || '( متن ندارد )'}}</span>
        </div>
        <div class="flex space-2-v">
          <vue-feather type="user"></vue-feather>
          <b class="space-h">ایجاد کننده:</b>
          <span>{{selectedItem.creatorName}}</span>
        </div>
        <div class="flex space-2-v">
          <vue-feather type="link"></vue-feather>
          <b class="space-h">لینک:</b>
          <Button @click="goToSelectedItem" class="p-button-link">{{selectedItem.route}}</Button>
        </div>
        <div><hr/></div>
        <div class="flex space-2-v">
          <Button @dblclick="deleteItem" class="p-button-sm p-button-outlined p-button-danger">
            <vue-feather type="trash-2"></vue-feather>
            <span class="space-h">پاک کن</span>
          </Button>
        </div>
      </div>
      <div class="col">
        <showcase-item
          :value="selectedItem"
        />
      </div>
    </div>
  </Dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ShowcaseItem from '@/components/Showcase/ShowcaseItem.vue';
import { ShowcaseService } from '@/services/ShowcaseService';
import DateTimeDisplayer from '@/components/common/DateTimeDisplayer.vue';

export default defineComponent({
  components: {
    ShowcaseItem,
    DateTimeDisplayer,
  },
  data() {
    return {
      items: [],
      loading: true,
      selectedItem: null,
    };
  },
  methods: {
    goToSelectedItem() {
      window.open(this.selectedItem.route);
    },
    loadImages() {
      this.items.forEach((item) => {
        ShowcaseService.getShowcaseImageById(item.id)
          .then((image: Blob) => {
            const reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onloadend = () => {
              item.imageSrc = reader.result;
            };
          })
          .catch((err) => {
            this.$toast.add({
              detail: err,
              life: 4000,
              severity: 'error',
            });
          });
      });
    },
    deleteItem() {
      this.$confirm.require({
        message: 'آیا از حذف این آیتم اطمینان دارید؟',
        header: 'حذف آیتم ویترین',
        acceptLabel: 'آره پاک کن',
        rejectLabel: 'بیخیال',
        defaultFocus: 'reject',
        accept: () => {
          ShowcaseService.removeShowcase(this.selectedItem.id)
            .then(() => {
              this.$router.push({ name: 'Home' });
            })
            .catch((err) => {
              this.$toast.add({
                detail: err,
                severity: 4000,
                life: 4000,
              });
            });
        },
      });
    },
  },
  mounted() {
    ShowcaseService.getAllShowcases()
      .then((items) => {
        this.items = items;
        this.loadImages();
      })
      .catch((err) => {
        this.$toast.add({
          detail: err,
          severity: 4000,
          life: 4000,
        });
      })
      .finally(() => {
        this.loading = false;
      });
  },
});
</script>
