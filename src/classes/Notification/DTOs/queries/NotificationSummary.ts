import { NotificationType } from "../../Types/NotificationType";

class NotificationSummary {
  public id: string;
  public title: string;
  public type: NotificationType;
  public isSent: boolean;
  public recipientsCount: number;
  public scheduledOn: Date;

  public constructor(
    id: string,
    title: string,
    type: NotificationType,
    isSent: boolean,
    recipientsCount: number,
    scheduledOn: Date
  ) {
    this.id = id;
    this.title = title;
    this.type = type;
    this.isSent = isSent;
    this.recipientsCount = recipientsCount;
    this.scheduledOn = scheduledOn;
  }

}

export {
  NotificationSummary
}
