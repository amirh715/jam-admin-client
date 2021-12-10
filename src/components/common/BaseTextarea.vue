<template>
  <div class="flex flex-column">
    <label v-if="label" class="space-v">{{label}}</label>
    <Textarea
      :modelValue="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :disabled="disabled"
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
  name: 'base-textarea',
  props: {
    modelValue: String,
    label: String,
    note: String,
    errors: String,
    disabled: Boolean,
  },
});
</script>
