import { ReportStatus } from '../../Types/ReportStatus';
import { ReportType } from '../../Types/ReportType';

class GetReportsByFiltersRequest {
  
  public status: ReportStatus;
  
  public reporterId: string;
  public processorId: string;
  public reportedEntityId: string;

  public type: ReportType;

  public assignedAtFrom: Date;
  public assignedAtTill: Date;

  public processedAtFrom: Date;
  public processedAtTill: Date;

  public archivedAtFrom: Date;
  public archivedAtTill: Date;

  public createdAtFrom: Date;
  public createdAtTill: Date;

  public lastModifiedAtFrom: Date;
  public lastModifiedAtTill: Date;

  public isContentReport: boolean;
  public isTechnicalReport: boolean;
  public isLibraryEntityReport: boolean;

  public constructor(
    status: ReportStatus,
    reporterId: string,
    processorId: string,
    reportedEntityId: string,
    type: ReportType,
    assignedAtFrom: Date,
    assignedAtTill: Date,
    processedAtFrom: Date,
    processedAtTill: Date,
    archivedAtFrom: Date,
    archivedAtTill: Date,
    createdAtFrom: Date,
    createdAtTill: Date,
    lastModifiedAtFrom: Date,
    lastModifiedAtTill: Date,
    isContentReport: boolean,
    isTechnicalReport: boolean,
    isLibraryEntityReport: boolean
  ) {
    this.status = status;
    this.reporterId = reporterId;
    this.processorId = processorId;
    this.reportedEntityId = reportedEntityId;
    this.type = type;
    this.assignedAtFrom = assignedAtFrom;
    this.assignedAtTill = assignedAtTill;
    this.processedAtFrom = processedAtFrom;
    this.processedAtTill = processedAtTill;
    this.archivedAtFrom = archivedAtFrom;
    this.archivedAtTill = archivedAtTill;
    this.createdAtFrom = createdAtFrom;
    this.createdAtTill = createdAtTill;
    this.lastModifiedAtFrom = lastModifiedAtFrom;
    this.lastModifiedAtTill = lastModifiedAtTill;
    this.isContentReport = isContentReport;
    this.isTechnicalReport = isTechnicalReport;
    this.isLibraryEntityReport = isLibraryEntityReport;
  }


}

export {
  GetReportsByFiltersRequest
}
