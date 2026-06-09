import { getOrder, getOrders, postOrder } from "@/services/store/orders"
import { useMutation, useQuery } from "@tanstack/react-query"

const useCreateOrder = () => {
    // const dispatch = useDispatch()
    // const { createOrderAction } = bindActionCreators(orderCreator, dispatch)

    return useMutation({
        mutationFn: (formData: any) => {
            return postOrder(formData)
        },
    })

    // useEffect(() => {
    //     if (query.data) {
    //         createOrderAction(query.data)
    //     }
    // }, [query.data])

    // return query;
}

const useGetOrders = () => {
    return useQuery({
        queryKey: ['orders'],
        queryFn: () => getOrders(),
    })
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