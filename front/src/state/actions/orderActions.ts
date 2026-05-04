import type Order from 'interfaces/order'
import { OrderActionType } from 'state/action-types/orderTypes'

interface PaginateOrdersAction {
    type: OrderActionType.PAGINATE_ORDERS
    payload: Order[]
}

interface CreateOrderAction {
    type: OrderActionType.CREATE_ORDER,
    payload: Order
}

export type Action = PaginateOrdersAction | CreateOrderAction
