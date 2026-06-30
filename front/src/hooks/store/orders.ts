import type Order from "@/interfaces/order"
import { getOrder, getOrders, postOrder } from "@/services/store/orders"
import { orderCreator } from "@/state/storeFront"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { bindActionCreators } from "redux"

const useGetOrders = (storedOrders: Order[]) => {
    const dispatch = useDispatch()
    const { getOrdersAction } = bindActionCreators(orderCreator, dispatch)

    const query = useQuery({
        queryKey: ['orders', storedOrders],
        queryFn: () => getOrders(),
        enabled: storedOrders.length === 0
    })

    useEffect(() => {
        if (query.data) {
            getOrdersAction(query.data.data)
        }
    }, [query])

    return query;
}

const useCreateOrder = () => {
    const dispatch = useDispatch()
    const { createOrderAction } = bindActionCreators(orderCreator, dispatch)

    const query = useMutation({
        mutationFn: (formData: any) => {
            return postOrder(formData)
        },
    })

    useEffect(() => {
        if (query.data) {
            createOrderAction(query.data)
        }
    }, [query.data])

    return query;
}

const useGetOrder = (id: number) => {
    return useQuery({
        queryKey: ['order', id],
        queryFn: () => getOrder(id),
    })
}

export {
    useCreateOrder,
    useGetOrders,
    useGetOrder
}