class GenreDetails {
  public id: string;
  public title: string;
  public titleInPersian: string;
  public createdAt: Date;
  public lastModifiedAt: Date;
  public creatorId: string;
  public creatorName: string;
  public updaterId: string;
  public updaterName: string;
  public subGenres: GenreDetails[];

  public constructor(
    id: string,
    title: string,
    titleInPersian: string,
    createdAt: Date,
    lastModifiedAt: Date,
    creatorId: string,
    creatorName: string,
    updaterId: string,
    updaterName: string,
    subGenres: GenreDetails[],
  ) {
    this.id = id;
    this.title = title;
    this.titleInPersian = titleInPersian;
    this.createdAt = createdAt;
    this.lastModifiedAt = lastModifiedAt;
    this.creatorId = creatorId;
    this.creatorName = creatorName;
    this.updaterId = updaterId;
    this.updaterName = updaterName;
    this.subGenres = subGenres;
  }
}

export {
  GenreDetails,
};
