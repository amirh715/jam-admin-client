class CreateAlbumTrackRequest {
  public title: string;
  public description: string;
  public tags: string[];
  public flag: string;

  public constructor(
    title: string,
    description: string,
    tags: string[],
    flag: string
  ) {
    this.title = title;
    this.description = description;
    this.tags = tags;
    this.flag = flag;
  }

}

export {
  CreateAlbumTrackRequest
}
