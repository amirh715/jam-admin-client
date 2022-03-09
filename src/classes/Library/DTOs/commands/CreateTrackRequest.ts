import { GenreDetails } from '../queries/GenreDetails';

class CreateTrackRequest {
  public title: string;
  public description: string;
  public genreIds: string[];
  public tags: string[];
  public flag: string;
  public recordLabel: string;
  public producer: string;
  public releaseDate: Date;
  public artistId: string;
  public albumId: string;
  public audio: Blob;
  public image: Blob;

  public constructor(
    title: string,
    description: string,
    genreIds: GenreDetails[],
    tags: string[],
    flag: string,
    recordLabel: string,
    producer: string,
    releaseDate: Date,
    artistId: string,
    albumId: string,
    audio: Blob,
    image: Blob,
  ) {
    this.title = title;
    this.description = description;
    this.genreIds = genreIds.map((genre) => genre.id);
    this.tags = tags;
    this.flag = flag;
    this.recordLabel = recordLabel;
    this.producer = producer;
    this.releaseDate = releaseDate;
    this.artistId = artistId;
    this.albumId = albumId;
    this.audio = audio;
    this.image = image;
  }
}

export {
  CreateTrackRequest,
};
