import type Customer from 'interfaces/customer'
import { CustomerActionType } from 'state/action-types/customerTypes'
import { type Action } from 'state/actions/customerActions'

const initialState: Customer[] = []

const reducer = (state: Customer[] = initialState, action: Action) => {
    switch (action.type) {
        case CustomerActionType.PAGINATE_CUSTOMERS:
            return action.payload
        case CustomerActionType.CREATE_CUSTOMER:
            return [action.payload, ...state]
        case CustomerActionType.UPDATE_CUSTOMER:
            return state.map(user => {
                if (user.id === action.payload.id) {
                    user = action.payload
                }
                return user;
            })
        case CustomerActionType.DELETE_CUSTOMER:
            return state.filter(user => user.id !== action.payload)
        default:
            return state
    }
}

export default reducer
