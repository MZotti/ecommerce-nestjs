import { BACKOFFICE_URL } from '@/enums/urls';
import AXIOS from '@/services/api'

const getProducts = async (page = 1, perPage = 10, search = "", filters = "") => {
    const { data } = await AXIOS.get(`${BACKOFFICE_URL}/products?page=${page}&perPage=${perPage}&search=${search}`)

    return data;
}

const getProductsByName = async (search = "") => {
    const { data } = await AXIOS.get(`${BACKOFFICE_URL}/products/search?search=${search}`)

    return data;
}

const getProduct = async (id: number) => {
    const { data } = await AXIOS.get(`${BACKOFFICE_URL}/products/${id}`)

    return data;
}

const postProduct = async (payload: any) => {
    const { data } = await AXIOS.post(`${BACKOFFICE_URL}/products`, payload)

    return data;
}

const putProduct = async (id: number, payload: any) => {
    const { data } = await AXIOS.put(`${BACKOFFICE_URL}/products/${id}`, payload)

    return data;
}

const increaseProductStock = async (id: number, payload: any) => {
    const { data } = await AXIOS.patch(`${BACKOFFICE_URL}/products/${id}/increase-stock`, payload)

    return data;
}

const deleteProduct = async (id: number) => {
    const { data } = await AXIOS.delete(`${BACKOFFICE_URL}/products/${id}`)

    return data;
}

export {
    getProducts,
    getProductsByName,
    getProduct,
    postProduct,
    putProduct,
    increaseProductStock,
    deleteProduct
}