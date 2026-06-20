import type { Category } from "@/interfaces/product"
import { getCategories } from "@/services/backoffice/categories"
import { useQuery } from "@tanstack/react-query"

const useGetCategories = () => {
    return useQuery<Category[]>({
        queryKey: ['categories'],
        queryFn: () => getCategories(),
    })
}

export {
    useGetCategories
}