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
            :placeholder="genreInputPlaceholderText"
            :disabled="genreInputDisabled || isAlbumTrack"
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
        <div>
          <span class="space-v">تاریخ انتشار</span>
          <base-datetime-picker
            v-model="releaseDate"
            :disabled="isAlbumTrack"
            type="date"
            format="YYYY-MM-DDTHH:mm:ss"
          />
        </div>
      </div>
      <div class="col">
        <div>
          <base-image-input
            :label="isAlbum ? 'عکس آلبوم' : 'عکس آهنگ'"
            v-model="image"
            :editable="true"
            :stencilProps="{aspectRatio: 1/1}"
            :disabled="removeImage || isAlbumTrack"
            :note="isAlbumTrack && 'عکس آلبوم برای آهنگ در نظر گرفته می شود.'"
            @cropped="imageSelected"
          />
          <div class="space-v flex justify-content-center">
            <Button @click="removeImage = !removeImage"
              :disabled="isAlbumTrack"
              class="p-button-sm p-button-link">
                <div v-if="removeImage" class="flex">
                  <vue-feather type="check"></vue-feather>
                  <span class="space-h">عکس آلبوم پاک خواهد شد.</span>
                </div>
                <div v-else class="flex">
                  <vue-feather type="trash-2"></vue-feather>
                  <span class="space-h">{{isTrack ? 'حذف عکس آهنگ' : 'حذف عکس آلبوم'}}</span>
                </div>
            </Button>
          </div>
        </div>
        <div>
          <base-input-text
            label="رکورد لیبل"
            :disabled="isAlbumTrack"
            v-model="recordLabel"
            @change="v$.recordLabel.$touch"
            :errors="v$.recordLabel.$errors"
            :note="isAlbumTrack && 'رکورد لیبل آلبوم برای آهنگ در نظر گرفته می شود.'"
          />
        </div>
        <div>
          <base-input-text
            label="تهیه کننده"
            :disabled="isAlbumTrack"
            v-model="producer"
            @change="v$.producer.$touch"
            :errors="v$.producer.$errors"
            :note="isAlbumTrack && 'تهیه کننده آلبوم برای این آهنگ در نظر گرفته می شود.'"
          />
        </div>
        <div>
          <base-textarea
            label="علامت گذاری"
            v-model="flagNote"
          />
        </div>
      </div>
    </div>
    <div v-if="isTrack">
      <base-textarea
        label="لیریک"
        v-model="lyrics"
      />
    </div>
    <div class="space-v"><hr/></div>
    <div class="flex justify-content-center space-2-v">
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
import { AlbumDetails } from '@/classes/Library/DTOs/queries/AlbumDetails';
import { TrackDetails } from '@/classes/Library/DTOs/queries/TrackDetails';
import { LibraryService } from '@/services/LibraryService';
import { EditArtworkRequest } from '@/classes/Library/DTOs/commands/EditArtworkRequest';
import { ArtworkDetails } from '@/classes/Library/DTOs/queries/ArtworkDetails';

export default defineComponent({
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
      title: { title: helpers.withMessage(() => 'عنوان باید حداقل یک کاراکتر باشد.', title) },
      description: { description: helpers.withMessage(() => '', description) },
      recordLabel: { recordLabel: helpers.withMessage(() => '', recordLabel) },
      producer: { producer: helpers.withMessage(() => '', producer) },
    };
  },
  data() {
    return {
      title: (this.artwork as ArtworkDetails).title,
      flagNote: (this.artwork as ArtworkDetails).flagNote,
      tags: (this.artwork as ArtworkDetails).tags,
      genres: (this.artwork as ArtworkDetails).genres,
      description: (this.artwork as ArtworkDetails).description,
      releaseDate: (this.artwork as ArtworkDetails).releaseDate,
      lyrics: (this.artwork as TrackDetails).lyrics || null,
      image: null,
      removeImage: false,
      recordLabel: (this.artwork as ArtworkDetails).recordLabel,
      producer: (this.artwork as ArtworkDetails).producer,
      genreOptions: [],
      genreInputPlaceholderText: 'منتظر باشید...',
      genreInputDisabled: true,
    };
  },
  computed: {
    isAlbumTrack() {
      return this.artwork.type === 'T' && this.artwork.album;
    },
    isSingleTrack() {
      return this.artwork.type === 'T' && !this.artwork.album;
    },
    isTrack() {
      return this.artwork.type === 'T';
    },
    isAlbum() {
      return this.artwork.type === 'A';
    },
  },
  methods: {
    submit() {
      const dto = new EditArtworkRequest(
        this.artwork.id,
        this.title,
        this.description,
        this.genres,
        this.tags,
        this.flagNote,
        this.recordLabel,
        this.producer,
        this.releaseDate,
        this.lyrics,
        this.removeImage,
        this.image,
      );
      LibraryService.editArtwork(dto)
        .then(() => {
          this.$router.push({ name: 'LibraryListing' });
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
    let id: string;
    if (this.artwork instanceof AlbumDetails) { // album
      const album = this.artwork as AlbumDetails;
      id = album.artist.id;
    } else { // track
      const track = this.artwork as TrackDetails;
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
