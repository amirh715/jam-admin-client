
class CreateShowcaseRequest {
  index: Number;
  title: string;
  message: string;
  route: string;
  image: Blob;

  public constructor(
    _props: {
      index: Number,
      title: string,
      message: string,
      route: string,
      image: Blob,
    }
  ) {
    this.index = _props.index;
    this.title = _props.title;
    this.message = _props.message;
    this.route = _props.route;
    this.image = _props.image;
  }
}

export { CreateShowcaseRequest };
