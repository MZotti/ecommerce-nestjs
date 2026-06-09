import { type Dispatch } from 'redux'
import { type Action } from '../actions/authActions'
import type User from 'interfaces/user'
import { AuthActionType } from 'state/action-types/authTypes'
import type Auth from '@/interfaces/auth'
import type Address from '@/interfaces/address'

export const loginAction = (auth: Auth) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: AuthActionType.LOGIN,
            payload: auth,
        })
    }
}

export const updateMeAction = (user: User) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: AuthActionType.UPDATE_ME,
            payload: user,
        })
    }
}

export const createAddressAction = (address: Address) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: AuthActionType.CREATE_ADDRESS,
            payload: address,
        })
    }
}
