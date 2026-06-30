import { type Dispatch } from 'redux'
import type { Action } from './actions'
import { OrdersActionTypes } from './types'
import type Order from '@/interfaces/order'

export const getOrdersAction = (orders: Order[]) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: OrdersActionTypes.GET_ORDERS,
            payload: orders,
        })
    }
}

export const createOrderAction = (order: Order) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: OrdersActionTypes.CREATE_ORDER,
            payload: order,
        })
    }
}