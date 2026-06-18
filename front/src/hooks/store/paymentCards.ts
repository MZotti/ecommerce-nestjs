import type HookCallBack from "@/interfaces/hook"
import { getPaymentCards, postPaymentCard } from "@/services/store/paymentCards"
import { authCreator } from "@/state"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { bindActionCreators } from "redux"

const useGetPaymentCards = () => {
    return useQuery({
        queryKey: ['paymentCards'],
        queryFn: () => getPaymentCards()
    })
}

const useCreatePaymentCard = ({ onSuccess, onError }: HookCallBack) => {
    const dispatch = useDispatch()
    const { createPaymentCardAction } = bindActionCreators(authCreator, dispatch)

    const query = useMutation({
        mutationFn: (formData: any) => {
            return postPaymentCard(formData)
        },
        onSuccess: () => onSuccess && onSuccess(),
        onError: () => onError && onError()
    })

    useEffect(() => {
        if (query.data) {
            createPaymentCardAction(query.data)
        }
    }, [query.data])

    return query;
}

export {
    useGetPaymentCards,
    useCreatePaymentCard
}