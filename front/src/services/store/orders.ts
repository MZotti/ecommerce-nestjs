import { STORE_URL } from '@/enums/urls';
import AXIOS from '@/services/api'

const postOrder = async (payload: any) => {
    try {
        const { data } = await AXIOS.post(`${STORE_URL}/orders`, payload)

        return data;
    } catch (error) {

    }
}

const getOrders = async () => {
    try {
        const { data } = await AXIOS.get(`${STORE_URL}/orders`)

        return data;
    } catch (error) {

    }
}

const getOrder = async (id: number) => {
    try {
        const { data } = await AXIOS.get(`${STORE_URL}/orders/${id}`)

        return data;
    } catch (error) {

    }
}

export {
    postOrder,
    getOrders,
    getOrder
}