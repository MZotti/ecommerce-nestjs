import { BACKOFFICE_URL } from '@/enums/urls';
import AXIOS from '@/services/api'

const getCustomers = async (page = 1, perPage = 10, search = "", filters = "") => {
    try {
        const { data } = await AXIOS.get(`${BACKOFFICE_URL}/customers?page=${page}&perPage=${perPage}&search=${search}`)

        return data;
    } catch (error) {

    }
}

const getCustomer = async (id: number) => {
    try {
        const { data } = await AXIOS.get(`${BACKOFFICE_URL}/customers/${id}`)

        return data;
    } catch (error) {

    }
}

const postCustomer = async (payload: any) => {
    try {
        const { data } = await AXIOS.post(`${BACKOFFICE_URL}/customers`, payload)

        return data;
    } catch (error) {

    }
}

const putCustomer = async (id: number, payload: any) => {
    try {
        const { data } = await AXIOS.put(`${BACKOFFICE_URL}/customers/${id}`, payload)

        return data;
    } catch (error) {

    }
}

export {
    getCustomers,
    getCustomer,
    postCustomer,
    putCustomer
}