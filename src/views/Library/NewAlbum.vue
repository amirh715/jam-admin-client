<template>
  <Card style="width: 60%; margin: auto">
    <template #content>
      <div class="flex flex-column justify-content-center">
        <div>
          <h3>آلبوم جدید {{artistTitle}}</h3>
        </div>
        <div class="space-v"><hr/></div>
        <div class="grid">
          <div class="col">
            <div>
              <base-input-text
                label="عنوان"
                v-model="title"
                @change="v$.title.$touch"
                :errors="v$.title.$errors"
                note="فارسی برای آلبوم های فارسی و انگلیسی برای آلبوم های خارجی"
              />
            </div>
            <div>
              <base-tags-input
                label="تگ ها"
                v-model="tags"
                @change="v$.tags.$touch"
                :errors="v$.tags.$invalid"
                note="عنوان آلبوم به فینگلیش"
              />
            </div>
            <div>
              <base-multi-select-input
                label="سبک ها"
                v-model="genres"
                :options="genresOfArtist"
                optionLabel="title"
                :selectionLimit="2"
                :placeholder="loadingGenresPlaceholder"
                note="سبک آلبوم از میان سبک های هنرمند آن"
              />
            </div>
            <div>
              <base-textarea
                label="توضیحات"
                v-model="description"
                @change="v$.description.$touch"
                :errors="v$.description.$errors"
                note="چند جمله کوتاه درباره آلبوم..."
              />
            </div>
            <div>
              <base-input-text
                label="لیبل"
                v-model="recordLabel"
                @change="v$.recordLabel.$touch"
                :errors="v$.recordLabel.$errors"
                note="عنوان رکورد لیبل"
              />
            </div>
            <div>
              <base-input-text
                label="تهیه کننده"
                v-model="producer"
                @change="v$.producer.$touch"
                :errors="v$.producer.$errors"
                note="عنوان تهیه کننده"
              />
            </div>
          </div>
          <div class="col">
            <div>
              <base-image-input
                label="انتخاب عکس آلبوم"
                :editable="true"
                v-model="image"
              />
            </div>
            <div>
              <base-textarea
                label="علامت گذاری"
                v-model="flag"
                @change="v$.flag.$touch"
                :errors="v$.flag.$errors"
                note="این یادداشت تنها برای ادمین های سیستم قابل مشاهده است."
              />
            </div>
            <div style="width: 60%; margin: auto;">
              <p class="space-v">تاریخ انتشار</p>
              <datetime-picker
                type="date"
                v-model="releaseDate"
              />
            </div>
          </div>
        </div>
        <div class="space-2-v">
          <Button @click="submit"
            :disabled="v$.$invalid || !$store.state.isOnline" class="p-button-sm">
              <div v-if="$store.state.isOnline" class="flex">
                <vue-feather type="check"></vue-feather>
                <span class="space-h">ایجاد آلبوم جدید</span>
              </div>
              <div v-else class="flex">
                <vue-feather type="wifi-off"></vue-feather>
                <span class="space-h">به اینترنت دسترسی ندارید</span>
              </div>
          </Button>
        </div>
      </div>
    </template>
  </Card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { helpers } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';
import { library } from '@/validators';
import { GenreDetails } from '@/classes/Library/DTOs/queries/GenreDetails';
import { LibraryService } from '@/services/LibraryService';
import { ArtistDetails } from '@/classes/Library/DTOs/queries/ArtistDetails';
import { CreateAlbumRequest } from '@/classes/Library/DTOs/commands/CreateAlbumRequest';

export default defineComponent({
  setup() {
    return { v$: useVuelidate() };
  },
  validations() {
    const {
      title,
      tagList,
      description,
      recordLabel,
      producer,
      flag,
      releaseDate,
    } = library;
    return {
      title: { title: helpers.withMessage(() => '', title) },
      tags: { tags: helpers.withMessage(() => '', tagList) },
      description: { description: helpers.withMessage(() => '', description) },
      recordLabel: { recordLabel: helpers.withMessage(() => '', recordLabel) },
      producer: { producer: helpers.withMessage(() => '', producer) },
      flag: { flag: helpers.withMessage(() => '', flag) },
      releaseDate: { releaseDate: helpers.withMessage(() => '', releaseDate) },
    };
  },
  data() {
    return {
      artistId: this.$route.query.artistId,
      artistTitle: this.$route.query.artistTitle,
      title: null,
      tags: null,
      genres: [],
      description: null,
      recordLabel: null,
      producer: null,
      image: null,
      flag: null,
      releaseDate: null,
      loadingGenres: false,
      loadingGenresPlaceholder: 'منتظر باشید...',
      genresOfArtist: [],
    };
  },
  methods: {
    submit() {
      const dto = new CreateAlbumRequest(
        {
          title: this.title,
          description: this.description,
          genreIds: this.genreIds,
          tags: this.tags,
          flag: this.flag,
          artistId: this.artistId,
          recordLabel: this.recordLabel,
          producer: this.producer,
          releaseDate: this.releaseDate,
          image: this.image,
        },
      );
      LibraryService.createAlbum(dto)
        .then(() => {
          this.$toast.add({
            severity: 'success',
            detail: 'آلبوم جدید ایجاد شد.',
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
  },
  mounted() {
    this.loadingGenres = true;
    LibraryService.getById(this.artistId)
      .then((artist: ArtistDetails) => {
        this.genresOfArtist = artist.genres;
      })
      .catch((err) => {
        this.loadingGenresPlaceholder = err.message;
      })
      .finally(() => {
        this.loadingGenres = false;
      });
    LibraryService.fetchGenres()
      .then((allGenres: GenreDetails[]) => {
        this.allGenres = allGenres;
        this.loadingGenresPlaceholder = 'سبک های آلبوم را انتخاب کنید.';
      })
      .catch((err) => {
        this.loadingGenresPlaceholder = err.message;
      })
      .finally(() => {
        this.loadingGenres = false;
      });
  },
});
</script>
