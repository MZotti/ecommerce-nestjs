import { type Dispatch } from 'redux'
import { CartActionType } from '../action-types/cartTypes'
import { type Action } from '../actions/cartActions'
import type { OrderItem } from 'interfaces/order'

export const addToCartAction = (orderItem: OrderItem) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: CartActionType.ADD_TO_CART,
            payload: orderItem,
        })
    }
}

export const removeFromCartAction = (productId: number) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: CartActionType.REMOVE_FROM_CART,
            payload: productId,
        })
    }
}

export const increaseProductAction = (productId: number) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: CartActionType.INCREASE_PRODUCT,
            payload: productId,
        })
    }
}

export const decreaseProductAction = (productId: number) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: CartActionType.DECREASE_PRODUCT,
            payload: productId,
        })
    }
}

export const clearCartAction = () => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: CartActionType.CLEAR_CART,
            payload: null,
        })
    }
}