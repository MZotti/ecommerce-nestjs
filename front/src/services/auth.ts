import AXIOS from '@/services/api'

const login = async (login: any) => {
    try {
        const { data } = await AXIOS.post(`/auth/login`, login)

        return data;
    } catch (error) {

    }
}

const me = async () => {
    const { data } = await AXIOS.get(`/auth/me`)

    return data;
}

export {
    login,
    me
}