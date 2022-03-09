import * as _ from 'lodash';
import { HttpService } from '../HttpService';
import { USER_PATHS } from './USER_PATHS';
import { CreateNewUserRequest } from '../../classes/User/DTOs/commands/CreateNewUserRequest';
import { GetUsersByFiltersRequest } from '../../classes/User/DTOs/commands/GetUsersByFiltersRequest';
import { GetUserByIdRequest } from '../../classes/User/DTOs/commands/GetUserByIdRequest';
import { GetAllLoginAuditsRequest } from '../../classes/User/DTOs/commands/GetAllLoginAuditsRequest';
import { EditUserProfileRequest } from '../../classes/User/DTOs/commands/EditUserProfileRequest';
import { ChangePasswordRequest } from '../../classes/User/DTOs/commands/ChangePasswordRequest';
import { RemoveUserRequest } from '../../classes/User/DTOs/commands/RemoveUserRequest';
import { UserDetails } from '../../classes/User/DTOs/queries/UserDetails';
import { LoginDetails } from '../../classes/User/DTOs/queries/LoginDetails';
import { UserState } from '@/classes/User/Types/UserState';
import { UserRole } from '@/classes/User/Types/UserRole';

class UserService {
  public static async createNewUser(dto: CreateNewUserRequest): Promise<void> {
    try {
      const form = new FormData();
      form.append('name', dto.name);
      form.append('mobile', dto.mobile);
      form.append('password', dto.password);
      if (dto.email) {
        form.append('email', dto.email);
      }
      if (dto.role) {
        form.append('role', dto.role.toString());
      }
      if (dto.image) {
        form.append('profileImage', dto.image);
      }
      await HttpService.post(USER_PATHS.CREATE_NEW_USER, form);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  }

  public static async editUser(dto: EditUserProfileRequest): Promise<void> {
    try {
      const form = new FormData();
      form.append('id', dto.id);
      if (dto.name) {
        form.append('name', dto.name);
      }
      if (dto.email || dto.email.length === 0) {
        form.append('email', dto.email);
      }
      if (dto.profileImage) {
        form.append('profileImage', dto.profileImage);
      }
      if (dto.removeProfileImage) {
        form.append('removeProfileImage', _.toString(dto.removeProfileImage));
      }
      await HttpService.put(USER_PATHS.EDIT_USER, form);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  }

  public static async getUsersByFilters(filters: GetUsersByFiltersRequest):
  Promise<UserDetails[]> {
    try {
      let query = filters ? '?' : '';
      _.forOwn(_.omitBy(filters, _.isNil), (value, key) => {
        query += `${key}=${value}&`;
      });
      const { data } = await HttpService.get(USER_PATHS.GET_USERS_BY_FILTERS, query);
      return _.orderBy(data, ['createdAt', 'state'], ['desc']);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  public static async getUserById(dto: GetUserByIdRequest):
  Promise<UserDetails> {
    try {
      const { data } = await HttpService.get(USER_PATHS.GET_USER_BY_ID, `/${dto.id}`);
      return data;
    } catch (err) {
      return Promise.reject(err);
    }
  }

  public static async getProfileImage(id: string): Promise<Blob> {
    try {
      const { data } = await HttpService.get(USER_PATHS.GET_PROFILE_IMAGE, id, { responseType: 'blob' });
      return new Blob([data]);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  public static async getLoginAuditsOfUser(userId: string, limit: number, offset: number):
  Promise<LoginDetails[]> {
    try {
      const query = `?limit=${limit || 30}&offset=${offset || 0}`;
      const { data } = await HttpService.get(`${USER_PATHS.GET_LOGIN_AUDITS}/${userId}`, query);
      return _.orderBy(data, ['attemptedAt'], ['desc']);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  public static async getAllLogins(dto: GetAllLoginAuditsRequest): Promise<LoginDetails[]> {
    try {
      const query = `?limit=${dto.limit || 30}&offset=${dto.offset || 0}`;
      const { data } = await HttpService.get(USER_PATHS.GET_ALL_LOGINS, query);
      return _.orderBy(data, ['attemptedAt'], ['desc']);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  public static async editProfile(dto: EditUserProfileRequest): Promise<void> {
    try {
      const form = new FormData();
      form.append('id', dto.id);
      form.append('name', dto.name);
      form.append('email', dto.email);
      form.append('removeEmail', _.toString(dto.removeEmail));
      form.append('profileImage', dto.profileImage);
      form.append('removeProfileImage', _.toString(dto.removeProfileImage));
      form.append('role', dto.role.toString());
      const { data } = await HttpService.put(USER_PATHS.EDIT_USER, form);
      return data;
    } catch (err) {
      return Promise.reject(err);
    }
  }

  public static async activateUser(userId: string): Promise<void> {
    try {
      const form = new FormData();
      form.append('id', userId);
      form.append('state', UserState.ACTIVE);
      await HttpService.put(USER_PATHS.ACTIVATE_BLOCK_USER, form);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  }

  public static async changePassword(dto: ChangePasswordRequest): Promise<void> {
    try {
      const form = new FormData();
      form.append('id', dto.id);
      form.append('newPassword', dto.newPassword);
      await HttpService.put(USER_PATHS.CHANGE_PASSWORD, form);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  }

  public static async changeRole(userId: string, newRole: UserRole): Promise<void> {
    try {
      const form = new FormData();
      form.append('id', userId);
      form.append('role', newRole);
      await HttpService.put(USER_PATHS.EDIT_USER, form);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  }

  public static async blockUser(userId: string): Promise<void> {
    try {
      const form = new FormData();
      form.append('id', userId);
      form.append('state', UserState.BLOCKED);
      await HttpService.put(USER_PATHS.ACTIVATE_BLOCK_USER, form);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  }

  public static async removeUser(dto: RemoveUserRequest): Promise<void> {
    try {
      const form = new FormData();
      form.append('id', dto.id);
      const { data } = await HttpService.delete(USER_PATHS.REMOVE_USER, form);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  }
}

export {
  UserService,
};
