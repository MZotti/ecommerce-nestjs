import { type Dispatch } from 'redux'
import type Customer from 'interfaces/customer'
import type { Action } from './actions'
import { CustomerActionType } from './types'

export const paginateCustomersAction = (customers: Customer[]) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: CustomerActionType.PAGINATE_CUSTOMERS,
            payload: customers,
        })
    }
}

export const createCustomerAction = (customer: Customer) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: CustomerActionType.CREATE_CUSTOMER,
            payload: customer,
        })
    }
}

export const updateCustomerAction = (customer: Customer) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: CustomerActionType.UPDATE_CUSTOMER,
            payload: customer,
        })
    }
}