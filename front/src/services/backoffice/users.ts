import { BACKOFFICE_URL } from '@/enums/urls';
import AXIOS from '@/services/api'

const getUsers = async (page = 1, perPage = 10, search = "", filters = "") => {
    const { data } = await AXIOS.get(`${BACKOFFICE_URL}/users?page=${page}&perPage=${perPage}&search=${search}&${filters}`)

    return data;
}

const getUser = async (id: number) => {
    const { data } = await AXIOS.get(`${BACKOFFICE_URL}/users/${id}`)

    return data;
}

const postUser = async (payload: any) => {
    const { data } = await AXIOS.post(`${BACKOFFICE_URL}/users`, payload)

    return data;
}

const putUser = async (id: number, payload: any) => {
    const { data } = await AXIOS.put(`${BACKOFFICE_URL}/users/${id}`, payload)

    return data;
}

const activeUser = async (id: number) => {
    const { data } = await AXIOS.patch(`${BACKOFFICE_URL}/users/active/${id}`)

    return data;
}

const inaciveUser = async (id: number) => {
    const { data } = await AXIOS.patch(`${BACKOFFICE_URL}/users/inactive/${id}`)

    return data;
}

const deleteUser = async (id: number) => {
    const { data } = await AXIOS.delete(`${BACKOFFICE_URL}/users/${id}`)

    return data;
}

export {
    getUsers,
    getUser,
    postUser,
    putUser,
    activeUser,
    inaciveUser,
    deleteUser
}