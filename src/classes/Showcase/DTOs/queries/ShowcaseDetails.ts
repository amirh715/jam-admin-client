class ShowcaseDetails {
  public id: string;
  public index: number;
  public title: string;
  public message: string;
  public route: string;
  public interactionCount: number;
  public createdAt: string;
  public lastModifiedAt: string;
  public imageSrc: string;

  public constructor(
    _props: {
      id: string,
      index: number,
      title: string,
      message: string,
      route: string,
      interactionCount: number,
      createdAt: string,
      lastModifiedAt: string,
      imageSrc: string,
    },
  ) {
    this.id = _props.id;
    this.index = _props.index;
    this.title = _props.title;
    this.message = _props.message;
    this.route = _props.route;
    this.interactionCount = _props.interactionCount;
    this.createdAt = _props.createdAt;
    this.lastModifiedAt = _props.lastModifiedAt;
    this.imageSrc = _props.imageSrc;
  }
}

export { ShowcaseDetails };
