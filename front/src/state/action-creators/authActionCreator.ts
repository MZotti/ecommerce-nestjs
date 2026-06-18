import { type Dispatch } from 'redux'
import { type Action } from '../actions/authActions'
import type User from 'interfaces/user'
import { AuthActionType } from 'state/action-types/authTypes'
import type Auth from '@/interfaces/auth'
import type Address from '@/interfaces/address'
import type PaymentCard from '@/interfaces/paymentCard'

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

export const createPaymentCardAction = (card: PaymentCard) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: AuthActionType.CREATE_PAYMENT_CARD,
            payload: card,
        })
    }
}