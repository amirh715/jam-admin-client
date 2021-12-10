class EditArtworkRequest {
  public id: string;
  public title: string;
  public description: string;
  public genreIds: string[];
  public tags: string[];
  public flag: string;
  public recordLabel: string;
  public producer: string;
  public releaseDate: Date;
  public lyrics: string;
  public removeImage: boolean;
  public image: any;

  public constructor(
    id: string,
    title: string,
    description: string,
    genreIds: string[],
    tags: string[],
    flag: string,
    recordLabel: string,
    producer: string,
    releaseDate: Date,
    lyrics: string,
    removeImage: boolean,
    image: any
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.genreIds = genreIds;
    this.tags = tags;
    this.flag = flag;
    this.recordLabel = recordLabel;
    this.producer = producer;
    this.releaseDate = releaseDate;
    this.lyrics = lyrics;
    this.removeImage = removeImage;
    this.image = image;
  }

}

export {
  EditArtworkRequest
}
