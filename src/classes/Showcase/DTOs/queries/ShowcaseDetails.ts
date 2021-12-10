
class ShowcaseDetails {
  public id: string;
  public index: Number;
  public title: string;
  public message: string;
  public route: string;
  public image: Blob;

  public constructor(
    _props: {
      id: string,
      index: Number,
      title: string,
      message: string,
      route: string,
      interactionCount: Number,
      image: Blob,
      createdAt: string,
      lastModifiedAt: string,
    }
  ) {
    this.id = _props.id;
    this.index = _props.index;
    this.title = _props.title;
    this.message = _props.message;
  }

}

export { ShowcaseDetails };
