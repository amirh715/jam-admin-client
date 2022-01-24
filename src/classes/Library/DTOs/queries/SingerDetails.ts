import { ArtistDetails } from './ArtistDetails';
import { GenreIdAndTitle } from './GenreIdAndTitle';
import { LibraryEntityIdAndTitle } from './LibraryEntityIdAndTitle';

class SingerDetails extends ArtistDetails {
  public bands: LibraryEntityIdAndTitle[];

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
      bands: LibraryEntityIdAndTitle[],
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
    this.bands = _props.bands;
  }
}

export {
  SingerDetails,
};
