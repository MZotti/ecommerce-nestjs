import { type Dispatch } from 'redux'
import { type Action } from '../actions/authActions'
import type User from 'interfaces/user'
import { AuthActionType } from 'state/action-types/authTypes'

export const updateMe = (user: User) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: AuthActionType.UPDATE_ME,
            payload: user,
        })
    }
}
