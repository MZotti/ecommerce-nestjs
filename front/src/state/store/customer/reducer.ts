import type { Action } from './actions'
import { CustomerActionTypes } from './types'
import type Address from '@/interfaces/address'
import type PaymentCard from '@/interfaces/paymentCard'

const initialState: { addresses: Address[], paymentCards: PaymentCard[] } = {
    addresses: [],
    paymentCards: []
}

const reducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case CustomerActionTypes.GET_ADDRESSES:
            return {
                ...state,
                addresses: action.payload
            }
        case CustomerActionTypes.CREATE_ADDRESS:
            return {
                ...state,
                addresses: [...state.addresses, action.payload]
            }
        case CustomerActionTypes.GET_PAYMENT_CARDS:
            return {
                ...state,
                paymentCards: action.payload
            }
        case CustomerActionTypes.CREATE_PAYMENT_CARD:
            return {
                ...state,
                paymentCards: [...state.paymentCards, action.payload]
            }
        default:
            return state
    }
}

export default reducer
