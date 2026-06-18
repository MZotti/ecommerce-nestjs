import AXIOS from '@/services/api'

const register = async (register: any) => {
    const { data } = await AXIOS.post(`/auth/register/customer`, register)

    return data;
}

export {
    register
}