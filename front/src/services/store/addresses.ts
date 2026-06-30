import { STORE_URL } from '@/enums/urls';
import AXIOS from '@/services/api'

const getAddresses = async () => {
    const { data } = await AXIOS.get(`${STORE_URL}/addresses`)

    return data;
}

const postAddress = async (payload: any) => {
    const { data } = await AXIOS.post(`${STORE_URL}/addresses/`, payload)

    return data;
}

const putAddress = async (id: number, payload: any) => {
    const { data } = await AXIOS.put(`${STORE_URL}/addresses/${id}`, payload)

    return data;
}

const setDefaultAddress = async (addressId: number) => {
    const { data } = await AXIOS.patch(`${STORE_URL}/addresses/default/${addressId}`)

    return data;
}

const deleteAddress = async (addressId: number) => {
    const { data } = await AXIOS.delete(`${STORE_URL}/addresses/${addressId}`)

    return data;
}

export {
    getAddresses,
    postAddress,
    putAddress,
    setDefaultAddress,
    deleteAddress
}