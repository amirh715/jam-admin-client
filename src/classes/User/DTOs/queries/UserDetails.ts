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
  public hasFCMToken: boolean;

  public constructor(
    _props: {
      id: string,
      name: string,
      mobile: string,
      email: string,
      isEmailVerified: boolean,
      state: UserState,
      role: UserRole,
      createdAt: string,
      lastModifiedAt: string,
      creatorId: string,
      creatorName: string,
      updaterId: string,
      updaterName: string,
      totalReportsCount: string,
      totalNotificationsCount: string,
      totalLoginCount: string,
      totalPlayedTracksCount: string,
      profileImageSrc: string,
      hasFCMToken: boolean,
    },
  ) {
    this.id = _props.id;
    this.name = _props.name;
    this.mobile = _props.mobile;
    this.email = _props.email;
    this.isEmailVerified = _props.isEmailVerified;
    this.state = _props.state;
    this.role = _props.role;
    this.createdAt = new Date(_props.createdAt);
    this.lastModifiedAt = new Date(_props.lastModifiedAt);
    this.creatorId = _props.creatorId;
    this.creatorName = _props.creatorName;
    this.updaterId = _props.updaterId;
    this.updaterName = _props.updaterName;
    this.totalReportsCount = _props.totalReportsCount;
    this.totalNotificationsCount = _props.totalNotificationsCount;
    this.totalLoginCount = _props.totalLoginCount;
    this.totalPlayedTracksCount = _props.totalPlayedTracksCount;
    this.profileImageSrc = _props.profileImageSrc;
    this.hasFCMToken = _props.hasFCMToken;
  }
}

export {
  UserDetails,
};
