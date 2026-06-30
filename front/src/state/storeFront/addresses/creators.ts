import { type Dispatch } from 'redux'
import type { Action } from './actions'
import { AddressesActionTypes } from './types'
import type Address from '@/interfaces/address'

export const getAddressesAction = (addresses: Address[]) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: AddressesActionTypes.GET_ADDRESSES,
            payload: addresses,
        })
    }
}

export const createAddressAction = (address: Address) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: AddressesActionTypes.CREATE_ADDRESS,
            payload: address,
        })
    }
}

export const updateAddressAction = (address: Address) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: AddressesActionTypes.UPDATE_ADDRESS,
            payload: address,
        })
    }
}

export const setDefaultAddressAction = (addressId: number) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: AddressesActionTypes.SET_DEFAULT_ADDRESS,
            payload: addressId,
        })
    }
}

export const deleteAddressAction = (addressId: number) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: AddressesActionTypes.DELETE_ADDRESS,
            payload: addressId,
        })
    }
}