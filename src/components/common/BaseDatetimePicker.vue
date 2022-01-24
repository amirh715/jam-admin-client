<template>
  <div class="flex flex-column justify-content-center align-items-center space-2">
    <div class="flex justify-content-center align-items-center">
      <label v-if="label" class="space-h">{{label}}</label>
      <datetime-picker
        :modelValue="modelValue"
        @input="changed($event)"
        @change="changed($event)"
        :type="type"
        :format="format || 'YYYY-MM-DDTHH:mm:ss'"
        :display-format="displayFormat || 'dddd jDD jMMMM jYYYY HH:mm'"
        :range="range"
        :clearable="clearable"
        :disabled="disabled"
        color="#FFD54F"
      />
    </div>
    <div>
      <div v-if="note" class="note">
        <small>{{note}}</small>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import * as _ from 'lodash';

export default {
  name: 'base-datetime-picker',
  emits: ['update:modelValue', 'change'],
  props: {
    modelValue: String || Array,
    type: String,
    format: String,
    displayFormat: String,
    range: Boolean,
    clearable: Boolean,
    label: String,
    note: String,
    disabled: Boolean,
  },
  methods: {
    changed(value) {
      let v;
      if (_.isArray(value)) {
        v = [];
        v[0] = value[0] && value[0].format(this.format || 'YYYY-MM-DDTHH:mm:ss');
        v[1] = value[1] && value[1].format(this.format || 'YYYY-MM-DDTHH:mm:ss');
      } else {
        v = value.format(this.format || 'YYYY-MM-DDTHH:mm:ss');
      }
      this.$emit('update:modelValue', v);
      this.$emit('change', v);
    },
  },
};
</script>
