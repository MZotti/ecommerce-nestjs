import type Product from '@/interfaces/product'
import { deleteProduct, getProduct, getProductsByName, getProducts, postProduct, putProduct } from '@/services/backoffice/products'
import { productCreator } from '@/state'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

const useGetProducts = (currentPage: number, perPage: number, search?: string, filters?: string) => {
    const queryClient = useQueryClient();
    const dispatch = useDispatch()
    const { paginateProductsAction } = bindActionCreators(productCreator, dispatch)

    const query = useQuery({
        queryKey: ['products', currentPage, perPage, search, filters],
        queryFn: () => getProducts(currentPage, perPage, search, filters),
    })

    useEffect(() => {
        if (query.data) {
            paginateProductsAction(query.data.data)
            queryClient.invalidateQueries({ queryKey: ['products'] })
        }
    }, [query.data])

    return query
}

const useGetProduct = (id: number, storedProduct?: Product | null) => {
    return useQuery({
        queryKey: ['product', id],
        queryFn: () => getProduct(id),
        enabled: storedProduct == null
    })
}

const useLazyGetProductsByName = (search: string) => {
    return useQuery({
        queryKey: ['product'],
        queryFn: () => getProductsByName(search),
        enabled: false
    })
}

const useLazyGetProduct = (id: number) => {
    return useQuery({
        queryKey: ['product'],
        queryFn: () => getProduct(id),
        enabled: false
    })
}

const useCreateProduct = () => {
    const dispatch = useDispatch()
    const { createProductAction } = bindActionCreators(productCreator, dispatch)

    const query = useMutation({
        mutationFn: (formData: any) => {
            return postProduct(formData)
        },
    })

    useEffect(() => {
        if (query.data) {
            createProductAction(query.data)
        }
    }, [query.data])

    return query;
}

const useUpdateProduct = () => {
    const dispatch = useDispatch()
    const { updateProductAction } = bindActionCreators(productCreator, dispatch)

    const query = useMutation({
        mutationFn: ({ id, formData }: { id: number, formData: any }) => {
            return putProduct(id, formData)
        },
    })

    useEffect(() => {
        if (query.data) {
            updateProductAction(query.data)
        }
    }, [query.data])

    return query;
}

const useDeleteProduct = () => {
    const dispatch = useDispatch()
    const { deleteProductAction } = bindActionCreators(productCreator, dispatch)

    const query = useMutation({
        mutationFn: (id: number) => {
            return deleteProduct(id)
        },
    })

    useEffect(() => {
        if (query.data) {
            deleteProductAction(query.data.id)
        }
    }, [query.data])

    return query;
}

export { useGetProducts, useLazyGetProductsByName, useGetProduct, useLazyGetProduct, useCreateProduct, useUpdateProduct, useDeleteProduct }
