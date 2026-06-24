import { type Action, type Dispatch } from 'redux'
import type Order from 'interfaces/order'
import { OrderActionType } from './types'

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
