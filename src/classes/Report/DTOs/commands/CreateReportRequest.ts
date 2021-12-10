import { ReportType } from '../../Types/ReportType';

class CreateReportRequest {

  public message: string;
  public reportedEntityId: string;
  public reportType: ReportType;

  public constructor(
    message: string,
    reportedEntityId: string,
    reportType: ReportType
  ) {
    this.message = message;
    this.reportedEntityId = reportedEntityId;
    this.reportType = reportType;
  }

}

export {
  CreateReportRequest
}
