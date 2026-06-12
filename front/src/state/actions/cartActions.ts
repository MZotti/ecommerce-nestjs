import type { OrderItem } from '@/interfaces/order'
import { CartActionType } from 'state/action-types/cartTypes'

interface AddToCartAction {
    type: CartActionType.ADD_TO_CART
    payload: OrderItem
}

interface RemoveFromCartAction {
    type: CartActionType.REMOVE_FROM_CART
    payload: number
}

interface IncreaseProductAction {
    type: CartActionType.INCREASE_PRODUCT
    payload: { productId: number, quantity: number }
}

interface DecreaseProductAction {
    type: CartActionType.DECREASE_PRODUCT
    payload: { productId: number, quantity: number }
}

interface ClearCartAction {
    type: CartActionType.CLEAR_CART
    payload: null
}

export type Action = AddToCartAction | RemoveFromCartAction | IncreaseProductAction | DecreaseProductAction | ClearCartAction
