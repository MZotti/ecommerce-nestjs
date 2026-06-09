import AXIOS from '@/services/api'

const register = async (register: any) => {
    try {
        const { data } = await AXIOS.post(`/auth/register/customer`, register)

        return data;
    } catch (error) {

    }
}

export {
    register
}