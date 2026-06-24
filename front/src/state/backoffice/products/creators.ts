import { type Dispatch } from 'redux'
import type Product from 'interfaces/product'
import type { Action } from './actions'
import { ProductActionType } from './types'

export const paginateProductsAction = (products: Product[]) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ProductActionType.PAGINATE_PRODUCTS,
            payload: products,
        })
    }
}

export const createProductAction = (product: Product) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ProductActionType.CREATE_PRODUCT,
            payload: product,
        })
    }
}

export const updateProductAction = (product: Product) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ProductActionType.UPDATE_PRODUCT,
            payload: product,
        })
    }
}

export const updateStockAction = ({ id, newStock }: { id: number, newStock: number }) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ProductActionType.UPDATE_STOCK,
            payload: { id, newStock },
        })
    }
}

export const deleteProductAction = (id: number) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ProductActionType.DELETE_PRODUCT,
            payload: id,
        })
    }
}
