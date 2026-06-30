import type Order from '@/interfaces/order'
import type { OrdersActionTypes } from './types'

interface GetOrdersAction {
    type: OrdersActionTypes.GET_ORDERS
    payload: Order[]
}

interface CreateOrderAction {
    type: OrdersActionTypes.CREATE_ORDER
    payload: Order
}

export type Action = GetOrdersAction | CreateOrderAction
