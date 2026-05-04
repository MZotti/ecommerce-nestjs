import { type Dispatch } from 'redux'
import { OrderActionType } from '../action-types/orderTypes'
import { type Action } from '../actions/orderActions'
import type Order from 'interfaces/order'

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
