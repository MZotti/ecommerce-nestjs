import type User from 'interfaces/user'
import { UserActionType } from 'state/action-types/userTypes'

interface PaginateUsersAction {
    type: UserActionType.PAGINATE_USERS
    payload: User[]
}

interface CreateUserAction {
    type: UserActionType.CREATE_USER,
    payload: User
}

export type Action = PaginateUsersAction | CreateUserAction
