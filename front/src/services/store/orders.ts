import { STORE_URL } from '@/enums/urls';
import AXIOS from '@/services/api'

const postOrder = async (payload: any) => {
    const { data } = await AXIOS.post(`${STORE_URL}/orders`, payload)

    return data;
}

const getOrders = async () => {
    const { data } = await AXIOS.get(`${STORE_URL}/orders`)

    return data;
}

const getOrder = async (id: number) => {
    const { data } = await AXIOS.get(`${STORE_URL}/orders/${id}`)

    return data;
}

export {
    postOrder,
    getOrders,
    getOrder
}