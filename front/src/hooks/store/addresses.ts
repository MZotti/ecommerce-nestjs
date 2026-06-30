import type Address from "@/interfaces/address"
import type HookCallBack from "@/interfaces/hook"
import { deleteAddress, getAddresses, postAddress, putAddress, setDefaultAddress } from "@/services/store/addresses"
import { addressCreator } from "@/state/storeFront"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { bindActionCreators } from "redux"

const useGetAddresses = (storedAddresses: Address[]) => {
    const dispatch = useDispatch()
    const { getAddressesAction } = bindActionCreators(addressCreator, dispatch)

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
    const { createAddressAction } = bindActionCreators(addressCreator, dispatch)

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

const useUpdateAddress = (id: number, { onSuccess, onError }: HookCallBack) => {
    const dispatch = useDispatch()
    const { updateAddressAction } = bindActionCreators(addressCreator, dispatch)

    const query = useMutation({
        mutationFn: (formData: any) => putAddress(id, formData),
        onSuccess: () => onSuccess && onSuccess(),
        onError: () => onError && onError()
    })

    console.log("query", query)

    useEffect(() => {
        if (query.data) {
            console.log("q", query.data)
            updateAddressAction(query.data)
        }
    }, [query.data])

    return query;
}

const useSetDefault = () => {
    const dispatch = useDispatch()
    const { setDefaultAddressAction } = bindActionCreators(addressCreator, dispatch)

    const query = useMutation({
        mutationFn: (id: any) => setDefaultAddress(id)
    })

    useEffect(() => {
        if (query.data) {
            setDefaultAddressAction(query.data.id)
        }
    }, [query.data])

    return query;
}

const useDeleteAddress = () => {
    const dispatch = useDispatch()
    const { deleteAddressAction } = bindActionCreators(addressCreator, dispatch)

    const query = useMutation({
        mutationFn: (id: any) => deleteAddress(id)
    })

    useEffect(() => {
        if (query.data) {
            deleteAddressAction(query.data.id)
        }
    }, [query.data])

    return query;
}

export {
    useGetAddresses,
    useCreateAddress,
    useUpdateAddress,
    useSetDefault,
    useDeleteAddress
}