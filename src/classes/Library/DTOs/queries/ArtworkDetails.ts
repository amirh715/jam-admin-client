import { LibraryEntityDetails } from './LibraryEntityDetails';
import { GenreIdAndTitle } from './GenreIdAndTitle';
import { LibraryEntityIdAndTitle } from './LibraryEntityIdAndTitle';

class ArtworkDetails extends LibraryEntityDetails {
  public artist: LibraryEntityIdAndTitle;
  public recordLabel: string;
  public producer: string;
  public releaseDate: string;

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
    this.artist = _props.artist;
    this.recordLabel = _props.recordLabel;
    this.producer = _props.producer;
    this.releaseDate = new Date(_props.releaseDate).toISOString();
  }
}

export {
  ArtworkDetails,
};
