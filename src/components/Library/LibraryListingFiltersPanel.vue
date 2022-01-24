<template>
  <Panel :toggleable="true">
    <template #header>
      <div class="flex align-items-center">
        <vue-feather type="filter"></vue-feather>
        <b class="space-h">فیلتر ها</b>
      </div>
    </template>
    <div class="grid">
      <!-- COL 1 -->
      <div class="col">
        <div>
          <base-input-text
            label="جستجو"
            v-model="searchTerm"
            @change="changed"
          />
        </div>
        <div>
          <base-multi-select-input
            label="نوع"
            v-model="type"
            :options="typeOptions"
            optionLabel="displayValue"
            :selectionLimit="1"
            @change="changed"
          />
        </div>
        <div class="space-3-v flex justify-content-right">
          <TriStateCheckbox
            v-model="published"
            @change="changed"
            class="space-2-h"
          />
          <span v-if="published === null || published === undefined"
            >منتشر شده ها / آرشیو شده ها</span>
          <span v-else-if="published">منتشر شده ها</span>
          <span v-else>آرشیو شده ها</span>
        </div>
        <div class="space-3-v flex justify-content-right">
          <TriStateCheckbox
            v-model="hasImage"
            @change="changed"
            class="space-2-h"
          />
          <span v-if="hasImage === null || hasImage === undefined">عکس دار / بدون عکس</span>
          <span v-else-if="hasImage">عکس دار ها</span>
          <span v-else>بدون عکس ها</span>
        </div>
        <div class="space-3-v flex justify-content-right">
          <TriStateCheckbox
            v-model="flagged"
            @change="changed"
            class="space-2-h"
          />
          <span v-if="flagged === null || flagged === undefined">
            علامت گذاری شده / علامت گذاری نشده
          </span>
          <span v-else-if="flagged">علامت گذاری شده</span>
          <span v-else>علامت گذاری نشده</span>
        </div>
      </div>
      <!-- COL 2 -->
      <div class="col">
        <div>
          <base-multi-select-input
            label="سبک ها"
            @change="changed"
            v-model="genres"
            :options="genreOptions"
            optionLabel="title"
          />
        </div>
        <div style="margin: 1.5rem auto;">
          <p>امتیاز</p>
          <div class="flex justify-content-around align-items-center">
            <label>از:</label>
            <rating
              v-model="rateFrom"
              @change="changed"
            />
          </div>
          <div class="flex justify-content-around align-items-centesr">
            <label>تا:</label>
            <rating
              v-model="rateTo"
              @change="changed"
            />
          </div>
        </div>
        <div>
          <p>مجموع تعداد پخش</p>
          <div class="flex justify-content-around align-items-center space-v">
            <span class="space-h">از:</span>
            <InputNumber
              v-model="totalPlayedCountFrom"
              @input="changed"
              :showButtons="true"
              :min="0"
              :max="1000000"
              :step="100"
            />
          </div>
          <div class="flex justify-content-around align-items-center">
            <span class="space-h">تا:</span>
            <InputNumber
              v-model="totalPlayedCountTo"
              @input="changed"
              :showButtons="true"
              :min="1"
              :max="1000000"
              :step="100"
            />
          </div>
        </div>
      </div>
      <div class="col">
        <div class="col flex justify-content-around">
          <span>ایجاد شده توسط من</span>
          <InputSwitch
            v-model="createdByMe"
            @change="changed"
            :trueValue="true"
            :falseValue="null"
          />
        </div>
        <div class="col flex justify-content-around">
          <span>آخرین بروز رسانی توسط من</span>
          <InputSwitch
            v-model="lastModifiedByMe"
            @change="changed"
            :trueValue="true"
            :falseValue="null"
          />
        </div>
        <p>تاریخ ایجاد</p>
        <div>
          <base-datetime-picker
            v-model="createdAt"
            @change="changed"
            type="date"
            range
            clearable
          />
          Value: {{createdAt}}
        </div>
        <p>تاریخ آخرین بروز رسانی</p>
        <div>
          <base-datetime-picker
            v-model="lastModifiedAt"
            @change="changed"
            type="datetime"
            range
            clearable
          />
        </div>
      </div>
      <div class="col">
        <p>تاریخ انتشار (ویژه آثار)</p>
        <div>
          <base-datetime-picker
            v-model="releaseDate"
            @change="changed"
            type="datetime"
            range
            clearable
          />
        </div>
        <div class="space-3-v">
          <Button
            @click="reset"
            class="p-button-sm p-button-outlined p-button-link">
              <vue-feather type="trash-2"></vue-feather>
          </Button>
        </div>
      </div>
    </div>
  </Panel>
</template>

<style lang="scss" scoped>
.space {
  margin: 0.5rem;
}
</style>

<script lang="ts">
import { defineComponent } from 'vue';
import { GetLibraryEntitiesByFiltersRequest } from '@/classes/Library/DTOs/commands/GetLibraryEntitiesByFiltersRequest';
import { AuthService } from '@/services/AuthService';
import BaseMultiSelectInput from '../common/BaseMultiSelectInput.vue';
import { LibraryService } from '@/services/LibraryService';
import { GenreDetails } from '@/classes/Library/DTOs/queries/GenreDetails';

export default defineComponent({
  components: { BaseMultiSelectInput },
  emits: ['change'],
  data() {
    return {
      searchTerm: null,
      type: null,
      published: null,
      hasImage: null,
      flagged: null,
      genres: null,
      rateFrom: null,
      rateTo: null,
      totalPlayedCountFrom: null,
      totalPlayedCountTo: null,
      createdByMe: null,
      lastModifiedByMe: null,
      createdAt: [],
      lastModifiedAt: [],
      releaseDate: [],
      typeOptions: [
        {
          value: 'A',
          displayValue: 'آلبوم',
        },
        {
          value: 'T',
          displayValue: 'آهنگ',
        },
        {
          value: '‌B',
          displayValue: 'گروه',
        },
        {
          value: 'S',
          displayValue: 'خواننده',
        },
      ],
      genreOptions: [],
      genreOptionsLoading: true,
      genreOptionsPlaceholderText: 'منتظر باشید...',
    };
  },
  methods: {
    changed() {
      const filters = new GetLibraryEntitiesByFiltersRequest(
        this.type && this.type[0] && this.type[0].value,
        this.searchTerm,
        this.published,
        this.flagged,
        this.hasImage,
        this.genres,
        this.rateFrom,
        this.rateTo,
        this.totalPlayedCountFrom,
        this.totalPlayedCountTo,
        this.durationFrom,
        this.durationTo,
        this.artistId,
        this.releaseDate[0],
        this.releaseDate[1],
        this.createdByMe && AuthService.getSubjectId(),
        this.lastModifiedByMe && AuthService.getSubjectId(),
        this.createdAt[0],
        this.createdAt[1],
        this.lastModifiedAt[0],
        this.lastModifiedAt[1],
      );
      this.$emit('change', filters);
    },
    reset() {
      this.searchTerm = null;
      this.type = null;
      this.published = null;
      this.hasImage = null;
      this.flagged = null;
      this.genres = null;
      this.rateFrom = null;
      this.rateTo = null;
      this.totalPlayedCountFrom = null;
      this.totalPlayedCountTo = null;
      this.createdByMe = null;
      this.lastModifiedByMe = null;
      this.createdAt = [];
      this.lastModifiedAt = [];
      this.releaseDate = [];
      this.changed();
    },
  },
  mounted() {
    LibraryService.fetchAndFlattenGenres()
      .then((genres: GenreDetails[]) => {
        this.genreOptions = genres;
      })
      .catch((err) => {
        this.genreInputPlaceholderText = err.message;
      })
      .finally(() => {
        this.genreOptionsLoading = false;
      });
  },
});
</script>
