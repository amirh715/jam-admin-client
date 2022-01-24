import { JalaliDateTime } from 'jalali-date-time';
import { ReportStatus } from '../../Types/ReportStatus';
import { ReportType } from '../../Types/ReportType';

class ReportDetails {
  public id: string;
  public message: string;
  public status: ReportStatus;
  public type: ReportType;
  public reporterId: string;
  public reporterName: string;
  public reportedEntityId: string;
  public reportedEntityTitle: string;
  public processorId: string;
  public processorName: string;
  public processorNote: string;
  public assignedAt: Date;
  public processedAt: Date;
  public archivedAt: Date;
  public createdAt: Date;
  public lastModifiedAt: Date;

  public constructor(
    _props: {
      id: string,
      message: string,
      status: string,
      type: string,
      reporterId: string,
      reporterName: string,
      reportedEntityId: string,
      reportedEntityTitle: string,
      processorId: string,
      processorName: string,
      processorNote: string,
      assignedAt: string,
      processedAt: string,
      archivedAt: string,
      createdAt: string,
      lastModifiedAt: string,
    },
  ) {
    this.id = _props.id;
    this.message = _props.message;
    this.status = ReportDetails.createReportStatus(_props.status);
    this.type = ReportDetails.createReportType(_props.type);
    this.reporterId = _props.reporterId;
    this.reporterName = _props.reporterName;
    this.reportedEntityId = _props.reportedEntityId;
    this.reportedEntityTitle = _props.reportedEntityTitle;
    this.processorId = _props.processorId;
    this.processorName = _props.processorName;
    this.processorNote = _props.processorNote;
    this.assignedAt = new Date(_props.assignedAt);
    this.processedAt = new Date(_props.processedAt);
    this.archivedAt = new Date(_props.archivedAt);
    this.createdAt = new Date(_props.createdAt);
    this.lastModifiedAt = new Date(_props.lastModifiedAt);
  }

  private static createReportStatus(status: string): ReportStatus {
    switch (status) {
      case 'PENDING_ASSIGNMENT':
        return ReportStatus.PENDING_ASSIGNMENT;
      case 'ASSIGNED':
        return ReportStatus.ASSIGNED;
      case 'PROCESSED':
        return ReportStatus.PROCESSED;
      case 'ARCHIVED':
        return ReportStatus.ARCHIVED;
      default:
        return null;
    }
  }

  private static createReportType(type: string): ReportType {
    switch (type) {
      case 'TECHNICAL':
        return ReportType.TECHNICAL;
      case 'CONTENT':
        return ReportType.CONTENT;
      default:
        return null;
    }
  }
}

export {
  ReportDetails,
};
