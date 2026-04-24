import { BACKOFFICE_URL } from '@/enums/urls';
import AXIOS from '@/services/api'

const getUsers = async (page = 1, perPage = 10, search = "", filters = "") => {
    try {
        const { data } = await AXIOS.get(`${BACKOFFICE_URL}/users?page=${page}&perPage=${perPage}&search=${search}`)

        return data;
    } catch (error) {

    }
}

const getUser = async (id: number) => {
    try {
        const { data } = await AXIOS.get(`${BACKOFFICE_URL}/users/${id}`)

        return data;
    } catch (error) {

    }
}

const postUser = async (payload: any) => {
    try {
        const { data } = await AXIOS.post(`${BACKOFFICE_URL}/users`, payload)

        return data;
    } catch (error) {

    }
}

const putUser = async (id: number, payload: any) => {
    try {
        const { data } = await AXIOS.put(`${BACKOFFICE_URL}/users/${id}`, payload)

        return data;
    } catch (error) {

    }
}

export {
    getUsers,
    getUser,
    postUser,
    putUser
}