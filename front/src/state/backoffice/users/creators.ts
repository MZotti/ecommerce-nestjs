import { type Dispatch } from 'redux'
import type User from 'interfaces/user'
import type { Action } from './actions'
import { UserActionType } from './types'

export const paginateUsersAction = (users: User[]) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: UserActionType.PAGINATE_USERS,
            payload: users,
        })
    }
}

export const createUserAction = (user: User) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: UserActionType.CREATE_USER,
            payload: user,
        })
    }
}

export const updateUserAction = (user: User) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: UserActionType.UPDATE_USER,
            payload: user,
        })
    }
}

export const inactiveUserAction = (id: number) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: UserActionType.INACTIVE_USER,
            payload: id,
        })
    }
}

export const deleteUserAction = (id: number) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: UserActionType.DELETE_USER,
            payload: id,
        })
    }
}
