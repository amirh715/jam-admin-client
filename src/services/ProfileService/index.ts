import * as _ from 'lodash';
import { HttpService } from '../HttpService';
import { ProfileDetails } from '../../classes/Profile/queries/ProfileDetails';
import { EditUserProfileRequest } from '@/classes/User/DTOs/commands/EditUserProfileRequest';
import { AuthService } from '../AuthService';
import { USER_PATHS } from '../UserService/USER_PATHS';

class ProfileService {
  private static PATHS = {
    GET_PROFILE_INFO: '/user',
    CHANGE_PROFILE_IMAGE: '/user/',
  };

  public static async getProfileInfo(): Promise<ProfileDetails> {
    try {
      const { data } = await HttpService.get(`${ProfileService.PATHS.GET_PROFILE_INFO}/${AuthService.getSubjectId()}`);
      console.log('data');
      console.log(data);
      const result = new ProfileDetails(
        data.id,
        data.name,
        data.mobile,
        data.email,
        data.isEmailVerified,
      );
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public static async getProfileImage(): Promise<Blob> {
    try {
      const { data } = await HttpService.get(
        USER_PATHS.GET_PROFILE_IMAGE,
        AuthService.getSubjectId(),
        { responseType: 'blob' },
      );
      return new Blob([data]);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  public static async editProfile(dto: EditUserProfileRequest): Promise<void> {
    try {
      const data = new FormData();
      data.append('id', AuthService.getSubjectId());
      if (dto.name) {
        data.append('name', dto.name);
      }
      if (dto.email) {
        data.append('email', dto.email);
      }
      if (dto.removeEmail) {
        data.append('removeEmail', _.toString(dto.removeEmail));
      }
      if (dto.removeProfileImage) {
        data.append('removeProfileImage', _.toString(dto.removeProfileImage));
      }
      await HttpService.put(USER_PATHS.EDIT_USER, data);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public static async changeProfileImage(image: Blob): Promise<void> {
    try {
      const data = new FormData();
      data.append(AuthService.getSubjectId(), image);
      await HttpService.put(this.PATHS.CHANGE_PROFILE_IMAGE, data);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public static async removeProfileImage(): Promise<void> {
    try {
      const data = new FormData();
      data.append('id', AuthService.getSubjectId());
      data.append('removeImage', 'TRUE');
      await HttpService.put(this.PATHS.CHANGE_PROFILE_IMAGE, data);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export {
  ProfileService,
};
