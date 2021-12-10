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
    userId: string,
    userName: string,
    userMobile: string,
    ipAddress: string,
    wasSuccessful: boolean,
    failureReason: string,
    attemptedAt: Date,
    platform: string,
    os: string
  ) {
    this.userId = userId;
    this.userName = userName;
    this.userMobile = userMobile;
    this.ipAddress = ipAddress;
    this.wasSuccessful = wasSuccessful;
    this.failureReason = failureReason;
    this.attemptedAt = attemptedAt;
    this.platform = platform;
    this.os = os;
  }

}

export {
  LoginDetails
}
