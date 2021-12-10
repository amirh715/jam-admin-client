import { ArtistDetails } from './ArtistDetails';
import { GenreIdAndTitle } from './GenreIdAndTitle';
import { LibraryEntityIdAndTitle } from './LibraryEntityIdAndTitle';

class SingerDetails extends ArtistDetails {
  public bands: LibraryEntityIdAndTitle[];

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
      bands: LibraryEntityIdAndTitle[],
      imageSrc: string,
    },
  ) {
    super(
      _props,
    );
    this.bands = _props.bands;
  }
}

export {
  SingerDetails,
};
