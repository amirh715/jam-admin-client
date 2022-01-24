<template>
  <div class="flex flex-column space">
    <div class="space-v">
      <h3 class="text-center">سبک جدید</h3>
      <div><hr/></div>
    </div>
    <div class="space-v">
      <base-input-text
        label="عنوان:"
        v-model="newGenre.titleInPersian"
        :errors="v$.newGenre.titleInPersian.$errors"
      />
    </div>
    <div class="space-v">
      <base-input-text
        label="عنوان به انگلیسی:"
        v-model="newGenre.title"
        :errors="v$.newGenre.title.$errors"
      />
    </div>
    <div class="space-v">
      <base-multi-select-input
        label="سبک بالادست:"
        v-model="newGenre.parentGenre"
        :options="allGenresFlattened"
        optionLabel="titleInPersian"
        :placeholder="allGenresPlaceholder"
        :disabled="allGenresDisabled"
        :selectionLimit="1"
      />
    </div>
    <div class="space-v"><hr/></div>
    <div class="space-v flex justify-content-center">
      <Button
        class="p-button p-button-sm"
        :disabled="v$.newGenre.$invalid || !$store.state.isOnline"
        @click="submitCreateGenreForm"
      >
        <span v-if="$store.state.isOnline">ایجاد سبک</span>
        <div v-else>
          <vue-feather type="wifi-off"></vue-feather>
          به اینترنت دسترسی ندارید
        </div>
      </Button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
// import * as _ from 'lodash';
import useVuelidate from '@vuelidate/core';
import { GenreDetails } from '@/classes/Library/DTOs/queries/GenreDetails';
import { CreateGenreRequest } from '@/classes/Library/DTOs/commands/CreateGenreRequest';
import { LibraryService } from '@/services/LibraryService';
import { IBusinessError } from '@/classes/common/IBusinessError';
import { library } from '@/validators';

export default defineComponent({
  setup() {
    return { v$: useVuelidate() };
  },
  name: 'library-new-genre-form',
  emits: ['change'],
  data() {
    return {
      newGenre: {
        title: '',
        titleInPersian: '',
        parentGenre: null,
      },
      allGenresFlattened: [] as Array<GenreDetails>,
      allGenresPlaceholder: '...منتظر باشید',
      allGenresDisabled: true,
    };
  },
  validations() {
    const { title } = library;
    return {
      newGenre: {
        title: { title },
        titleInPersian: { title },
        parentGenre: {},
      },
    };
  },
  methods: {
    submitCreateGenreForm() {
      this.v$.$touch();
      if (this.v$.$invalid) return;
      LibraryService.createGenre(
        new CreateGenreRequest(
          this.newGenre.title,
          this.newGenre.titleInPersian,
          this.newGenre.parentGenre
            && this.newGenre.parentGenre[0].id,
        ),
      )
        .then(() => {
          this.resetNewGenreForm();
          this.$emit('change');
          this.$toast.add({
            severity: 'success',
            detail: 'سبک جدید ایجاد شد.',
            life: 4000,
          });
        })
        .catch((err) => this.$toast.add({ severity: 'error', detail: err.message, life: 4000 }));
    },
    resetNewGenreForm() {
      this.v$.newGenre.$reset();
    },
    fetchGenres() {
      LibraryService.fetchGenres()
        .then((allGenres) => {
          allGenres.forEach((genre) => {
            this.flattenSubGenres(genre).forEach((genre: GenreDetails) => {
              this.allGenresFlattened.push(genre);
            });
          });
          this.allGenresDisabled = false;
          this.allGenresPlaceholder = 'سبک بالادستی را انتخاب کنید';
        })
        .catch((err: IBusinessError) => {
          this.allGenresPlaceholder = err.message;
          this.$router.push({ name: 'Home' });
          this.$toast.add({ severity: 'error', detail: err.message, life: 4000 });
        });
    },
    flattenSubGenres(genre: GenreDetails) {
      const genres = [genre];
      genre.subGenres.forEach((genre) => {
        this.flattenSubGenres(genre).forEach((sub) => {
          genres.push(sub);
        });
      });
      return genres;
    },
  },
  created() {
    this.fetchGenres();
  },
});
</script>
