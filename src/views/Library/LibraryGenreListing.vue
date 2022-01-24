<template>
  <div class="space-2-v flex justify-content-right">
    <Button class="p-button-sm" @click="newGenreDialogVisible = true">
      <vue-feather type="plus"></vue-feather>
      <span class="space-h">سبک جدید</span>
    </Button>
  </div>
  <div class="grid">
    <Card v-for="genre in allGenres" :key="genre.id">
      <template #content>
        <div>
          <library-genre-details :genre="genre" @remove="fetchGenres" />
        </div>
      </template>
    </Card>
  </div>
  <Dialog v-model:visible="newGenreDialogVisible">
    <library-new-genre-form @change="fetchGenres" />
  </Dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { LibraryService } from '@/services/LibraryService';
import { GenreDetails } from '@/classes/Library/DTOs/queries/GenreDetails';
import { IBusinessError } from '@/classes/common/IBusinessError';
import LibraryGenreDetails from '@/components/Library/LibraryGenreDetails.vue';
import LibraryNewGenreForm from '@/components/Library/LibraryNewGenreForm.vue';

export default defineComponent({
  setup() {
    return { v$: useVuelidate() };
  },
  components: {
    LibraryGenreDetails,
    LibraryNewGenreForm,
  },
  data() {
    return {
      newGenre: {
        title: '',
        titleInPersian: '',
        parentGenre: null,
      },
      allGenres: [] as Array<GenreDetails>,
      editedGenres: [] as Array<GenreDetails>,
      allGenresPlaceholder: '...منتظر باشید',
      allGenresDisabled: true,
      newGenreDialogVisible: false,
    };
  },
  methods: {
    fetchGenres() {
      this.newGenreDialogVisible = false;
      LibraryService.fetchGenres()
        .then((allGenres) => {
          this.allGenres = allGenres;
          this.allGenresDisabled = false;
          this.allGenresPlaceholder = 'سبک بالادستی را انتخاب کنید';
        })
        .catch((err: IBusinessError) => {
          this.allGenresPlaceholder = err.message;
          this.$router.push({ name: 'Home' });
          this.$toast.add({ severity: 'error', detail: err.message, life: 4000 });
        });
    },
  },
  created() {
    this.fetchGenres();
  },
});
</script>
