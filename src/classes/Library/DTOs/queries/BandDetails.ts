import { LibraryEntitySummary } from './LibraryEntitySummary';
import { GenreIdAndTitle } from './GenreIdAndTitle';
import { ArtistDetails } from './ArtistDetails';

class BandDetails extends ArtistDetails {
  public members: LibraryEntitySummary[];

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
      members: LibraryEntitySummary[],
      imageSrc: string,
    },
  ) {
    super(
      _props,
    );
    this.members = _props.members;
  }
}

export {
  BandDetails,
};
