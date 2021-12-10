import { UserRole } from '../../Types/UserRole';

class EditUserProfileRequest {
  public id: string;
  public name: string;
  public email: string;
  public removeEmail: boolean;
  public role: UserRole;
  public profileImage: any;
  public removeProfileImage: boolean;

  public constructor(
    id: string,
    name: string,
    email: string,
    removeEmail: boolean,
    role: UserRole,
    profileImage: any,
    removeProfileImage: boolean,
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.removeEmail = removeEmail;
    this.role = role;
    this.profileImage = profileImage;
    this.removeProfileImage = removeProfileImage;
  }
}

export {
  EditUserProfileRequest,
};
