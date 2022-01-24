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
    _props: {
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
    },
  ) {
    this.searchTerm = _props.searchTerm;
    this.createdAtFrom = _props.createdAtFrom;
    this.createdAtTill = _props.createdAtTill;
    this.lastModifiedAtFrom = _props.lastModifiedAtFrom;
    this.lastModifiedAtTill = _props.lastModifiedAtTill;
    this.hasImage = _props.hasImage;
    this.hasEmail = _props.hasEmail;
    this.state = _props.state;
    this.role = _props.role;
    this.creatorId = _props.creatorId;
    this.updaterId = _props.updaterId;
    this.limit = _props.limit;
    this.offset = _props.offset;
  }
}

export {
  GetUsersByFiltersRequest,
};
