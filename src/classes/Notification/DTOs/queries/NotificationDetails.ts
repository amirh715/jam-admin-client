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
  public scheduledOn: Date;
  public senderId: string;
  public senderName: string;
  public createdAt: Date;
  public lastModifiedAt: Date;
  public recipients: RecipientIdAndName[];

  public constructor(
    _props: {
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
    },
  ) {
    this.id = _props.id;
    this.title = _props.title;
    this.message = _props.message;
    this.route = _props.route;
    this.type = _props.type;
    this.isSent = _props.isSent;
    this.deliveryCount = _props.deliveryCount;
    this.recipientsCount = _props.recipientsCount;
    this.scheduledOn = new Date(_props.scheduledOn);
    this.senderId = _props.senderId;
    this.senderName = _props.senderName;
    this.createdAt = new Date(_props.createdAt);
    this.lastModifiedAt = new Date(_props.lastModifiedAt);
    this.recipients = _props.recipients;
  }
}

export {
  NotificationDetails,
};
