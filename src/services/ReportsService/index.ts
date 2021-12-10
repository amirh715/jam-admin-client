import _ from 'lodash';
// import { RecipientDetails } from '@/classes/Notification/DTOs/queries/RecipientDetails';
import { GetReportByIdRequest } from '@/classes/Report/DTOs/commands/GetReportByIdRequest';
import { GetReportsByFiltersRequest } from '@/classes/Report/DTOs/commands/GetReportsByFiltersRequest';
import { ProcessReportRequest } from '@/classes/Report/DTOs/commands/ProcessReportRequest';
import { ReporterDetails } from '@/classes/Report/DTOs/queries/ReporterDetails';
import { ReportDetails } from '../../classes/Report/DTOs/queries/ReportDetails';
import { HttpService } from '../HttpService';
import { REPORTS_PATH } from './REPORTS_PATH';

class ReportsService {
  public static async processReport(
    dto: ProcessReportRequest,
  ): Promise<void> {
    try {
      const payload = new FormData();
      payload.append('id', dto.id);
      payload.append('processorNote', dto.processorNote);
      await HttpService.put(REPORTS_PATH.PROCESS, payload);
      return Promise.resolve();
    } catch (err) {
      if (err.response) {
        return Promise.reject(err.response.data);
      }
      return Promise.reject(err);
    }
  }

  public static async getByFilters(filters: GetReportsByFiltersRequest)
  : Promise<Array<ReportDetails>> {
    try {
      let query = '';
      _.forOwn(filters, (value, key) => { query += `?${key}=${value}`; });
      const { data } = await HttpService.get(REPORTS_PATH.GET_BY_FILTERS, query);
      const results: ReportDetails[] = _.map(data, (report) =>
        new ReportDetails(
          report.id,
          report.message,
          report.status,
          report.type,
          report.reporterId,
          report.reporterName,
          report.reportedEntityId,
          report.reportedEntityTitle,
          report.processorId,
          report.processorName,
          report.processorNote,
          report.assignedAt,
          report.processedAt,
          report.archivedAt,
          report.createdAt,
          report.lastModifiedAt,
        ));
      return Promise.resolve(results);
    } catch (err) {
      return Promise.reject();
    }
  }

  public static async getById(dto: GetReportByIdRequest)
  : Promise<ReportDetails> {
    try {
      const { data } = await HttpService.get(REPORTS_PATH.GET_BY_ID, dto.id);
      return Promise.resolve(data);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  public static async getReporterById(): Promise<ReporterDetails> {
    try {
      const { data } = await HttpService.get('');
      return Promise.resolve(data);
    } catch (err) {
      return Promise.reject(err);
    }
  }
}

export { ReportsService };
