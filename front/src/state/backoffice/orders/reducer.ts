import type Order from 'interfaces/order'
import type { Action } from './actions'
import { OrderActionType } from './types'

const initialState: Order[] = []

const reducer = (state: Order[] = initialState, action: Action) => {
    switch (action.type) {
        case OrderActionType.PAGINATE_ORDERS:
            return action.payload
        case OrderActionType.CREATE_ORDER:
            return [action.payload, ...state]
        default:
            return state
    }
}

export default reducer
