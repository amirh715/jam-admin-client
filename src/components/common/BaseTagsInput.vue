<template>
  <div class="flex flex-column justify-content-center">
    <div class="flex flex-row justify-content-center align-items-center">
      <label v-if="label" class="space-h">{{label}}</label>
      <Chips
        :modelValue="modelValue"
        @add="$emit('update:modelValue', $event.value)"
        @remove="$emit('update:modelValue', $event.value)"
        :disabled="disabled"
        :max="max"
        :allowDuplicate="false"
        style="max-width: 300px;"
      />
    </div>
    <div class="flex flex-column justify-content-center">
      <div v-if="note" class="note">
        <small>{{note}}</small>
      </div>
      <div v-if="error" class="error">
        <span>{{error}}</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'base-tags-input',
  props: {
    modelValue: Array,
    label: String,
    disabled: Boolean,
    max: Number,
    note: String,
    error: String,
  },
});
</script>
