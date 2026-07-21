import type Order from 'interfaces/order'
import type { Action } from './actions'
import { OrderActionType } from './types'
import { OrderStatus } from '@/enums/order'

const initialState: Order[] = []

const reducer = (state: Order[] = initialState, action: Action) => {
    switch (action.type) {
        case OrderActionType.PAGINATE_ORDERS:
            return action.payload
        case OrderActionType.CREATE_ORDER:
            return [action.payload, ...state]
        case OrderActionType.SHIP_ORDER:
            return state.map(order => {
                if (order.id === action.payload.id) {
                    return {
                        ...order,
                        status: OrderStatus.SHIPPED
                    }
                }
                return order
            })
        case OrderActionType.CANCEL_ORDER:
            return state.map(order => {
                if (order.id === action.payload.id) {
                    return {
                        ...order,
                        status: OrderStatus.CANCELED
                    }
                }
                return order
            })
        default:
            return state
    }
}

export default reducer
