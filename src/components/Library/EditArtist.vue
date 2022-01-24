<template>
  <div class="flex flex-column justify-content-center">
    <div>
      <h3 class="text-center">اصلاح {{artist.title}}</h3>
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
          />
        </div>
        <div>
          <base-tags-input
            label="تگ ها"
            v-model="tags"
            @change="v$.tags.$touch"
            :errors="v$.tags.$errors"
          />
        </div>
        <div>
          <base-multi-select-input
            label="سبک ها"
            v-model="genres"
            :options="genreOptions"
            :selectionLimit="2"
            optionLabel="title"
          />
        </div>
        <div>
          <base-textarea
            label="توضیحات"
            v-model="description"
            @change="v$.description.$touch"
            :errors="v$.description.$errors"
          />
        </div>
        <div class="flex">
          <span class="space-h">
            <vue-feather type="instagram"></vue-feather>
          </span>
          <base-input-text
            v-model="instagramId"
            @change="v$.instagramId.$touch"
            :errors="v$.instagramId.$errors"
          />
        </div>
      </div>
      <div class="col">
        <div>
          <base-image-input
            :disabled="removeImage"
            label="عکس هنرمند"
            v-model="image"
            :editable="true"
            :stencilProps="{aspectRatio: 1/1}"
            @cropped="imageSelected"
          />
        </div>
        <div class="space-v flex justify-content-center">
          <Button
            @click="removeImage = !removeImage" class="p-button-sm p-button-link">
              <div v-if="removeImage" class="flex">
                <vue-feather type="check"></vue-feather>
                <span class="space-h">عکس هنرمند پاک خواهد شد.</span>
              </div>
              <div v-else class="flex">
                <vue-feather type="trash-2"></vue-feather>
                <span class="space-h">حذف عکس هنرمند</span>
              </div>
          </Button>
        </div>
        <div>
          <base-textarea
            label="علامت گذاری"
            v-model="flagNote"
            @change="v$.flagNote.$touch"
            :errors="v$.flagNote.$errors"
          />
        </div>
      </div>
    </div>
    <div class="space-v"><hr/></div>
    <div class="flex justify-content-center">
      <Button :disabled="v$.$invalid" @click="submit" class="p-button-sm">
        <vue-feather type="save"></vue-feather>
        <span class="space-h">ذخیره</span>
      </Button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { helpers } from '@vuelidate/validators';
import { library } from '@/validators';
import { LibraryService } from '@/services/LibraryService';
import { GenreDetails } from '@/classes/Library/DTOs/queries/GenreDetails';
import { EditArtistRequest } from '@/classes/Library/DTOs/commands/EditArtistRequest';
import { ArtistDetails } from '@/classes/Library/DTOs/queries/ArtistDetails';
import { GenreIdAndTitle } from '@/classes/Library/DTOs/queries/GenreIdAndTitle';

export default defineComponent({
  setup() {
    return { v$: useVuelidate() };
  },
  props: {
    artist: ArtistDetails,
  },
  validations() {
    const {
      title,
      tagList,
      description,
      flag,
      instagramId,
    } = library;
    return {
      title: { title: helpers.withMessage(() => 'عنوان هنرمند باید بین یک تا ۸۰ کاراکتر باشد.', title) },
      tags: { tags: helpers.withMessage(() => '', tagList) },
      description: { description: helpers.withMessage(() => '', description) },
      flagNote: { flag: helpers.withMessage(() => '', flag) },
      instagramId: { instagramId: helpers.withMessage(() => '', instagramId) },
    };
  },
  data() {
    return {
      title: (this.artist as ArtistDetails).title,
      tags: (this.artist as ArtistDetails).tags,
      genres: (this.artist as ArtistDetails).genres,
      description: (this.artist as ArtistDetails).description,
      genreOptions: [],
      image: null,
      flagNote: (this.artist as ArtistDetails).flagNote,
      instagramId: (this.artist as ArtistDetails).instagramId,
      removeImage: false,
      genrePlaceholderText: 'منتظر باشید...',
      genresInputDisabled: true,
    };
  },
  methods: {
    submit() {
      const dto = new EditArtistRequest(
        this.artist.id,
        this.title,
        this.description,
        this.tags,
        this.genres,
        this.flagNote,
        this.instagramId,
        this.removeImage,
        this.image,
      );
      LibraryService.editArtist(dto)
        .then(() => {
          this.$router.push({ name: 'LibraryListing' });
          this.$toast.add({
            severity: 'success',
            detail: 'هنرمند با موفقیت اصلاح شد.',
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
    imageSelected(image: Blob) {
      this.image = image;
    },
  },
  mounted() {
    this.genresInputDisabled = true;
    LibraryService.fetchAndFlattenGenres()
      .then((genreDetails: GenreDetails[]) => {
        this.genreOptions = genreDetails.map((genre) => new GenreIdAndTitle(genre.id, genre.title));
        this.genresInputDisabled = false;
        this.genrePlaceholderText = 'سبک های هنرمند را انتخاب کنید.';
      })
      .catch((err) => {
        this.genrePlaceholderText = err.message;
        this.$toast.add({
          severity: 'error',
          detail: err.message,
          life: 4000,
        });
      });
  },
});
</script>
