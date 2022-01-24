import _ from 'lodash';
import { HttpService } from '../HttpService';
import { CreateNotificationRequest } from '../../classes/Notification/DTOs/commands/CreateNotificationRequest';
import { EditNotificationRequest } from '../../classes/Notification/DTOs/commands/EditNotificationRequest';
import { GetNotificationsByFiltersRequest } from '../../classes/Notification/DTOs/commands/GetNotificationsByFiltersRequest';
import { GetNotificationsOfRecipientRequest } from '../../classes/Notification/DTOs/commands/GetNotificationsOfRecipientRequest';
import { RemoveNotificationRequest } from '../../classes/Notification/DTOs/commands/RemoveNotificationRequest';
import { NotificationDetails } from '@/classes/Notification/DTOs/queries/NotificationDetails';
import { RecipientNotification } from '@/classes/Notification/DTOs/queries/RecipientNotification';

class NotificationService {
  private static PATHS = {
    CREATE_NEW_NOTIFICATION: '/notification/',
    EDIT_NOTIFICATION: '/notification/',
    GET_NOTIFICATIONS_BY_FILTERS: '/notification/',
    GET_NOTIFICATIONS_OF_RECIPIENTS: '/notification/',
    REMOVE_NOTIFICATION: '/notification/',
  };

  public static async createNewNotification(dto: CreateNotificationRequest): Promise<void> {
    try {
      const data = new FormData();
      data.append('type', dto.type.toString());
      data.append('title', dto.title);
      data.append('scheduledOn', _.toString(dto.scheduledOn));
      if (dto.message) {
        data.append('message', dto.message);
      }
      if (dto.route) {
        data.append('route', dto.route);
      }
      if (dto.recipients) {
        data.append('recipients', JSON.stringify(dto.recipients));
      }
      await HttpService.post(this.PATHS.CREATE_NEW_NOTIFICATION, data);
      return Promise.resolve();
    } catch (err) {
      if (err.response.data) {
        return Promise.reject(err.response.data);
      }
      return Promise.reject(err);
    }
  }

  public static async editNotification(dto: EditNotificationRequest): Promise<void> {
    try {
      const data = new FormData();
      data.append('id', dto.id);
      if (dto.title) {
        data.append('title', dto.title);
      }
      if (dto.message || dto.message.length === 0) {
        data.append('message', dto.message);
      }
      if (dto.route) {
        data.append('route', dto.route.toString());
      }
      if (dto.scheduledOn) {
        data.append('scheduledOn', dto.scheduledOn.toString());
      }
      await HttpService.put(this.PATHS.EDIT_NOTIFICATION, data);
      return Promise.resolve();
    } catch (err) {
      console.log(err);
      if (err.response.data) {
        return Promise.reject(err.response.data);
      }
      return Promise.reject(err);
    }
  }

  public static async getNotificationsByFilters(filters: GetNotificationsByFiltersRequest)
  : Promise<NotificationDetails[]> {
    try {
      let query = filters ? '?' : '';
      _.forOwn(_.omitBy(filters, _.isNil), (value, key) => {
        query += `${key}=${value}&`;
      });
      // _.forOwn(filters, (value, key) => {
      //   query += `${key}=${value}&`;
      // });
      const { data } = await HttpService.get(this.PATHS.GET_NOTIFICATIONS_BY_FILTERS, query);
      return Promise.resolve(_.orderBy(data, ['scheduledOn'], ['desc']));
    } catch (err) {
      if (err.response.data) {
        return Promise.reject(err.response.data);
      }
      return Promise.reject(err);
    }
  }

  public static async getNotificationsOfRecipients(dto: GetNotificationsOfRecipientRequest)
  : Promise<RecipientNotification[]> {
    try {
      _.forOwn(dto, (v, k) => {
        console.log(dto, v, k);
      });
      const { data } = await HttpService.get(this.PATHS.GET_NOTIFICATIONS_OF_RECIPIENTS, '');
      return Promise.resolve(_.orderBy(data, ['scheduledOn'], ['desc']));
    } catch (err) {
      if (err.response.data) {
        return Promise.reject(err.response.data);
      }
      return Promise.reject(err);
    }
  }

  public static async removeNotification(dto: RemoveNotificationRequest): Promise<void> {
    try {
      const data = new FormData();
      data.append('id', dto.id);
      await HttpService.delete(this.PATHS.REMOVE_NOTIFICATION, data);
      return Promise.resolve();
    } catch (err) {
      if (err.resonse.data) {
        return Promise.reject(err.response.data);
      }
      return Promise.reject(err);
    }
  }
}

export {
  NotificationService,
};
