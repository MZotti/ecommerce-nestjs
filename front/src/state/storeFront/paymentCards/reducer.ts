import type { Action } from './actions'
import { CustomerActionTypes } from './types'
import type PaymentCard from '@/interfaces/paymentCard'

const initialState: PaymentCard[] = []

const reducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case CustomerActionTypes.GET_PAYMENT_CARDS:
            return action.payload
        case CustomerActionTypes.CREATE_PAYMENT_CARD:
            return [action.payload, ...state]
        default:
            return state
    }
}

export default reducer
