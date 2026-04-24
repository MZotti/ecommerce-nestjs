import { type Dispatch } from 'redux'
import { UserActionType } from '../action-types/userTypes'
import { type Action } from '../actions/userActions'
import type User from 'interfaces/user'

export const paginateUsers = (users: User[]) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: UserActionType.PAGINATE_USERS,
            payload: users,
        })
    }
}

export const createUser = (user: User) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: UserActionType.CREATE_USER,
            payload: user,
        })
    }
}

export const updateUser = (user: User) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: UserActionType.UPDATE_USER,
            payload: user,
        })
    }
}
