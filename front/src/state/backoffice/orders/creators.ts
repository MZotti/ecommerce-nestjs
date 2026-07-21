import { type Action, type Dispatch } from 'redux'
import type Order from 'interfaces/order'
import { OrderActionType } from './types'
import type { OrderStatus } from '@/enums/order'

export const paginateOrdersAction = (orders: Order[]) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: OrderActionType.PAGINATE_ORDERS,
            payload: orders,
        })
    }
}

export const createOrderAction = (order: Order) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: OrderActionType.CREATE_ORDER,
            payload: order,
        })
    }
}

export const shipOrderAction = (order: { id: number, status: OrderStatus }) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: OrderActionType.SHIP_ORDER,
            payload: order,
        })
    }
}

export const cancelOrderAction = (order: { id: number, status: OrderStatus }) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: OrderActionType.CANCEL_ORDER,
            payload: order,
        })
    }
}