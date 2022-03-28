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
              <number-displayer :value="user.mobile" />
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
              <Tag v-if="user.email"
                :severity="user.isEmailVerified ? 'success' : 'warning'" class="space-h" >
                  {{user.isEmailVerified ? 'تایید شده' : 'تایید نشده'}}
              </Tag>
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
              <date-time-displayer :datetime="user.createdAt" />
            </div>
            <div class="space-v flex">
              <vue-feather type="clock"></vue-feather>
              <b class="space-h">آخرین بروزرسانی:</b>
              <date-time-displayer :datetime="user.lastModifiedAt" />
            </div>
            <div class="space-v flex">
              <vue-feather type="send"></vue-feather>
              <b class="space-h">توکن FCM {{user.hasFCMToken ? 'دارد' : 'ندارد'}}</b>
            </div>
            <div class="space-v flex">
              <Button @click="fetchUserLoginAudit" :disabled="loginAuditLoading"
                class="p-button-sm p-button-link">
                  <div v-if="loginAuditLoading" class="flex">
                    <vue-feather type="loader"
                      animation="spin" animation-speed="slow"></vue-feather>
                      <span class="space-h">منتظر باشید</span>
                  </div>
                  <div v-else class="flex">
                    <vue-feather type="list"></vue-feather>
                    <span class="space-h">مشاهده سوابق ورود</span>
                  </div>
              </Button>
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
              <number-displayer :value="user.totalReportsCount" />
            </div>
            <div class="space-v flex">
              <vue-feather type="log-in"></vue-feather>
              <b class="space-h">تعداد ورود:</b>
              <number-displayer :value="user.totalLoginCount" />
            </div>
            <div class="space-v flex">
              <vue-feather type="inbox"></vue-feather>
              <b class="space-h">تعداد نوتیفیکیشن ها:</b>
              <number-displayer :value="user.totalNotificationsCount" />
            </div>
            <div class="space-v flex">
              <vue-feather type="play"></vue-feather>
              <b class="space-h">تعداد کل آهنگ های گوش داده شده:</b>
              <number-displayer :value="user.totalPlayedTracksCount" />
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
      <Button
        @dblclick="changePasswordDialogVisible=true"
        class="p-button-sm p-button-danger p-button-outlined">
          <vue-feather type="key"></vue-feather>
          <span class="space-h">تغییر رمز</span>
      </Button>
      <Button @dblclick="changeRoleDialogVisible=true"
        class="p-button-sm p-button-danger p-button-outlined">
          <vue-feather type="lock"></vue-feather>
          <span class="space-h">ارتقا/تنزل نقش</span>
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
  <Dialog v-model:visible="changeRoleDialogVisible" style="width: 25rem;">
    <h3 class="text-center">ارتقا/تنزل نقش</h3>
    <div><hr/></div>
    <base-multi-select-input
      label="نقش جدید"
      v-model="newRole"
      :options="roleOptions"
      :selectionLimit="1"
      optionLabel="displayValue"
      note="برای اعمال تغییرات کاربر باید یکبار از اکانت خود خارج و به آن وارد شود."
    />
    <div class="space-4-v flex justify-content-center">
      <Button @click="changeRole" :disabled="!newRole" class="p-button-sm">
        <vue-feather type="check"></vue-feather>
        <span class="space-h">ذخیره</span>
      </Button>
    </div>
  </Dialog>
  <Dialog v-model:visible="usersLoginAuditDialogVisible"
    @hide="usersLoginAuditDialogClosed" style="width: 85rem;">
      <h3 class="text-center">سوابق ورود</h3>
      <div><hr/></div>
      <login-audit-table :items="usersLoginAudit" @loadMore="fetchUserLoginAudit" />
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
import LoginAuditTable from '@/components/User/LoginAuditTable.vue';
import { UserRole } from '@/classes/User/Types/UserRole';

export default defineComponent({
  name: 'user-details',
  emits: ['userChanged', 'userRemoved'],
  components: {
    UserStateTag,
    UserRoleTag,
    EditUserForm,
    ChangePasswordForm,
    LoginAuditTable,
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
      changeRoleDialogVisible: false,
      usersLoginAuditDialogVisible: false,
      loginAuditLoading: false,
      loginAuditParams: {
        limit: 30,
        offset: 0,
      },
      usersLoginAudit: [],
      newRole: null,
      roleOptions: [
        {
          value: UserRole.LIBRARY_MANAGER,
          displayValue: 'مدیر مجموعه',
        },
        {
          value: UserRole.SUBSCRIBER,
          displayValue: 'مشترک',
        },
      ],
    };
  },
  computed: {
    isUserActive() {
      return this.user.state === 'ACTIVE';
    },
  },
  methods: {
    changeRole() {
      UserService.changeRole(this.user.id, this.newRole[0].value)
        .then(() => {
          this.$router.go();
          this.$toast.add({
            severity: 'success',
            detail: 'نقش کاربر با موفقیت تغییر یافت.',
            life: 4000,
          });
        })
        .catch((err) => {
          this.$toast.add({
            severity: 'error',
            detail: err.message,
            life: 4000,
          });
        });
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
    fetchUserLoginAudit() {
      this.loginAuditLoading = true;
      UserService.getLoginAuditsOfUser(
        this.user.id,
        this.loginAuditParams.limit,
        this.loginAuditParams.offset,
      ).then((items) => {
        this.usersLoginAuditDialogVisible = true;
        this.usersLoginAudit = items;
        this.loginAuditParams.offset += this.loginAuditParams.limit;
      })
        .catch((err) => {
          this.$toast.add({
            severity: 'error',
            detail: err.message,
            life: 4000,
          });
        })
        .finally(() => {
          this.loginAuditLoading = false;
        });
    },
    usersLoginAuditDialogClosed() {
      this.loginAuditParams = {
        limit: 30,
        offset: 0,
      };
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
