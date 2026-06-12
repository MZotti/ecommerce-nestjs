import type HookCallBack from '@/interfaces/hook'
import type Order from '@/interfaces/order'
import { getCustomerOrders, getOrder, getOrders, postOrder } from '@/services/backoffice/orders'
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

const useGetCustomerOrders = (userId: number, currentPage: number, perPage: number) => {
    const dispatch = useDispatch()
    const { paginateOrdersAction } = bindActionCreators(orderCreator, dispatch)

    const query = useQuery({
        queryKey: ['orders', userId, currentPage, perPage],
        queryFn: () => getCustomerOrders(userId, currentPage, perPage),
        enabled: userId != null
    })

    useEffect(() => {
        if (query.data) {
            paginateOrdersAction(query.data.data)
        }
    }, [query.data])

    return query
}

const useGetOrder = (id: number, storedOrder?: Order | null) => {
    return useQuery({
        queryKey: ['order'],
        queryFn: () => getOrder(id),
        enabled: storedOrder == null
    })
}

const useLazyGetOrder = (id: number) => {
    return useQuery({
        queryKey: ['order'],
        queryFn: () => getOrder(id),
        enabled: false
    })
}

const useCreateOrder = ({ onSuccess, onError }: HookCallBack) => {
    const dispatch = useDispatch()
    const { createOrderAction } = bindActionCreators(orderCreator, dispatch)

    const query = useMutation({
        mutationFn: (formData: any) => postOrder(formData),
        onSuccess: () => onSuccess && onSuccess(),
        onError: (error) => onError && onError(error)
    })

    useEffect(() => {
        if (query.data) {
            createOrderAction(query.data)
        }
    }, [query.data])

    return query;
}

export { useGetOrders, useGetCustomerOrders, useGetOrder, useLazyGetOrder, useCreateOrder }
