import { BACKOFFICE_URL } from '@/enums/urls';
import AXIOS from '@/services/api'

const getCategories = async () => {
    const { data } = await AXIOS.get(`${BACKOFFICE_URL}/categories`)

    return data;
}

export {
    getCategories,
}