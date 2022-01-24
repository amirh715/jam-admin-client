<template>
  <div class="flex flex-column justify-content-start align-items-start space">
    <div class="flex flex-row align-items-center">
      <Inplace>
        <template #display>
          <div class="flex flex-row align-items-center">
            <vue-feather type="edit"></vue-feather>
            <h3 class="space-h">{{genre.titleInPersian}}</h3>
            <small>({{genre.title}})</small>
          </div>
        </template>
        <template #content>
          <base-input-text
            label="عنوان"
            v-model="genreEdit.titleInPersian"
          />
          <base-input-text
            label="عنوان به انگلیسی"
            v-model="genreEdit.title"
          />
          <Button
            @click="editGenre(genre)"
            class="p-button p-button-sm">
            <div v-if="$store.state.isOnline" class="flex flex-row align-items-center">
              <vue-feather type="check"></vue-feather>
              <span class="space-h">تغییر</span>
            </div>
            <div v-else class="flex flex-row align-items-center">
              <vue-feather type="wifi-off"></vue-feather>
              <span class="space-h">به اینترنت دسترسی ندارید</span>
            </div>
          </Button>
        </template>
      </Inplace>
    </div>
    <div class="space-2-v">
      <div class="space-v">تاریخ ایجاد:‌
        <date-time-displayer :datetime="genre.createdAt" /></div>
      <div class="space-v">تاریخ آخرین تغییر:‌
        <date-time-displayer :datetime="genre.lastModifiedAt" /></div>
    </div>
    <div>
      <Button
        @dblclick="removeGenre(genre.id)"
        :disabled="!$store.state.isOnline"
        class="p-button p-button-sm p-button-danger">
        <div v-if="$store.state.isOnline" class="flex flex-row align-items-center">
          <vue-feather type="trash-2"></vue-feather>
          <span class="space-h">حذف</span>
        </div>
        <div v-else class="flex flex-row align-items-center">
          <vue-feather type="wifi-off"></vue-feather>
          <span class="space-h">به اینترنت دسترسی ندارید</span>
        </div>
      </Button>
    </div>
    <b v-if="genre.subGenres.length > 0" class="space-2">زیر سبک ها</b>
    <div v-if="genre.subGenres.length > 0" class="space-2-v subGenre">
      <div v-for="subGenre in genre.subGenres" :key="subGenre.id">
        <library-genre-details :genre="subGenre" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.subGenre {
  border: 1px solid whitesmoke;
  border-radius: 4px;
  padding: 2rem;
}
</style>

<script lang="ts">
import { defineComponent } from 'vue';
import { GenreDetails } from '@/classes/Library/DTOs/queries/GenreDetails';
import { LibraryService } from '@/services/LibraryService';
import { EditGenreRequest } from '@/classes/Library/DTOs/commands/EditGenreRequest';
import { IBusinessError } from '@/classes/common/IBusinessError';

export default defineComponent({
  name: 'library-genre-details',
  emits: ['remove'],
  props: {
    genre: GenreDetails,
  },
  data() {
    return {
      genreEdit: {
        title: this.$props.genre['title'],
        titleInPersian: this.$props.genre['titleInPersian'],
      },
    };
  },
  methods: {
    editGenre() {
      this.$confirm.require({
        message: 'آیا از اعمال تغییرات اطمینان دارید؟',
        header: 'آیا اطمینان دارید؟',
        acceptLabel: 'بله',
        rejectLabel: 'بیخیال',
        accept: () => {
          const dto = new EditGenreRequest(
            this.genre.id,
            this.genreEdit.title,
            this.genreEdit.titleInPersian,
          );
          LibraryService.editGenre(dto)
            .then(() =>
              this.$toast.add({ severity: 'success', detail: 'DONE BITCH!', life: 4000 }))
            .catch((err) =>
              this.$toast.add({ severity: 'error', detail: err.message, life: 4000 }));
        },
      });
    },
    removeGenre(id: string) {
      this.$confirm.require({
        message: `
          با حذف این سبک تمامی زیرسبک های آن نیز حذف می شوند.
          همینطور تمامی هنرمندان، آلبوم ها، و آهنگ های این سبک نیز بدون سبک می شوند.
        `,
        header: 'آیا اطمینان دارید؟',
        acceptLabel: 'بله سبک را حذف کن!',
        rejectLabel: 'بیخیال',
        defaultFocus: 'reject',
        accept: () => {
          LibraryService.removeGenre(id)
            .then(() => {
              this.$emit('remove');
              this.$toast.add({
                severity: 'success',
                detail: 'سبک با موفقیت حذف شد.',
                life: 4000,
              });
            })
            .catch((err) => {
              this.$toast.add({ severity: 'error', detail: err.message, life: 4000 });
            });
        },
      });
    },
  },
});
</script>
