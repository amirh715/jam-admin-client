<template>
  <Card style="width: 50rem; margin: auto;">
    <template #content>
      <div class="flex flex-column justify-content-center">
        <div class="flex justify-content-right align-items-center">
          <div class="space">
            <Avatar
              :image="profileImageSrc"
              :label="!profileImageSrc && profileInfo.name[0].toUpperCase()"
              shape="circle"
              size="xlarge"
            />
          </div>
          <div class="space">
            <h2>{{profileInfo.name}}</h2>
          </div>
        </div>
        <div class="flex justify-content-around">
          <div class="flex align-items-center">
            <b class="space">موبایل:</b>
            <number-displayer :value="profileInfo.mobile" />
          </div>
          <div class="flex justify-content-center align-items-center">
            <div v-if="profileInfo.email" class="flex align-items-center">
              <b class="space-h">ایمیل:‌</b>
              <p>{{profileInfo.email}}</p>
            </div>
            <Tag class="space-h"
              :severity="profileInfo.isEmailVerified ? 'success' : 'warning'">
                <div v-if="profileInfo.email && profileInfo.isEmailVerified"
                  class="flex align-items-center">
                    <vue-feather type="check-circle"></vue-feather>
                    <span class="space-h">تایید شده</span>
                </div>
                <div v-else-if="profileInfo.email"
                  class="flex align-items-center"
                  style="cursor: pointer"
                  @click="requestEmailVerification">
                    <vue-feather type="alert-circle"></vue-feather>
                    <span class="space-h">تایید نشده. برای تایید کلیک کنید</span>
                </div>
                <div v-else>
                  <b>ایمیل ثبت نشده است.</b>
                </div>
            </Tag>
          </div>
        </div>
        <div style="margin-top: 2rem;">
          <div class="flex justify-content-right">
            <Button @click="showChangePasswordDialog = true" class="p-button-sm">
              <vue-feather type="key"></vue-feather>
              <span class="space-h">تغییر رمز</span>
            </Button>
            <Button
              @click="isProfileEdited = true"
              style="margin-right: 1rem;"
              class="p-button-sm"
              :disabled="isProfileEdited">
                <vue-feather type="edit-3"></vue-feather>
                <span class="space-h">تغییر پروفایل</span>
            </Button>
          </div>
          <!-- change password dialog -->
          <Dialog v-model:visible="showChangePasswordDialog">
            <auth-change-password-form @change="showChangePasswordDialog = false" />
          </Dialog>
          <!--  -->
        </div>
      </div>
    </template>
  </Card>
  <Card v-if="isProfileEdited" style="width: 50rem; margin: 10px auto;">
    <template #content>
      <div class="flex flex-column">
        <h4 class="text-right flex">
          <vue-feather type="user"></vue-feather>
          <span class="space-h">تغییر پروفایل</span>
        </h4>
        <div class="flex justify-content-around align-items-center">
          <base-input-text
            type="text"
            label="نام"
            v-model="editProfileForm.name"
            @change="v$.editProfileForm.name.$touch"
            :errors="v$.editProfileForm.name.$errors"
          />
          <base-input-text
            type="text"
            label="ایمیل"
            :disabled="editProfileForm.removeEmail"
            v-model="editProfileForm.email"
            @change="v$.editProfileForm.email.$touch"
            :errors="v$.editProfileForm.email.$errors"
          />
        </div>
        <div class="space-2-v">
          <Button @click="submitProfileEditForm" :disabled="v$.$invalid" class="p-button-sm">
            <vue-feather type="check"></vue-feather>
            <span class="space-h">برو</span>
          </Button>
          <Button
              @click="cancelEditProfileInfo"
              class="p-button-sm p-button-outlined"
              style="margin-right: 1rem;">
                <vue-feather type="x"></vue-feather>
                <span class="space-h">بیخیال</span>
          </Button>
        </div>
      </div>
    </template>
  </Card>
  <Card style="width: 50rem; margin: 10px auto;">
    <template #content>
      <div class="flex flex-column">
        <h4 class="text-right flex">
          <vue-feather type="image"></vue-feather>
          <span class="space-h">عکس پروفایل</span>
        </h4>
        <div class="flex justify-content-around align-items-center">
          <div>
            <base-image-input
              :editable="true"
              :disabled="editProfileForm.removeProfileImage"
              :stencilProps="{aspectRatio: 1/1}"
              @cropped="profileImageChanged"
            />
          </div>
          <div class="flex">
            <span class="space-h">حذف عکس پروفایل</span>
            <InputSwitch
              :disbaled="editProfileForm.image"
              v-model="editProfileForm.removeProfileImage"
            />
          </div>
        </div>
        <div class="space-v">
          <Button
            v-if="editProfileForm.removeProfileImage"
            @click="removeProfileImageClicked"
            class="p-button-sm">
              حذف عکس پروفایل
          </Button>
          <Button
            v-if="editProfileForm.image"
            @click="changeProfileImage"
            class="p-button-sm">
              تغییر عکس پروفایل
          </Button>
        </div>
      </div>
    </template>
  </Card>
</template>

<style lang="scss" scoped>
</style>

<script lang="ts">
import { defineComponent } from 'vue';
import useVuelidate from '@vuelidate/core';
import { helpers } from '@vuelidate/validators';
import { ProfileDetails } from '@/classes/Profile/queries/ProfileDetails';
import { ProfileService } from '@/services/ProfileService';
import { AuthService } from '@/services/AuthService';
import AuthChangePasswordForm from '../../components/Auth/AuthChangePasswordForm.vue';
import BaseInputText from '@/components/common/BaseInputText.vue';
import { user } from '../../validators';
import { EditUserProfileRequest } from '@/classes/User/DTOs/commands/EditUserProfileRequest';
import NumberDisplayer from '@/components/common/NumberDisplayer.vue';

export default defineComponent({
  components: { AuthChangePasswordForm, BaseInputText, NumberDisplayer },
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  data() {
    return {
      profileInfo: ProfileDetails,
      profileImageSrc: null,
      editProfileForm: {
        name: null,
        email: null,
        image: null,
        removeEmail: false,
        removeProfileImage: false,
      },
      showChangePasswordDialog: false,
      isProfileEdited: false,
    };
  },
  validations() {
    const { userName, email } = user;
    return {
      editProfileForm: {
        name: { userName: helpers.withMessage(() => 'نام شما باید حداقل ۱ کاراکتر باشد.', userName) },
        email: { email: helpers.withMessage(() => 'آدرس ایمیل درست نیست', email) },
      },
    };
  },
  beforeRouteEnter(to, from, next) {
    ProfileService.getProfileInfo()
      .then((profileInfo) => {
        next((vm) => vm['setProfileInfo'](profileInfo));
      })
      .catch((err) => {
        next((vm) => {
          vm.$toast.add({
            severity: 'error',
            detail: err.message,
            life: 4000,
          });
          vm.$router.push({ name: 'Home' });
        });
      });
  },
  methods: {
    setProfileInfo(profileInfo: ProfileDetails) {
      this.profileInfo = profileInfo;
      this.editProfileForm.name = profileInfo.name;
      this.editProfileForm.email = profileInfo.email;
      ProfileService.getProfileImage()
        .then((profileImage) => {
          const reader = new FileReader();
          reader.readAsDataURL(profileImage);
          reader.onload = () => {
            this.profileImageSrc = reader.result;
          };
        });
    },
    requestEmailVerification() {
      if (this.profileInfo.isEmailVerified) return;
      AuthService.requestEmailVerification()
        .then(() => {
          this.$toast.add({
            severity: 'success',
            detail: 'لینک تایید ایمیل برای شما ارسال شد.',
            life: 4000,
          });
        })
        .catch((error) => {
          this.$toast.add({
            severity: 'error',
            detail: error.message,
            life: 4000,
          });
        });
    },
    cancelEditProfileInfo() {
      this.isProfileEdited = false;
      this.editProfileForm.name = null;
      this.editProfileForm.email = null;
    },
    submitProfileEditForm() {
      if (this.v$.$error) return;
      const dto = new EditUserProfileRequest(
        null,
        this.editProfileForm.name,
        this.editProfileForm.email,
        this.editProfileForm.removeEmail,
        null,
        null,
        null,
      );
      ProfileService.editProfile(dto)
        .then(() => {
          this.$toast.add({
            severity: 'success',
            detail: 'پروفایل شما با موفقیت اصلاح شد.',
            life: 4000,
          });
          this.$router.push({ name: 'Home' });
        })
        .catch((error) => {
          this.$toast.add({
            severity: 'error',
            detail: error.message,
            life: 4000,
          });
        });
    },
    changeProfileImage() {
      ProfileService.changeProfileImage(this.editProfileForm.image)
        .then(() => {
          this.$toast.add({
            severity: 'success',
            detail: 'عکس پروفایل با موفقیت تغییر کرد.',
            life: 4000,
          });
          this.$router.push({ name: 'Home' });
        })
        .catch((error) => {
          this.$toast.add({
            severity: 'error',
            detail: error.message,
            life: 4000,
          });
        });
    },
    profileImageChanged(image: Blob) {
      this.editProfileForm.image = image;
    },
    removeProfileImageClicked() {
      this.$confirm.require({
        header: 'حذف عکس پروفایل',
        message: 'آیا از حذف عکس پروفایل خود مطمئن هستید؟',
        acceptLabel: 'پاک کن',
        rejectLabel: 'بیخیال',
        defaultFocus: 'reject',
        accept: () => {
          ProfileService.removeProfileImage()
            .then(() => {
              this.$toast.add({
                severity: 'success',
                detail: 'عکس پروفایل شما حذف شد.',
                life: 4000,
              });
              this.$router.go();
            })
            .catch((error) => {
              this.$toast.add({
                severity: 'error',
                detail: error.message,
                life: 4000,
              });
            });
        },
      });
    },
  },
});
</script>
