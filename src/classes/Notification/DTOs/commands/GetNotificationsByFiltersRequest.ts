import { NotificationType } from '../../Types/NotificationType';
import { SenderType } from '../../Types/SenderType';

class GetNotificationsByFiltersRequest {
  public searchTerm: string;
  public createdAtFrom: Date;
  public createdAtTill: Date;
  public lastModifiedAtFrom: Date;
  public lastModifiedAtTill: Date;
  public scheduledOnFrom: Date;
  public scheduledOnTill: Date;
  public type: string;
  public isSent :boolean;
  public withUndeliveredRecipients: boolean;
  public senderType: string;

  public constructor(
    searchTerm: string,
    createdAtFrom: Date,
    createdAtTill: Date,
    lastModifiedAtFrom: Date,
    lastModifiedAtTill: Date,
    scheduledOnFrom: Date,
    scheduledOnTill: Date,
    type: NotificationType,
    isSent: boolean,
    withUndeliveredRecipients: boolean,
    senderType: SenderType,
  ) {
    this.searchTerm = searchTerm;
    this.createdAtFrom = createdAtFrom;
    this.createdAtTill = createdAtTill;
    this.lastModifiedAtFrom = lastModifiedAtFrom;
    this.lastModifiedAtTill = lastModifiedAtTill;
    this.scheduledOnFrom = scheduledOnFrom;
    this.scheduledOnTill = scheduledOnTill;
    this.type = type && type.toString();
    this.isSent = isSent;
    this.withUndeliveredRecipients = withUndeliveredRecipients;
    this.senderType = senderType && senderType.toString();
  }
}

export {
  GetNotificationsByFiltersRequest,
};
