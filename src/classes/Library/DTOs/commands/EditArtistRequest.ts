import { GenreDetails } from '../queries/GenreDetails';

class EditArtistRequest {
  public id: string;
  public title: string;
  public description: string;
  public tags: string[];
  public genreIds: string[];
  public flag: string;
  public instagramId: string;
  public removeImage: boolean;
  public image: Blob;

  public constructor(
    id: string,
    title: string,
    description: string,
    tags: string[],
    genres: GenreDetails[],
    flag: string,
    instagramId: string,
    removeImage: boolean,
    image: Blob,
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.tags = tags;
    this.genreIds = genres && genres.map((genre) => genre.id);
    this.flag = flag;
    this.instagramId = instagramId;
    this.removeImage = removeImage;
    this.image = image;
  }
}

export {
  EditArtistRequest,
};
