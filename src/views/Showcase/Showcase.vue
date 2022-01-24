<template>
  <div class="space-2-v flex justify-content-between">
    <Button @click="visible = true"
      class="p-button-sm">
        <vue-feather type="plus"></vue-feather>
        <span class="space-h">آیتم جدید</span>
    </Button>
  </div>
  <router-view></router-view>
  <Dialog v-model:visible="visible" style="width: 45%;">
    <new-showcase />
  </Dialog>
</template>

<script>
import { defineComponent } from 'vue';
import NewShowcase from '@/components/Showcase/NewShowcase.vue';

export default defineComponent({
  components: {
    NewShowcase,
  },
  data() {
    return {
      visible: false,
    };
  },
  methods: {
    newShowcaseItemCreated() {
      this.visible = false;
      this.$router.go();
    },
  },
});
</script>
