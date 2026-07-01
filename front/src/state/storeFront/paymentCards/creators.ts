import { type Dispatch } from 'redux'
import type { Action } from './actions'
import { PaymentCardActionTypes } from './types'
import type PaymentCard from '@/interfaces/paymentCard'

export const getPaymentCardsAction = (paymentCards: PaymentCard[]) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: PaymentCardActionTypes.GET_PAYMENT_CARDS,
            payload: paymentCards,
        })
    }
}

export const createPaymentCardAction = (paymentCard: PaymentCard) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: PaymentCardActionTypes.CREATE_PAYMENT_CARD,
            payload: paymentCard,
        })
    }
}

export const deletePaymentCardAction = (paymentCardId: number) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: PaymentCardActionTypes.DELETE_PAYMENT_CARD,
            payload: paymentCardId,
        })
    }
}