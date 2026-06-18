import { BACKOFFICE_URL } from '@/enums/urls';
import AXIOS from '@/services/api'

const getCustomers = async (page = 1, perPage = 10, search = "", filters = "") => {
    const { data } = await AXIOS.get(`${BACKOFFICE_URL}/customers?page=${page}&perPage=${perPage}&search=${search}`)

    return data;
}

const getCustomer = async (id: number) => {
    const { data } = await AXIOS.get(`${BACKOFFICE_URL}/customers/${id}`)

    return data;
}

const postCustomer = async (payload: any) => {
    const { data } = await AXIOS.post(`${BACKOFFICE_URL}/customers`, payload)

    return data;
}

const putCustomer = async (id: number, payload: any) => {
    const { data } = await AXIOS.put(`${BACKOFFICE_URL}/customers/${id}`, payload)

    return data;
}

export {
    getCustomers,
    getCustomer,
    postCustomer,
    putCustomer
}