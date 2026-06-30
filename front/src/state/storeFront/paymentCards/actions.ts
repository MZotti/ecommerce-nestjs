import type PaymentCard from '@/interfaces/paymentCard'
import type { CustomerActionTypes } from './types'

interface GetPaymentCardsAction {
    type: CustomerActionTypes.GET_PAYMENT_CARDS
    payload: PaymentCard[]
}

interface CreatePaymentCardAction {
    type: CustomerActionTypes.CREATE_PAYMENT_CARD
    payload: PaymentCard
}

export type Action = GetPaymentCardsAction | CreatePaymentCardAction
