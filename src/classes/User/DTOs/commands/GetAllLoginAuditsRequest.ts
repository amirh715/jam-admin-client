class GetAllLoginAuditsRequest {
  public limit: number;
  public offset: number;

  public constructor(
    limit: number,
    offset: number,
  ) {
    this.limit = limit;
    this.offset = offset;
  }
}

export {
  GetAllLoginAuditsRequest,
};
