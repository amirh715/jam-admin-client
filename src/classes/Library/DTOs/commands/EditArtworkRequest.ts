import { GenreDetails } from '../queries/GenreDetails';

class EditArtworkRequest {
  public id: string;
  public title: string;
  public description: string;
  public genreIds: string[];
  public tags: string[];
  public flag: string;
  public recordLabel: string;
  public producer: string;
  public releaseDate: string;
  public lyrics: string;
  public removeImage: boolean;
  public image: Blob;

  public constructor(
    id: string,
    title: string,
    description: string,
    genres: GenreDetails[],
    tags: string[],
    flag: string,
    recordLabel: string,
    producer: string,
    releaseDate: Date,
    lyrics: string,
    removeImage: boolean,
    image: Blob,
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.genreIds = genres && genres.map((genre) => genre.id);
    this.tags = tags;
    this.flag = flag;
    this.recordLabel = recordLabel;
    this.producer = producer;
    this.releaseDate = releaseDate && releaseDate.toString();
    this.lyrics = lyrics;
    this.removeImage = removeImage;
    this.image = image;
  }
}

export {
  EditArtworkRequest,
};
