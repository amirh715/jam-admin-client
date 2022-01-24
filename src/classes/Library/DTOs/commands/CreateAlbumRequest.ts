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
  public image: Blob;

  public constructor(
    _props: {
      title: string,
      description: string,
      genreIds: string[],
      tags: string[],
      flag: string,
      artistId: string,
      recordLabel: string,
      producer: string,
      releaseDate: Date,
      image: Blob,
    },
  ) {
    this.title = _props.title;
    this.description = _props.description;
    this.genreIds = _props.genreIds;
    this.tags = _props.tags;
    this.flag = _props.flag;
    this.artistId = _props.artistId;
    this.recordLabel = _props.recordLabel;
    this.producer = _props.producer;
    this.releaseDate = _props.releaseDate;
    this.image = _props.image;
  }
}

export {
  CreateAlbumRequest,
};
