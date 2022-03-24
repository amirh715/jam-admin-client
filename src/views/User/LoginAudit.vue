<template>
  <Card>
    <template #content>
      <b v-if="loading" style="color: var(--primary-color)">منتظر باشید</b>
      <login-audit-table v-else :items="items" @loadMore="fetch" />
    </template>
  </Card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { UserService } from '@/services/UserService';
import LoginAuditTable from '@/components/User/LoginAuditTable.vue';
import { GetAllLoginAuditsRequest } from '@/classes/User/DTOs/commands/GetAllLoginAuditsRequest';

export default defineComponent({
  components: {
    LoginAuditTable,
  },
  data() {
    return {
      items: [],
      limit: 30,
      offset: 0,
      loading: false,
    };
  },
  methods: {
    fetch() {
      this.loading = true;
      const dto = new GetAllLoginAuditsRequest(this.limit, this.offset);
      UserService.getAllLogins(dto)
        .then((items) => {
          this.items.push(...items);
          this.offset += this.limit;
        })
        .catch((err) => {
          this.$toast.add({
            severity: 'error',
            detail: err.message,
            life: 4000,
          });
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
  mounted() {
    this.fetch();
  },
});
</script>
