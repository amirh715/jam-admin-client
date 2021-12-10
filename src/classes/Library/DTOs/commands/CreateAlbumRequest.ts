class CreateAlbumRequest {
  public title: string;
  public description: string;
  public genreIds: string[];
  public tags: string[];
  public flag: string;
  public artistId: string;
  public recordLabel: string;
  public producer: string;
  public releaseDate: Date;

  public constructor(
    title: string,
    description: string,
    genreIds: string[],
    tags: string[],
    flag: string,
    artistId: string,
    recordLabel: string,
    producer: string,
    releaseDate: Date,
  ) {
    this.title = title;
    this.description = description;
    this.genreIds = genreIds;
    this.tags = tags;
    this.flag = flag;
    this.artistId = artistId;
    this.recordLabel = recordLabel;
    this.producer = producer;
    this.releaseDate = releaseDate;
  }
}

export {
  CreateAlbumRequest,
};
