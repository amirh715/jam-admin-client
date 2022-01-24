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
    _props: {
      id: string,
      title: string,
      titleInPersian: string,
      createdAt: string,
      lastModifiedAt: string,
      creatorId: string,
      creatorName: string,
      updaterId: string,
      updaterName: string,
      subGenres: GenreDetails[],
    },
  ) {
    this.id = _props.id;
    this.title = _props.title;
    this.titleInPersian = _props.titleInPersian;
    this.createdAt = new Date(_props.createdAt);
    this.lastModifiedAt = new Date(_props.lastModifiedAt);
    this.creatorId = _props.creatorId;
    this.creatorName = _props.creatorName;
    this.updaterId = _props.updaterId;
    this.updaterName = _props.updaterName;
    this.subGenres = _props.subGenres;
  }
}

export {
  GenreDetails,
};
