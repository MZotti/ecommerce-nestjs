import type Order from 'interfaces/order'
import type { OrderActionType } from './types'
import type { OrderStatus } from '@/enums/order'

interface PaginateOrdersAction {
    type: OrderActionType.PAGINATE_ORDERS
    payload: Order[]
}

interface CreateOrderAction {
    type: OrderActionType.CREATE_ORDER,
    payload: Order
}

interface ShipOrderAction {
    type: OrderActionType.SHIP_ORDER,
    payload: { id: number, status: OrderStatus.SHIPPED }
}

interface CancelOrderAction {
    type: OrderActionType.CANCEL_ORDER,
    payload: { id: number, status: OrderStatus.CANCELED }
}

export type Action = PaginateOrdersAction | CreateOrderAction | ShipOrderAction | CancelOrderAction
