class ProcessReportRequest {
  public id: string;
  public processorNote: string;

  public constructor(
    id: string,
    processorNote: string,
  ) {
    this.id = id;
    this.processorNote = processorNote;
  }
}

export {
  ProcessReportRequest,
};
