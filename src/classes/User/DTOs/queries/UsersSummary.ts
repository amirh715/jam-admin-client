import { LoginDetails } from '../queries/LoginDetails';

class UsersSummary {
  public totalUsersCount: string;
  public activeUsersCount: string;
  public blockedUsersCount: string;
  public unverifiedUsersCount: string;
  public usersWithEmailsCount: string;
  public usersWithVerifiedEmailsCount: string;
  public unsuccessfulLogins: LoginDetails[];
  public successfulLogins: LoginDetails[];
  public unsuccessfulLoginsCount: string;
  public successfulLoginsCount: string;

  public constructor(
    totalUsersCount: string,
    activeUsersCount: string,
    blockedUsersCount: string,
    unverifiedUsersCount: string,
    usersWithEmailsCount: string,
    usersWithVerifiedEmailsCount: string,
    unsuccessfulLogins: LoginDetails[],
    successfulLogins: LoginDetails[],
    unsuccessfulLoginsCount: string,
    successfulLoginsCount: string
  ) {
    this.totalUsersCount = totalUsersCount;
    this.activeUsersCount = activeUsersCount;
    this.blockedUsersCount = blockedUsersCount;
    this.unverifiedUsersCount = unverifiedUsersCount;
    this.usersWithEmailsCount = usersWithEmailsCount;
    this.usersWithVerifiedEmailsCount = usersWithVerifiedEmailsCount;
    this.unsuccessfulLogins = unsuccessfulLogins;
    this.successfulLogins = successfulLogins;
    this.unsuccessfulLoginsCount = unsuccessfulLoginsCount;
    this.successfulLoginsCount = successfulLoginsCount;
  }

}

export {
  UsersSummary
}
