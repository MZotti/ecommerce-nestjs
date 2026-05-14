import { getCategories } from "@/services/backoffice/categories"
import { useQuery } from "@tanstack/react-query"

const useGetCategories = () => {
    return useQuery({
        queryKey: ['categories'],
        queryFn: () => getCategories(),
    })
}

export {
    useGetCategories
}