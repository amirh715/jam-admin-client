import { RecipientNotification } from './RecipientNotification';

class RecipientDetails {

  public id: string;
  public name: string;
  public notifications: RecipientNotification[];

  public constructor(
    id: string,
    name: string,
    notifications: RecipientNotification[]
  ) {
    this.id = id;
    this.name = name;
    this.notifications = notifications;
  }

}

export {
  RecipientDetails
}
