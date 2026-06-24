import type User from 'interfaces/user'
import type { UserActionType } from './types'

interface PaginateUsersAction {
    type: UserActionType.PAGINATE_USERS
    payload: User[]
}

interface CreateUserAction {
    type: UserActionType.CREATE_USER,
    payload: User
}

interface UpdateUserAction {
    type: UserActionType.UPDATE_USER,
    payload: User
}

interface InactiveUserAction {
    type: UserActionType.INACTIVE_USER,
    payload: number
}

interface DeleteUserAction {
    type: UserActionType.DELETE_USER,
    payload: number
}

export type Action = PaginateUsersAction | CreateUserAction | UpdateUserAction | InactiveUserAction | DeleteUserAction
