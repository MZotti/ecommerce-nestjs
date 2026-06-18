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

export {
    getAddresses,
    postAddress
}