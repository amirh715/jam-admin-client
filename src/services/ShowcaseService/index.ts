import * as _ from 'lodash';
import { CreateShowcaseRequest } from '@/classes/Showcase/DTOs/commands/CreateShowcaseRequest';
import { ShowcaseDetails } from '@/classes/Showcase/DTOs/queries/ShowcaseDetails';
import { HttpService } from '../HttpService';
import { SHOWCASE_PATHS } from './SHOWCASE_PATHS';

class ShowcaseService {
  public static async getAllShowcases(): Promise<ShowcaseDetails[]> {
    try {
      const { data } = await HttpService.get(SHOWCASE_PATHS.GET_ALL_SHOWCASES, '');
      return Promise.resolve(data);
    } catch (err) {
      if (err.message.data) {
        return Promise.reject(err.message.data);
      }
      return Promise.reject(err);
    }
  }

  public static async getShowcaseImageById(id: string): Promise<Blob> {
    try {
      const { data } = await HttpService.get(`${SHOWCASE_PATHS.GET_SHOWCASE_IMAGE_BY_ID}/${id}`, '', { responseType: 'blob' });
      return Promise.resolve(new Blob([data], { type: 'image/jpg' }));
    } catch (err) {
      console.log(err);
      if (err.message.data) {
        return Promise.reject(err.message.data);
      }
      return Promise.reject(err);
    }
  }

  public static async createShowcase(dto: CreateShowcaseRequest): Promise<void> {
    try {
      const payload = new FormData();
      payload.append('index', _.toString(dto.index));
      payload.append('title', dto.title);
      payload.append('route', dto.route);
      if (dto.message) {
        payload.append('message', dto.message);
      }
      if (dto.image) {
        payload.append('image', dto.image);
      }
      await HttpService.post(SHOWCASE_PATHS.CREATE_SHOWCASE, payload);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  }
  public static async removeShowcase(id: string): Promise<void> {
    try {
      const payload = new FormData();
      payload.append('id', id);
      await HttpService.delete(SHOWCASE_PATHS.REMOVE_SHOWCASE, payload);
      return Promise.resolve();
    } catch (err) {
      if (err.messgae.data) {
        return Promise.reject(err.message.data);
      }
      return Promise.reject(err);
    }
  }
}

export { ShowcaseService };
