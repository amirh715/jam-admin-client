import { NotificationType } from '../../Types/NotificationType';

class EditNotificationRequest {

  public id: string;
  public type: NotificationType;
  public title: string;
  public message: string;
  public route: string;
  public scheduledOn: Date;
  public recipients: string[];

  public constructor(
    id: string,
    type: NotificationType,
    title: string,
    message: string,
    route: string,
    scheduledOn: Date,
    recipients: string[]
  ) {
    this.id = id;
    this.type = type;
    this.title = title;
    this.message = message;
    this.route = route;
    this.scheduledOn = scheduledOn;
    this.recipients = recipients;
  }

}

export {
  EditNotificationRequest
}
