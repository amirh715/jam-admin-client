<template>
  <div class="flex flex-column space-v">
    <div>
      <user-listing-filters-panel @change="filtersChanged" />
    </div>
    <div class="space-2-v">
      <user-listing-table
        :items="items"
        :loading="loading"
        @rowSelected="rowSelected"
        @loadMore="loadMore"
        @loginAuditRequested="fetchUsersLoginAudit"
      />
    </div>
  </div>
  <Dialog v-model:visible="detailsDialogVisible" style="width: 53rem">
    <user-details :user="selectedUser" @userRemoved="userRemoved" @userChanged="userChanged" />
  </Dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import UserListingFiltersPanel from '@/components/User/UserListingFiltersPanel.vue';
import UserListingTable from '@/components/User/UserListingTable.vue';
import UserDetails from '@/components/User/UserDetails.vue';
import { UserService } from '@/services/UserService';
import { GetUsersByFiltersRequest } from '@/classes/User/DTOs/commands/GetUsersByFiltersRequest';
import { UserDetails as UserDetailsDTO } from '@/classes/User/DTOs/queries/UserDetails';

export default defineComponent({
  components: {
    UserListingFiltersPanel,
    UserListingTable,
    UserDetails,
  },
  data() {
    return {
      items: [],
      filters: {},
      loading: false,
      waiting: false,
      waitingTimer: null,
      detailsDialogVisible: false,
      selectedUser: null,
      limit: 30,
      offset: 0,
    };
  },
  methods: {
    setData(items: UserDetailsDTO[]) {
      this.items = items;
      this.loadProfileImages();
    },
    async loadProfileImages() {
      for (const user of this.items) {
        const profileImage = await UserService.getProfileImage(user.id);
        const reader = new FileReader();
        reader.readAsDataURL(profileImage);
        reader.onload = () => {
          user.profileImageSrc = reader.result;
        };
      }
    },
    openUserDetailsDialog(user: UserDetailsDTO) {
      this.selectedUser = user;
      this.detailsDialogVisible = true;
    },
    closeUserDetailsDialog() {
      this.selectedUser = null;
      this.detailsDialogVisible = false;
    },
    rowSelected(selectedUser: UserDetailsDTO) {
      this.closeUserDetailsDialog();
      this.openUserDetailsDialog(selectedUser);
    },
    userRemoved() {
      this.closeUserDetailsDialog();
      this.fetchUsers();
    },
    userChanged() {
      this.closeUserDetailsDialog();
      this.fetchUsers();
    },
    fetchUsers() {
      this.loading = true;
      this.filters.limit = this.limit;
      UserService.getUsersByFilters(this.filters)
        .then((users) => {
          this.items.push(...users);
          this.loadProfileImages();
        })
        .catch((err) => {
          this.$toast.add({
            severity: 'error',
            detail: err.message,
            life: 400,
          });
        })
        .finally(() => {
          this.loading = false;
        });
    },
    loadMore() {
      this.offset += this.limit;
      this.filters.offset = this.offset;
      this.fetchUsers();
    },
    filtersChanged(filters: GetUsersByFiltersRequest) {
      if (this.waiting) {
        clearTimeout(this.waitingTimer);
      } else {
        this.waiting = true;
      }
      this.waitingTimer = setTimeout(() => {
        this.waiting = false;
        filters.limit = this.limit;
        filters.offset = this.offset;
        this.filters = filters;
        this.fetchUsers();
      }, 1000);
    },
  },
  beforeRouteEnter(to, from, next) {
    console.log('before route enter');
    UserService.getUsersByFilters(null)
      .then((users) => {
        next((vm) => {
          vm['setData'](users);
        });
      })
      .catch((err) => {
        next((vm) => {
          vm.$toast.add({
            severity: 'error',
            detail: err.message,
            life: 4000,
          });
        });
      });
  },
});
</script>
