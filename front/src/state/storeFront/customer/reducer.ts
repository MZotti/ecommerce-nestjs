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
        case CustomerActionTypes.UPDATE_ADDRESS:
            return {
                ...state,
                addresses: state.addresses.map(address => {
                    if (address.id === action.payload.id) {
                        return action.payload
                    }

                    return address
                })
            }
        case CustomerActionTypes.SET_DEFAULT_ADDRESS:
            return {
                ...state,
                addresses: state.addresses.map(address => {
                    if (address.id === action.payload) {
                        return {
                            ...address,
                            isDefault: true
                        }
                    }

                    return {
                        ...address,
                        isDefault: false
                    }
                })
            }
        case CustomerActionTypes.DELETE_ADDRESS:
            return {
                ...state,
                addresses: state.addresses.filter(address => address.id !== action.payload)
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
