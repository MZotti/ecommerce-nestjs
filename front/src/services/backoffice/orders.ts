import { BACKOFFICE_URL } from '@/enums/urls';
import AXIOS from '@/services/api'

const getOrders = async (page = 1, perPage = 10, filters = "") => {
    const { data } = await AXIOS.get(`${BACKOFFICE_URL}/orders?page=${page}&perPage=${perPage}&${filters}`)

    return data;
}

const getOrder = async (id: number) => {
    const { data } = await AXIOS.get(`${BACKOFFICE_URL}/orders/${id}`)

    return data;
}

const postOrder = async (payload: any) => {
    const { data } = await AXIOS.post(`${BACKOFFICE_URL}/orders`, payload)

    return data;
}

const putOrder = async (id: number, payload: any) => {
    const { data } = await AXIOS.put(`${BACKOFFICE_URL}/orders/${id}`, payload)

    return data;
}

const deleteOrder = async (id: number) => {
    const { data } = await AXIOS.delete(`${BACKOFFICE_URL}/orders/${id}`)

    return data;
}

const getCustomerOrders = async (userId: number, page = 1, perPage = 10) => {
    const { data } = await AXIOS.get(`${BACKOFFICE_URL}/orders/customer/${userId}?page=${page}&perPage=${perPage}`)

    return data;
}

export {
    getOrders,
    getOrder,
    postOrder,
    putOrder,
    deleteOrder,
    getCustomerOrders
}