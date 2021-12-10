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
    <div v-if="errors && errors.length > 0" class="error">
      <b v-for="err of errors" :key="err.$message">{{err.$message}}</b>
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'base-multi-select-input',
  emits: ['update:modelValue'],
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
    errors: Array,
    selectionLimit: Number,
  },
  methods: {
    changed(event) {
      console.log(event);
      console.log(event.value);
      this.$emit('update:modelValue', event.value);
    },
  },
});
</script>
