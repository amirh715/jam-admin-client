import { UserState } from '../../Types/UserState';
import { UserRole } from '../../Types/UserRole';

class GetUsersByFiltersRequest {
  public searchTerm: string;
  public createdAtFrom: Date;
  public createdAtTill: Date;
  public lastModifiedAtFrom: Date;
  public lastModifiedAtTill: Date;
  public hasImage: boolean;
  public hasEmail: boolean;
  public state: UserState;
  public role: UserRole;
  public creatorId: string;
  public updaterId: string;
  public limit: number;
  public offset: number;

  public constructor(
    searchTerm: string,
    createdAtFrom: Date,
    createdAtTill: Date,
    lastModifiedAtFrom: Date,
    lastModifiedAtTill: Date,
    hasImage: boolean,
    hasEmail: boolean,
    state: UserState,
    role: UserRole,
    creatorId: string,
    updaterId: string,
    limit: number,
    offset: number,
  ) {
    this.searchTerm = searchTerm;
    this.createdAtFrom = createdAtFrom;
    this.createdAtTill = createdAtTill;
    this.lastModifiedAtFrom = lastModifiedAtFrom;
    this.lastModifiedAtTill = lastModifiedAtTill;
    this.hasImage = hasImage;
    this.hasEmail = hasEmail;
    this.state = state;
    this.role = role;
    this.creatorId = creatorId;
    this.updaterId = updaterId;
    this.limit = limit;
    this.offset = offset;
  }
}

export {
  GetUsersByFiltersRequest,
};
