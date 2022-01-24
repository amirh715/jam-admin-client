class LoginDetails {

  public userId: string;
  public userName: string;
  public userMobile: string;
  public ipAddress: string;
  public wasSuccessful: boolean;
  public failureReason: string;
  public attemptedAt: Date;
  public platform: string;
  public os: string;

  public constructor(
    _props: {
      userId: string,
      userName: string,
      userMobile: string,
      ipAddress: string,
      wasSuccessful: boolean,
      failureReason: string,
      attemptedAt: string,
      platform: string,
      os: string,
    }
  ) {
    this.userId = _props.userId;
    this.userName = _props.userName;
    this.userMobile = _props.userMobile;
    this.ipAddress = _props.ipAddress;
    this.wasSuccessful = _props.wasSuccessful;
    this.failureReason = _props.failureReason;
    this.attemptedAt = new Date(_props.attemptedAt);
    this.platform = _props.platform;
    this.os = _props.os;
  }

}

export {
  LoginDetails
}
