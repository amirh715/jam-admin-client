import { GenreIdAndTitle } from './GenreIdAndTitle';
import { LibraryEntityDetails } from './LibraryEntityDetails';

class ArtistDetails extends LibraryEntityDetails {
  public instagramId: string;

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
      instagramId: string,
      imageSrc: string,
    },
  ) {
    super(
      _props,
    );
    this.instagramId = _props.instagramId;
  }
}

export {
  ArtistDetails,
};
