import { GenreIdAndTitle } from './GenreIdAndTitle';
import { LibraryEntityDetails } from './LibraryEntityDetails';

class ArtistDetails extends LibraryEntityDetails {
  public instagramId: string;

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
    this.instagramId = _props.instagramId;
  }
}

export {
  ArtistDetails,
};
