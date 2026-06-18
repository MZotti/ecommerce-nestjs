import { STORE_URL } from '@/enums/urls';
import AXIOS from '@/services/api'

const getPaymentCards = async () => {
    const { data } = await AXIOS.get(`${STORE_URL}/payment-cards`)

    return data;
}

const postPaymentCard = async (payload: any) => {
    const { data } = await AXIOS.post(`${STORE_URL}/payment-cards/`, payload)

    return data;
}

const deletePaymentCards = async (id: number) => {
    const { data } = await AXIOS.post(`${STORE_URL}/payment-cards/${id}`)

    return data;
}

export {
    getPaymentCards,
    postPaymentCard,
    deletePaymentCards
}