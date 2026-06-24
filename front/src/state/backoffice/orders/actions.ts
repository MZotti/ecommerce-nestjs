import type Order from 'interfaces/order'
import type { OrderActionType } from './types'

interface PaginateOrdersAction {
    type: OrderActionType.PAGINATE_ORDERS
    payload: Order[]
}

interface CreateOrderAction {
    type: OrderActionType.CREATE_ORDER,
    payload: Order
}

export type Action = PaginateOrdersAction | CreateOrderAction
