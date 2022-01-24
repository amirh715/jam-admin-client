import { ArtistDetails } from './ArtistDetails';
import { ArtworkDetails } from './ArtworkDetails';
import { GenreIdAndTitle } from './GenreIdAndTitle';
import { LibraryEntityIdAndTitle } from './LibraryEntityIdAndTitle';

class TrackDetails extends ArtworkDetails {
  public audioSize: string;
  public format: string;
  public lyrics: string;
  public album: LibraryEntityIdAndTitle;

  public constructor(
    _props: {
      id: string,
      type: string,
      title: string,
      description: string,
      published: boolean,
      tags: string[],
      genres: GenreIdAndTitle[],
      monthlyPlayedCount: string,
      rate: string,
      flagNote: string,
      totalPlayedCount: string,
      duration: number,
      audioSize: string,
      format: string,
      lyrics: string,
      album: LibraryEntityIdAndTitle,
      artist: ArtistDetails,
      recordLabel: string,
      producer: string,
      releaseDate: Date,
      imageSrc: string,
      createdAt: string,
      lastModifiedAt: string,
      creatorId: string,
      creatorName: string,
      updaterId: string,
      updaterName: string,
    },
  ) {
    super(
      _props,
    );
    this.audioSize = _props.audioSize;
    this.format = _props.format;
    this.lyrics = _props.lyrics;
    this.album = _props.album;
  }

  public isAlbumTrack(): boolean {
    return !!this.album;
  }
}

export {
  TrackDetails,
};
