import { type Dispatch } from 'redux'
import type { Action } from './actions'
import { CustomerActionTypes } from './types'
import type PaymentCard from '@/interfaces/paymentCard'

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