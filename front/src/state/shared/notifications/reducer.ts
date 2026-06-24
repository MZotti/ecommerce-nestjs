import type Notification from 'interfaces/notification'
import { NotificationActionType } from './types'
import type { Action } from './actions'

const initialState: Notification[] = []

const reducer = (state: Notification[] = initialState, action: Action) => {
    switch (action.type) {
        case NotificationActionType.GET_NOTIFICATIONS:
            return action.payload
        case NotificationActionType.CREATE_NOTIFICATION:
            return [action.payload, ...state]
        case NotificationActionType.READ_NOTIFICATION:
            return state.map(notification => {
                if (notification.id === action.payload) {
                    notification.read_at = new Date()
                }
                return notification
            })
        default:
            return state
    }
}

export default reducer
