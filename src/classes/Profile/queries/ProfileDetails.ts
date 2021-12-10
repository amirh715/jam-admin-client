class ProfileDetails {
  public id: string;
  public name: string;
  public mobile: string;
  public email: string;
  public isEmailVerified: boolean;

  public constructor(
    id: string,
    name: string,
    mobile: string,
    email: string,
    isEmailVerified: boolean,
  ) {
    this.id = id;
    this.name = name;
    this.mobile = mobile;
    this.email = email;
    this.isEmailVerified = isEmailVerified;
  }
}

export {
  ProfileDetails,
};
