import { UserRole } from '../../Types/UserRole';
import { UserState } from '../../Types/UserState';

class UserDetails {
  public id: string;
  public name: string;
  public mobile: string;
  public email: string;
  public isEmailVerified: boolean;
  public state: UserState;
  public role: UserRole;
  public createdAt: Date;
  public lastModifiedAt: Date;
  public creatorId: string;
  public creatorName: string;
  public updaterId: string;
  public updaterName: string;
  public totalReportsCount: string;
  public totalNotificationsCount: string;
  public totalLoginCount: string;
  public totalPlayedTracksCount: string;
  public profileImageSrc: string | ArrayBuffer;

  public constructor(
    id: string,
    name: string,
    mobile: string,
    email: string,
    isEmailVerified: boolean,
    state: UserState,
    role: UserRole,
    createdAt: Date,
    lastModifiedAt: Date,
    creatorId: string,
    creatorName: string,
    updaterId: string,
    updaterName: string,
    totalReportsCount: string,
    totalNotificationsCount: string,
    totalLoginCount: string,
    totalPlayedTracksCount: string,
    profileImageSrc: string,
  ) {
    this.id = id;
    this.name = name;
    this.mobile = mobile;
    this.email = email;
    this.isEmailVerified = isEmailVerified;
    this.state = state;
    this.role = role;
    this.createdAt = createdAt;
    this.lastModifiedAt = lastModifiedAt;
    this.creatorId = creatorId;
    this.creatorName = creatorName;
    this.updaterId = updaterId;
    this.updaterName = updaterName;
    this.totalReportsCount = totalReportsCount;
    this.totalNotificationsCount = totalNotificationsCount;
    this.totalLoginCount = totalLoginCount;
    this.totalPlayedTracksCount = totalPlayedTracksCount;
    this.profileImageSrc = profileImageSrc;
  }
}

export {
  UserDetails,
};
