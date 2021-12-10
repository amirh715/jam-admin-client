import { NotificationType } from "../../Types/NotificationType";

class RecipientNotification {

  public id: string;
  public title: string;
  public message: string;
  public type: NotificationType;
  public isDelivered: boolean;
  public isSent: boolean;
  public deliveredAt: Date;

  public constructor(
    id: string,
    title: string,
    message: string,
    type: NotificationType,
    isDelivered: boolean,
    isSent: boolean,
    deliveredAt: Date
  ) {
    this.id = id;
    this.title = title;
    this.message = message;
    this.type = type;
    this.isDelivered = isDelivered;
    this.isSent = isSent;
    this.deliveredAt = deliveredAt;
  }

}

export {
  RecipientNotification
}
