import ProductsGrid from '@/components/ProductsGrid';
import { useGetProducts } from '@/hooks/store/products';
import { Box, Text } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

const Products = () => {
    const { slug } = useParams();
    const { data, isFetching } = useGetProducts(1, 30, "", slug);
    const products = data?.data || []

    return (
        <Box w="full" px="400px">
            <Text fontSize="lg" fontWeight="bold" mb={8}>Products</Text>
            <ProductsGrid products={products} isLoading={isFetching} />
        </Box>
    )
}

export default Products