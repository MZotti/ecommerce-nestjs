import type Address from '@/interfaces/address'
import type { AddressesActionTypes } from './types'

interface GetAddressesAction {
    type: AddressesActionTypes.GET_ADDRESSES
    payload: Address[]
}

interface CreateAddressAction {
    type: AddressesActionTypes.CREATE_ADDRESS
    payload: Address
}

interface UpdateAddressAction {
    type: AddressesActionTypes.UPDATE_ADDRESS
    payload: Address
}

interface SetDefaultAddressAction {
    type: AddressesActionTypes.SET_DEFAULT_ADDRESS
    payload: number
}

interface DeleteAddressAction {
    type: AddressesActionTypes.DELETE_ADDRESS
    payload: number
}

export type Action = GetAddressesAction | CreateAddressAction | UpdateAddressAction | SetDefaultAddressAction | DeleteAddressAction
