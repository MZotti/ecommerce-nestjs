import { login, me } from "@/services/auth"
import { useMutation, useQuery } from "@tanstack/react-query"


const useLogin = () => {
    return useMutation({
        mutationFn: (formData: any) => {
            return login(formData)
        },
    })
}

const useMe = () => {
    return useQuery({
        queryKey: ['me'],
        queryFn: () => me(),
    })
}

export {
    useLogin,
    useMe
}