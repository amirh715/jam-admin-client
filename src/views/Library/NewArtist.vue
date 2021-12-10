<template>
  <Card style="width: 60%; margin: auto;">
    <template #content>
      <div class="flex flex-column justify-content-center">
        <div>
          <h3>هنرمند جدید</h3>
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
                note="فارسی برای هنرمندان ایرانی و انگلیسی برای هنرمندان خارجی"
              />
            </div>
            <div>
              <base-tags-input
                label="تگ ها"
                v-model="tags"
                @change="v$.tags.$touch"
                :errors="v$.tags.$errors"
                note="فینگلیش عنوان، لقب، نام های دیگر، و ..."
              />
            </div>
            <div>
              <base-multi-select-input
                label="سبک ها"
                v-model="genres"
                :options="allGenres"
                optionLabel="title"
                :selectionLimit="2"
                :placeholder="genresLoadingPlaceholder"
                :disabled="waitingForGenresToLoad"
                note="سبک های آثار هنرمند زیرمجموعه ای از سبک های هنرمندشان خواهند بود."
              />
            </div>
            <div>
              <base-textarea
                label="توضیحات"
                v-model="description"
                @change="v$.description.$touch"
                :errors="v$.description.$errors"
                note="چند جمله کوتاه درباره هنرمند..."
              />
            </div>
            <div class="flex justify-content-center align-items-center">
              <vue-feather type="instagram"></vue-feather>
              <base-input-text
                v-model="instagramId"
                @change="v$.instagramId.$touch"
                :errors="v$.instagramId.$errors"
              />
            </div>
          </div>
          <div class="col">
            <div class="flex justify-content-center space-2-v">
              <span class="space-2-h">نوع هنرمند:</span>
              <div>
                <RadioButton v-model="artistType" value="S"></RadioButton>
                <label class="space-h">خواننده</label>
              </div>
              <div>
                <RadioButton v-model="artistType" value="B"></RadioButton>
                <label class="space-h">گروه</label>
              </div>
            </div>
            <div>
              <base-image-input
                label="انتخاب عکس هنرمند"
                :editable="true"
                :stencilProps="{aspectRatio: 1/1}"
                v-model="image"
                @cropped="imageCropped"
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
          </div>
        </div>
        <div><hr/></div>
        <div class="space-2-v">
          <Button :disabled="v$.$invalid" @click="submit" class="p-button-sm">
            <vue-feather type="check"></vue-feather>
            <span class="space-h">ایجاد هنرمند جدید</span>
          </Button>
        </div>
      </div>
    </template>
  </Card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { helpers, required } from '@vuelidate/validators';
import { library } from '@/validators';
import { LibraryService } from '@/services/LibraryService';
import { CreateArtistRequest } from '@/classes/Library/DTOs/commands/CreateArtistRequest';
import { GenreDetails } from '@/classes/Library/DTOs/queries/GenreDetails';

export default defineComponent({
  setup() {
    return { v$: useVuelidate() };
  },
  validations() {
    const {
      title,
      description,
      tagList,
      instagramId,
      flag,
    } = library;
    return {
      title: { title: helpers.withMessage(() => '', title) },
      description: { description: helpers.withMessage(() => '', description) },
      tags: { tags: helpers.withMessage(() => '', tagList) },
      instagramId: { instagramId: helpers.withMessage(() => '', instagramId) },
      flag: { flag: helpers.withMessage(() => '', flag) },
      artistType: { required },
    };
  },
  data() {
    return {
      title: null,
      description: null,
      genres: [],
      tags: null,
      instagramId: null,
      artistType: null,
      image: null,
      flag: null,
      allGenres: [],
      waitingForGenresToLoad: false,
      genresLoadingPlaceholder: 'منتظر باشید...',
    };
  },
  methods: {
    submit() {
      const dto = new CreateArtistRequest(
        this.artistType,
        this.title,
        this.description,
        this.genres,
        this.tags,
        this.flag,
        this.instagramId,
        this.image,
      );
      LibraryService.createArtist(dto)
        .then(() => {
          this.$router.push({ name: 'LibraryListing' });
          this.$toast.add({
            severity: 'success',
            detail: 'هنرمند ایجاد شد.',
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
    fetchGenres() {
      this.waitingForGenresToLoad = true;
      LibraryService.fetchGenres()
        .then((allGenres) => {
          allGenres.forEach((genre) => {
            this.flattenGenres(genre).forEach((genre: GenreDetails) => {
              this.allGenres.push(genre);
            });
          });
          this.genresLoadingPlaceholder = 'سبک هنرمند را انتخاب کنید.';
        })
        .catch((err) => {
          this.genresLoadingPlaceholder = err.message;
          this.$toast.add({
            severity: 'error',
            detail: err.message,
            life: 4000,
          });
        })
        .finally(() => {
          this.waitingForGenresToLoad = false;
        });
    },
    flattenGenres(genre: GenreDetails) {
      const genres = [genre];
      genre.subGenres.forEach((genre) => {
        this.flattenGenres(genre).forEach((sub) => {
          genres.push(sub);
        });
      });
      return genres;
    },
    imageCropped(image) {
      this.image = image;
    },
  },
  mounted() {
    this.fetchGenres();
  },
});
</script>
