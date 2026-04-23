import { BACKOFFICE_URL } from '@/enums/urls';
import AXIOS from '@/services/api'

const getUsers = async (currentPage = 1, perPage = 30, search = "", filters = "") => {
    try {
        const { data } = await AXIOS.get(`${BACKOFFICE_URL}/users`)

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

export {
    getUsers,
    postUser
}