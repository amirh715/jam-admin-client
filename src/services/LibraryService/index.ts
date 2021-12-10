import _ from 'lodash';
import { GenreDetails } from '@/classes/Library/DTOs/queries/GenreDetails';
import { LibraryEntityDetails } from '@/classes/Library/DTOs/queries/LibraryEntityDetails';
import { CreateArtistRequest } from '@/classes/Library/DTOs/commands/CreateArtistRequest';
import { CreateAlbumRequest } from '@/classes/Library/DTOs/commands/CreateAlbumRequest';
import { CreateTrackRequest } from '@/classes/Library/DTOs/commands/CreateTrackRequest';
import { CreateGenreRequest } from '@/classes/Library/DTOs/commands/CreateGenreRequest';
import { EditGenreRequest } from '@/classes/Library/DTOs/commands/EditGenreRequest';
import { HttpService } from '../HttpService';
import { LIBRARY_PATHS } from './LIBRARY_PATHS';
import { GetLibraryEntitiesByFiltersRequest } from '@/classes/Library/DTOs/commands/GetLibraryEntitiesByFiltersRequest';
import { BandDetails } from '@/classes/Library/DTOs/queries/BandDetails';
import { SingerDetails } from '@/classes/Library/DTOs/queries/SingerDetails';
import { AlbumDetails } from '@/classes/Library/DTOs/queries/AlbumDetails';
import { TrackDetails } from '@/classes/Library/DTOs/queries/TrackDetails';
import { EditArtistRequest } from '@/classes/Library/DTOs/commands/EditArtistRequest';
import { EditArtworkRequest } from '@/classes/Library/DTOs/commands/EditArtworkRequest';

class LibraryService {
  public static async createArtist(artist: CreateArtistRequest): Promise<void> {
    try {
      const payload = new FormData();
      payload.append('title', artist.title);
      payload.append('type', artist.type);
      if (artist.description) payload.append('description', artist.description);
      if (artist.tags && artist.tags.length > 0) payload.append('tags', JSON.stringify(artist.tags));
      if (artist.genreIds && artist.genreIds.length > 0) payload.append('genreIds', JSON.stringify(artist.genreIds));
      if (artist.flag) payload.append('flag', artist.flag);
      if (artist.instagramId) payload.append('instagramId', artist.instagramId);
      if (artist.image) payload.append('image', artist.image);
      await HttpService.post(LIBRARY_PATHS.CREATE_ARTIST, payload);
      return Promise.resolve();
    } catch (err) {
      if (err.response) {
        return Promise.reject(err.response.data);
      }
      return Promise.reject(err);
    }
  }

  public static async createAlbum(album: CreateAlbumRequest): Promise<void> {
    try {
      const payload = new FormData();
      payload.append('title', album.title);
      payload.append('artistId', album.artistId);
      await HttpService.post(LIBRARY_PATHS.CREATE_ALBUM, payload);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject();
    }
  }

  public static async createTrack(track: CreateTrackRequest): Promise<void> {
    try {
      const payload = new FormData();
      payload.append('title', track.title);
      payload.append('audio', track.audio);
      if (track.artistId) {
        payload.append('artistId', track.artistId);
      } else {
        payload.append('albumId', track.albumId);
      }
      if (track.image) {
        payload.append('image', track.image);
      }
      if (track.description) {
        payload.append('description', track.description);
      }
      if (track.flag) {
        payload.append('flag', track.flag);
      }
      await HttpService.post(LIBRARY_PATHS.CREATE_TRACK, payload);
      return Promise.resolve();
    } catch (err) {
      if (err.response.data) {
        return Promise.reject(err.response.data);
      }
      return Promise.reject();
    }
  }

  public static async getByFilters(filters: GetLibraryEntitiesByFiltersRequest):
  Promise<Array<LibraryEntityDetails>> {
    try {
      let query = filters ? '?' : '';
      _.forOwn(_.omitBy(filters, _.isNil), (value, key) => {
        query += `${key}=${value}&`;
      });
      const { data } = await HttpService.get(LIBRARY_PATHS.GET_ENTITIES_BY_FILTERS, query);
      return Promise.resolve(data);
    } catch (err) {
      return Promise.reject();
    }
  }

  public static async getById(id: string): Promise<LibraryEntityDetails> {
    try {
      const { data } = await HttpService.get(`${LIBRARY_PATHS.GET_ENTITY_BY_ID}/${id}`);
      console.log(this.create(data));
      return Promise.resolve(this.create(data));
    } catch (err) {
      return Promise.reject();
    }
  }

  public static async getImageById(id: string): Promise<Blob> {
    try {
      const { data } = await HttpService.get(`${LIBRARY_PATHS.GET_IMAGE_BY_ID}/${id}`, '', { responseType: 'blob' });
      return Promise.resolve(new Blob([data]));
    } catch (err) {
      return Promise.reject();
    }
  }

  public static async getTrackAudio(trackId: string): Promise<Blob> {
    try {
      const { data } = await HttpService.get(`${LIBRARY_PATHS.GET_TRACK_AUDIO}/${trackId}`, '',
        { responseType: 'arraybuffer', headers: { 'Content-Type': 'audio/mpeg' } });
      return Promise.resolve(new Blob([data], { type: 'audio/mpeg' }));
    } catch (err) {
      if (err.response.data) {
        return Promise.reject(err.response.data);
      }
      return Promise.reject();
    }
  }

  public static async editArtist(dto: EditArtistRequest): Promise<void> {
    try {
      const payload = new FormData();
      payload.append('id', dto.id);
      payload.append('title', dto.title);
      if (dto.tags) {
        payload.append('tags', JSON.stringify(dto.tags));
      }
      if (!_.isNil(dto.flag)) {
        payload.append('flagNote', dto.flag);
      }
      if (_.isNil(dto.description)) {
        payload.append('description', dto.description);
      }
      if (!_.isNil(dto.instagramId)) {
        payload.append('instagramId', dto.instagramId);
      }
      if (dto.image) {
        payload.append('image', dto.image);
      }
      if (!_.isNil(dto.removeImage)) {
        payload.append('removeImage', _.toString(dto.removeImage));
      }
      await HttpService.put(LIBRARY_PATHS.EDIT_ARTIST, payload);
      return Promise.resolve();
    } catch (err) {
      if (err.response.data) {
        return Promise.reject(err.response.data);
      }
      return Promise.reject();
    }
  }

  public static async editArtwork(dto: EditArtworkRequest): Promise<void> {
    try {
      const payload = new FormData();
      payload.append('id', dto.id);
      payload.append('title', dto.title);
      await HttpService.put(LIBRARY_PATHS.EDIT_ARTWORK, payload);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  }

  public static async publish(entityId: string, cascadePublishCommandToArtistsArtworks?: boolean)
  : Promise<void> {
    try {
      const payload = new FormData();
      payload.append('id', entityId);
      payload.append('publish', 'true');
      if (cascadePublishCommandToArtistsArtworks) {
        payload.append(
          'cascadePublishCommandToArtistsArtworks',
          _.toString(cascadePublishCommandToArtistsArtworks),
        );
      }
      await HttpService.put(LIBRARY_PATHS.PUBLISH_ARCHIVE_ENTITY, payload);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  }

  public static async archive(entityId: string): Promise<void> {
    try {
      const payload = new FormData();
      payload.append('id', entityId);
      payload.append('publish', 'false');
      await HttpService.put(LIBRARY_PATHS.PUBLISH_ARCHIVE_ENTITY, payload);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject();
    }
  }

  public static async remove(id: string): Promise<void> {
    try {
      const payload = new FormData();
      payload.append('id', id);
      await HttpService.delete(LIBRARY_PATHS.REMOVE_ENTITY, payload);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject();
    }
  }

  public static async createGenre(genre: CreateGenreRequest) : Promise<void> {
    try {
      const payload = new FormData();
      payload.append('title', genre.title);
      payload.append('titleInPersian', genre.titleInPersian);
      if (genre.parentGenreId) {
        payload.append('parentGenreId', genre.parentGenreId);
      }
      const { data } = await HttpService.post(LIBRARY_PATHS.CREATE_GENRE, payload);
      return Promise.resolve(data);
    } catch (err) {
      if (err.response.data) {
        return Promise.reject(err.response.data);
      }
      return Promise.reject(err);
    }
  }

  public static async fetchGenres() : Promise<Array<GenreDetails>> {
    const { data } = await HttpService.get(LIBRARY_PATHS.GET_ALL_GENRES);
    const genres : Array<GenreDetails> = [];
    _.forEach(<Array<GenreDetails>> data, (obj) => {
      const genre = new GenreDetails(
        obj.id,
        obj.title,
        obj.titleInPersian,
        obj.createdAt,
        obj.lastModifiedAt,
        obj.creatorId,
        obj.creatorName,
        obj.updaterId,
        obj.updaterName,
        obj.subGenres,
      );
      genres.push(genre);
    });
    return genres;
  }

  public static async fetchGenrebyId(id: string): Promise<GenreDetails> {
    try {
      const { data } = await HttpService.get(LIBRARY_PATHS.GET_GENRE_BY_ID, id);
      const result : GenreDetails = new GenreDetails(
        data.id,
        data.title,
        data.titleInPersian,
        data.createdAt,
        data.lastModifiedAt,
        data.creatorId,
        data.creatorName,
        data.updaterId,
        data.updaterName,
        data.subGenres,
      );
      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject();
    }
  }

  public static async editGenre(genre: EditGenreRequest): Promise<void> {
    try {
      const payload = new FormData();
      payload.append('id', genre.id);
      payload.append('title', genre.title);
      payload.append('titleInPersian', genre.titleInPersian);
      await HttpService.put(LIBRARY_PATHS.EDIT_GENRE, payload);
      return Promise.resolve();
    } catch (err) {
      if (err.response.data) {
        return Promise.reject(err.response.data);
      }
      return Promise.reject();
    }
  }

  public static async removeGenre(id: string) : Promise<void> {
    try {
      const payload = new FormData();
      payload.append('id', id);
      await HttpService.delete(LIBRARY_PATHS.REMOVE_GENRE, payload);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  }

  private static create(object: any): LibraryEntityDetails {
    console.log(object);
    if (object.bands) {
      return new SingerDetails(object);
    }
    if (object.members) {
      return new BandDetails(object);
    }
    if (object.tracks) {
      return new AlbumDetails(object);
    }
    if (object.audioPath || object.lyrics) {
      return new TrackDetails(object);
    }
    return null;
  }
}

export { LibraryService };
