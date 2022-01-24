import { LibraryEntitySummary } from './LibraryEntitySummary';
import { GenreIdAndTitle } from './GenreIdAndTitle';
import { ArtworkDetails } from './ArtworkDetails';
import { LibraryEntityIdAndTitle } from './LibraryEntityIdAndTitle';

class AlbumDetails extends ArtworkDetails {
  public tracks: LibraryEntitySummary[];

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
      artist: LibraryEntityIdAndTitle,
      recordLabel: string,
      releaseDate: Date,
      producer: string,
      tracks: LibraryEntitySummary[],
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
    this.tracks = _props.tracks;
  }
}

export {
  AlbumDetails,
};
