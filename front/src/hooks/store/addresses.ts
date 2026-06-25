import type Address from "@/interfaces/address"
import type HookCallBack from "@/interfaces/hook"
import { getAddresses, postAddress } from "@/services/store/addresses"
import { customerCreator } from "@/state/store/index"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { bindActionCreators } from "redux"

const useGetAddresses = (storedAddresses: Address[]) => {
    const dispatch = useDispatch()
    const { getAddressesAction } = bindActionCreators(customerCreator, dispatch)

    const query = useQuery<Address[]>({
        queryKey: ['addresses', storedAddresses],
        queryFn: () => getAddresses(),
        enabled: storedAddresses.length === 0
    })

    useEffect(() => {
        if (query.data) {
            getAddressesAction(query.data)
        }
    }, [query])

    return query;
}

const useCreateAddress = ({ onSuccess, onError }: HookCallBack) => {
    const dispatch = useDispatch()
    const { createAddressAction } = bindActionCreators(customerCreator, dispatch)

    const query = useMutation({
        mutationFn: (formData: any) => postAddress(formData),
        onSuccess: () => onSuccess && onSuccess(),
        onError: () => onError && onError()
    })

    useEffect(() => {
        if (query.data) {
            createAddressAction(query.data)
        }
    }, [query.data])

    return query;
}

export {
    useGetAddresses,
    useCreateAddress
}