<template>
  <Card style="width: 60%; margin: auto;">
    <template #content>
      <div class="flex flex-column justify-content-center">
        <div>
          <h3>آهنگ جدید {{artistTitle || albumTitle}}</h3>
        </div>
        <div><hr/></div>
        <div class="grid">
          <div class="col">
            <div>
              <base-input-text
                label="عنوان"
                v-model="title"
                @change="v$.title.$touch"
                :errors="v$.title.$errors"
                note="فارسی برای آهنگ های فارسی و انگلیسی برای آهنگ های خارجی"
              />
            </div>
            <div>
              <base-input-text
                label="تگ ها"
                v-model="tags"
                @change="v$.tags.$touch"
                :errors="v$.tags.$errors"
                note="عنوان آهنگ به فینگلیش"
              />
            </div>
            <div>
              <base-multi-select-input
                label="سبک ها"
                v-model="genres"
                :options="genreOptions"
                optionLabel="title"
                :selectionLimit="1"
                :disabled="isAlbumTrack"
                :note="isAlbumTrack
                  ? 'سبک های آلبوم برای آهنگ ثبت می شود.'
                  : 'سبک آهنگ از میان سبک های آلبوم/هنرمند آن است.'"
              />
            </div>
            <div>
              <base-textarea
                label="توضیحات"
                v-model="description"
                @change="v$.description.$touch"
                :errors="v$.description.$errors"
                note="چند جمله کوتاه درباره آهنگ..."
              />
            </div>
            <div>
              <base-input-text
                label="لیبل"
                v-model="recordLabel"
                @change="v$.recordLabel.$touch"
                :errors="v$.recordLabel.$errors"
                :disabled="isAlbumTrack"
                :note="isAlbumTrack && 'رکورد لیبل آلبوم برای آهنگ ثبت می شود.'"
              />
            </div>
            <div>
              <base-input-text
                label="تهیه کننده"
                :disabled="isAlbumTrack"
                :note="isAlbumTrack
                  ? 'تهیه کننده آلبوم برای آهنگ ثبت می شود.'
                  : 'عنوان تهیه کننده'"
              />
            </div>
          </div>
          <div class="col">
            <div>
              <base-audio-input
                label="فایل آهنگ"
                note="فایل صوتی آهنگ را انتخاب کنید."
                @change="trackSelected"
              />
            </div>
            <div>
              <base-image-input
                label="عکس آهنگ"
                v-model="image"
                @cropped="imageSelected"
                :disabled="isAlbumTrack"
                :note="isAlbumTrack && 'عکس آلبوم برای آهنگ ثبت می شود.'"
              />
            </div>
            <div>
              <base-textarea
                label="علامت گذاری"
                note="این یادداشت تنها برای ادمین های سیستم قابل مشاهده است."
              />
            </div>
            <div>
              <p>تاریخ انتشار</p>
              <datetime-picker
                :disabled="isAlbumTrack"
              />
              <label v-if="isAlbumTrack" class="note">
                تاریخ انتشار آلبوم برای آهنگ ثبت می شود.</label>
            </div>
          </div>
        </div>
        <div class="space-2-v"><hr/></div>
        <div class="space-2-v">
          <Button :disabled="v$.$invalid" @click="submit" class="p-button-sm">
            <vue-feather type="check"></vue-feather>
            <span class="space-h">ایجاد آهنگ جدید</span>
          </Button>
        </div>
      </div>
    </template>
  </Card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { helpers } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
import { library } from '@/validators';
import BaseAudioInput from '@/components/common/BaseAudioInput.vue';
import { LibraryService } from '@/services/LibraryService';
import { LibraryEntityDetails } from '@/classes/Library/DTOs/queries/LibraryEntityDetails';
import { CreateTrackRequest } from '@/classes/Library/DTOs/commands/CreateTrackRequest';

export default defineComponent({
  setup() {
    return { v$: useVuelidate() };
  },
  components: { BaseAudioInput },
  data() {
    return {
      artistId: this.$route.query.artistId,
      artistTitle: this.$route.query.artistTitle,
      albumId: this.$route.query.albumId,
      albumTitle: this.$route.query.albumTitle,
      title: null,
      tags: [],
      genres: [],
      description: null,
      recordLabel: null,
      producer: null,
      image: null,
      audio: null,
      releaseDate: null,
      genreOptions: [],
    };
  },
  computed: {
    isAlbumTrack() {
      return this.albumId;
    },
  },
  validations() {
    const {
      title,
      tagList,
      description,
      recordLabel,
      releaseDate,
    } = library;
    return {
      title: { title: helpers.withMessage(() => 'عنوان آهنگ باید حداقل یک کاراکتر باشد.', title) },
      tags: { tags: helpers.withMessage(() => 'حداکثر تعداد تگ ها پنج عدد است.', tagList) },
      description: { description: helpers.withMessage(() => 'شرح', description) },
      recordLabel: { recordLabel: helpers.withMessage(() => '', recordLabel) },
      releaseDate: { releaseDate: helpers.withMessage(() => '', releaseDate) },
    };
  },
  methods: {
    submit() {
      const dto = new CreateTrackRequest(
        this.title,
        this.description,
        this.genres,
        this.tags,
        this.flag,
        this.recordLabel,
        this.producer,
        this.releaseDate,
        this.artistId,
        this.albumId,
        this.audio,
        this.image,
      );
      LibraryService.createTrack(dto)
        .then(() => {
          this.$router.push({ name: 'LibraryListing' });
          this.$toast.add({
            severity: 'success',
            detail: 'آهنگ جدید ایجاد شد.',
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
    trackSelected(audio: Blob) {
      this.audio = audio;
    },
    imageSelected(image: Blob) {
      this.image = image;
    },
  },
  mounted() {
    let id: string;
    if (this.isAlbumTrack) {
      id = this.albumId;
    } else {
      id = this.artistId;
    }
    LibraryService.getById(id)
      .then((details: LibraryEntityDetails) => {
        if (!this.isAlbumTrack) {
          this.genreOptions = details.genres;
        }
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
</script>
