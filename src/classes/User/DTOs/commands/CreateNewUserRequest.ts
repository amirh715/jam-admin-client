import { UserRole } from '../../Types/UserRole';

class CreateNewUserRequest {
  public name: string;
  public mobile: string;
  public password: string;
  public email: string;
  public role: UserRole;
  public image: Blob;
  public constructor(
    name: string,
    mobile: string,
    password: string,
    email: string,
    role: UserRole,
    image: Blob,
  ) {
    this.name = name;
    this.mobile = mobile;
    this.password = password;
    this.email = email;
    this.role = role;
    this.image = image;
  }
}

export {
  CreateNewUserRequest,
};
