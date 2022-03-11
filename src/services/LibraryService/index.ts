import _, { isElement } from 'lodash';
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
import { IPlayedTrack } from '@/persistence/IPlayedTrack';

class LibraryService {
  public static async createArtist(artist: CreateArtistRequest): Promise<void> {
    try {
      const payload = new FormData();
      payload.append('title', artist.title);
      payload.append('type', artist.type);
      if (artist.description) payload.append('description', artist.description);
      if (artist.tags && artist.tags.length > 0) payload.append('tags', JSON.stringify(artist.tags));
      if (artist.genreIds && artist.genreIds.length > 0) payload.append('genreIds', JSON.stringify(artist.genreIds));
      if (artist.flag) payload.append('flagNote', artist.flag);
      if (artist.instagramId) payload.append('instagramId', artist.instagramId);
      if (artist.image) payload.append('image', artist.image);
      await HttpService.post(LIBRARY_PATHS.CREATE_ARTIST, payload);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  }

  public static async createAlbum(album: CreateAlbumRequest): Promise<void> {
    try {
      const payload = new FormData();
      payload.append('title', album.title);
      payload.append('artistId', album.artistId);
      if (album.genreIds) {
        payload.append('genreIds', JSON.stringify(album.genreIds));
      }
      if (album.tags) {
        payload.append('tags', JSON.stringify(album.tags));
      }
      if (album.image) {
        payload.append('image', album.image);
      }
      if (album.description) {
        payload.append('description', album.description);
      }
      if (album.flag) {
        payload.append('flagNote', album.flag);
      }
      if (album.recordLabel) {
        payload.append('recordLabel', album.recordLabel);
      }
      if (album.producer) {
        payload.append('producer', album.producer);
      }
      if (album.releaseDate) {
        payload.append('releaseDate', _.toString(album.releaseDate));
      }
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
      if (track.tags) {
        payload.append('tags', JSON.stringify(track.tags));
      }
      if (track.genreIds) {
        payload.append('genreIds', JSON.stringify(track.genreIds));
      }
      if (track.image) {
        payload.append('image', track.image);
      }
      if (track.description) {
        payload.append('description', track.description);
      }
      if (track.flag) {
        payload.append('flagNote', track.flag);
      }
      if (track.producer) {
        payload.append('producer', track.producer);
      }
      if (track.recordLabel) {
        payload.append('recordLabel', track.recordLabel);
      }
      if (track.releaseDate) {
        payload.append('releaseDate', _.toString(track.releaseDate));
      }
      await HttpService.post(LIBRARY_PATHS.CREATE_TRACK, payload);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  }

  public static async getByFilters(filters: GetLibraryEntitiesByFiltersRequest):
  Promise<Array<LibraryEntityDetails>> {
    try {
      let query = filters ? '?' : '';
      _.forOwn((_.omitBy(filters, _.isNil)), (value, key) => {
        query += `${key}=${value}&`;
      });
      const { data } = await HttpService.get(LIBRARY_PATHS.GET_ENTITIES_BY_FILTERS, query);
      return Promise.resolve(_.orderBy(data.map((i) => LibraryService.create(i)), ['rate'], ['desc']));
    } catch (err) {
      return Promise.reject(err);
    }
  }

  public static async getById(id: string): Promise<LibraryEntityDetails> {
    try {
      const { data } = await HttpService.get(`${LIBRARY_PATHS.GET_ENTITY_BY_ID}/${id}`);
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
      return Promise.reject(err);
    }
  }

  public static async getTrackAudio(trackId: string): Promise<Blob> {
    try {
      const { data } = await HttpService.get(`${LIBRARY_PATHS.GET_TRACK_AUDIO}/${trackId}`, '',
        { responseType: 'arraybuffer', headers: { 'Content-Type': 'audio/mpeg' } });
      return Promise.resolve(new Blob([data], { type: 'audio/mpeg' }));
    } catch (err) {
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
      if (!_.isNil(dto.description)) {
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
      if (!_.isNil(dto.genreIds)) {
        payload.append('genreIds', JSON.stringify(dto.genreIds));
      }
      await HttpService.put(LIBRARY_PATHS.EDIT_ARTIST, payload);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject();
    }
  }

  public static async editArtwork(dto: EditArtworkRequest): Promise<void> {
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
      if (!_.isNil(dto.description)) {
        payload.append('description', dto.description);
      }
      if (dto.image) {
        payload.append('image', dto.image);
      }
      if (!_.isNil(dto.removeImage)) {
        payload.append('removeImage', _.toString(dto.removeImage));
      }
      if (!_.isNil(dto.genreIds)) {
        payload.append('genreIds', JSON.stringify(dto.genreIds));
      }
      if (!_.isNil(dto.producer)) {
        payload.append('producer', dto.producer);
      }
      if (!_.isNil(dto.recordLabel)) {
        payload.append('recordLabel', dto.recordLabel);
      }
      if (!_.isNil(dto.releaseDate)) {
        payload.append('releaseDate', dto.releaseDate);
      }
      if (!_.isNil(dto.lyrics)) {
        payload.append('lyrics', dto.lyrics);
      }
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
      return Promise.reject(err);
    }
  }

  public static async remove(id: string): Promise<void> {
    try {
      const payload = new FormData();
      payload.append('id', id);
      await HttpService.delete(LIBRARY_PATHS.REMOVE_ENTITY, payload);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
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
      return Promise.reject(err);
    }
  }

  public static async fetchGenres() : Promise<Array<GenreDetails>> {
    const { data } = await HttpService.get(LIBRARY_PATHS.GET_ALL_GENRES);
    const genres : Array<GenreDetails> = [];
    _.forEach(<Array<GenreDetails>> data, (genre) => genres.push(genre));
    return genres;
  }

  public static async fetchGenrebyId(id: string): Promise<GenreDetails> {
    try {
      const { data } = await HttpService.get(LIBRARY_PATHS.GET_GENRE_BY_ID, id);
      return Promise.resolve(new GenreDetails(data));
    } catch (err) {
      return Promise.reject(err);
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
      return Promise.reject(err);
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

  public static async trackPlayed(playedTrack: IPlayedTrack): Promise<void> {
    try {
      const payload = new FormData();
      payload.append('trackId', playedTrack.trackId);
      payload.append('playedAt', playedTrack.playedAt.toISOString());
      await HttpService.post(`${LIBRARY_PATHS.TRACK_PLAYED}`, payload);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  }

  private static create(object: any): LibraryEntityDetails {
    if (object.type === 'S') {
      return new SingerDetails(object);
    }
    if (object.type === 'B') {
      return new BandDetails(object);
    }
    if (object.type === 'A') {
      return new AlbumDetails(object);
    }
    if (object.type === 'T') {
      return new TrackDetails(object);
    }
    return null;
  }

  public static async fetchAndFlattenGenres(): Promise<GenreDetails[]> {
    try {
      const allGenresFlattened = [];
      const genres: GenreDetails[] = await LibraryService.fetchGenres();
      genres.forEach((genre) => {
        LibraryService.flattenGenre(genre).forEach((genre: GenreDetails) => {
          allGenresFlattened.push(genre);
        });
      });
      return Promise.resolve(allGenresFlattened);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  private static flattenGenre(genre: GenreDetails): GenreDetails[] {
    const genres = [genre];
    genre.subGenres.forEach((genre) => {
      this.flattenGenre(genre).forEach((sub) => {
        genres.push(sub);
      });
    });
    return genres;
  }
}

export { LibraryService };
