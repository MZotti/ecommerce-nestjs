import { type Dispatch } from 'redux'
import type { Action } from './actions'
import { CustomerActionTypes } from './types'
import type Address from '@/interfaces/address'
import type PaymentCard from '@/interfaces/paymentCard'

export const getAddressesAction = (addresses: Address[]) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: CustomerActionTypes.GET_ADDRESSES,
            payload: addresses,
        })
    }
}

export const createAddressAction = (address: Address) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: CustomerActionTypes.CREATE_ADDRESS,
            payload: address,
        })
    }
}

export const updateAddressAction = (address: Address) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: CustomerActionTypes.UPDATE_ADDRESS,
            payload: address,
        })
    }
}

export const setDefaultAddressAction = (addressId: number) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: CustomerActionTypes.SET_DEFAULT_ADDRESS,
            payload: addressId,
        })
    }
}

export const deleteAddressAction = (addressId: number) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: CustomerActionTypes.DELETE_ADDRESS,
            payload: addressId,
        })
    }
}

export const getPaymentCardsAction = (paymentCards: PaymentCard[]) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: CustomerActionTypes.GET_PAYMENT_CARDS,
            payload: paymentCards,
        })
    }
}

export const createPaymentCardAction = (paymentCard: PaymentCard) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: CustomerActionTypes.CREATE_PAYMENT_CARD,
            payload: paymentCard,
        })
    }
}