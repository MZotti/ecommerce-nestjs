import { type OrdersAnalytics, type ProductsAnalytics } from "@/interfaces/analytics"
import { getOrdersAnalytics, getProductsAnalytics } from "@/services/backoffice/analytics"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"

export function useAnalyticsFilters(initialFilters: string = '') {
    const [filters, setFilters] = useState<string>(initialFilters)

    return {
        filters,
        setFilters,
    }
}

const useGetProductsAnalytics = (filters?: string) => {
    return useQuery<ProductsAnalytics>({
        queryKey: ['productsAnalytics', filters],
        queryFn: () => getProductsAnalytics(filters),
    })
}

const useGetOrdersAnalytics = (filters?: string) => {
    return useQuery<OrdersAnalytics>({
        queryKey: ['ordersAnalytics', filters],
        queryFn: () => getOrdersAnalytics(filters),
    })
}

export {
    useGetProductsAnalytics,
    useGetOrdersAnalytics
}