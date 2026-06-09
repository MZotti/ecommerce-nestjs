import type Customer from 'interfaces/customer'
import { CustomerActionType } from 'state/action-types/customerTypes'

interface PaginateCustomersAction {
    type: CustomerActionType.PAGINATE_CUSTOMERS
    payload: Customer[]
}

interface CreateCustomerAction {
    type: CustomerActionType.CREATE_CUSTOMER,
    payload: Customer
}

interface UpdateCustomerAction {
    type: CustomerActionType.UPDATE_CUSTOMER,
    payload: Customer
}

interface DeleteCustomerAction {
    type: CustomerActionType.DELETE_CUSTOMER,
    payload: number
}

export type Action = PaginateCustomersAction | CreateCustomerAction | UpdateCustomerAction | DeleteCustomerAction
