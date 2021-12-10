import { LibraryEntityDetails } from './LibraryEntityDetails';
import { GenreIdAndTitle } from './GenreIdAndTitle';
import { LibraryEntityIdAndTitle } from './LibraryEntityIdAndTitle';

class ArtworkDetails extends LibraryEntityDetails {
  public artist: LibraryEntityIdAndTitle;
  public recordLabel: string;
  public producer: string;
  public releaseDate: Date;

  public constructor(
    _props: {
      id: string,
      title: string,
      description: string,
      published: boolean,
      tags: string[],
      genres: GenreIdAndTitle[],
      monthlyPlayedCount: string,
      rate: string,
      flag: string,
      totalPlayedCount: string,
      duration: string,
      artist: LibraryEntityIdAndTitle,
      recordLabel: string,
      producer: string,
      releaseDate: Date,
      imageSrc: string,
    },
  ) {
    super(
      _props,
    );
    this.artist = _props.artist;
    this.recordLabel = _props.recordLabel;
    this.producer = _props.producer;
    this.releaseDate = _props.releaseDate;
  }
}

export {
  ArtworkDetails,
};
