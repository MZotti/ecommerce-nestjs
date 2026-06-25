import type HookCallBack from "@/interfaces/hook"
import type PaymentCard from "@/interfaces/paymentCard"
import { getPaymentCards, postPaymentCard } from "@/services/store/paymentCards"
import { customerCreator } from "@/state/storeFront"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { bindActionCreators } from "redux"

const useGetPaymentCards = (storedPaymentCards: PaymentCard[]) => {
    const dispatch = useDispatch()
    const { getPaymentCardsAction } = bindActionCreators(customerCreator, dispatch)

    const query = useQuery<PaymentCard[]>({
        queryKey: ['paymentCards', storedPaymentCards],
        queryFn: () => getPaymentCards(),
        enabled: storedPaymentCards.length === 0
    })

    useEffect(() => {
        if (query.data) {
            getPaymentCardsAction(query.data)
        }
    }, [query])

    return query;
}

const useCreatePaymentCard = ({ onSuccess, onError }: HookCallBack) => {
    const dispatch = useDispatch()
    const { createPaymentCardAction } = bindActionCreators(customerCreator, dispatch)

    const query = useMutation({
        mutationFn: (formData: any) => postPaymentCard(formData),
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