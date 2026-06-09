import type Product from 'interfaces/product'
import { ProductActionType } from 'state/action-types/productTypes'
import { type Action } from 'state/actions/productActions'

const initialState: Product[] = []

const reducer = (state: Product[] = initialState, action: Action) => {
    switch (action.type) {
        case ProductActionType.PAGINATE_PRODUCTS:
            return action.payload
        case ProductActionType.CREATE_PRODUCT:
            return [action.payload, ...state]
        case ProductActionType.UPDATE_PRODUCT:
            console.log(action.payload);
            return state.map(product => {
                if (product.id === action.payload.id) {
                    product = action.payload
                }
                return product;
            })
        case ProductActionType.UPDATE_STOCK:
            return state.map(product => {
                if (product.id === action.payload.id) {
                    product.stock = action.payload.newStock
                }
                return product;
            })
        case ProductActionType.DELETE_PRODUCT:
            return state.filter(product => product.id !== action.payload)
        default:
            return state
    }
}

export default reducer
