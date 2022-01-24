import { LibraryEntitySummary } from './LibraryEntitySummary';
import { GenreIdAndTitle } from './GenreIdAndTitle';
import { ArtistDetails } from './ArtistDetails';

class BandDetails extends ArtistDetails {
  public members: LibraryEntitySummary[];

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
      instagramId: string,
      members: LibraryEntitySummary[],
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
    this.members = _props.members;
  }
}

export {
  BandDetails,
};
