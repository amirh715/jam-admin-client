class CreateGenreRequest {
  public title: string;
  public titleInPersian: string;
  public parentGenreId: string;

  public constructor(
    title: string,
    titleInPersian: string,
    parentGenreId: string,
  ) {
    this.title = title;
    this.titleInPersian = titleInPersian;
    this.parentGenreId = parentGenreId;
  }
}

export {
  CreateGenreRequest,
};
