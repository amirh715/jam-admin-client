class ChangePasswordRequest {
  public id: string;
  public newPassword: string;
  public constructor(id: string, newPassword: string) {
    this.id = id;
    this.newPassword = newPassword;
  }
}

export {
  ChangePasswordRequest,
};
