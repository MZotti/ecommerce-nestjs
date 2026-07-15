import { BACKOFFICE_URL } from '@/enums/urls';
import AXIOS from '@/services/api'

const getProductsAnalytics = async (filters?: string) => {
    const { data } = await AXIOS.get(`${BACKOFFICE_URL}/analytics/products?${filters}`)

    return data;
}

const getOrdersAnalytics = async (filters?: string) => {
    const { data } = await AXIOS.get(`${BACKOFFICE_URL}/analytics/orders?${filters}`)

    return data;
}

export {
    getProductsAnalytics,
    getOrdersAnalytics
}