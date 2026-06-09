import ProductsGrid from "@/components/ProductsGrid";
import { useGetProducts } from "@/hooks/store/products";
import { Box, Text } from "@chakra-ui/react"

const TopSaleProducts = () => {
    const { data, isLoading } = useGetProducts(1, 5);
    const products = data?.data || []

    return (
        <Box w="full" px="400px">
            <Text fontSize="lg" fontWeight="bold" mb={8}>Top sale products</Text>
            <ProductsGrid products={products} isLoading={isLoading} />
        </Box>
    )
}

export default TopSaleProducts