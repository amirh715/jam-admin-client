<template>
  <div class="flex flex-column justify-content-center">
    <label v-if="label" class="space-v">{{label}}</label>
    <MultiSelect
      :modelValue="modelValue"
      @change="changed"
      :options="options"
      :optionLabel="optionLabel"
      :optionValue="optionValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :loading="loading"
      :selectionLimit="selectionLimit"
    />
    <div v-if="note" class="note">
      <small>{{note}}</small>
    </div>
    <div v-if="error" class="error">
      <span>{{error}}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'base-multi-select-input',
  emits: ['change', 'update:modelValue'],
  props: {
    modelValue: Array,
    options: Array,
    optionLabel: String,
    optionValue: String,
    label: String,
    placeholder: String,
    disabled: Boolean,
    note: String,
    loading: Boolean,
    error: String,
    selectionLimit: Number,
  },
  methods: {
    changed(event) {
      this.$emit('update:modelValue', event.value);
      this.$emit('change', event.value);
    },
  },
});
</script>
