import type Customer from '@/interfaces/customer'
import type Pagination from '@/interfaces/pagination'
import { getCustomer, getCustomers, postCustomer, putCustomer } from '@/services/backoffice/customers'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { customerCreator } from 'state/index'

const useGetCustomers = (currentPage: number, perPage: number, search?: string, filters?: string) => {
    const dispatch = useDispatch()
    const { paginateCustomersAction } = bindActionCreators(customerCreator, dispatch)

    const query = useQuery<Pagination<Customer>>({
        queryKey: ['customers', currentPage, perPage, search, filters],
        queryFn: () => getCustomers(currentPage, perPage, search, filters),
    })

    useEffect(() => {
        if (query.data) {
            paginateCustomersAction(query.data.data)
        }
    }, [query.data])

    return query
}

const useGetCustomer = (id: number, storedCustomer?: Customer | null) => {
    return useQuery<Customer>({
        queryKey: ['customer', id],
        queryFn: () => getCustomer(id),
        enabled: storedCustomer == null
    })
}

const useLazyGetCustomer = (id: number) => {
    return useQuery<Customer>({
        queryKey: ['customer'],
        queryFn: () => getCustomer(id),
        enabled: false
    })
}

const useCreateCustomer = () => {
    const dispatch = useDispatch()
    const { createCustomerAction } = bindActionCreators(customerCreator, dispatch)

    const query = useMutation({
        mutationFn: (formData: any) => {
            return postCustomer(formData)
        },
    })

    useEffect(() => {
        if (query.data) {
            createCustomerAction(query.data)
        }
    }, [query.data])

    return query;
}

const useUpdateCustomer = () => {
    const dispatch = useDispatch()
    const { updateCustomerAction } = bindActionCreators(customerCreator, dispatch)

    const query = useMutation({
        mutationFn: ({ id, formData }: { id: number, formData: any }) => {
            return putCustomer(id, formData)
        },
    })

    useEffect(() => {
        if (query.data) {
            updateCustomerAction(query.data)
        }
    }, [query.data])

    return query;
}

export { useGetCustomers, useGetCustomer, useLazyGetCustomer }
