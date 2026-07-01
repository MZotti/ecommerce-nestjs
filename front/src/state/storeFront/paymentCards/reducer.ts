import type { Action } from './actions'
import { PaymentCardActionTypes } from './types'
import type PaymentCard from '@/interfaces/paymentCard'

const initialState: PaymentCard[] = []

const reducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case PaymentCardActionTypes.GET_PAYMENT_CARDS:
            return action.payload
        case PaymentCardActionTypes.CREATE_PAYMENT_CARD:
            return [action.payload, ...state]
        case PaymentCardActionTypes.DELETE_PAYMENT_CARD:
            return state.filter(card => card.id !== action.payload)
        default:
            return state
    }
}

export default reducer
