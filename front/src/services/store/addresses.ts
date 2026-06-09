import { STORE_URL } from '@/enums/urls';
import AXIOS from '@/services/api'

const getAddresses = async () => {
    try {
        const { data } = await AXIOS.get(`${STORE_URL}/addresses`)

        return data;
    } catch (error) {

    }
}

const postAddress = async (payload: any) => {
    try {
        const { data } = await AXIOS.post(`${STORE_URL}/addresses/`, payload)

        return data;
    } catch (error) {

    }
}

export {
    getAddresses,
    postAddress
}