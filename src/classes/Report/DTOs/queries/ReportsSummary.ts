import { ReportedLibraryEntityIdAndTitle } from './ReportedLibraryEntityIdAndTitle';

class ReportsSummary {
  public totalReportsCount: string;
  public processedReportsCount: string;
  public assignedReportsCount: string;
  public technicalReportsCount: string;
  public contentReportsCount: string;
  public libraryEntityReportsCount: string;
  public mostReportedLibraryEntities: ReportedLibraryEntityIdAndTitle[];

  public constructor(
    totalReportsCount: string,
    processedReportsCount: string,
    assignedReportsCount: string,
    technicalReportsCount: string,
    contentReportsCount: string,
    libraryEntityReportsCount: string,
    mostReportedLibraryEntities: ReportedLibraryEntityIdAndTitle[]
  ) {
    this.totalReportsCount = totalReportsCount;
    this.processedReportsCount = processedReportsCount;
    this.assignedReportsCount = assignedReportsCount;
    this.technicalReportsCount = technicalReportsCount;
    this.contentReportsCount = contentReportsCount;
    this.libraryEntityReportsCount = libraryEntityReportsCount;
    this.mostReportedLibraryEntities = mostReportedLibraryEntities;
  }

}

export {
  ReportsSummary
}
