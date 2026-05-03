import type Product from 'interfaces/product'
import { ProductActionType } from 'state/action-types/productTypes'

interface PaginateProductsAction {
    type: ProductActionType.PAGINATE_PRODUCTS
    payload: Product[]
}

interface CreateProductAction {
    type: ProductActionType.CREATE_PRODUCT,
    payload: Product
}

interface UpdateProductAction {
    type: ProductActionType.UPDATE_PRODUCT,
    payload: Product
}

interface UpdateStockAction {
    type: ProductActionType.UPDATE_STOCK,
    payload: { id: number, newStock: number }
}

interface DeleteProductAction {
    type: ProductActionType.DELETE_PRODUCT,
    payload: number
}

export type Action = PaginateProductsAction | CreateProductAction | UpdateProductAction | UpdateStockAction | DeleteProductAction
