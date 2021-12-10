import { GenreDetails } from '../queries/GenreDetails';

class CreateArtistRequest {
  public type: string;
  public title: string;
  public description: string;
  public genreIds: string[];
  public tags: string[];
  public flag: string;
  public instagramId: string;
  public image: Blob;

  public constructor(
    type: string,
    title: string,
    description: string,
    genres: GenreDetails[],
    tags: string[],
    flag: string,
    instagramId: string,
    image: Blob,
  ) {
    this.type = type;
    this.title = title;
    this.description = description;
    this.genreIds = genres.map((genre) => genre.id);
    this.tags = tags;
    this.flag = flag;
    this.instagramId = instagramId;
    this.image = image;
  }
}

export {
  CreateArtistRequest,
};
