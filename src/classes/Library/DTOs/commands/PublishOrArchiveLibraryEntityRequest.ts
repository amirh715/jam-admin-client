class PublishOrArchiveLibraryEntityRequest {
  public id: string;
  public publish: boolean;
  public cascadePublishCommandToArtistsArtworks: boolean;

  public constructor(
    id: string,
    publish: boolean,
    cascadePublishCommandToArtistsArtworks: boolean
  ) {
    this.id = id;
    this.publish = publish;
    this.cascadePublishCommandToArtistsArtworks = cascadePublishCommandToArtistsArtworks;
  }

}

export {
  PublishOrArchiveLibraryEntityRequest
}
