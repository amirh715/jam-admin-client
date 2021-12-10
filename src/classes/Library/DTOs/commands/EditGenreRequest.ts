class EditGenreRequest {
  id: string;
  title: string;
  titleInPersian: string;

  public constructor(id: string, title: string, titleInPersian: string) {
    this.id = id;
    this.title = title;
    this.titleInPersian = titleInPersian;
  }
}

export {
  EditGenreRequest,
};
