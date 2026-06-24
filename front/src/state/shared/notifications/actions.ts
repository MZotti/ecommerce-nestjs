import type Notification from 'interfaces/notification'
import type { NotificationActionType } from './types'

interface GetNotificationsAction {
    type: NotificationActionType.GET_NOTIFICATIONS
    payload: Notification[]
}

interface CreateNotificationAction {
    type: NotificationActionType.CREATE_NOTIFICATION
    payload: Notification
}

interface ReadNotificationAction {
    type: NotificationActionType.READ_NOTIFICATION
    payload: string
}

export type Action = GetNotificationsAction | CreateNotificationAction | ReadNotificationAction
