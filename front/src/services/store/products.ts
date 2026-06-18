import { STORE_URL } from '@/enums/urls';
import AXIOS from '@/services/api'

const getProducts = async (page = 1, perPage = 10, search = "", filters = "") => {
    const { data } = await AXIOS.get(`${STORE_URL}/products?page=${page}&perPage=${perPage}&search=${search}&filters=${filters}`)

    return data;
}

const getProduct = async (slug: string) => {
    const { data } = await AXIOS.get(`${STORE_URL}/products/${slug}`)

    return data;
}

export {
    getProducts,
    getProduct
}