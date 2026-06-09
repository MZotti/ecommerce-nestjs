import { BACKOFFICE_URL } from '@/enums/urls';
import AXIOS from '@/services/api'

const getOrders = async (page = 1, perPage = 10, search = "", filters = "") => {
    try {
        const { data } = await AXIOS.get(`${BACKOFFICE_URL}/orders?page=${page}&perPage=${perPage}&search=${search}`)

        return data;
    } catch (error) {

    }
}

const getOrder = async (id: number) => {
    try {
        const { data } = await AXIOS.get(`${BACKOFFICE_URL}/orders/${id}`)

        return data;
    } catch (error) {

    }
}

const postOrder = async (payload: any) => {
    try {
        const { data } = await AXIOS.post(`${BACKOFFICE_URL}/orders`, payload)

        return data;
    } catch (error) {

    }
}

const putOrder = async (id: number, payload: any) => {
    try {
        const { data } = await AXIOS.put(`${BACKOFFICE_URL}/orders/${id}`, payload)

        return data;
    } catch (error) {

    }
}

const deleteOrder = async (id: number) => {
    try {
        const { data } = await AXIOS.delete(`${BACKOFFICE_URL}/orders/${id}`)

        return data;
    } catch (error) {

    }
}

const getCustomerOrders = async (userId: number, page = 1, perPage = 10) => {
    try {
        const { data } = await AXIOS.get(`${BACKOFFICE_URL}/orders/customer/${userId}?page=${page}&perPage=${perPage}`)

        return data;
    } catch (error) {

    }
}

export {
    getOrders,
    getOrder,
    postOrder,
    putOrder,
    deleteOrder,
    getCustomerOrders
}