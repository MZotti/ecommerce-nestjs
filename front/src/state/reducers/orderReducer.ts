import type Order from 'interfaces/order'
import { OrderActionType } from 'state/action-types/orderTypes'
import { type Action } from 'state/actions/orderActions'

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
