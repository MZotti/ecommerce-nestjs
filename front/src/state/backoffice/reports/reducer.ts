import type Report from 'interfaces/report'
import type { Action } from './actions'
import { ReportActionType } from './types'

interface ReportsState {
    reports: Report[]
    lastReports: Report[]
}

const initialState: ReportsState = {
    reports: [],
    lastReports: [],
}

const reducer = (state: ReportsState = initialState, action: Action) => {
    switch (action.type) {
        case ReportActionType.GET_REPORTS:
            return {
                ...state,
                reports: action.payload,
            }
        case ReportActionType.GET_LAST_REPORTS:
            return {
                ...state,
                lastReports: action.payload,
            }
        case ReportActionType.CREATE_REPORT:
            return {
                reports: [action.payload, ...state.reports],
                lastReports: [action.payload, ...state.lastReports],
            }
        case ReportActionType.DELETE_REPORT:
            return {
                reports: state.reports.filter(report => report.id !== action.payload),
                lastReports: state.lastReports.filter(report => report.id !== action.payload),
            }
        default:
            return state
    }
}

export default reducer
