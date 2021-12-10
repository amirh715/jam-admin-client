class GetLibraryEntitiesByFiltersRequest {
  public type: string;
  public searchTerm: string;
  public published: boolean;
  public isFlagged: boolean;
  public hasImage: boolean;
  public genreIds: string[];
  public rateFrom: number;
  public rateTo: number;
  public totalPlayedCountFrom: number;
  public totalPlayedCountTo: number;
  public durationFrom: number;
  public durationTo: number;
  public artistId: string;
  public releaseDateFrom: Date;
  public releaseDateTill: Date;
  public creatorId: string;
  public updaterId: string;
  public createdAtFrom: Date;
  public createdAtTill: Date;
  public lastModifiedAtFrom: Date;
  public lastModifiedAtTill: Date;

  public constructor(
    type?: string,
    searchTerm?: string,
    published?: boolean,
    isFlagged?: boolean,
    hasImage?: boolean,
    genreIds?: string[],
    rateFrom?: number,
    rateTo?: number,
    totalPlayedCountFrom?: number,
    totalPlayedCountTo?: number,
    durationFrom?: number,
    durationTo?: number,
    artistId?: string,
    releaseDateFrom?: Date,
    releaseDateTill?: Date,
    creatorId?: string,
    updaterId?: string,
    createdAtFrom?: Date,
    createdAtTill?: Date,
    lastModifiedAtFrom?: Date,
    lastModifiedAtTill?: Date,
  ) {
    this.type = type;
    this.searchTerm = searchTerm;
    this.published = published;
    this.isFlagged = isFlagged;
    this.hasImage = hasImage;
    this.genreIds = genreIds;
    this.rateFrom = rateFrom;
    this.rateTo = rateTo;
    this.totalPlayedCountFrom = totalPlayedCountFrom;
    this.totalPlayedCountTo = totalPlayedCountTo;
    this.durationFrom = durationFrom;
    this.durationTo = durationTo;
    this.artistId = artistId;
    this.releaseDateFrom = releaseDateFrom;
    this.releaseDateTill = releaseDateTill;
    this.creatorId = creatorId;
    this.updaterId = updaterId;
    this.createdAtFrom = createdAtFrom;
    this.createdAtTill = createdAtTill;
    this.lastModifiedAtFrom = lastModifiedAtFrom;
    this.lastModifiedAtTill = lastModifiedAtTill;
  }
}

export {
  GetLibraryEntitiesByFiltersRequest,
};
