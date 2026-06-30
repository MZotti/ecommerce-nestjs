import type { Action } from './actions'
import { OrdersActionTypes } from './types'
import type Order from '@/interfaces/order'

const initialState: Order[] = []

const reducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case OrdersActionTypes.GET_ORDERS:
            return action.payload
        case OrdersActionTypes.CREATE_ORDER:
            return [action.payload, ...state]
        default:
            return state
    }
}

export default reducer
