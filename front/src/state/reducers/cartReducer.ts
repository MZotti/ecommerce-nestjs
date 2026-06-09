
import type { OrderItem } from '@/interfaces/order'
import { CartActionType } from 'state/action-types/cartTypes'
import { type Action } from 'state/actions/cartActions'

const initialState: OrderItem[] = []

const reducer = (state: OrderItem[] = initialState, action: Action) => {
    switch (action.type) {
        case CartActionType.ADD_TO_CART:
            return [...state, action.payload]
        case CartActionType.REMOVE_FROM_CART:
            return state.filter(product => product.productId !== action.payload)
        case CartActionType.INCREASE_PRODUCT:
            return state.map(product => {
                if (product.productId === action.payload) {
                    product.quantity += 1;
                }

                return product
            })
        case CartActionType.DECREASE_PRODUCT:
            return state.map(product => {
                if (product.productId === action.payload) {
                    product.quantity -= 1;
                }

                return product
            })
        case CartActionType.CLEAR_CART:
            return []
        default:
            return state
    }
}

export default reducer
