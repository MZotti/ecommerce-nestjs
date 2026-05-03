import { type Dispatch } from 'redux'
import { ProductActionType } from '../action-types/productTypes'
import { type Action } from '../actions/productActions'
import type Product from 'interfaces/product'

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

export const IncreaseStockAction = ({ id, newStock }: { id: number, newStock: number }) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ProductActionType.INCREASE_STOCK,
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
