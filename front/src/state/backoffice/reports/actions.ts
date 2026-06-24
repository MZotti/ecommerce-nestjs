import type Report from 'interfaces/report'
import type { ReportActionType } from './types'

interface GetReportsAction {
    type: ReportActionType.GET_REPORTS
    payload: Report[]
}
interface GetLastReportsAction {
    type: ReportActionType.GET_LAST_REPORTS
    payload: Report[]
}

interface CreateReportAction {
    type: ReportActionType.CREATE_REPORT
    payload: Report
}

interface DeleteReportAction {
    type: ReportActionType.DELETE_REPORT
    payload: string
}

export type Action =
    | GetReportsAction
    | GetLastReportsAction
    | CreateReportAction
    | DeleteReportAction
