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
  public assignedAt: string;
  public processedAt: string;
  public archivedAt: string;
  public createdAt: string;
  public lastModifiedAt: string;

  public constructor(
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
  ) {
    const jalali = JalaliDateTime();
    this.id = id;
    this.message = message;
    this.status = ReportDetails.createReportStatus(status);
    this.type = ReportDetails.createReportType(type);
    this.reporterId = reporterId;
    this.reporterName = reporterName;
    this.reportedEntityId = reportedEntityId;
    this.reportedEntityTitle = reportedEntityTitle;
    this.processorId = processorId;
    this.processorName = processorName;
    this.processorNote = processorNote;
    this.assignedAt = jalali.toFullText(new Date(assignedAt));
    this.processedAt = jalali.toFullText(new Date(processedAt));
    this.archivedAt = jalali.toFullText(new Date(archivedAt));
    this.createdAt = jalali.toFullText(new Date(createdAt));
    this.lastModifiedAt = jalali.toFullText(new Date(lastModifiedAt));
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
