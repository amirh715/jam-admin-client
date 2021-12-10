import { RecipientIdAndName } from './RecipientIdAndName';

class NotificationDetails {
  public id: string;
  public title: string;
  public message: string;
  public route: string;
  public type: string;
  public isSent: string;
  public deliveryCount: string;
  public recipientsCount: string;
  public scheduledOn: string;
  public senderId: string;
  public senderName: string;
  public createdAt: string;
  public lastModifiedAt: string;
  public recipients: RecipientIdAndName[];

  public constructor(
    id: string,
    title: string,
    message: string,
    route: string,
    type: string,
    isSent: string,
    deliveryCount: string,
    recipientsCount: string,
    scheduledOn: string,
    senderId: string,
    senderName: string,
    createdAt: string,
    lastModifiedAt: string,
    recipients: RecipientIdAndName[],
  ) {
    this.id = id;
    this.title = title;
    this.message = message;
    this.route = route;
    this.type = type;
    this.isSent = isSent;
    this.deliveryCount = deliveryCount;
    this.recipientsCount = recipientsCount;
    this.scheduledOn = scheduledOn;
    this.senderId = senderId;
    this.senderName = senderName;
    this.createdAt = createdAt;
    this.lastModifiedAt = lastModifiedAt;
    this.recipients = recipients;
  }
}

export {
  NotificationDetails,
};
