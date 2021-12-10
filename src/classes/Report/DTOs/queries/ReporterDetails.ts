import { ReportDetails } from './ReportDetails';

class ReporterDetails {
  public id: string;
  public reporterName: string;
  public reports: ReportDetails[];
  public totalReportsCount: string;
  public processedReportsCount: string;

  public constructor(
    id: string,
    reporterName: string,
    reports: ReportDetails[],
    totalReportsCount: string,
    processedReportsCount: string
  ) {
    this.id = id;
    this.reporterName = reporterName;
    this.reports = reports;
    this.totalReportsCount = totalReportsCount;
    this.processedReportsCount = processedReportsCount;
  }

}

export {
  ReporterDetails
}
