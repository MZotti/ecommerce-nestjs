import { postAddress } from "@/services/store/addresses"
import { authCreator } from "@/state"
import { useMutation } from "@tanstack/react-query"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { bindActionCreators } from "redux"

const useCreateAddress = () => {
    const dispatch = useDispatch()
    const { createAddressAction } = bindActionCreators(authCreator, dispatch)

    const query = useMutation({
        mutationFn: (formData: any) => {
            return postAddress(formData)
        },
    })

    useEffect(() => {
        if (query.data) {
            createAddressAction(query.data)
        }
    }, [query.data])

    return query;
}

export {
    useCreateAddress
}