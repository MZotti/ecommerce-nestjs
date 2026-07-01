import type PaymentCard from '@/interfaces/paymentCard'
import type { PaymentCardActionTypes } from './types'

interface GetPaymentCardsAction {
    type: PaymentCardActionTypes.GET_PAYMENT_CARDS
    payload: PaymentCard[]
}

interface CreatePaymentCardAction {
    type: PaymentCardActionTypes.CREATE_PAYMENT_CARD
    payload: PaymentCard
}

interface DeletePaymentCardAction {
    type: PaymentCardActionTypes.DELETE_PAYMENT_CARD
    payload: number
}

export type Action = GetPaymentCardsAction | CreatePaymentCardAction | DeletePaymentCardAction
