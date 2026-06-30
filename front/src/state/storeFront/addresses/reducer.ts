import type { Action } from './actions'
import { AddressesActionTypes } from './types'
import type Address from '@/interfaces/address'

const initialState: Address[] = []

const reducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case AddressesActionTypes.GET_ADDRESSES:
            return action.payload
        case AddressesActionTypes.CREATE_ADDRESS:
            return [action.payload, ...state]
        case AddressesActionTypes.UPDATE_ADDRESS:
            return state.map(address => {
                if (address.id === action.payload.id) {
                    return action.payload
                }

                return address
            })
        case AddressesActionTypes.SET_DEFAULT_ADDRESS:
            return state.map(address => {
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
        case AddressesActionTypes.DELETE_ADDRESS:
            return state.filter(address => address.id !== action.payload)
        default:
            return state
    }
}

export default reducer
