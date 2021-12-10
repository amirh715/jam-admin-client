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
      if (err.messgae.data) {
        return Promise.reject(err.message.data);
      }
      return Promise.reject(err);
    }
  }

  public static async getShowcaseImageById(id: string): Promise<Blob> {
    try {
      const { data } = await HttpService.get(SHOWCASE_PATHS.GET_SHOWCASE_IMAGE_BY_ID, '');
      return Promise.resolve(data);
    } catch (err) {
      if (err.messgae.data) {
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
      payload.append('message', dto.message);
      payload.append('route', dto.route);
      payload.append('image', dto.image);
      await HttpService.post(SHOWCASE_PATHS.CREATE_SHOWCASE, payload);
      return Promise.resolve();
    } catch (err) {
      if (err.messgae.data) {
        return Promise.reject(err.message.data);
      }
      return Promise.reject(err);
    }
  }
  public static async removeShowcase(id: string): Promise<void> {
    try {

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
