<template>
  <div class="flex flex-column justify-content-center">
    <div>
      <h3 class="text-center">اصلاح {{artwork.title}}</h3>
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
          />
        </div>
        <div>
          <base-multi-select-input
            label="سبک ها"
            v-model="genres"
            :options="genreOptions"
            optionLabel="title"
            :placeholder="genreInputPlaceholderText"
            :disabled="genreInputDisabled"
            :selectionLimit="2"
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
        <div>
          <span class="space-v">تاریخ انتشار</span>
          <datetime-picker
            v-model="releaseDate"
          />
        </div>
      </div>
      <div class="col">
        <div>
          <base-image-input
            label="عکس آلبوم"
            v-model="image"
            :disabled="removeImage"
          />
          <div class="space-v flex justify-content-center">
            <Button @click="removeImage = !removeImage"
              class="p-button-sm p-button-link">
                <div v-if="removeImage" class="flex">
                  <vue-feather type="check"></vue-feather>
                  <span class="space-h">عکس آلبوم پاک خواهد شد.</span>
                </div>
                <div v-else class="flex">
                  <vue-feather type="trash-2"></vue-feather>
                  <span class="space-h">حذف عکس آلبوم</span>
                </div>
            </Button>
          </div>
        </div>
        <div>
          <base-input-text
            label="رکورد لیبل"
            v-model="recordLabel"
            @change="v$.recordLabel.$touch"
            :errors="v$.recordLabel.$errors"
          />
        </div>
        <div>
          <base-input-text
            label="تهیه کننده"
            v-model="producer"
            @change="v$.producer.$touch"
            :errors="v$.producer.$errors"
          />
        </div>
      </div>
    </div>
    <div class="space-v"><hr/></div>
    <div class="flex justify-content-center space-2-v">
      <Button :disabled="v$.$invalid" class="p-button-sm">
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
import { AlbumDetails } from '@/classes/Library/DTOs/queries/AlbumDetails';
import { TrackDetails } from '@/classes/Library/DTOs/queries/TrackDetails';
import BaseInputText from '../common/BaseInputText.vue';
import { LibraryService } from '@/services/LibraryService';

export default defineComponent({
  components: { BaseInputText },
  setup() {
    return { v$: useVuelidate() };
  },
  props: {
    artwork: AlbumDetails || TrackDetails,
  },
  validations() {
    const {
      title,
      description,
      recordLabel,
      producer,
    } = library;
    return {
      title: { title: helpers.withMessage(() => '', title) },
      description: { description: helpers.withMessage(() => '', description) },
      recordLabel: { recordLabel: helpers.withMessage(() => '', recordLabel) },
      producer: { producer: helpers.withMessage(() => '', producer) },
    };
  },
  data() {
    return {
      title: null,
      tags: [],
      genres: [],
      description: null,
      releaseDate: null,
      image: null,
      removeImage: false,
      recordLabel: null,
      producer: null,
      genreOptions: [],
      genreInputPlaceholderText: 'منتظر باشید...',
      genreInputDisabled: true,
    };
  },
  mounted() {
    let id: string;
    console.log(this.artwork);
    if (this.artwork instanceof AlbumDetails) { // album
      const album = this.artwork as AlbumDetails;
      id = album.artist.id;
    } else { // track
      const track = this.artwork as TrackDetails;
      console.log(track.isAlbumTrack());
      if (track.isAlbumTrack()) { // album track
        id = track.album.id;
      } else { // single track
        id = track.artist.id;
      }
    }
    LibraryService.getById(id)
      .then((artistOrAlbum) => {
        this.genreOptions = artistOrAlbum.genres;
        this.genreInputPlaceholderText = 'سبک اثر را انتخاب کنید.';
        this.genreInputDisabled = false;
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
