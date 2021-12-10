<template>
  <div class="flex flex-row justify-content-start">
    <div class="space-h">
      <Button
        @dblclick="deleteEntity"
        class="p-button-sm p-button-danger p-button-outlined"
      >
        <vue-feather type="trash-2"></vue-feather>
        <span class="space-h">حذف</span>
      </Button>
    </div>
    <div class="space-h">
      <Button
        v-if="value.published"
        @dblclick="archive"
        class="p-button-sm p-button-danger p-button-outlined"
      >
        <vue-feather type="archive"></vue-feather>
        <span class="space-h">آرشیو سازی</span>
      </Button>
    </div>
    <div class="space-h">
      <Button
        v-if="!value.published"
        @dblclick="isArtist ? cascadeArtistPublishCommandToArtworksDialogVisible = true : publish"
        class="p-button-sm p-button-danger p-button-outlined"
      >
        <vue-feather type="radio"></vue-feather>
        <span class="space-h">انتشار</span>
      </Button>
    </div>
  </div>
  <Dialog v-model:visible="cascadeArtistPublishCommandToArtworksDialogVisible">
    <div class="flex flex-column align-items-center space-v">
      <div class="flex">
        <label class="space-h">تمامی آثار هنرمند را هم منتشر کن.</label>
        <InputSwitch v-model="cascadeArtistPublishCommandToArtworks"
          trueValue="true" falseValue="false"/>
      </div>
      <div class="space-3-v">
        <Button @click="publish"
          class="p-button-sm">ادامه بده</Button>
      </div>
    </div>
  </Dialog>
</template>

<style lang="scss" scoped>

</style>

<script lang="ts">
import { defineComponent } from 'vue';
import { AlbumDetails as AlbumDetailsDTO } from '@/classes/Library/DTOs/queries/AlbumDetails';
import { TrackDetails as TrackDetailsDTO } from '@/classes/Library/DTOs/queries/TrackDetails';
import { BandDetails as BandDetailsDTO } from '@/classes/Library/DTOs/queries/BandDetails';
import { SingerDetails as SingerDetailsDTO } from '@/classes/Library/DTOs/queries/SingerDetails';

export default defineComponent({
  name: 'library-sensitive-options-card',
  emits: ['deleteEntity', 'archive', 'publish'],
  props: {
    value: AlbumDetailsDTO || TrackDetailsDTO || BandDetailsDTO || SingerDetailsDTO,
  },
  data() {
    return {
      cascadeArtistPublishCommandToArtworksDialogVisible: false,
      cascadeArtistPublishCommandToArtworks: false,
    };
  },
  computed: {
    isArtist() {
      return this.value instanceof SingerDetailsDTO || this.value instanceof BandDetailsDTO;
    },
  },
  methods: {
    deleteEntity() {
      let headerText = 'حذف';
      let messageText = 'حذف یک هنرمند/اثر غیرقابل بازگشت است. مطمئن هستید؟';
      if (this.value instanceof AlbumDetailsDTO) {
        headerText = 'حذف آلبوم';
        messageText = 'با حذف آلبوم تمام آهنگ های آن نیز حذف می شوند. مطمئن هستید؟';
      }
      if (this.value instanceof TrackDetailsDTO) {
        headerText = 'حذف آهنگ';
        messageText = 'آیا مطمئن هستید؟';
      }
      if (this.value instanceof BandDetailsDTO || this.value instanceof SingerDetailsDTO) {
        headerText = 'حذف هنرمند';
        messageText = 'با حذف هنرمند تمام آثار او نیز حذف می شود. مطمئن هستید؟';
      }
      this.$confirm.require({
        header: headerText,
        message: messageText,
        acceptLabel: 'بله. پاک کن.',
        rejectLabel: 'بیخیال',
        accept: () => {
          this.$emit('deleteEntity');
        },
        defaultFocus: 'reject',
      });
    },
    publish() {
      let headerText = this.value.isPublished ? 'آرشیوسازی' : 'انتشار';
      let messageText = 'حذف یک هنرمند/اثر غیرقابل بازگشت است. مطمئن هستید؟';
      const acceptLabelText = 'بله. ادامه بده.';
      if (this.value instanceof AlbumDetailsDTO) {
        headerText = 'انتشار آلبوم';
        messageText = 'با انتشار آلبوم تمام آهنگ های آن نیز منتشر می شوند. مطمئن هستید؟';
      }
      if (this.value instanceof TrackDetailsDTO) {
        headerText = 'انتشار آهنگ';
        messageText = 'آیا مطمئن هستید؟';
      }
      if (this.value instanceof BandDetailsDTO || this.value instanceof SingerDetailsDTO) {
        this.cascadeArtistPublishCommandToArtworksDialogVisible = false;
        headerText = this.value.isPublished ? 'آرشیوسازی هنرمند' : 'انتشار هنرمند';
        messageText = '';
      }
      this.$confirm.require({
        header: headerText,
        message: messageText,
        acceptLabel: acceptLabelText,
        rejectLabel: 'بیخیال',
        accept: () => {
          this.$emit('publish', this.cascadeArtistPublishCommandToArtworks);
        },
        defaultFocus: 'reject',
      });
    },
    archive() {
      this.$emit('archive');
    },
  },
});
</script>
