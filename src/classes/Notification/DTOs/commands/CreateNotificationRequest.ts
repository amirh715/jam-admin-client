import { NotificationType } from '../../Types/NotificationType';
import { SenderType } from '../../Types/SenderType';

class CreateNotificationRequest {
  public type: NotificationType;
  public title: string;
  public message: string;
  public route: string;
  public senderType: SenderType;
  public scheduledOn: Date;
  public recipients: string[];
  public image: any;

  public constructor(
    type: NotificationType,
    title: string,
    message: string,
    route: string,
    senderType: SenderType,
    scheduledOn: Date,
    recipients: string[],
    image: any,
  ) {
    this.type = type;
    this.title = title;
    this.message = message;
    this.route = route;
    this.senderType = senderType;
    this.scheduledOn = scheduledOn;
    this.recipients = recipients;
    this.image = null;
  }
}

export {
  CreateNotificationRequest,
};
