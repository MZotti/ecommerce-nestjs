import { getOrder, getOrders, postOrder } from '@/services/backoffice/orders'
import { orderCreator } from '@/state'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

const useGetOrders = (currentPage: number, perPage: number, search?: string, filters?: string) => {
    const dispatch = useDispatch()
    const { paginateOrdersAction } = bindActionCreators(orderCreator, dispatch)

    const query = useQuery({
        queryKey: ['orders', currentPage, perPage, search, filters],
        queryFn: () => getOrders(currentPage, perPage, search, filters),
    })

    useEffect(() => {
        if (query.data) {
            paginateOrdersAction(query.data.data)
        }
    }, [query.data])

    return query
}

const useGetOrder = (id: number) => {
    return useQuery({
        queryKey: ['order'],
        queryFn: () => getOrder(id),
    })
}

const useLazyGetOrder = (id: number) => {
    return useQuery({
        queryKey: ['order'],
        queryFn: () => getOrder(id),
        enabled: false
    })
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

export { useGetOrders, useGetOrder, useLazyGetOrder, useCreateOrder }
