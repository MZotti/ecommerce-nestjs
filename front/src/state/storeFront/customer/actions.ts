import type Address from '@/interfaces/address'
import type PaymentCard from '@/interfaces/paymentCard'
import type { CustomerActionTypes } from './types'

interface GetAddressesAction {
    type: CustomerActionTypes.GET_ADDRESSES
    payload: Address[]
}

interface CreateAddressAction {
    type: CustomerActionTypes.CREATE_ADDRESS
    payload: Address
}

interface UpdateAddressAction {
    type: CustomerActionTypes.UPDATE_ADDRESS
    payload: Address
}

interface SetDefaultAddressAction {
    type: CustomerActionTypes.SET_DEFAULT_ADDRESS
    payload: number
}

interface DeleteAddressAction {
    type: CustomerActionTypes.DELETE_ADDRESS
    payload: number
}

interface GetPaymentCardsAction {
    type: CustomerActionTypes.GET_PAYMENT_CARDS
    payload: PaymentCard[]
}

interface CreatePaymentCardAction {
    type: CustomerActionTypes.CREATE_PAYMENT_CARD
    payload: PaymentCard
}

export type Action = GetAddressesAction | CreateAddressAction | UpdateAddressAction | SetDefaultAddressAction | DeleteAddressAction | GetPaymentCardsAction | CreatePaymentCardAction
