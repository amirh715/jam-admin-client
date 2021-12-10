<template>
  <div v-if="!editMode">
    <div class="flex flex-column">
      <div class="grid">
        <div class="col">
          <div class="flex flex-column justify-content-right">
            <div class="space-v flex">
              <vue-feather type="user"></vue-feather>
              <b class="space-h">نام:</b>
              <span>{{user.name}}</span>
            </div>
            <div class="space-v flex">
              <vue-feather type="smartphone"></vue-feather>
              <b class="space-h">موبایل:</b>
              <span>{{user.mobile}}</span>
            </div>
            <div class="space-v flex">
              <vue-feather type="hexagon"></vue-feather>
              <b class="space-h">وضعیت اکانت:</b>
              <user-state-tag :state="user.state" />
            </div>
            <div class="space-v flex">
              <vue-feather type="at-sign"></vue-feather>
              <b class="space-h">ایمیل:</b>
              <span>{{user.email || '( ایمیل ندارد )'}}</span>
            </div>
            <div class="space-v flex">
              <vue-feather type="user"></vue-feather>
              <b class="space-h">نقش:</b>
              <user-role-tag :role="user.role" />
            </div>
            <div class="space-v flex">
              <vue-feather type="user"></vue-feather>
              <b class="space-h">ایجاد کننده:</b>
              <span>{{user.creatorName}}</span>
            </div>
            <div class="space-v flex">
              <vue-feather type="user"></vue-feather>
              <b class="space-h">آخرین بروز رسانی کننده:</b>
              <span>{{user.updaterName}}</span>
            </div>
            <div class="space-v flex">
              <vue-feather type="clock"></vue-feather>
              <b class="space-h">تاریخ و زمان ایجاد:</b>
              <span>{{user.createdAt}}</span>
            </div>
            <div class="space-v flex">
              <vue-feather type="clock"></vue-feather>
              <b class="space-h">آخرین بروزرسانی:</b>
              <span>{{user.lastModifiedAt}}</span>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="flex flex-column justify-content-right">
            <!--  -->
            <div class="space-v flex profile-image">
              <Skeleton v-if="loadingProfileImage" width="100%" height="100%" />
              <div v-else >
                <img v-if="profileImageSrc"
                  :src="profileImageSrc" style="width: 100%; height: 100%;" />
                <h3 v-else>عکس پروفایل ندارد</h3>
              </div>
            </div>
            <!--  -->
            <div class="space-v flex">
              <vue-feather type="file"></vue-feather>
              <b class="space-h">تعداد گزارش ها:</b>
              <span>{{user.totalReportsCount}}</span>
            </div>
            <div class="space-v flex">
              <vue-feather type="log-in"></vue-feather>
              <b class="space-h">تعداد ورود:</b>
              <span>{{user.totalLoginCount}}</span>
            </div>
            <div class="space-v flex">
              <vue-feather type="inbox"></vue-feather>
              <b class="space-h">تعداد نوتیفیکیشن ها:</b>
              <span>{{user.totalNotificationsCount}}</span>
            </div>
            <div class="space-v flex">
              <vue-feather type="play"></vue-feather>
              <b class="space-h">تعداد کل آهنگ های گوش داده شده:</b>
              <span>{{user.totalPlayedTracksCount}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-content-around space-2-v">
      <Button @click="editMode = true" class="p-button-sm p-button-outlined">
        <vue-feather type="edit"></vue-feather>
        <span class="space-h">تغییر پروفایل</span>
      </Button>
      <Button @click="changePasswordDialogVisible=true" class="p-button-sm p-button-outlined">
        <vue-feather type="key"></vue-feather>
        <span class="space-h">تغییر رمز</span>
      </Button>
      <Button @dblclick="deleteUser" class="p-button-sm p-button-danger p-button-outlined">
        <vue-feather type="trash-2"></vue-feather>
        <span class="space-h">حذف اکانت</span>
      </Button>
      <Button @dblclick="blockOrActivate" class="p-button-sm p-button-danger p-button-outlined">
        <vue-feather :type="isUserActive ? 'shield-off' : 'shield'"></vue-feather>
        <span class="space-h">
          <span v-if="this.isUserActive">مسدودسازی اکانت</span>
          <span v-else>فعال سازی اکانت</span>
        </span>
      </Button>
    </div>
  </div>
  <div v-else>
    <edit-user-form :user="user" @userChanged="$emit('userChanged')" />
  </div>
  <Dialog v-model:visible="changePasswordDialogVisible">
    <change-password-form :user="user" />
  </Dialog>
</template>

<style lang="scss" scoped>
.profile-image {
  margin: 10px 0;
  border: 1px solid gray;
  border-radius: 4px;
  width: 15rem;
  height: 15rem;
  color: gray;
}
</style>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { UserDetails } from '@/classes/User/DTOs/queries/UserDetails';
import UserStateTag from '@/components/User/UserStateTag.vue';
import UserRoleTag from '@/components/User/UserRoleTag.vue';
import EditUserForm from '@/components/User/EditUserForm.vue';
import ChangePasswordForm from '@/components/User/ChangePasswordForm.vue';
import { UserService } from '@/services/UserService';
import { RemoveUserRequest } from '@/classes/User/DTOs/commands/RemoveUserRequest';

export default defineComponent({
  name: 'user-details',
  emits: ['userChanged', 'userRemoved'],
  components: {
    UserStateTag,
    UserRoleTag,
    EditUserForm,
    ChangePasswordForm,
  },
  props: {
    user: {
      type: Object as PropType<UserDetails>,
    },
  },
  data() {
    return {
      editMode: false,
      profileImageSrc: null,
      loadingProfileImage: true,
      changePasswordDialogVisible: false,
    };
  },
  computed: {
    isUserActive() {
      return this.user.state === 'ACTIVE';
    },
  },
  methods: {
    changePassword() {
      console.log();
    },
    deleteUser() {
      this.$confirm.require({
        header: 'حذف کاربر',
        message: 'پس از حذف کاربر امکان بازیابی اطلاعات آن وجود ندارد. آیا مطمئن هستید؟',
        accept: () => {
          const dto = new RemoveUserRequest(this.user.id);
          UserService.removeUser(dto)
            .then(() => {
              this.$emit('userRemoved');
            })
            .catch((err) => {
              this.$toast.add({
                severity: 'error',
                detail: err.message,
                life: 4000,
              });
            });
        },
        acceptLabel: 'بله. پاک کن.',
        rejectLabel: 'بیخیال',
        defaultFocus: 'reject',
      });
    },
    blockOrActivate() {
      const msg = this.isUserActive
        ? 'با مسدودسازی اکانت کاربر امکان استفاده از سرویس را نخواهد داشت . مطمئن هستید؟'
        : 'با فعال سازی اکانت کاربر می تواند از سرویس استفاده کند. مطمئن هستید؟';
      this.$confirm.require({
        header: this.isUserActive ? 'مسدودسازی اکانت' : 'فعال سازی اکانت',
        message: msg,
        accept: () => {
          let result: Promise<void>;
          if (this.isUserActive) {
            result = UserService.blockUser(this.user.id);
          } else {
            result = UserService.activateUser(this.user.id);
          }
          result
            .then(() => {
              this.$toast.add({
                severity: 'success',
                detail: 'عملیات با موفقیت انجام شد.',
                life: 4000,
              });
              this.$emit('userChanged');
            })
            .catch((err) => {
              this.$toast.add({
                severity: 'error',
                detail: err.message,
                life: 4000,
              });
            });
        },
        acceptLabel: `بله. ${this.isUserActive ? 'مسدود کن.' : 'فعال کن.'}`,
        rejectLabel: 'بیخیال',
        defaultFocus: 'reject',
      });
    },
  },
  created() {
    UserService.getProfileImage(this.user.id)
      .then((profileImage) => {
        if (profileImage) {
          const reader = new FileReader();
          reader.readAsDataURL(profileImage);
          reader.onload = () => {
            this.profileImageSrc = reader.result;
          };
        }
      })
      .catch((err) => {
        if (err.data.status === 404) {
          return;
        }
        this.$toast.add({
          severity: 'error',
          detail: err.message,
          life: 4000,
        });
      })
      .finally(() => {
        this.loadingProfileImage = false;
      });
  },
});
</script>
