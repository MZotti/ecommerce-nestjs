
import type { OrderItem } from '@/interfaces/order'
import type { Action } from './actions'
import { CartActionType } from './types'

const savedCart = localStorage.getItem('cart');

const preloadedState = savedCart ? JSON.parse(savedCart) : [];

const initialState: OrderItem[] = preloadedState;

const reducer = (state: OrderItem[] = initialState, action: Action) => {
    switch (action.type) {
        case CartActionType.ADD_TO_CART:
            return [...state, action.payload]
        case CartActionType.REMOVE_FROM_CART:
            return state.filter(product => product.productId !== action.payload)
        case CartActionType.INCREASE_PRODUCT:
            return state.map(product => {
                if (product.productId === action.payload.productId) {
                    return {
                        ...product,
                        quantity: product.quantity + action.payload.quantity,
                    };
                }
                return product;
            })
        case CartActionType.DECREASE_PRODUCT:
            return state.map(product => {
                if (product.productId === action.payload.productId) {
                    return {
                        ...product,
                        quantity: product.quantity - action.payload.quantity,
                    };
                }
                return product;
            })
        case CartActionType.CLEAR_CART:
            return []
        default:
            return state
    }
}

export default reducer
