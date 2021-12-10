<template>
  <div class="flex flex-column justify-content-center align-items-center space-2">
    <div class="flex flex-row justify-content-center align-items-center">
      <label v-if="label" class="space-h">{{label}}</label>
      <InputText v-if="!mask"
        :modelValue="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        :type="type"
        :disabled="disabled"
      />
      <InputMask v-else
        :modelValue="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        :mask="mask"
        :unmask="true"
        :disabled="disabled"
      />
    </div>
    <div>
      <div v-if="note" class="note">
        <small>{{note}}</small>
      </div>
      <div v-if="errors && errors.length > 0" class="error">
        <b v-for="err of errors" :key="err.$message">{{err.$message}}</b>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'base-input-text',
  emits: ['update:modelValue'],
  props: {
    modelValue: String,
    type: String,
    mask: String,
    label: String,
    note: String,
    errors: Array,
    disabled: Boolean,
  },
});
</script>
