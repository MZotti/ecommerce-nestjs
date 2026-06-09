import { getProduct, getProducts } from '@/services/store/products'
import { useQuery } from '@tanstack/react-query'

const useGetProducts = (currentPage: number, perPage: number, search?: string, filters?: string) => {
    return useQuery({
        queryKey: ['products', currentPage, perPage, search, filters],
        queryFn: () => getProducts(currentPage, perPage, search, filters),
    })
}

const useGetProduct = (slug: string) => {
    return useQuery({
        queryKey: ['product', slug],
        queryFn: () => getProduct(slug),
    })
}

export { useGetProducts, useGetProduct }
