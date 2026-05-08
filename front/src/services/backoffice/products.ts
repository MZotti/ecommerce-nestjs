import { BACKOFFICE_URL } from '@/enums/urls';
import AXIOS from '@/services/api'

const getProducts = async (page = 1, perPage = 10, search = "", filters = "") => {
    try {
        const { data } = await AXIOS.get(`${BACKOFFICE_URL}/products?page=${page}&perPage=${perPage}&search=${search}`)

        return data;
    } catch (error) {

    }
}

const getProductsByName = async (search = "") => {
    try {
        const { data } = await AXIOS.get(`${BACKOFFICE_URL}/products/search?search=${search}`)

        return data;
    } catch (error) {

    }
}

const getProduct = async (id: number) => {
    try {
        const { data } = await AXIOS.get(`${BACKOFFICE_URL}/products/${id}`)

        return data;
    } catch (error) {

    }
}

const postProduct = async (payload: any) => {
    try {
        const { data } = await AXIOS.post(`${BACKOFFICE_URL}/products`, payload)

        return data;
    } catch (error) {

    }
}

const putProduct = async (id: number, payload: any) => {
    try {
        const { data } = await AXIOS.put(`${BACKOFFICE_URL}/products/${id}`, payload)

        return data;
    } catch (error) {

    }
}

const deleteProduct = async (id: number) => {
    try {
        const { data } = await AXIOS.delete(`${BACKOFFICE_URL}/products/${id}`)

        return data;
    } catch (error) {

    }
}

export {
    getProducts,
    getProductsByName,
    getProduct,
    postProduct,
    putProduct,
    deleteProduct
}